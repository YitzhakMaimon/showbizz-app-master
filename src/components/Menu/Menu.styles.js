import styled from "styled-components/native";

export const CategoryButton = styled.TouchableOpacity``;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.fullWidth ? "space-between" : "flex-end"};
  padding-right: 5%;
  padding-left: 5%;
  margin-top: 20px;
`;
