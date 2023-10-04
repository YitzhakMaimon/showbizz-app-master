import styled from "styled-components/native";
import { COLORS } from "../../constants/styles";

export const SumDataContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

export const PostUserName = styled.Text`
  font-size: 16px;
  font-family: Arimo-Bold;
  color: ${(props) => (props.isSpecialUser ? COLORS.ORANGE : "white")};
  margin-right: 15px;
`;

export const PostTime = styled.Text`
  font-family: Arimo;
  font-size: 14px;
  color: #aeaeae;
  position: absolute;
  top: 9px;
  left: 24px;
`;

export const PosterDataContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 5%;
`;

export const DescriptionScrollView = styled.View`
  margin-top: 20px;
  padding-right: 5%;
  padding-left: 5%;
`;

export const Container = styled.View`
  background: #232323;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
`;
