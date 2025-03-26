import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    // Landing Page
    body: {
        flex: 1, 
        backgroundColor:"#fff",
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'Poppins_400Regular'
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
    login_head: {
        fontSize: 28,
        fontWeight: 600,
        marginBottom: 20,
    },
    input_label: {
        fontSize: 18,
        marginTop: 9
    },
    input_ph: {
        fontSize: 18,
    },
    input_otp: {
        marginTop: 14,
        marginLeft: 100
    },
    login_form_grp: {
        marginTop:10,
        marginBottom: 20
    },
    log_signup:{
        fontSize: 16,
        lineHeight:24,
        color: '#bababa',
        marginTop:30
    },
    log_signup_btn:{
        fontSize: 16,
        lineHeight:24,
        fontWeight: 'bold'
    },
    login_btn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 25
    },
    login_btn_to: {
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 7,
    },
    login_btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        padding: 5,
    },
    log_signup:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        position:'relative',
        bottom:50
    },
    log_signup_text:{
      fontSize:16,
      fontWeight:535,
    },
    forget_label:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:5,
    },
    forget_input: {
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
    otp_text: {
        position:'relative',
        top:13,
        left:80,
        fontWeight:'bold',
        color:'#bababa'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:10,
    },
    otpInput: {
        width: 40,
        height: 50,
        borderWidth: 1,
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
})