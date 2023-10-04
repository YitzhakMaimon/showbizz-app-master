import React from "react";
import { Provider } from "react-redux";
import { I18nManager, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Amplify from "aws-amplify";
import Toast from "react-native-toast-message";
import "react-native-get-random-values";

import awsconfig from "./src/aws-exports";
import { tryToLogin } from "./src/store/userSlice";
import { fetchRepresented } from "./src/store/representedSlice";
import { fetchStar } from "./src/store/starOfTheMonthSlice";
import { fetchPosts } from "./src/store/postsSlice";

import store from "./src/store";
import StackNavigator from "./src/navigations/StackNavigator";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

Amplify.configure(awsconfig);
store.dispatch(tryToLogin());
store.dispatch(fetchRepresented());
store.dispatch(fetchStar());
store.dispatch(fetchPosts());

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [fontsLoaded] = useFonts({
    Arimo: require("./assets/fonts/Arimo-Regular.ttf"),
    "Arimo-Bold": require("./assets/fonts/Arimo-Bold.ttf"),
    "Arimo-Italic": require("./assets/fonts/Arimo-Italic.ttf"),
  });

  return fontsLoaded ? (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <StackNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  ) : (
    <AppLoading />
  );
}

export default App;
