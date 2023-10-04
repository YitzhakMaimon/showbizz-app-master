import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyledInput } from "./Input.styles";

const StyledInputa = React.forwardRef((props, ref) => {
  const [isSecureTextHidden, setIsSecureTextHidden] = useState(true);
  return (
    <View>
      <StyledInput
        ref={props.innerRef}
        {...props}
        placeholderTextColor="white"
        autoCapitalize="none"
        withoutDescription
        secureTextEntry={props.secureTextEntry && isSecureTextHidden}
      />
      {props.secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecureTextHidden(!isSecureTextHidden)}
        >
          <Ionicons
            name={
              isSecureTextHidden ? "ios-eye-off-outline" : "ios-eye-outline"
            }
            size={24}
            color="white"
            style={{ position: "absolute", bottom: 5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

StyledInputa.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  placeholder: "",
  autoCompleteType: "off",
  blurOnSubmit: false,
  returnKeyType: "next",
};

export default StyledInputa;
