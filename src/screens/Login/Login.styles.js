import styled from "styled-components/native";
import { Dimensions, StatusBar, Platform } from "react-native";

const height =
  Platform.OS !== "ios" &&
  Dimensions.get("screen").height !== Dimensions.get("window").height &&
  StatusBar.currentHeight > 24
    ? Dimensions.get("window").height - StatusBar.currentHeight
    : Dimensions.get("window").height;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const Spacer = styled.View``;

export const FormContainer = styled.View`
  display: flex;
  justify-content: space-between;
  padding-right: 5%;
  padding-left: 5%;
  margin-top: ${height * 0.136}px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  height: 130px;
  margin-top: ${height * 0.15}px;
`;

export const InputsContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin-top: ${Dimensions.get("window").height * 0.01}px;
`;
