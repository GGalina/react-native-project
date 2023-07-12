import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {View, StyleSheet, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import background from './assets/images/background.jpg';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen';
import { HomeScreen } from './Screens/Home';
import { PostsScreen } from './Screens/PostsScreen';
import { CreatePostsScreen } from './Screens/CreatePostsScreen';

const MainStack = createStackNavigator();

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

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <NavigationContainer theme={navTheme}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <MainStack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
              <MainStack.Screen name="Registration" component={RegistrationScreen} />
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Home" component={HomeScreen} />
              <MainStack.Screen name="Posts" component={PostsScreen} />
              <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
            </MainStack.Navigator>
          </View>
        </TouchableWithoutFeedback>
      </NavigationContainer>
    </ImageBackground>
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