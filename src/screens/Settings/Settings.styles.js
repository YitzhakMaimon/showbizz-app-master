import styled from "styled-components/native";

export const Title = styled.Text`
  font-family: Arimo-Bold;
  font-size: 22px;
  text-align: right;
  color: white;
`;

export const OptionsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 5%;
  padding-left: 5%;
  margin-top: 18px;
`;

export const Container = styled.SafeAreaView`
  background: #1b1b1b;
  flex: 1;
`;

export const Button = styled.TouchableOpacity`
  text-align: right;
  margin-top: 36px;
`;
