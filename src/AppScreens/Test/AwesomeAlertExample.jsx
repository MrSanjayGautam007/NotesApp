import React, { useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Button, Text } from 'react-native';

const AwesomeAlertExample = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor={"transparent"} barStyle={'dark-content'} translucent />
      <Pressable  onPress={() => setShowAlert(true)}>
        <Text>Show Awesome Alert</Text>
      </Pressable>
      {/* <Button title="Show Awesome Alert" onPress={() => setShowAlert(true)} /> */}
      <AwesomeAlert
        show={showAlert}
        title="Awesome Alert"
        message="Stylish and ready to use!"
        closeOnTouchOutside={true}
        showConfirmButton={true}
        confirmText="Got it"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </View>
  );
};

export default AwesomeAlertExample;
