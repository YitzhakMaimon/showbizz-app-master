import React from "react";
import { Value } from "./DataView.styles";

const DataValue = ({ text, centerValue, boldValue }) => {
  return (
    <Value centerValue={centerValue} bold={boldValue}>
      {text}
    </Value>
  );
};

export default DataValue;
