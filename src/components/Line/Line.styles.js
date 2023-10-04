import styled from "styled-components/native";
import { Dimensions } from "react-native";

export default styled.View`
  border: 0.33px solid #6b6b6b;
  margin-top: ${(props) => (props.bigSpace ? "46px" : "15px")};
  width: ${Dimensions.get("window").width}px;
  height: 1px;
`;
