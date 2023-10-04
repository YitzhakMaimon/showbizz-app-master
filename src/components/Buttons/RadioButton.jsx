import React from "react";
import { View, Pressable, Text } from "react-native";
import { FONT_SIZE,ARIMO_FONT_FAMILY } from "../../constants/styles";

const RadioButton = (props) => (
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Text
      style={{
        marginRight: 10,
        fontFamily: ARIMO_FONT_FAMILY,
        fontSize: FONT_SIZE.NORMAL,
        color: "white",
      }}
    >
      {props.text}
    </Text>
    <Pressable
      style={[
        {
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#FFFFFF",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      {props.selected ? (
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 12,
            backgroundColor: "#AEAEAE",
          }}
        />
      ) : null}
    </Pressable>
  </View>
);

export default RadioButton;
