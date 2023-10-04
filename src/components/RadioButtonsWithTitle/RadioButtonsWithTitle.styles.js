import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 14px;
`;

export const RadioButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 0 70%;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-family: Arimo;
  font-size: 16px;
  color: #ffffff;
  flex: 0 30%;
  text-align: right;
`;
