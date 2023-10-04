import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONT_SIZE } from "../../../constants/styles";

import Tag from "../../Tag/Tag";
import Text from "../../Text/Text";

import {
  Container,
  AddTagsContainer,
  AddTagsIconContainer,
  TagsContainer,
  Spacer,
} from "./RepresentedTags.styles";

const RepresentedTags = ({ navigation, selected, setFieldValue, values }) => {
  useEffect(() => {
    const isSame =
      values["custom:tags"].length === selected.length &&
      values["custom:tags"].every(
        (element, index) => element === selected[index]
      );

    if (!isSame) setFieldValue("custom:tags", selected);
  }, [selected]);
  return (
    <Container>
      <TagsContainer>
        {values["custom:tags"].map((x) => (
          <Tag text={x} key={x} />
        ))}
      </TagsContainer>
      <AddTagsContainer
        onPress={() =>
          navigation.navigate("TagSelector", {
            selected: values["custom:tags"],
            backScreen: "UserProfile",
          })
        }
      >
        <AddTagsIconContainer>
          <MaterialCommunityIcons name="plus-circle" size={31} color="white" />
        </AddTagsIconContainer>
        <Text
          style={{ fontSize: FONT_SIZE.SMALLER, marginTop: 15 }}
          text="הוספת תגיות"
        />
      </AddTagsContainer>
      <Spacer />
    </Container>
  );
};

export default RepresentedTags;
