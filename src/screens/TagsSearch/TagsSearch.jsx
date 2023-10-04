import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { FONT_SIZE, TITLE_STYLE } from "../../constants/styles";
import tagOptions from "../../constants/tags";
import KeyboardAvoidingViewHOC from "../../hoc/KeyboardAvoidingViewHOC";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";

import Tag from "../../components/Tag/Tag";
import Text from "../../components/Text/Text";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Input from "../../components/Inputs/Input";

import { Container, SearchTagsContinaer } from "./TagsSearch.styles";

const TagsSelector = ({ route, navigation }) => {
  const [selected, setSelected] = useState(route.params.selected);
  const [searchText, setSearchText] = useState("");
  const [filteredTags, setFilteredTags] = useState(tagOptions);

  const handleTagPress = (x) => {
    if (selected.includes(x)) {
      setSelected(selected.filter((y) => x !== y));
    } else {
      setSelected([...selected, x]);
    }
  };

  useEffect(() => {
    setFilteredTags(tagOptions.filter((x) => x.includes(searchText)));
  }, [searchText]);

  const renderItem = (item) => (
    <Tag
      text={item}
      selected={selected.includes(item)}
      onPress={() => handleTagPress(item)}
      style={{ width: "100%" }}
    />
  );

  return (
    <Container>
      <DismissKeyboardHOC>
        <HeaderButtons
          rightText=""
          leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
          onLeftClick={() =>
            navigation.navigate(route.params.backScreen, {
              selected,
            })
          }
          leftText="אישור"
        />
        <Text text="חיפוש תגיות" style={[TITLE_STYLE, { marginTop: 15 }]} />

        <Text
          text="יש לבחור תגיות רלוונטיות"
          style={{ textAlign: "right", paddingRight: "5%", marginTop: 20 }}
        />
      </DismissKeyboardHOC>
      <SearchTagsContinaer>
        <Input
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
          placeholder="הזן מלל לחיפוש"
          autoFocus
          style={{
            marginTop: 0,
            borderBottomWidth: 0,
            paddingBottom: 0,
          }}
        />
      </SearchTagsContinaer>
      <KeyboardAvoidingViewHOC>
        <FlatList
          style={{ marginTop: 10 }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            paddingRight: "5%",
            paddingLeft: "5%",
            justifyContent: "flex-end",
          }}
          data={filteredTags}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item}
        />
      </KeyboardAvoidingViewHOC>
    </Container>
  );
};

export default TagsSelector;
