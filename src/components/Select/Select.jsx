import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FONT_SIZE } from "../../constants/styles";

import Text from "../Text/Text";

const Select = (props) => (
  <View
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <Picker
      style={[styles.twoPickers]}
      itemStyle={styles.twoPickerItems}
      {...props}
    >
      {props.options.map((x) => (
        <Picker.Item label={x} value={x} key={x} />
      ))}
    </Picker>
    <Text text={props.text} style={{ textAlign: "right", width: "20%" }} />
  </View>
);

const styles = StyleSheet.create({
  twoPickers: {
    width: "70%",
    height: Platform.OS === "web" ? 40 : 80,
    backgroundColor: "#1b1b1b",
    borderWidth: 0,
    borderBottomWidth: Platform.OS === "web" ? 1 : 0,
    borderBottomColor: "#2f2f2f",
    color: "white",
  },
  twoPickerItems: {
    height: Platform.OS === "web" ? 40 : 80,
    color: "white",
    fontSize: FONT_SIZE.SMALLER,
    marginLeft: "-3%",
    width: "106%",
  },
});

export default Select;
