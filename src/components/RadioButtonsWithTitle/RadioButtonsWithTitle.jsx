import React from "react";

import RadioButton from "../Buttons/RadioButton";

import {
  Container,
  Title,
  RadioButtonsContainer,
} from "./RadioButtonsWithTitle.styles";

const RadioButtonsWithTitle = ({
  text,
  selected,
  onClickFirst,
  onClickSecond,
}) => (
  <Container>
    <RadioButtonsContainer>
      <RadioButton
        selected={!selected}
        onPress={onClickSecond}
        style={{ marginRight: 41 }}
        text="לא"
      />
      <RadioButton selected={selected} onPress={onClickFirst} text="כן" />
    </RadioButtonsContainer>
    <Title>{text}</Title>
  </Container>
);

export default RadioButtonsWithTitle;
