import React from "react";
import { Container, Title, Value } from "./DataView.styles";
import DataTitle from "./DataTitle";
import DataValue from "./DataValue";

const DataView = ({ title, value, centerValue, boldValue, style }) => {
  return (
    <Container style={style}>
      <DataTitle centerValue={centerValue} text={title}></DataTitle>
      <DataValue centerValue={centerValue} bold={boldValue} text={value} />
    </Container>
  );
};

export default DataView;
