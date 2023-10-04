import React from "react";
import { Text } from "react-native";
import { ARIMO_FONT_FAMILY, FONT_SIZE } from "../../constants/styles";

const TextWrapper = ({ style, text }) => {
  return (
    <Text
      style={[
        {
          fontFamily: ARIMO_FONT_FAMILY,
          fontSize: FONT_SIZE.NORMAL,
          color: "white",
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default TextWrapper;
