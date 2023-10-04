import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, HeaderButtonsContainer } from "./HeaderButtons.styles";
import Text from "../Text/Text";
import { FONT_SIZE } from "../../constants/styles";

const HeaderButtons = ({
  leftText,
  leftStyle,
  rightText,
  rightStyle,
  onLeftClick,
  onRightClick,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <HeaderButtonsContainer style={containerStyle} notchHeight={insets.top}>
      <Button onPress={onLeftClick}>
        <Text text={leftText} style={leftStyle} />
      </Button>
      <Button onPress={onRightClick}>
        <Text text={rightText} style={rightStyle} />
      </Button>
    </HeaderButtonsContainer>
  );
};

HeaderButtons.defaultProps = {
  leftText: "ביטול",
  rightText: "שמור",
  leftStyle: { color: "#AEAEAE", fontSize: FONT_SIZE.SMALLER },
  rightStyle: { fontWeight: "bold", fontSize: FONT_SIZE.SMALLER },
};

export default HeaderButtons;
