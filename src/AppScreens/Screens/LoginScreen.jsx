import { ActivityIndicator, Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../../services/auth';
const LoginScreen = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill all Fields');
          
            return;
        }
        setLoading(true)
        try {
            const { emailVerified } = await loginUser(email, password);
            if (emailVerified) {
                Alert.alert('Success', 'You are logged in')
                setEmail('');
                setPassword('');
            }
            else {
                Alert.alert('Error', 'Email is not Verfied')
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
            // setEmail('');
            // setPassword('');
        } finally {
            setLoading(false)
        }

    }

    return (
        <SafeAreaView style={[styles.container, { height, width }]}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Welcome</Text>
            </View>
            {/* <View>
                <Text style={styles.signInText}>Login to your account</Text>
            </View> */}
            <View style={styles.inputContainer}>
                <FontAwesome name={"user"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={"black"}
                    style={styles.textInput} />
            </View>
            <View style={styles.inputContainer}>
                <Fontisto name={"locked"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={"black"}
                    style={styles.textInput} secureTextEntry={true} />

            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}
                style={styles.forgetView}>
                <Text style={styles.textForgot}>Forgot your Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.signInBtnContainer}>
                {
                    loading ? (<ActivityIndicator size={20} color={'#fff'} />) : (<Text style={styles.singInText}>Login</Text>)
                }

            </TouchableOpacity>
                
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.footerText}>Dont have an account? <Text style={styles.createText}>Create</Text></Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    topImageContainer: {

    },
    topImage: {
        width: "100%",
        height: 130,
    },
    helloContainer: {
        // borderWidth: 1,
    },
    helloText: {

        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold"
    },
    signInText: {

        textAlign: "center",
        fontSize: 18,
        // color:""
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        color: "red",
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 20,
        alignItems: "center",
        height: 50,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    inputIcon: {
        marginLeft: 14,
    },
    forgetView: {
        width: "80%",
    },
    textForgot: {
        textAlign: "right",
        color: "black",
        // marginRight:20,
        fontSize: 15,
    },
    signInBtnContainer: {

        marginTop: 30,
        width: "50%",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: "#7a7ce5",
        height: 40,

    },

    singInText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    linearGradient: {
        height: 34,
        width: 56,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    footerText: {
        color: "black",
        textAlign: "center",
        fontSize: 18,
        marginTop: 120,
    },
    createText: {
        textDecorationLine: "underline"
    },
    leftVectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,

    },
    leftVectorImage: {
        height: 250,
        width: 100,
    }
})