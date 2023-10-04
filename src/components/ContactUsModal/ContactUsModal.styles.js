import styled from "styled-components/native";

export const TitleContainer = styled.View`
  width: 50%;
  text-align: right;
`;

export const UserDataContainer = styled.View`
  display: flex;
  align-items: flex-end;
`;

export const RowDataContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 21px;
  justify-content: center;
  width: 100%;
`;

export const YoutubeText = styled.Text`
  font-size: 16px;
  font-family: Arimo;
  color: white;
  text-decoration-line: underline;
  margin-right: 10px;
`;

export const YoutubeContainer = styled.TouchableOpacity`
  margin-top: 33px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
`;

export const TagsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.View`
  background-color: #1b1b1b;
  height: 450px;
  padding-right: 32px;
  padding-left: 32px;
`;
