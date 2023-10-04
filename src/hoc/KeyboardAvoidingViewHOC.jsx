import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

const KeyboardAvoidingViewHOC =
  (Comp) =>
  ({ children, ...props }) =>
    (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({
          ios: () => (props.multiLineInput ? (props.bigGap ? 300 : 100) : 10),
          android: () => 200,
        })()}
      >
        <Comp {...props}>{children}</Comp>
      </KeyboardAvoidingView>
    );
const KeyboardAvoiding = KeyboardAvoidingViewHOC(View);

export default KeyboardAvoiding;
