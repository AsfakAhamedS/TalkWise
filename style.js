import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    // Landing Page
    body: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 40,
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
        padding: 3,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
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
    signup_btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
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
        flexDirection:'column',
        gap:10,
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
        padding:30,
    },
    plan_card:{
        borderWidth:2,
        width:150,
        height:200,
        borderRadius:20,
        borderColor:'#bababa',
        alignItems:'center'
    },
})