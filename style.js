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
    log_social_media: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position:'relative',
        bottom:30
    },
    social_media: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop:7,
        paddingBottom:7,
        paddingLeft:70,
        paddingRight:70,
    },
    social_media_shadow: {
        borderWidth: 1,
        borderColor: '#bababa',
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: '#fff', 
        shadowColor:'#000000',
        shadowOffset: { width: -2,height: 2,},
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 4,     
    }
})