import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { Host } from "react-native-portalize";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import { userSelector, updateUserAttributes } from "../store/userSlice";

import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import TagsSelector from "../screens/TagsSelector/TagsSelector";
import TagsSearch from "../screens/TagsSearch/TagsSearch";
import CandidateSelector from "../screens/CandidateSelector/CandidateSelector";
import SendRequestToRepresented from "../screens/SendRequestToRepresented/SendRequestToRepresented";
import SettingsScreen from "../screens/Settings/Settings";
import RepresentedProfile from "../screens/RepresentedProfile/Profile";
import NewPostScreen from "../screens/NewPost/NewPost";
import MultipleImageSelector from "../screens/MultipleImageSelector/MultipleImageSelector";
import RegisterPassword from "../screens/RegisterPassword/RegisterPassword";
import Search from "../screens/Search/Search";
import TabNavigator from "./TabNavigator";

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: "black" },
};

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {
    isSignedIn,
    "cognito:groups": [group],
  } = useSelector(userSelector);

  const dispatch = useDispatch();

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          throw new Error("Failed to get push token for push notification!");
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        dispatch(updateUserAttributes({ "custom:push_token": token }));
      } else {
        throw new Error("not supported device");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      Toast.show({
        text1: "שגיאה",
        text2: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (isSignedIn && group === "represented") {
        registerForPushNotificationsAsync();
      }
    })();
  }, [isSignedIn]);

  return (
    <Host>
      <Stack.Navigator screenOptions={screenOptions}>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              screenOptions={screenOptions}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={RepresentedProfile} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="TagSelector" component={TagsSelector} />
            <Stack.Screen name="TagsSearch" component={TagsSearch} />
            <Stack.Screen
              name="CandidateSelector"
              component={CandidateSelector}
            />
            <Stack.Screen
              name="MultipleImageSelector"
              component={MultipleImageSelector}
            />
            <Stack.Screen
              name="SendRequestToRepresented"
              component={SendRequestToRepresented}
            />
            <Stack.Screen name="Search" component={Search} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              screenOptions={screenOptions}
            />
            <Stack.Screen name="TagsSearch" component={TagsSearch} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="RegisterPassword"
              component={RegisterPassword}
            />
            <Stack.Screen name="Settings" component={Login} />
            <Stack.Screen name="Profile" component={Login} />
            <Stack.Screen name="NewPost" component={Login} />
            <Stack.Screen name="TagSelector" component={Login} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </Host>
  );
};

export default StackNavigator;
