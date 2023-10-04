import styled from "styled-components/native";
import { Dimensions, StatusBar, Platform } from "react-native";

const height =
  Platform.OS !== "ios" &&
  Dimensions.get("screen").height !== Dimensions.get("window").height &&
  StatusBar.currentHeight > 24
    ? Dimensions.get("window").height - StatusBar.currentHeight
    : Dimensions.get("window").height;

export const HeaderButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-right: 10px;
  z-index: 2;
  padding-left: 10px;
  margin-top: ${(props) =>
    height * (Platform.OS !== "ios" ? 0.01 : 0.08) - props.notchHeight}px;
`;

export const Button = styled.TouchableOpacity`
  z-index: 3;
`;
