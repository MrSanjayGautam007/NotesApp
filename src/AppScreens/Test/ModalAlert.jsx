import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalAlert = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <SafeAreaView style={styles.center}>
            <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'} />
            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Text style={styles.button}>Show Modal Alert</Text>
            </TouchableOpacity>
            {/* 🎞️ Animation Options
            ✅ Entry Animations (animationIn):
            "slideInUp" ✅ (default)

            "slideInDown"

            "slideInLeft"

            "slideInRight"

            "zoomIn"

            "zoomInUp"

            "fadeIn"

            "bounceIn"

            "lightSpeedIn"

            ❌ Exit Animations (animationOut):
            "slideOutDown" ✅ (default)

            "slideOutUp"

            "slideOutLeft"

            "slideOutRight"

            "zoomOut"

            "fadeOut"

            "bounceOut"

            "lightSpeedOut" */}


            {/* <Modal isVisible={isVisible}
                animationIn="bounceIn"
                animationOut="zoomOut"
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={200}
                useNativeDriver
                
            >
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Custom Modal Alert</Text>
                    <Text style={{ marginVertical: 10 }}>This alert is fully customizable!</Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={styles.okButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}
            <Modal 
            isVisible={isVisible} 
            animationIn="bounceIn"
            animationOut="zoomOut"
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={200}
            useNativeDriver
            // onBackdropPress={() => setIsVisible(false)}
            customBackdrop={
                <View style={{ flex: 1 }}>
                    <BlurView
                        style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
                        blurType="light"
                        blurAmount={8}
                    />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 }} />
                </View>
            }>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Blur + Fade = 🔥</Text>

                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={styles.okButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* <Modal
                isVisible={isVisible}
                backdropColor="#000"
                backdropOpacity={0.4} 
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={200}
                useNativeDriver// semi-transparent black background
            >
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Faded Background</Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={styles.okButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#6200ee',
        color: '#fff',
        padding: 10,
        borderRadius: 5
    },
    modalBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    okButton: {
        marginTop: 15,
        color: '#6200ee',
        textAlign: 'right'
    },
});

export default ModalAlert;
