import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ImageComp = ({ color }) => {
    console.log('Color prop value :', color);
    return (

        <SafeAreaView style={styles.mainView} >

            <Image source={{ uri: "https://img.freepik.com/premium-vector/notes-icon-logo-vector-design-template_827767-4987.jpg?w=1380" }}
                resizeMode='cover'

                style={{
                    height: 200,
                    width: 200,
                    marginTop: 30,
                }} />

            <Text style={[styles.text, { color: color ? '#fff' : '#000' }]}>
                Start adding your notes
            </Text>



        </SafeAreaView>
    )
}

export default ImageComp

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        // justifyContent:"center",
        alignItems: "center",


    },
    text: {
        fontSize: 20,
        margin: 30,
        fontWeight: "500",
        textAlign: "center",

    }
})