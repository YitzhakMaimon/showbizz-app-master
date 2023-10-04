import React from "react";
import { CategoryButton, Container } from "./Menu.styles";
import {
  ARIMO_FONT_FAMILY,
  ARIMO_BOLD_FONT_FAMILY,
  FONT_SIZE,
} from "../../constants/styles";

import Text from "../Text/Text";

const Menu = ({ options, selectedOtion, setSelected, fullWidth }) => (
  <Container fullWidth={fullWidth}>
    {options.map((x, i) => (
      <CategoryButton onPress={() => setSelected(x)} key={x}>
        <Text
          text={x}
          style={{
            textAlign: "right",
            fontFamily:
              selectedOtion === x ? ARIMO_BOLD_FONT_FAMILY : ARIMO_FONT_FAMILY,
            fontSize:
              selectedOtion === x ? FONT_SIZE.NORMAL : FONT_SIZE.SMALLER,
            color: selectedOtion === x ? "white" : "#AEAEAE",
            marginRight: !fullWidth && i !== options.length - 1 ? 40 : 0,
          }}
        />
      </CategoryButton>
    ))}
  </Container>
);

Menu.defaultProps = {
  fullWidth: false,
};

export default Menu;
