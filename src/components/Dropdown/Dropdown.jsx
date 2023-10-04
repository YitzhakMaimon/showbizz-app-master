import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import { FONT_SIZE, ARIMO_FONT_FAMILY } from "../../constants/styles";

import Text from "../Text/Text";

const sports = [
  {
    label: "דוגמנים",
    value: "דוגמן",
  },
  {
    label: "משחק",
    value: "משחק",
  },
  {
    label: "ביטים",
    value: "ביט",
  },
  {
    label: "ניצבים",
    value: "ניצב",
  },
  {
    label: "ילדים",
    value: "ילדים",
  },
];

const Dropdown = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <DropDownPicker
      open={props.open}
      value={value}
      setValue={setValue}
      onChangeValue={(val) => {
        props.onChange(val);
      }}
      mode="BADGE"
      placeholder="קטגוריות"
      items={sports}
      setOpen={props.setOpen}
      itemSeparator
      multiple
      rtl
      renderBadgeItem={(props) => <Text text={props.label} />}
      ArrowUpIconComponent={() => (
        <AntDesign name="up" size={16} color="white" />
      )}
      ArrowDownIconComponent={() => (
        <AntDesign name="down" size={16} color="white" />
      )}
      TickIconComponent={() => <></>}
      selectedItemLabelStyle={{ color: "black" }}
      selectedItemContainerStyle={{
        backgroundColor: "white",
      }}
      style={{
        backgroundColor: "transparent",
        borderWidth: 0,
        borderBottomColor: props.error ? "#FF8A1F" : "#2f2f2f",
        borderBottomWidth: 1,
        marginTop: 22,
        borderRadius: 0,
        paddingLeft: 0,
      }}
      textStyle={{
        fontSize: FONT_SIZE.NORMAL,
        color: "white",
        fontFamily: ARIMO_FONT_FAMILY,
        textAlign: "right",
      }}
      dropDownContainerStyle={{
        backgroundColor: "#1b1b1b",
        marginTop: 22,
      }}
      itemSeparatorStyle={{
        backgroundColor: "black",
      }}
    />
  );
};

export default Dropdown;
