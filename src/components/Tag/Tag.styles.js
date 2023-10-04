import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  height: 26px;
  border: 1px solid #ffffff;
  border-radius: 2px;
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
  flex: 0 31%;
  margin-right: 2%;

  ${(props) => props.selected && "background: white;"};
`;
