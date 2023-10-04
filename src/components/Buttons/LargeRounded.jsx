import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { FONT_SIZE, ARIMO_FONT_FAMILY } from "../../constants/styles";

const LargeRounded = ({
  text,
  isLoading,
  dark,
  onPress,
  small,
  styles,
  textStyles,
  disabled = false,
}) => (
  <Button
    title={text}
    loading={isLoading}
    buttonStyle={[buttonStyles(dark, small).button, styles]}
    titleStyle={[buttonStyles(dark, small).title, textStyles]}
    onPress={onPress}
    loadingProps={{ color: dark ? "white" : "black" }}
    disabled={disabled}
  />
);

LargeRounded.defaultProps = {
  dark: false,
  small: false,
  isLoading: false,
  text: "",
};

const buttonStyles = (dark, small) =>
  StyleSheet.create({
    button: {
      height: small ? 34 : 54,
      borderRadius: small ? 2 : 5,
      backgroundColor: dark ? "black" : "white",
      borderWidth: 1,
      borderColor: !dark ? "black" : "white",
    },
    title: {
      fontSize: FONT_SIZE.SMALLER,
      lineHeight: FONT_SIZE.SMALLER,
      color: !dark ? "black" : "white",
      fontFamily: ARIMO_FONT_FAMILY,
    },
  });

export default LargeRounded;
