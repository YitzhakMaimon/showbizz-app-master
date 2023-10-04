import React from "react";
import { Title } from "./DataView.styles";

const DataTitle = ({ text, centerValue, marginTop }) => {
  return (
    <Title centerValue={centerValue} marginTop={marginTop}>
      {text}
    </Title>
  );
};

export default DataTitle;

DataTitle.defaultProps = {
  marginTop: 0,
};
