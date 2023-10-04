import React, { useState } from "react";
import { View, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import { FONT_SIZE, ARIMO_FONT_FAMILY } from "../../constants/styles";
import { MALE_CATEGORIES } from "../../constants/categories";

import Text from "../Text/Text";

const DropdownWithDescription = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        zIndex: 3,
      }}
    >
      <DropDownPicker
        open={open}
        value={value}
        setValue={setValue}
        onChangeValue={(val) => {
          props.onChange(val);
        }}
        mode="BADGE"
        placeholder=""
        items={props.categories}
        setOpen={setOpen}
        itemSeparator
        multiple
        dropDownDirection="BOTTOM"
        rtl
        renderBadgeItem={(props) => <Text text={props.label} />}
        containerStyle={{
          width: "70%",
          height: 50,
        }}
        ArrowUpIconComponent={() => (
          <AntDesign
            name="up"
            size={16}
            color="white"
            style={{ alignSelf: "center" }}
          />
        )}
        ArrowDownIconComponent={() => (
          <AntDesign
            name="down"
            size={16}
            color="white"
            style={{ alignSelf: "center" }}
          />
        )}
        showTickIcon={false}
        arrowIconContainerStyle={{
          display: "flex",
          alignSelf: "center",
        }}
        style={{
          backgroundColor: "transparent",
          borderWidth: 0,
          borderBottomColor: props.error ? "#FF8A1F" : "#2f2f2f",
          borderBottomWidth: 1,
          borderRadius: 0,
          height: 50,
          paddingLeft: 0,
        }}
        textStyle={{
          fontSize: FONT_SIZE.NORMAL,
          color: "white",
          fontFamily: ARIMO_FONT_FAMILY,
          textAlign: "right",
        }}
        selectedItemLabelStyle={{ color: "black" }}
        selectedItemContainerStyle={{
          backgroundColor: "white",
        }}
        dropDownContainerStyle={{
          backgroundColor: "#1b1b1b",
          top: Platform.OS === "web" ? 50 : 49,
        }}
        itemSeparatorStyle={{
          backgroundColor: "black",
        }}
      />
      <Text text="קטגוריות" style={{ textAlign: "right", width: "20%" }} />
    </View>
  );
};

DropdownWithDescription.defaultProps = {
  categories: MALE_CATEGORIES,
};

export default DropdownWithDescription;
