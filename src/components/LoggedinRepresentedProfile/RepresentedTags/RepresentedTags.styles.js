import styled from "styled-components/native";

export const Spacer = styled.View``;

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const AddTagsContainer = styled.TouchableOpacity``;

export const AddTagsIconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  width: 31px;
  height: 31px;
  border-radius: 30px;
  align-self: center;
`;

export const TagsContainer = styled.View`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
  padding-right: 3%;
  padding-left: 5%;
`;
