import React from "react";
import { FlatList } from "react-native";
import imagesBaseUrl from "../../constants/imagesBaseUrl";

import Text from "../Text/Text";
import Image from "../Image/Image";

import { Container, StarButton } from "./RepresentedList.styles";

const RepresentedList = ({ title, navigation, data }) => (
  <Container>
    <Text text={title} style={{ textAlign: "right", paddingRight: "5%" }} />
    <FlatList
      horizontal
      keyExtractor={(item) => item.Username}
      data={data}
      contentContainerStyle={{
        marginTop: 20,
      }}
      renderItem={({ item }) => (
        <StarButton
          onPress={() =>
            navigation.navigate("Profile", {
              represented: item,
            })
          }
        >
          <Image
            uri={{ uri: imagesBaseUrl + item.Attributes.picture }}
            style={{
              height: 183,
              width: 112,
              marginLeft: 10,
            }}
          />
        </StarButton>
      )}
    />
  </Container>
);

export default RepresentedList;

RepresentedList.defaultProps = {
  marginTop: false,
};
