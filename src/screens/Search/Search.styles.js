import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  height: 100%;
  background: #1b1b1b;
`;

export const TagsSelectorContinaer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 95%;
`;

export const SearchTagsContinaer = styled.TouchableOpacity`
  background: #232323;
  border-radius: 5px;
  min-height: 40px;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 12px;
  padding-left: 12px;
`;

export const Candidate = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  ${(props) => props.chosen && "background: white;"}
`;
