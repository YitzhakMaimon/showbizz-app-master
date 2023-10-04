import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

const DismissKeyboardHOC =
  (Comp) =>
  ({ children, ...props }) =>
    (
      <TouchableWithoutFeedback
        onPress={() => {
          props.additionalDismiss();
          Keyboard.dismiss();
        }}
        accessible={false}
      >
        <Comp {...props}>{children}</Comp>
      </TouchableWithoutFeedback>
    );

const DismissKeyboardView = DismissKeyboardHOC(View);

DismissKeyboardView.defaultProps = {
  additionalDismiss: () => {},
};

export default DismissKeyboardView;
