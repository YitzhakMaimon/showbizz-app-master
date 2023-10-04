import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Container } from "./Tag.styles";
import { FONT_SIZE } from "../../constants/styles";

import Text from "../Text/Text";

const Tag = ({ text, selected, onPress, style }) => (
  <Container selected={selected} onPress={onPress} style={style}>
    <Text
      text={text}
      style={[
        {
          fontSize: FONT_SIZE.SMALL,
          color: selected ? "#000000" : "white",
          textAlign: "center",
        },
      ]}
    />
    {selected && (
      <AntDesign
        name="close"
        size={14}
        color="black"
        style={{ position: "absolute", right: 8 }}
      />
    )}
  </Container>
);

Tag.defaultProps = {
  selected: false,
};
export default Tag;
