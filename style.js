import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    // Landing Page
    body: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        justifyContent: 'center',
    },
    tab_body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    container: {
        flex:1,
    },
    text: {
        fontSize: 12,
        color:"blue",
        marginBottom: 20,
        fontFamily: 'Poppins_400Regular'
    },
    maintext: {
        fontSize: 28,
        lineHeight: 40,
        fontWeight:300,
    },
    subtext: {
        fontWeight: 500
    },
    land_btn: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 100
    },
    land_btn_to: {
        width: 150,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 10,
    },
    land_btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        padding: 5,
    },
    land_logo: {
        flex:1,
        marginLeft: 10,
    },

    // Login Page
    login_hero_img:{
        flex:3,
        width:'100%',
        height:'100%'
    },
    login_signup_head: {
        fontSize: 28,
        fontWeight: 600,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 50,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingVertical: 5, 
    },
    icon: {
        marginRight: 10,
        color: '#bababa',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        height: '100%', 
        textAlignVertical: 'center',
    },
    login_error: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 3,
        marginBottom:5,
        alignSelf: 'center',
    },
    log_forget_btn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#252525',
        marginBottom: 15,
    },
    login_btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_btn_to: {
        width: 120,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#252525',
        paddingVertical: 10,
    },
    login_btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    log_signup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position:'relative',
        bottom:40
    },
    log_signup_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#777',
    },
    log_signup_btn:{
        fontSize:17,
        fontWeight:'bold',
    },
    success: ({ text1, text2 }) => ({
        text1,
        text2,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        text1Style: {
            color: '#00B386',
            fontSize: 16,
            fontWeight: 'bold',
        },
        text2Style: {
            color: '#000',
            fontSize: 14,
        },
        style: {
            width: '90%',
            backgroundColor: '#28a745', 
            borderRadius: 10,
            padding: 10,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
    }),
    error: ({ text1, text2 }) => ({
        text1,
        text2,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        text1Style: {
            color: '#EB5B3C',
            fontSize: 16,
            fontWeight: 'bold',
        },
        text2Style: {
            color: '#000',
            fontSize: 14,
        },
        style: {
            width: '90%',
            backgroundColor: '#dc3545', 
            borderRadius: 10,
            padding: 10,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
    }),
    
    
    // Forget Page
    forget_head: {
        fontSize: 28,
        fontWeight: 600,
        marginBottom: 20,
    },
    forget_label:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:5,
    },
    forget_inputcontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#bababa',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 50, 
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
        overflow: 'hidden', 
    },
    forget_code:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    forget_input: {
        flex: 1, 
        marginLeft: 10,
        fontSize: 18,
        overflow: 'hidden',
    },
    forget_btn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 40
    },
    forget_btn_to: {
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 7,
    },
    forget_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        padding: 5,
    },
    otpcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:10,
    },
    otpInput: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor:'#bababa',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
    },
    forget_btn_psd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5
    },

    // Signup Page
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15,
        marginBottom:10
    },
    paragraph: {
        fontSize: 17,
    },
    checkbox: {
        marginRight:10,
        width: 16, 
        height: 16,
    },
    errortext: {
        color: 'red',
        fontSize: 13,
        position:'relative',
        bottom:15
    },
    signup_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    signup_btn_to: {
        width: 120,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#252525',
        paddingVertical: 10,
    },
    disabledButton: {
        backgroundColor: '#b0b0b0', 
    },
    signup_btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    disabledText: {
        color: '#808080' 
    },
    // UserDetailPage
    userdp_heading:{
        flex:1,
        flexDirection:'column',
        gap:3,
        marginTop:15
    },
    userdp_subhead:{
        fontSize:32,
        fontWeight:600
    },
    age_btn: {
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor:'#FAFAFA',
        marginBottom: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },    
    age_btn_text:{
        fontSize:18,
        fontWeight:600
    },
    propic_upload:{
        alignItems:'center',
        marginTop:20
    },
    propic_circle: {
        borderWidth: 2,
        width: 100,
        height: 100,
        borderRadius: 50, 
        borderColor: "blue",
        justifyContent: "center", 
        alignItems: "center", 
        position:'relative'
    },
    alter_text:{
        fontSize:17,
        fontWeight:700,
        marginTop:40
    },
    avatar:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:5,
        marginTop: 15
    },
    men_avatar:{
        flexDirection: 'row'
    },
    women_avatar:{
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius:50,
        zIndex:-1
    },
    inside_icon:{
        position:'absolute',
        top:'76%',
        left:'70%',
        borderWidth:1,
        width:25,
        height:25,
        borderRadius:50,
        borderColor: "blue",
        backgroundColor:'blue',
        justifyContent: "center", 
        alignItems: "center", 
        borderWidth: 2,
        borderColor: "#fff",
    },

    //  Subscription
    plan: {
        flex:1,
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        zIndex:1,
        position:'relative',
        bottom:20,
    },
    above_text:{
        zIndex:10,
        position:'relative',
    },
    subscription_text:{
        position:'relative',
        bottom:150,
        paddingHorizontal: 30,
        flexDirection:'row',
        gap:7,
        marginBottom:10,
    },
    subscription_main_text:{
        position:'relative',
        bottom:150,
        paddingHorizontal: 30,
    },
    plan_text: {
        fontSize: 16,
        fontWeight:600,
        color:'#fff'
    },
    subscription_icon:{
        position:'relative',
        left:'85%',
        bottom:'330%',
        width:30,
        height:30,
        borderWidth:1,
        borderRadius:50,
        borderColor:'rgba(0,0,0,0.5)',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
    },
    plan_card_view:{
        flexDirection:'row',
        gap:30,
        paddingHorizontal:30,
        paddingVertical:20
    },
    plan_card:{
        borderWidth:2,
        width:150,
        height:200,
        borderRadius:20,
        borderColor:'#bababa',
        alignItems:'center',
    },
    plan_circle:{
        position:'absolute',
        top:'93%',
        left:'41%',
        borderWidth:1,
        width:25,
        height:25,
        borderRadius:50,
        borderColor: "#007AFF",
        backgroundColor:'#007AFF',
        justifyContent: "center", 
        alignItems: "center", 
    },
    subscribe_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:5
    },
    subscribe_btn_to: {
        width: 120,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#252525',
        paddingVertical: 10,
    },
    subscribe_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    subscribe_txt:{
        fontSize:13,
        fontWeight:400,
        textAlign:'center',
        color:'#bababa',
    },

    // PaymentMethod
    payment_container: { 
        flex: 1,
        // backgroundColor: '#f8f8f8',
        backgroundColor: '#fff',
        paddingHorizontal:20,
        paddingVertical:20
    },
    payment_title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign:'center',
        marginBottom: 30 
    },
    payment_option: { 
        padding: 15, 
        width: '100%',
        height:70, 
        backgroundColor: '#f5f5f5', 
        marginBottom: 10, 
        borderRadius: 10, 
        alignItems: 'center',
        justifyContent:'center' 
    },
    payment_inbtn:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    pay_icon_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    pay_txt_container:{
        flex:4,
        marginLeft:50
    },
    payment_text: { 
        fontSize: 22,
        fontWeight:600
    },
    method_selected: { 
        borderColor: '#252525', 
        borderWidth: 2 
    },
    pay_btn_container:{
        alignItems:'center'
    },
    pay_btn: { 
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#252525', 
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius: 10,
        marginTop:30,
    },
    pay_btn_txt: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },

    // PaymentPage
    paycontainer: { 
        flex: 1, 
        backgroundColor: '#fff', 
        paddingHorizontal:20,
        paddingVertical:20
    },
    paytitle: { 
        fontSize: 22, 
        fontWeight: '700', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    detailsbox: { 
        padding: 15, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        marginBottom: 20 
    },
    courseTitle: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#333' 
    },
    courseText: { 
        fontSize: 16, 
        color: '#666' 
    },
    priceText: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#000', 
        marginTop: 5 
    },
    creditText: { 
        fontSize: 16, 
        color: '#007AFF', 
        marginTop: 5 
    },

    // profile
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
        paddingVertical: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#f0f0f0',
    },
    pro_avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editprofile: {
        fontSize: 14,
        color: 'blue',
        marginTop: 5,
    },
    settingitem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingtitle: {
        fontSize: 16,
    },
    logoutbutton: {
        marginTop: 20,
        paddingVertical: 15,
    },
    logouttext: {
        fontSize: 17,
        fontWeight:600,
        color: 'blue',
        textAlign: 'center',
    },
    modalcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalcontent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: 250,
        alignItems: "center",
    },
    modaltitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modaloption: {
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    modaloptiontxt: {
        fontSize: 16,
    },
    modalclosebtn: {
        marginTop: 10,
        padding: 10,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    modalclosebtntxt: {
        fontSize: 16,
        fontWeight: "bold",
    },

    // EditProfile Page
    edit_pro_container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    edit_avatar_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom:50,
        position: 'relative',
    },
    edit_pro_avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    edit_pro_icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'blue',
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    edit_input_container: {
        width: '100%',
        marginTop: 20,
    },
    edit_label: {
        fontSize: 14,
        color: '#bababa',
        fontWeight: "bold",
        marginBottom: 5,
    },
    edit_input: {
        borderBottomWidth: 1,
        borderBottomColor: "blue",
        fontSize: 16,
        paddingVertical: 5,
        width: '100%',
        textAlign: 'left',
    },
    edit_save_btn: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#007AFF",
        textAlign:'center',
        marginTop:50,
    },

    // HomePage
    homepage_body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    home_card: {
        width: 320,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginTop:50,
        marginBottom: 20,
    },
    home_card_image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    home_card_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    home_card_description: {
        fontSize: 14,
        lineHeight:24,
        color: '#666',
        marginBottom: 20,
    },
    card_button: {
        backgroundColor: '#242424',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    card_button_text: {
        color: 'white',
        fontSize: 16,
        fontWeight:600
    },
    home_header:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        position:'relative',
        top:10,
        right:'15%',
    },
    home_credit:{
        flexDirection:'column',
        justifyContent:'center', 
        position:'relative',
        left:'10%',
        top:'10%'   
    },
    home_credit_text: {
        width:45,
        fontSize: 16,
        fontWeight:700,
        textAlign:'center',
        borderWidth:1,
        borderRadius:50,
        borderColor:'#252525',
        backgroundColor:'transparent',
        color:'#252525',
        paddingHorizontal:10,
        paddingVertical:5,  
    },

    // LessonPage
    lessonpage_body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    lesson_pagetitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    lesson_card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    lesson_cardtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    lesson_carddescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    lesson_cardbtn: {
        backgroundColor: '#252525',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    lesson_cardbtntext: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // UserChatPage
    home_body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    chatControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    recordButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    playButtonTop: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop:10
    },
    playButton: {
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    sendButton: {
        backgroundColor: '#252525',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#3498db',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#2ecc71',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: 'white',
        fontSize: 14,
    },
})