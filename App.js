import { useFonts } from 'expo-font';
import {View, StyleSheet, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import background from './assets/images/background.jpg';
//import { RegistrationScreen } from './Screens/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {/* <RegistrationScreen /> */}
          <LoginScreen/>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  background: {
    flex: 1,
  },
});