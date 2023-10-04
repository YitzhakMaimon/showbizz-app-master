import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

export const Container = styled.SafeAreaView`
  height: 100%;
  background: #1b1b1b;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 38px;
`;

export const StarsCategories = styled.FlatList``;
