import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NoteScreen from './src/AppScreens/Screens/NotesScreen'

const App = () => {
  return (
    <SafeAreaProvider>
      <NoteScreen/>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})