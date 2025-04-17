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
        fontWeight: 500,
        color:'#4F6CFF'
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
        backgroundColor: '#2D4BDF',
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
    safe_area: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    login_img_container: {
        height: '40%',
        minHeight: 180,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_img: {
        width: '100%',
        height: '100%'
    },
    form_container: {
        flex: 1,
        padding: 24
    },
    header_title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#252525',
        marginBottom: 8
    },
    header_subtitle: {
        fontSize: 16,
        color: '#4F6CFF',
        marginBottom: 25
    },
    input_wrap_container: {
        marginBottom: 16
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 52,
        backgroundColor: '#F9F9F9'
    },
    input_error: {
        borderColor: '#E53935'
    },
    icon: {
        marginRight: 12
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333'
    },
    error_text: {
        color: '#E53935',
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 4
    },
    forgot_psd_btn: {
        alignSelf: 'flex-end',
        marginBottom: 32
    },
    forgot_psd_text: {
        color: '#2D4BDF',
        fontSize: 14,
        fontWeight: '500'
    },
    login_btn: {
        backgroundColor: '#2D4BDF',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32
    },
    login_disabled_btn: {
        backgroundColor: '#A9B4E8',
        opacity: 0.8
    },
    login_btn_text: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '600'
    },
    signup_btn_log: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_btn_text_log: {
        fontSize: 14,
        color: '#666',
        marginRight: 4
    },
    signup_btn_link_log: {
        fontSize: 14,
        color: '#2D4BDF',
        fontWeight: '600'
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

    // // Login Page
    // login_hero_img:{
    //     flex:3,
    //     width:'100%',
    //     height:'100%'
    // },
    // login_signup_head: {
    //     fontSize: 28,
    //     fontWeight: 600,
    //     marginBottom: 20,
    //     textAlign: 'center',
    // },
    // inputcontainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderBottomWidth: 1,
    //     height: 50,
    //     borderColor: '#ccc',
    //     marginBottom: 20,
    //     paddingVertical: 5, 
    // },
    // icon: {
    //     marginRight: 10,
    //     color: '#bababa',
    // },
    // input: {
    //     flex: 1,
    //     fontSize: 16,
    //     color: '#000',
    //     height: '100%', 
    //     textAlignVertical: 'center',
    // },
    // login_error: {
    //     color: 'red',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginTop: 3,
    //     marginBottom:5,
    //     alignSelf: 'center',
    // },
    // log_forget_btn: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     textAlign: 'right',
    //     color: '#252525',
    //     marginBottom: 15,
    // },
    // login_btn: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // login_btn_to: {
    //     width: 120,
    //     borderRadius: 30,
    //     alignItems: 'center',
    //     backgroundColor: '#252525',
    //     paddingVertical: 10,
    // },
    // login_btn_text: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#fff',
    // },
    // log_signup: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     position:'relative',
    //     bottom:40
    // },
    // log_signup_text: {
    //     fontSize: 16,
    //     fontWeight: '500',
    //     color: '#777',
    // },
    // log_signup_btn:{
    //     fontSize:17,
    //     fontWeight:'bold',
    // },
    
    
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
        elevation: 3,
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
    subcription_container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    subcription_containerdark: {
        backgroundColor: '#121212',
    },
    hero_section: {
        overflow: 'hidden',
    },
    hero_image: {
        width: '100%',
        height: '100%',
    },
    hero_overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        padding: 24,
    },
    subcription_backbutton: {
        position: 'absolute',
        top: 24,
        left: 16,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    hero_content: {
        marginBottom: 16,
    },
    hero_tagcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    hero_tag: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    hero_title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '300',
        lineHeight: 32,
    },
    hero_titlebold: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 32,
        marginBottom: 8,
    },
    hero_subtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        opacity: 0.9,
        marginTop: 4,
    },
    plans_section: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingHorizontal: 16,
    },
    plans_sectiondark: {
        backgroundColor: '#1E1E1E',
    },
    scroll_content: {
        paddingTop: 20,
    },
    plan_cardscontainer: {
        paddingBottom: 24,
    },
    plan_cardcontainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        position: 'relative',
    },
    selected_plancard: {
        borderWidth: 2,
        borderColor: '#007AFF',
        backgroundColor: '#F0F8FF',
    },
    // popularBadge: {
    //     position: 'absolute',
    //     top: 0,
    //     right: 16,
    //     backgroundColor: '#FF9500',
    //     paddingHorizontal: 10,
    //     paddingVertical: 4,
    //     borderBottomLeftRadius: 6,
    //     borderBottomRightRadius: 6,
    // },
    // popularText: {
    //     color: '#FFFFFF',
    //     fontSize: 10,
    //     fontWeight: '700',
    // },
    plan_header: {
        marginBottom: 16,
    },
    plan_name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 8,
    },
    price_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    currency_symbol: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        marginTop: 4,
    },
    plan_price: {
        fontSize: 34,
        fontWeight: '700',
        color: '#333333',
    },
    billing_cycle: {
        fontSize: 14,
        color: '#666666',
    },
    divider: {
        height: 1,
        backgroundColor: '#E8E8E8',
        marginVertical: 16,
    },
    features_container: {
        marginTop: 4,
    },
    feature_row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkicon_container: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E6F2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selected_checkicon: {
        backgroundColor: '#007AFF',
    },
    feature_text: {
        fontSize: 15,
        color: '#555555',
    },
    credits_text: {
        fontSize: 15,
        color: '#007AFF',
        fontWeight: '600',
        marginTop: 8,
    },
    selection_indicator: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscribe_container: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        backgroundColor: '#F8F9FA',
    },
    subscribe_button: {
        backgroundColor: '#2D4BDF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    free_button: {
        backgroundColor: '#2D4BDF',
    },
    subscribe_buttontext: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    terms_container: {
        alignItems: 'center',
    },
    terms_text: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 2,
    },

    // PaymentMethod
    paymethod_container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    paymethod_summarycard: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    paymethod_plandetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    paymethod_planname: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    amount_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    paymethod_currencysymbol: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 3,
    },
    paymethod_amounttext: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    benefits_container: {
        marginTop: 4,
    },
    benefit_row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
    },
    benefit_text: {
        fontSize: 14,
        color: '#666',
    },
    paymethod_section_title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
    },
    paymethod_methodscontainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    paymethod_methodcard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedmethodcard: {
        borderColor: '#4a4aff',
        borderWidth: 2,
        backgroundColor: '#f8f8ff',
    },
    disabledmethodcard: {
        opacity: 0.7,
    },
    methodcontent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodiconcontainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    selectedmethodiconcontainer: {
        backgroundColor: '#e6e6ff',
    },
    payment_logo: {
        width: 30,
        height: 30,
    },
    methodtextcontainer: {
        flex: 1,
    },
    methodtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    methodsubtitle: {
        fontSize: 13,
        color: '#666',
    },
    paymentunavailable: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
    },
    paymentunavailabletext: {
        fontSize: 10,
        color: '#999',
        fontWeight: '500',
    },
    securitynotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    securitytext: {
        fontSize: 13,
        color: '#666',
        marginLeft: 6,
    },
    button_container: {
        padding: 16,
        paddingBottom: 16,
    },
    proceed_button: {
        backgroundColor: '#4a4aff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    disabled_button: {
        backgroundColor: '#cccccc',
    },
    proceedbuttontext: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },

    // PaymentPage
    payment_mainpaycon:{
        flex: 1, 
        backgroundColor: '#F7F7F7',
        padding: 10
    },
    payment_detailscart: {
        backgroundColor: '#f5f5f5',
        borderRadius: 14,
        padding: 18,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    payment_sectitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    payment_detaillabel: {
        fontSize: 16,
        color: '#888',
        marginTop: 10,
    },
    payment_detailvalue: {
        fontSize: 18,
        fontWeight: '500',
        color: '#111',
    },
    payment_detailtext: {
        fontSize: 16,
        color: '#444',
        marginBottom: 6,
    },
    payment_button: {
        backgroundColor: '#252525',
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius: 12,
        alignItems: 'center',
    },
    payment_buttontext: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },


    // profile
    profile_safearea: {
        flex: 1,
        paddingVertical: 30,
    },
    profile_container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
    },
    profile_header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
    },
    profile_image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profile_img_placeholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
    profile_info: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    profile_name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    edit_button: {
        marginTop: 4,
    },
    edit_button_text: {
        color: '#007AFF',
        fontSize: 16,
    },
    settings_container: {
        flex: 1,
        paddingBottom: 24,
    },
    settings_section: {
        marginBottom: 24,
    },
    section_header: {
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 16,
        marginBottom: 8,
    },
    section_content: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    setting_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 44,
    },
    setting_item_left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    setting_title: {
        fontSize: 17,
    },
    setting_item_right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    setting_value: {
        fontSize: 17,
        color: '#8E8E93',
        marginRight: 8,
    },
    logout_button: {
        marginTop: 8,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
    },
    logout_text: {
        color: '#FF3B30',
        fontSize: 17,
        fontWeight: '500',
    },
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingTop: 16,
        paddingBottom: 34,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalListContainer: {
        paddingHorizontal: 16,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    modalItemText: {
        fontSize: 17,
    },
    selectedItem: {
        backgroundColor: 'rgba(0, 122, 255, 0.08)',
    },
    selectedItemText: {
        fontWeight: '500',
        color: '#007AFF',
    },
    cancelButton: {
        marginTop: 16,
        paddingVertical: 14,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#C6C6C8',
    },
    cancelButtonText: {
        color: '#007AFF',
        fontSize: 17,
        fontWeight: '600',
    },

    //SupportPage
    support_safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    support_container: {
        flex: 1,
        padding: 20,
    },
    support_loadingcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    support_loadingtext: {
        marginTop: 12,
        fontSize: 16,
        color: '#555',
      },
    support_header: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    support_title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#252525',
        marginBottom: 8,
    },
    support_subtitle: {
        fontSize: 16,
        color: '#666',
    },
    support_section: {
        marginBottom: 30,
    },
    support_section_title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#252525',
        marginBottom: 16,
    },
    support_faqitem: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
      },
    support_faqheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    support_question: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        paddingRight: 10,
    },
    support_answer: {
        fontSize: 15,
        color: '#555',
        padding: 16,
        paddingTop: 0,
        lineHeight: 22,
        marginTop:10
    },
    support_nofaqs: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 20,
    },
    support_formsection: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
    },
    support_inputgroup: {
        marginBottom: 16,
    },
    support_label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    support_input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    support_disabledinput: {
        backgroundColor: '#f0f0f0',
        color: '#666',
    },
    support_messageinput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 150,
        fontSize: 16,
    },
    support_button: {
        backgroundColor: '#2D4BDF',
        padding: 16,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    support_buttontext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    support_contactinfo: {
        marginBottom: 40,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
    },
    support_contacttitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    support_contactitem: {
        fontSize: 15,
        color: '#555',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // TicketPage
    ticket_safearea: {
        flex: 1,
    },
    ticket_container: {
        flex: 1,
        padding: 16,
    },
    ticket_headertop: {
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    ticket_headingtop: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    ticket_subheadingtop: {
        fontSize: 16,
        fontWeight: '400',
    },
    ticket_loadingcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticket_loadingtext: {
        marginTop: 16,
        fontSize: 16,
    },
    ticket_listcontainer: {
        paddingBottom: 24,
        flexGrow: 1,
    },
    ticket_cardcontainer: {
        marginBottom: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    ticket_Card: {
        padding: 16,
        borderRadius: 12,
    },
    ticket_expandedcard: {
        shadowOpacity: 0.2,
        shadowRadius: 5.84,
        elevation: 7,
    },
    ticket_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    ticket_title_container: {
        flex: 1,
        paddingRight: 12,
    },
    ticket_id: {
        fontSize: 14,
        marginBottom: 4,
    },
    ticket_subject: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
    },
    ticket_headerright: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    ticket_statusbadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
    },
    ticket_statusdot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    ticket_statustext: {
        fontSize: 13,
        fontWeight: '600',
    },
    ticket_details: {
        marginTop: 10,
    },
    ticket_detaildivider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginBottom: 16,
        marginTop: 6,
        opacity: 0.5,
    },
    ticket_detailitem: {
        marginBottom: 16,
    },
    ticket_detaillabel: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: '500',
    },
    ticket_detailvalue: {
        fontSize: 15,
        lineHeight: 22,
    },
    ticket_responsebubble: {
        padding: 12,
        borderRadius: 8,
    },
    ticket_responsetext: {
        fontSize: 15,
        lineHeight: 22,
    },
    emptycontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 60,
    },
    emptytext: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
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
        borderBottomColor: "#3399ff",
        fontSize: 16,
        paddingVertical: 5,
        width: '100%',
        textAlign: 'left',
    },
    edit_save_btn: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: '#3399ff',
        textAlign:'center',
        marginTop:50,
    },
    age_modal_btn:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    age_modal_container:{
        borderRadius: 10,
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5
    },
    age_modal_inside_btn:{
        paddingVertical: 12,
        borderBottomColor: '#ccc',
    },
    age_modal_txt:{
        fontSize: 16,
        textAlign: 'center'
    },
    age_modal_cancel_btn:{
        marginTop: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    age_modal_cancel_txt:{
        fontSize: 16,
        color: '#3399ff',
        textAlign: 'center',
        fontWeight: '600'
    },
    level_modal_btn:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    level_modal_container:{
        borderRadius: 10,
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5
    },
    level_modal_inside_btn:{
        paddingVertical: 12,
        borderBottomColor: '#ccc',
    },
    level_modal_txt:{
        fontSize: 16,
        textAlign: 'center'
    },
    level_modal_cancel_btn:{
        marginTop: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    level_modal_cancel_txt:{
        fontSize: 16,
        color: '#3399ff',
        textAlign: 'center',
        fontWeight: '600'
    },

    // HomePage
    homepage_body: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingVertical:20,
    },
    home_header_container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 10,
    },
    logo_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:10,
        paddingVertical:15
    },
    logo_icon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    logo_text: {
        width: 100,
        height: 40,
    },
    stats_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 4,
    },
    stat_card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
        width: '31%',
    },
    stat_value: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginTop: 4,
    },
    stat_label: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    welcome_banner: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    welcome_content: {
        flex: 1,
    },
    welcome_title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    welcome_subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    welcome_image: {
        width: 50,
        height: 50,
    },
    section_title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 12,
    },
    course_list: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    course_card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    course_image: {
        width: '100%',
        height: 140,
    },
      course_content: {
        padding: 16,
    },
    course_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    course_title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    level_badge: {
        backgroundColor: '#EFF6FF',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    level_text: {
        fontSize: 12,
        fontWeight: '500',
        color: '#3B82F6',
    },
    course_description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
        marginBottom: 16,
    },
    course_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lessons_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessons_text: {
        fontSize: 13,
        color: '#6B7280',
        marginLeft: 6,
    },
    start_button: {
        backgroundColor: '#2D4BDF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    start_button_text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },

    //CommunicationLevel
    comlevel_container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingVertical:20
    },
    comlevel_header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    comlevel_backbutton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comlevel_headertitlecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    comlevel_headertitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    comlevel_content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    comlevel_question: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 24,
        textAlign: 'center',
    },
    levelselection: {
        marginBottom: 30,
    },
    leveloption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedlevel: {
        borderColor: '#4F46E5',
        borderWidth: 2,
    },
    levelindicator: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    levelnumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4B5563',
    },
    leveltextcontainer: {
        flex: 1,
    },
    leveltitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    leveldescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    checkicon: {
        marginLeft: 8,
    },
    comnextbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D4BDF',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 'auto',
        marginBottom: 20,
    },
    comnextbuttontext: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    comdisabledbutton: {
        opacity: 0.6,
    },
    

    // LessonPage
    lesson_container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingVertical:20
    },
    lesson_centercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    lesson_header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    lesson_backbutton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lesson_headertitlecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    lesson_headertitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    listContainer: {
        padding: 16,
    },
    lesson_card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    lesson_header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    lesson_level: {
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3B82F6',
        marginRight: 8,
    },
    lesson_title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        flex: 1,
    },
    lesson_description: {
        fontSize: 15,
        color: '#757575',
        marginBottom: 16,
        lineHeight: 22,
    },
    lesson_startbutton: {
        backgroundColor: '#4F46E5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lesson_buttontext: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginRight: 8,
    },
    lesson_emptycontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    lesson_emptytext: {
        marginTop: 16,
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#757575',
    },
    lesson_errortext: {
        marginTop: 16,
        fontSize: 16,
        color: '#F44336',
        textAlign: 'center',
        marginBottom: 24,
    },
    lesson_retrybutton: {
        backgroundColor: '#F44336',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    lesson_retrytext: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    //QuizPage
    quiz_container: {
        flex: 1,
    },
    quiz_scrollcontent: {
        flexGrow: 1,
        padding: 20,
    },
    quiz_loadingcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quiz_loadingtext: {
        marginTop: 16,
        fontSize: 16,
    },
    quiz_emptycontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    quiz_emptytext: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    quiz_retrybutton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#4a4aff',
        borderRadius: 8,
    },
    quiz_retrybuttontext: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    quiz_header: {
        marginBottom: 24,
    },
    quiz_headertitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    quiz_progresscontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    quiz_progresstext: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    quiz_content: {
        flex: 1,
    },
    quiz_questioncard: {
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 24,
    },
    quiz_questiontext: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
        lineHeight: 26,
    },
    quiz_optionscontainer: {
        marginTop: 8,
    },
    quiz_optionbutton: {
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    quiz_optioncontent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    quiz_optionindicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 12,
    },
    quiz_optiontext: {
        fontSize: 16,
        flex: 1,
    },
    quiz_submitbutton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    quiz_submittuttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quiz_resultscontainer: {
        flex: 1,
    },
    quiz_scorecardcontainer: {
        marginBottom: 24,
    },
    quiz_scorecard: {
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    quiz_feedbacktext: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    quiz_scorecirclecontainer: {
        marginVertical: 16,
      },
      quiz_scorecircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quiz_scorepercentage: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    quiz_scoretext: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
    },
    quiz_answerscontainer: {
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 24,
    },
    quiz_answerstitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    quiz_answeritem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    quiz_answerquestion: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    quiz_answerdetails: {
        flexDirection: 'row',
        marginTop: 4,
    },
    quiz_answerlabel: {
        fontSize: 14,
        marginRight: 8,
        width: 100,
    },
    quiz_answervalue: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },
    quiz_buttonscontainer: {
        marginTop: 8,
    },
    quiz_primarybutton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 12,
    },
    quiz_primarybuttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quiz_secondarybutton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
    },
    quiz_secondarybuttontext: {
        fontWeight: '600',
        fontSize: 16,
    },
    quiz_outlinebutton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
    },
    quiz_outlinebuttontext: {
        fontWeight: '600',
        fontSize: 16,
    },
   
})