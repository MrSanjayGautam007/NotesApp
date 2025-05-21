import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from './Screens/NotesScreen';
import UserProfile from './Screens/UserProfile';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ForgetPassword from './Screens/ForgetPassword';

const Stack = createNativeStackNavigator();

const AppNavigatior = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
              
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name='UserProfile' component={UserProfile} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='ForgetPassword'  component={ForgetPassword}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigatior

const styles = StyleSheet.create({})