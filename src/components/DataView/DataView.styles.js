import styled from "styled-components/native";
import {
  ARIMO_BOLD_FONT_FAMILY,
  ARIMO_FONT_FAMILY,
} from "../../constants/styles";

export const Title = styled.Text`
  color: #aeaeae;
  font-size: 15px;
  font-family: Arimo;
  width: 100%;
  text-align: ${(props) => (props.centerValue ? "center" : "right")};
  margin-top: ${(props) => `${props.marginTop}px`};
`;

export const Value = styled.Text`
  font-size: 16px;
  font-family: ${(props) =>
    props.bold ? ARIMO_BOLD_FONT_FAMILY : ARIMO_FONT_FAMILY};
  color: white;
  margin-top: 5px;
  width: 100%;
  text-align: ${(props) => (props.centerValue ? "center" : "right")};
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1 0 33%;
`;
