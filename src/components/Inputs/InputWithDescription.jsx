import React from "react";

import Text from "../Text/Text";

import { InputContainer, StyledInput } from "./Input.styles";

const InputWithDescription = React.forwardRef((props, ref) => (
  <InputContainer>
    <StyledInput
      ref={props.innerRef}
      {...props}
      placeholderTextColor="white"
      autoCapitalize="none"
    />
    <Text text={props.description} />
  </InputContainer>
));

InputWithDescription.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  placeholder: "",
  autoCompleteType: "off",
  blurOnSubmit: false,
  returnKeyType: "next",
};

export default InputWithDescription;
