import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Host } from "react-native-portalize";
import { useSelector } from "react-redux";
import { Dimensions, Platform } from "react-native";
import { userSelector } from "../store/userSlice";
import imagesBaseUrl from "../constants/imagesBaseUrl";

import PostsScreen from "../screens/Posts/Posts";
import HomeScreen from "../screens/Home/Home";
import UserProfile from "../screens/UserProfile/UserProfile";
import Image from "../components/Image/Image";

const Tab = createBottomTabNavigator();

const homeSelectedIcon = require("../../assets/home-selected.png");
const homeIcon = require("../../assets/home.png");

const iconsSize = Dimensions.get("window").height * 0.0265;
const TabNavigator = () => {
  const { isSignedIn, picture } = useSelector(userSelector);
  return (
    <Host>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#FF8A1F",
          inactiveTintColor: "white",
          showLabel: false,
          style: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderTopWidth: 0,
            backgroundColor: "#171717",
            shadowColor: "rgba(69, 69, 69, 1)",
            shadowOpacity: 0.4,
            shadowRadius: 15,
            shadowOffset: {
              height: 1,
              width: 1,
            },
            position: "absolute",
            height: Dimensions.get("window").height * 0.097,
          },
          tabStyle: {
            justifyContent: "center",
            height:
              Platform.OS === "ios"
                ? Dimensions.get("window").height * 0.06
                : Dimensions.get("window").height * 0.096,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Image
                uri={focused ? homeSelectedIcon : homeIcon}
                style={{
                  height: iconsSize,
                  width: iconsSize,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Feather name="message-square" size={iconsSize} color={color} />
            ),
          }}
        />
        {isSignedIn && (
          <Tab.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <Image
                  uri={{ uri: imagesBaseUrl + picture }}
                  style={{
                    height: iconsSize,
                    width: iconsSize,
                    borderRadius: 50,
                    borderWidth: focused ? 1 : 0,
                    borderColor: "#FF8A1F",
                  }}
                  placeholder={
                    <FontAwesome
                      name="user-circle-o"
                      size={Platform.OS === "ios" ? 20 : 14}
                      color="black"
                    />
                  }
                />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </Host>
  );
};

export default TabNavigator;
