import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 18px;
`;

export const MultiLineInputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-top: ${(props) => (props.noMarginTop ? "0px" : "27px")};
`;

export const StyledInput = styled.TextInput`
  text-align: right;
  font-family: Arimo;
  color: white;
  font-size: 16px;
  border-bottom-color: #2f2f2f;
  border-bottom-width: 1px;

  ${(props) =>
    props.withoutDescription
      ? `margin-top: ${
          Dimensions.get("window").height * 0.05
        }px; padding-bottom:8px;`
      : "width: 70%;height: 30px;padding-bottom: 9px;"};

  ${(props) =>
    props.multiline &&
    "border-width: 0;border-bottom-width:0; border-radius: 10px;height: 80px; width: 100%;margin-top: 12px;padding-right: 13px;background-color: #262627;"}

  ${(props) =>
    props.error && "border-bottom-color: #FF8A1F;border-color: #FF8A1F;"}
`;
