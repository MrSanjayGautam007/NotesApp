import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerUser } from '../../services/auth';
const SignUpScreen = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)
    // const openTwitter = ()=>{
    //     navigation.navigate("Twitter");
    // }
    const handleRegister = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please Enter Email & Password');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password didnt Match');
            return;
        }
        setLoading(true)
        try {
            await registerUser(email, password);
            Alert.alert('Success', 'A varification email has been sent to your email address');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // navigation.navigate('LoginScreen')
        } catch (error) {
            Alert.alert('Error registering user:', error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={[styles.container, { width, height }]}>
            <TouchableOpacity
                style={styles.helloContainer}
                onPress={() => navigation.goBack()}>
                <Ionicons name={"chevron-back"} size={24} color="black" style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.centerView}>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.createAccountText}>Create your account</Text>
                </View>
                {/* <View style={styles.inputContainer}>
                    <FontAwesome name={"user"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput placeholder='Username' style={styles.textInput} />

                </View> */}
                <View style={styles.inputContainer}>
                    <Entypo name={"mail"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput placeholder='E-mail'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput} />

                </View>
                {/* <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mobile"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput placeholder='Mobile' style={styles.textInput} secureTextEntry={true} />

                </View> */}
                <View style={styles.inputContainer}>
                    <Fontisto name={"locked"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput} secureTextEntry={true} />

                </View>
                <View style={styles.inputContainer}>
                    <Fontisto name={"locked"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput placeholder='Confirm Password'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.textInput} secureTextEntry={true} />

                </View>

                <TouchableOpacity 
                onPress={handleRegister}
                style={styles.signInBtnContainer}>
                    {
                        loading ? (<ActivityIndicator size={20} color={'#fff'} />) : (<Text style={styles.singInText}>Sign Up</Text>)
                    }

                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.footerText}>Already have an account? Login</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        // alignItems: 'center',
        // justifyContent:'center'
    },
    topImageContainer: {

    },
    topImage: {
        width: "100%",
        height: 130,
    },
    helloContainer: {

        height: 50,
        width: 50,
        borderColor: "red",
        borderWidth: 0.6,
        borderRadius: 40,
        marginLeft: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    backIcon: {
        // paddingTop:10,
        // marginTop:10,
        //  paddingBottom: 20,

    },
    createAccountText: {

        textAlign: "center",
        fontSize: 30,

        marginBottom: 30,
        fontWeight: "bold"
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
        marginTop: 80,
    },
    centerView: {
        alignItems: "center"
    }

})