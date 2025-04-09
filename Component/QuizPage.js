import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation,useRoute } from '@react-navigation/native'
import { useColorScheme, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'

const url = process.env.EXPO_PUBLIC_API_URL || ''

export default function QuizPage() {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const screenWidth = Dimensions.get('window').width

  const route = useRoute()
  // const {levels} = route.params || {}
  const levels =1
  const [section, setSection] = useState('')
  const [useremail, setUseremail] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [quizquestion, setQuizquestion] = useState([])
  const [showanswer, setShowanswer] =  useState(false)
  const currentQuestion = quizquestion[currentQuestionIndex]

  console.log("===>",levels)
  useEffect(() => {
    (async () => {
      const uemail = await AsyncStorage.getItem('Email')
      setUseremail(uemail)
    })()
  }, [])

  useEffect(() => {
    if (useremail) {
      fetchUserLevel()
    }
  }, [useremail])

  useEffect(() => {
    if (section) {
      fetchQuiz()
    }
  }, [section])

  const fetchUserLevel = () => {
    axios.post(url + 'get-user-avatar', { type: 'getuserdata', useremail })
      .then(response => {
        if (response.status === 200) {
          setSection(response?.data?.level)
        }
      })
      .catch(error => {
        console.log("Avatar error:", error.response?.data || error.message)
      })
  }

  const fetchQuiz = () => {
    axios.post(url + 'quiz', { section, level: levels })
      .then(response => {
        if (response.status === 200) {
          setQuizquestion(response?.data?.questions || [])
        }
      })
      .catch(error => {
        console.log("Quiz error:", error.response?.data || error.message)
      })
  }

  const handleSubmit = () => {
    setProgress((currentQuestionIndex + 1) / quizquestion.length)

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct_answer,
      },
    ]
    setAnswers(updatedAnswers)

    if (currentQuestionIndex < quizquestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      setIsQuizComplete(true)
    }
  }

  const getScore = () => {
    return answers.filter(item => item.selected === item.correct).length
  }

  if (!quizquestion.length) {
    return (
      <View style={styles.quizconatiner}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>Loading quiz...</Text>
      </View>
    )
  }

  return (
    <View style={[styles.quizconatiner, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <View style={{ marginBottom: 50 }}>
        {!isQuizComplete ? (
          <View style={{ alignItems: 'center' }}>
            <Progress.Bar
              progress={progress}
              width={screenWidth - 40}
              height={10}
              borderRadius={40}
              color={'#252525'}
              borderColor='#252525'
            />
            <Text style={{ marginTop: 8, color: isDark ? '#ccc' : '#333', fontSize: 14 }}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
            Successfully Completed!
          </Text>
        )}
      </View>

      {!isQuizComplete ? (
        <>
          <Text style={[styles.questionText, { color: isDark ? '#fff' : '#000' }]}>
            Q{currentQuestionIndex + 1}. {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedOption(option)}
              style={[
                styles.optionButton,
                {
                  backgroundColor: selectedOption === option
                    ? isDark ? '#2e2e2e' : '#252525'
                    : isDark ? '#1f1f1f' : '#eee',
                },
              ]}
            >
              <Text style={{
                color: selectedOption === option ? '#fff' : isDark ? '#ddd' : '#000',
                fontWeight: selectedOption === option ? 'bold' : 'normal',
              }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selectedOption}
            style={[
              styles.submitButton,
              { backgroundColor: selectedOption ? '#252525' : '#999' },
            ]}
          >
            <Text style={styles.submitButtonText}>
              {currentQuestionIndex === quizquestion.length - 1 ? 'Finish' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.resultText, { color: isDark ? '#fff' : '#000' }]}>
            You scored {getScore()} out of {quizquestion.length}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('lesson')}
            style={[styles.submitButton, { backgroundColor: '#252525', marginTop: 30 }]}
          >
            <Text style={styles.submitButtonText}>Next Level</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex:1,alignItems:'center',marginTop:15,color:'red'}}>
            <Text style={{color:'gray',fontWeight:'bold'}}>View the Answers</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  quizconatiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  optionButton: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  submitButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
})
