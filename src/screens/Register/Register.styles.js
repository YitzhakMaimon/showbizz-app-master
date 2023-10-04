import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FormContainer = styled.ScrollView`
  padding-right: 5%;
  padding-left: 5%;
  margin-top: ${Dimensions.get("window").height *
  (Platform.OS !== "ios" ? 0.025 : 0.05)}px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  margin-top: ${Dimensions.get("window").height *
  (Platform.OS !== "ios" ? 0.015 : 0.05)}px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  text-align: center;
  margin-top: ${Dimensions.get("window").height *
  (Platform.OS !== "ios" ? 0.025 : 0.05)}px;
`;

export const CheckBoxText = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 10px;
`;
