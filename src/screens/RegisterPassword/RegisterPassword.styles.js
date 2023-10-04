import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FormContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
  margin-top: ${Dimensions.get("window").height * 0.153}px;
`;
