import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Dialog, PaperProvider, Paragraph, Portal } from 'react-native-paper';

const PaperAlert = () => {
    const [visible, setVisible] = useState(false);
    return (
        <PaperProvider>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => setVisible(true)}>Show Dialog</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                        <Dialog.Title>Modern Alert Using Paper</Dialog.Title>
                        <Dialog.Content >
                            <Paragraph>This is a material-style alert dialog.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setVisible(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        </PaperProvider>
    )
}

export default PaperAlert

const styles = StyleSheet.create({})