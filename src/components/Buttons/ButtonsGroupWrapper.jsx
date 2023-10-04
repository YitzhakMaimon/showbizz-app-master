import React from "react";
import { ButtonGroup } from "react-native-elements";

import { FONT_SIZE, ARIMO_FONT_FAMILY } from "../../constants/styles";

const buttons = ["לקוח/ה", "מיוצג/ת"];

const ButtonsGroupWrapper = ({ isClient, setIsClient, style }) => (
  <ButtonGroup
    buttons={buttons}
    containerStyle={{ height: 100 }}
    selectedIndex={isClient}
    onPress={(selectedIndex) => setIsClient(selectedIndex)}
    containerStyle={{
      height: 34,
      backgroundColor: "transparent",
      borderColor: "transparent",
      marginVertical: 0,
      marginHorizontal: 0,
      ...style,
    }}
    buttonStyle={{
      backgroundColor: "transparent",
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 2,
    }}
    textStyle={{
      color: "white",
      fontSize: FONT_SIZE.SMALL,
      fontFamily: ARIMO_FONT_FAMILY,
    }}
    selectedTextStyle={{
      color: "black",
      fontSize: FONT_SIZE.SMALL,
      fontFamily: ARIMO_FONT_FAMILY,
    }}
    selectedButtonStyle={{
      backgroundColor: "white",
      borderRadius: 2,
    }}
    innerBorderStyle={{ width: 30, color: "transparent" }}
  />
);

export default ButtonsGroupWrapper;
