import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import { ARIMO_BOLD_FONT_FAMILY } from "../../constants/styles";

const Title = ({ titleText }) => {
  return (
    <Text h3 style={styles.text}>
      {titleText}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  text: {
    textAlign: "right",
    fontFamily: ARIMO_BOLD_FONT_FAMILY,
    color: "white",
    paddingRight: "5%",
    marginTop: 33,
  },
});
