import styled from "styled-components/native";
import { FONT_SIZE } from "../../constants/styles";

export const Container = styled.SafeAreaView`
  background: #1b1b1b;
  flex: 1;
  display: flex;
`;

export const TextStyle = {
  textAlign: "right",
  paddingRight: "5%",
  color: "#AEAEAE",
  fontSize: FONT_SIZE.SMALLER,
  marginTop: 18,
};

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
