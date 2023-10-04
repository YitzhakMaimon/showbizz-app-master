import styled from "styled-components/native";

export const EditContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.View`
  width: 50%;
  display: flex;
`;

export const UserDataContainer = styled.View`
  display: flex;
  flex-direction: ${(props) =>
    props.isWatchingIsTheUser ? "row" : "row-reverse"};
  align-items: center;
  justify-content: space-between;
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

export const ExperienceContainer = styled.ScrollView`
  max-height: 175px;
`;

export const TagsContainer = styled.ScrollView`
  max-height: 55px;
`;

export const Container = styled.View`
  background-color: #1b1b1b;
  padding-right: 5%;
  padding-left: 5%;
  height: 100%;
`;
