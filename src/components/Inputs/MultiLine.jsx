import React from "react";
import { MultiLineInputContainer, StyledInput } from "./Input.styles";

import Text from "../Text/Text";

const MultiLine = React.forwardRef((props, ref) => (
  <MultiLineInputContainer noMarginTop={props.noMarginTop}>
    <Text text={props.inputDescription} />
    <StyledInput
      ref={ref}
      placeholderTextColor="white"
      multiline
      {...props}
      placeholder=""
      scrollEnabled={false}
    />
  </MultiLineInputContainer>
));

MultiLine.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  placeholder: "",
  blurOnSubmit: false,
  returnKeyType: "next",
};

export default MultiLine;
