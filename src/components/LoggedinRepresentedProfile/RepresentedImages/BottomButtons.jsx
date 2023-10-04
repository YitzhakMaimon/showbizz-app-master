import React from "react";
import { View } from "react-native";

import LargeRoundedButton from "../../Buttons/LargeRounded";

const BottomButtons = ({ closeMenu, deletePicture, replacePicture }) => (
  <View
    style={{
      backgroundColor: "#1B1B1B",
      paddingRight: "2%",
      paddingLeft: "2%",
      height: 300,
    }}
  >
    <LargeRoundedButton
      text="מחק תמונה"
      dark
      onPress={deletePicture}
      styles={{
        borderRadius: 14,
        backgroundColor: "#232323",
        borderWidth: 0,
        height: 56,
        marginTop: 4,
      }}
    />
    <LargeRoundedButton
      text="החלף תמונה"
      dark
      onPress={replacePicture}
      styles={{
        borderRadius: 14,
        backgroundColor: "#232323",
        borderWidth: 0,
        height: 56,
        marginTop: 4,
      }}
    />
    <LargeRoundedButton
      text="ביטול"
      dark
      onPress={closeMenu}
      styles={{
        borderRadius: 14,
        backgroundColor: "#232323",
        borderWidth: 0,
        height: 56,
        marginTop: 8,
      }}
      textStyles={{ color: "#AEAEAE", fontWeight: "bold" }}
    />
  </View>
);

export default BottomButtons;
