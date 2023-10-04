import React, { useState } from "react";
import { View } from "react-native";
import { FONT_SIZE, TITLE_STYLE } from "../../constants/styles";
import tagOptions from "../../constants/tags";

import Tag from "../../components/Tag/Tag";
import Text from "../../components/Text/Text";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import BackButton from "../../components/Buttons/BackButton";

import { Container, TagsContainer } from "./TagsSelector.styles";

const TagsSelector = ({ route, navigation }) => {
  const [selected, setSelected] = useState(route.params.selected);

  const handleTagPress = (x) => {
    if (selected.includes(x)) {
      setSelected(selected.filter((y) => x !== y));
    } else {
      setSelected([...selected, x]);
    }
  };

  return (
    <Container>
      <HeaderButtons
        rightText=""
        leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
        onLeftClick={() =>
          navigation.navigate(route.params.backScreen, {
            selected,
          })
        }
        leftText={<BackButton />}
      />
      <Text text="תגיות" style={[TITLE_STYLE, { marginTop: 15 }]} />
      <Text
        text="יש לבחור תגיות רלוונטיות"
        style={{ textAlign: "right", paddingRight: "5%", marginTop: 20 }}
      />
      <TagsContainer
        contentContainerStyle={{
          marginTop: 26,
          paddingRight: "3%",
          paddingLeft: "5%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
      >
        {tagOptions.map((x) => (
          <Tag
            text={x}
            key={x}
            selected={selected.includes(x)}
            onPress={() => handleTagPress(x)}
          />
        ))}
      </TagsContainer>
    </Container>
  );
};

export default TagsSelector;
