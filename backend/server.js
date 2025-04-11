import express, { response, urlencoded } from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import axios from "axios"
import multer from "multer"
import { Stream } from "groq-sdk/lib/streaming.mjs"
import fs from "fs"
import FormData from "form-data"
import speakeasy from "speakeasy"
import nodemailer from 'nodemailer'
import { error } from "console"

dotenv.config()

const app = express()
const port = 4500
const uri = "mongodb://127.0.0.1:27017/"

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("UserProfilePic"))


const JWT_SECRET=process.env.JWT_TOKEN||"sample"
async function getCollection(dbName, collectionName) {
    const client = new MongoClient(uri, { monitorCommands: true })
    await client.connect()
    console.log("Connection opened")
    const db = client.db(dbName)
    return { client, collection: db.collection(collectionName) }
}
async function hashPassword(password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'UserProfilePic/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })
const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Audio/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  const uploadAudio = multer({ storage: audioStorage })


app.post('/user-login', async(req,res) => {
    let client
    try{
        const { useremail, userpsd } = req.body
        console.log(useremail)
        console.log(userpsd)
        if(!useremail || !userpsd){
            return res.status(400).json({ error: "Email and Password are required" })
        }
        const dbconnection = await getCollection("TalkWise","Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const result = await collection.findOne({email:useremail})
        console.log(result)
        if(!result){
            return res.status(401).json({ error: "Invalid Email or Password" })
        }
        const matchFound = await bcrypt.compare(userpsd, result.password)
        console.log(matchFound)
        if(matchFound){
            const token = jwt.sign({ id: result._id, email: result.email }, JWT_SECRET, { expiresIn: "7d" })
            return res.status(200).json({ message: "Login Successfully", token })
        }else{
            return res.status(401).json({ error: "Invalid Email or Password" })
        }
    }catch(e) {
        console.error("Error:", e)
        res.status(500).json({ e: "Server error"})
    }finally {
        if(client) {
            await client.close()
            console.log("Connection closed")
        }
    }
}) 

app.post('/user-create-account', async(req,res) => {
    let client
    try{
        const { useremail, userphoneno, userpsd } = req.body
        if(!useremail || !userphoneno || !userpsd){
            return res.status(400).json({ error: "All fields are required"})
        }
        const password = await hashPassword(userpsd)
        const dbconnection = await getCollection("TalkWise","Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const existuser = await collection.findOne({$or: [{ email: useremail },{ phone: userphoneno }]})
        console.log(existuser)
        if(existuser){
            if (existuser.email === useremail) {
                return res.status(401).json({error : 'This email address already exists'})
            }
            if (existuser.phone === userphoneno) {
                return res.status(401).json({error: 'This phone number already exists'})
            }
        }
        const userid =  Date.now()
        const result = await collection.insertOne({
            id: userid,
            userprofile:null,
            username:null,
            email: useremail,
            password: password,
            phone: userphoneno,
            age:null,
            nativeLanguage:null,
            communicationlevel:null,
            createdAt: new Date()
        })
        if(result.acknowledged){
            const token = jwt.sign({ id: result.insertedId, email: useremail }, JWT_SECRET, { expiresIn: "7d" })
            return res.status(200).json({ message: "Account created successfully!", token})
        }else {
            res.status(500).json({ error: "Failed to create account"})
        }
    }catch(e){
        console.error("Error:", e)
        res.status(500).send("Server error")
    }finally {
        if (client) {
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post('/forget-password', async(req,res) => {
    let client
    try{
        const { useremail } = req.body
        console.log(useremail)
        if(!useremail){
            return res.status(400).json({ error: "Email address is required" })
        }
        const dbconnection = await getCollection("TalkWise", "Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const result = await collection.findOne({ email: useremail })
        if(!result){
            return res.status(404).json({ error: "User not found" })
        }
        const otp = speakeasy.totp({
            secret: speakeasy.generateSecret({ length: 20 }).base32,
            encoding: "base32",
            step: 30,
            digits: 6
        })
        const mainacc = nodemailer.createTransport({
            service: 'gmail', 
            auth: { user: 'asfakahamed.a@gmail.com', pass: process.env.APP_PSD || '' }
        })
        const mailgenerate = {
            from: 'asfakahamed.a@gmail.com',
            to: useremail,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 30 seconds.`
        }
        await mainacc.sendMail(mailgenerate)
        res.status(200).json({ message: "OTP sent successfully", otp })
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error" })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post('/password-change', async(req,res) => {
    let client
    try{
        const { useremail, usernewpsd } = req.body
        console.log("Opens")
        if(!useremail || !usernewpsd){
            return res.status(400).json({ error: "All fields is required" })
        }
        if (usernewpsd.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }
        const password = await hashPassword(usernewpsd)
        const dbconnection = await getCollection("TalkWise", "Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const result =  await collection.findOne({ email: useremail })
        if(!result){
            return res.status(404).json({ error: "User not found" })
        }
        await collection.updateOne({ email: useremail },{ $set:{ password: password }})
        res.status(200).json({ message: "Password successfully updated"})
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error" })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post('/get-user-details', async(req,res) => {
    let client
    try{
        const { type, useremail, username, userage, usercomlevel, userlanguage } = req.body
        const dbconnection = await getCollection("TalkWise", "Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const result =  await collection.findOne({ email: useremail })
        if(!result){
            return res.status(404).json({ error: "User not found" })
        }
        if(type === 'name'){
            if(!username){
                return res.status(400).json({ error: "User Name is required" })
            }
            const updateResult = await collection.updateOne({ email:useremail },{ $set: { username:username.trim() }})
            res.status(200).json({ message: "Name updated"})
        }
        if(type === 'age'){
            if(!userage){
                return res.status(400).json({ error: "User age is required" })
            }
            const updateResult = await collection.updateOne({ email:useremail },{ $set: { age:userage }})
            res.status(200).json({ message: "Age updated"})
        }
        if(userlanguage === 'nativelan'){
            if(!userlanguage){
                return res.status(400).json({ error: "User communication level is required" })
            }
            const updateResult = await collection.updateOne({ email:useremail },{ $set: { nativeLanguage:userlanguage }})
            res.status(200).json({ message: "Communication level is updated"})
        }  
        if(type === 'comlevel'){
            if(!usercomlevel){
                return res.status(400).json({ error: "User communication level is required" })
            }
            const updateResult = await collection.updateOne({ email:useremail },{ $set: { communicationlevel:usercomlevel }})
            res.status(200).json({ message: "Communication level is updated"})
        }     
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error" })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post('/upload-pro-pic', upload.single('file'), async(req, res) => {
    let client
    try{
        const {useremail} = req.body
        console.log("img works")
        if(!req.file){
            return res.status(400).json({ error: 'No file uploaded' })
        }
        const dbconnection = await getCollection("TalkWise", "Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        const result =  await collection.findOne({ email: useremail })
        if(!result){
            return res.status(404).json({ error: "User not found" })
        }
        const fileUrl = `${process.env.API_URL}uploads/${req.file.filename}`
        const updateResult = await collection.updateOne({ email: useremail },{ $set: { userprofile: fileUrl } })
        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ error: 'Profile picture update failed' })
        }
        res.status(200).json({ message: 'Profile picture updated successfully',fileUrl: fileUrl})
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error" })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post('/get-user-avatar', async (req, res) => {
    let client
    try {
        const { type, useremail, name, email, phone, age , level  } = req.body
        console.log("server ==>",useremail)
        const dbconnection = await getCollection("TalkWise", "Users")
        client = dbconnection.client
        const collection = dbconnection.collection
        
        const result = await collection.findOne({ email:useremail })
        if(!result){
            return res.status(404).json({ message: "User not found"})
        }
        if(type === 'getuserdata'){
            res.status(200).json({ 
                message: "Get Image", 
                name: result.username, 
                email: result.email, 
                phone:result.phone, 
                age: result.age, 
                level:result.communicationlevel, 
                credit:result.usercredit,
                image:result.userprofile})
        }
        if(type === 'updateuserdata'){
            const updatefield = {}
            if(name) updatefield.username = name.trim()
            if(phone) updatefield.phone = phone
            if(age) updatefield.age = age
            if(level) updatefield.communicationlevel = level.trim()

            const updateresult = await collection.updateOne(
                { email: useremail },
                { $set: updatefield }
            )
            res.status(200).json({message: "Updated Successfully"})
        }
    }catch(e){
        res.status(500).json({ error: "Server error", e })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post("/get-lesson", async (req, res) => {
    let client
    try {
        const { section } = req.body
        if (!section) {
            return res.status(400).json({ error: "Section is required" })
        }
        const dbConnection = await getCollection("TalkWise", "Lesson")
        client = dbConnection.client
        const collection = dbConnection.collection
        const lesson = await collection.findOne({ section:section })
        if (!lesson) {
            return res.status(404).json({ message: "No lessons found for this section" })
        }
        res.status(200).json({ 
            message: "Get section", 
            levels: lesson.levels.map(level => ({
                level: level.level,
                title: level.lesson_title,
                description: level.description
            }))})
    }catch(e){
        res.status(500).json({ error: "Server error", e })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

// app.post('/chat', upload.single('audioFile'), async (req, res) => {
//     console.log('Processing audio file...')
//     const userEmail = req.query.useremail
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' })
//     }
//     const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/m4a']
//     if (!allowedTypes.includes(req.file.mimetype)) {
//         fs.unlinkSync(req.file.path)
//         return res.status(400).json({ error: 'Invalid file type' })
//     }
//     const filePath = req.file.path
//     const formData = new FormData()
//     formData.append('model', 'whisper-large-v3-turbo')
//     formData.append('file', fs.createReadStream(filePath))
//     formData.append('response_format', 'verbose_json')
//     try {
//         const transcriptionResponse = await axios.post(
//             'https://api.groq.com/openai/v1/audio/transcriptions',
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//                     ...formData.getHeaders(),
//                 },
//             }
//         )
//         const transcription = transcriptionResponse.data.text
//         console.log('Transcription:', transcription)

//         if (!transcription) {
//             fs.unlinkSync(filePath)
//             return res.status(400).json({ error: 'Transcription failed' })
//         }
//         const aiResponse = await axios.post(
//             'https://api.groq.com/openai/v1/chat/completions',
//             {
//                 model: 'llama-3.1-8b-instant',
//                 messages: [{ role: 'user', content: transcription }],
//                 temperature: 1,
//                 max_tokens: 500,
//                 stream: false,
//             },
//             {
//                 headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
//             }
//         )
//         const aiMessage = aiResponse.data.choices[0]?.message?.content?.trim() || 'No response from AI'
        // const dbConnection = await getCollection('TalkWise', 'Subscription')
        // client = dbConnection.client
        // const collection = dbConnection.collection

        // const userSub = await collection.findOne({ email: userEmail })
        // if (!userSub) {
        //     return res.status(404).json({ error: 'User subscription not found' })
        // }
        // if (userSub.creditUsed <= 0) {
        //     return res.status(402).json({ error: 'Insufficient credits' })
        // }

        // await collection.updateOne(
        //     { email: userEmail },
        //     { $inc: { creditUsed: -1 } }
        // )
//         console.log('AI Response:', aiMessage)
//         fs.unlinkSync(filePath)
        // return res.json({
        //     status: 'success',
        //     transcription: transcription,
        //     aiResponse: aiMessage,
        // })
//     }catch(error){
//         console.error('Error:', error.message || error)
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath)
//         }
//         return res.status(500).json({ error: 'Internal server error' })
//     }
// })

app.post('/nextStep', async (req, res) => {
    let client
    try {
        const { email, section, level, step } = req.body
        console.log(section)
        const dbConnection = await getCollection("TalkWise", "Lesson")
        client = dbConnection.client
        const collection = dbConnection.collection

        const conversationSteps = await collection.findOne(
            { section:section},
            { projection: { levels: { $elemMatch: { level: level } } } },
        )
        const levelData = conversationSteps?.levels?.[0]
        const stepIndex = step - 1
        const aiPrompt = levelData?.conversations?.[stepIndex]
        if(!aiPrompt){
            return res.status(200).json({ aiPrompt:'You’ve completed this lesson! Great job!. Moved on Quiz...', status :'completed' })
        }
        const dbConnectionSub = await getCollection('TalkWise', 'Subscription')
        const subClient = dbConnectionSub.client
        const subCollection = dbConnectionSub.collection

        const userSub = await subCollection.findOne({ email: email })
        console.log(email)
        console.log(userSub)
        if (!userSub) {
            return res.status(404).json({ error: 'User subscription not found' })
        }
        if (userSub.creditUsed <= 0) {
            return res.status(402).json({ error: 'Insufficient credits' })
        }

        await subCollection.updateOne(
            { email: email },
            { $inc: { creditUsed: -1 } }
        )
        res.status(200).json({ aiPrompt,status: 'in-progress',})
        
    }catch (error) {
        console.error('Error fetching nextStep:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

  
app.post('/chat', uploadAudio.single('audioFile'), async (req, res) => {
    console.log('Processing audio file...')
  
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
  
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/m4a']
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Invalid file type' })
    }
  
    const filePath = req.file.path
    const formData = new FormData()
    formData.append('model', 'whisper-large-v3-turbo')
    formData.append('file', fs.createReadStream(filePath))
    formData.append('response_format', 'verbose_json')
  
    try {
      const transcriptionResponse = await axios.post(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            ...formData.getHeaders(),
          },
        }
      )
  
      const transcription = transcriptionResponse.data.text
      console.log('Transcription:', transcription)
  
      fs.unlinkSync(filePath)
  
      if (!transcription) {
        return res.status(400).json({ error: 'Transcription failed' })
      }
  
    //   return res.json({
    //     status: 'success',
    //     transcription,
    //   })
      return res.status(200).json({
        status: 'success',
        transcription: transcription,
    })
    } catch (error) {
      console.error('Error:', error.message || error)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return res.status(500).json({ error: 'Internal server error' })
    }
})

app.post("/lesson", async(req, res) => {
    try {
        const { question, expectedans, correctans, wrongans, user } = req.body
        console.log("Works")

        let usercontent = `{This is system prompt,generate based on these, question: ${question},
                            expected answer : ${expectedans}, if user give correct answer : ${correctans},
                            user give wrong answer : ${wrongans}. if user tells not related these question,you says, focus on your lesson}
                            if user speak tamil you reply tamil, if user native language, user ask question in english, you both english and tamil. 
                            you like to tech spoken english.`
        // console.log(usercontent)
        const aiResponse = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'system', content: usercontent },{ role: 'user', content: user }],
                temperature: 1,
                max_tokens: 500,
                stream: false,
            },
            {
                headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
            }
        )
        const aiMessage = aiResponse.data.choices[0]?.message?.content?.trim() || 'No response from AI'
        console.log('AI Response:', aiMessage)
        res.status(200).json({ aiPrompt:user, aiResponse: aiMessage})
    }catch(e){
        res.status(500).json({ error: "Server error", e })
    }
})

app.post("/txt-speech", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await axios.post(
            'https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb?output_format=mp3_44100_128',
            {
                text,
                model_id: "eleven_multilingual_v2"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "xi-api-key": process.env.xi_api_key,
                },
                responseType: 'arraybuffer'
            }
        );

        res.setHeader("Content-Type", "audio/mpeg");
        res.send(response.data);
    } catch (e) {
        res.status(500).json({ error: "Server error", e });
    }
});

app.post("/quiz", async (req, res) => {
    console.log("Quiz API hit")
    let client
    try {
      const { section, level } = req.body
      console.log("Section:", section)
      console.log("Level:", level)
  
      const dbConnection = await getCollection("TalkWise", "Lesson")
      client = dbConnection.client
      const collection = dbConnection.collection
  
      const conversationSteps = await collection.findOne(
        { section: section },
        { projection: { levels: { $elemMatch: { level: level } } } }
      )
  
      const levelData = conversationSteps?.levels?.[0]
      const quiz = levelData?.quiz
  
      if (!quiz || quiz.length === 0) {
        return res.status(404).json({ error: "No quiz found for this level" })
      }
  
      res.status(200).json({
        message: "success",
        questions: quiz
      })
  
    }catch (error) {
      console.error("Error fetching quiz:", error)
      res.status(500).json({ error: "Internal server error" })
    }finally {
      if (client) {
        await client.close()
        console.log("DB connection closed")
      }
    }
})
  
app.post("/support-ticket", async (req, res) => {
    let client
    try {
        const { subject, useremail, message } = req.body

        const dbConnection = await getCollection("TalkWise", "SupportTicket")
        client = dbConnection.client
        const collection = dbConnection.collection
        const userexist = await collection.findOne({ useremail:useremail })
        const id = "userid_"+Date.now()
        const ticid = "ticketid_"+Date.now()
        if(!userexist){
            const result = await collection.insertOne({
                userId:id,
                useremail,
                ticketHistory:[
                    {
                        ticketId:ticid,
                        status: "Open",
                        subject:subject.trim(),
                        message:message.trim(),
                        createdAt: new Date(),
                        response: "",
                        closedAt: "",
                    }
                ]
            })
        }
        if(useremail === userexist.useremail){
            const updateresult = await collection.updateOne(
                { useremail:useremail },
                { $push: {ticketHistory:{
                    ticketId:ticid,
                    status: "Open",
                    subject:subject.trim(),
                    message:message.trim(),
                    createdAt: new Date(),
                    response: "",
                    closedAt: "",
                }}}
            )
        }
      res.status(200).json({ message: "Ticket submitted successfully!" })
    }catch (error) {
      res.status(500).json({ error: "Failed to submit ticket", error })
    }finally {
        if (client) {
          await client.close()
          console.log("DB connection closed")
        }
    }
})

app.get("/support/faqs", (req, res) => {
    res.json([
      { question: "How to reset password?", answer: "Go to Profile > Reset Password." },
      { question: "Credits not updating?", answer: "Please check your subscription status or contact support." },
      { question: "Payment issue?", answer: "Please check your contact support" },
      { question: "Bank server down?", answer: "Please check  contact support." },
      
      

    ])
})

app.post("/ticket-status", async (req, res) => {
    let client
    try {
        const { useremail } = req.body

        const dbConnection = await getCollection("TalkWise", "SupportTicket")
        client = dbConnection.client
        const collection = dbConnection.collection
        const ticket = await collection.findOne(
            { useremail: useremail },
            { projection: { ticketHistory: 1, _id: 0 } }
          )          
        if (ticket && ticket.ticketHistory) {
            res.status(200).json(ticket.ticketHistory) 
        }else{
            res.status(404).json({ error: "No tickets found" })
        }
    }catch (error) {
      res.status(500).json({ error: "Error", error })
    }finally {
        if (client) {
          await client.close()
          console.log("DB connection closed")
        }
    }
})

app.post("/user-payment", async(req, res) => {
    let client
    try {
        const { paidusername, paiduseremail, paiduserphone, plan, credits, paymethod, amount } = req.body
        if (!plan || !credits || !paymethod || !amount || !paidusername || !paiduseremail || !paiduserphone) {
            return res.status(400).json({ error: "All fields are required" })
        }
        console.log(paiduseremail)
        const dbConnection = await getCollection("TalkWise", "Payment")
        client = dbConnection.client
        const collection = dbConnection.collection
        const result = await collection.findOne({ email:paiduseremail })
        const transId = `UPI_${paiduserphone}${paiduserphone,Date.now()}`
        const Paidat = new Date().toISOString()
        if(!result){
            const result = await collection.insertOne({
                username:paidusername,
                email:paiduseremail,
                phone:paiduserphone,
                PaymentHistory:[{
                    plan:plan,
                    credits:credits,
                    paymethod:paymethod,
                    transactionId:transId,
                    amount:amount,
                    status:"Success",
                    paidAt:Paidat
                }],
            })
            if(result.acknowledged){
                let client
                try {
                    const dbConnection = await getCollection("TalkWise", "Subscription")
                    client = dbConnection.client
                    const collection = dbConnection.collection
                    const subinsert = await collection.findOne({ email:paiduseremail })
                    if(!subinsert){
                        const insertval = await collection.insertOne({
                            username:paidusername,
                            email:paiduseremail,
                            status:"Active",
                            plan:plan,
                            creditUsed:credits,
                            SubscribledAt: Paidat
                        }) 
                    }
                }catch(e){
                    console.error("Error:", e)
                    res.status(500).json({ error: "Server error", e })
                }
            }
        }
        console.log(paiduseremail === result.email)
        if(paiduseremail === result.email){
            const updateresult = await collection.updateOne(
                { email:paiduseremail },
                { $push: {PaymentHistory:{
                    plan:plan,
                    credits:credits,
                    paymethod:paymethod,
                    transactionId:transId,
                    amount:amount,
                    status:"Success",
                    paidAt:Paidat
                }}}
            )
            console.log(updateresult.acknowledged)
            if(updateresult.acknowledged){
                let client
                try {
                    const dbConnection = await getCollection("TalkWise", "Subscription")
                    client = dbConnection.client
                    const collection = dbConnection.collection
                    const subupdate = await collection.findOne({ email:paiduseremail })
                    if(subupdate){
                        console.log("subs ===>",!subupdate)
                        const insertval = await collection.updateOne(
                            { email:paiduseremail },
                            {
                                $set: {
                                plan:plan,
                                SubscribledAt: Paidat
                            },
                            $inc : {creditUsed:credits}}
                    )}
                }catch(e){
                    console.error("Error:", e)
                    res.status(500).json({ error: "Server error", e })
                }
            }
        }
        const mainacc = nodemailer.createTransport({
            service: 'gmail', 
            auth: { user: 'asfakahamed.a@gmail.com', pass: process.env.APP_PSD || '' }
        })
        const mailgenerate = {
            from: 'asfakahamed.a@gmail.com',
            to: paiduseremail,
            // to: 'asfakamd.s@gmail.com',
            subject: 'Payment Confirmation -TalkWise',
            text: `
                Hello ${result.username},
                Thank you for your payment!
                Here are your payment details:

                - Plan: ${plan}
                - Amount Paid: ₹${amount}
                - Credits Purchased: ${credits}
                - Payment Method: ${paymethod}
                - Transaction ID: ${transId}
                - Date: ${Paidat}

                Your credits have been successfully added to your account.

                You now have a total of ${credits} credits available to use.

                Thank you for learning with TalkWise!

                Best regards,  
                The TalkWise Team`
        }
        await mainacc.sendMail(mailgenerate)
        res.status(200).json({ message: "Payment completed successfully"})
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error", e })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})

app.post("/user-subscription", async(req, res) => {
    let client
    try {
        const { useremail } = req.body
        const dbConnection = await getCollection("TalkWise", "Subscription")
        client = dbConnection.client
        const collection = dbConnection.collection
        console.log(useremail)
        const result = await collection.findOne({ email:useremail })
        if(!result){
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "Get Image", credit: result.creditUsed, })
    }catch(e){
        console.error("Error:", e)
        res.status(500).json({ error: "Server error", e })
    }finally{
        if(client){
            await client.close()
            console.log("Connection closed")
        }
    }
})




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})