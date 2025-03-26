import { Text, View, TouchableOpacity, Image } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import {useNavigation} from '@react-navigation/native';
import style from  '../style'



export default function LandingPage() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
      });
  return (
    <View style={style.body}>
        <View style={style.container}>
            <Text style={style.text}>DID YOU KNOW?</Text>
            <Text style={style.maintext}>TalkWise is the only app where you really <Text style={style.subtext}>speak English, anytime.</Text></Text>
        </View>
        <View style={style.land_logo}>
            <Image source={require('../assets/landingimg.png')} style={{width:300,height:270}}/>
        </View>
        <View style={style.land_btn}>
            <TouchableOpacity 
                style={style.land_btn_to} 
                activeOpacity={0.7}
                onPress={() => navigation.navigate('login')}
            >
                <Text style={style.land_btn_text}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
