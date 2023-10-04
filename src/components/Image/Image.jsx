import React from "react";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";

const ImageWithPlaceHolder = ({ style, uri, placeholder }) => (
  <Image
    source={uri}
    style={[
      {
        borderRadius: 5,
        width: 200,
        height: 200,
      },
      style,
    ]}
    PlaceholderContent={placeholder}
  />
);

export default ImageWithPlaceHolder;

ImageWithPlaceHolder.defaultProps = {
  placeholder: <ActivityIndicator />,
};
