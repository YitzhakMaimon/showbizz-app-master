import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Animated } from "react-native";
import {
  representedSelector,
  fetchRepresented,
} from "../../store/representedSlice";
import imagesBaseUrl from "../../constants/imagesBaseUrl";
import { TITLE_STYLE, FONT_SIZE } from "../../constants/styles";

import {
  MENU_OPTIONS,
  CATEGORIES_MENU_TO_USER_CATEGORY,
} from "../../constants/categories";
import Text from "../../components/Text/Text";
import Image from "../../components/Image/Image";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Menu from "../../components/Menu/Menu";
import Tag from "../../components/Tag/Tag";
import BackButton from "../../components/Buttons/BackButton";
import { checkIfArrayExists } from "../../utils/checkIfPropertyExists";

import {
  Container,
  TagsSelectorContinaer,
  SearchTagsContinaer,
  Candidate,
} from "./Search.styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const defaultImage = require("../../../assets/default-user-image.png");

const Search = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("שחקנים");
  const [selectedTags, setSelectedTags] = useState(
    route.params?.selected || []
  );
  const { represented, loading } = useSelector(representedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTags(route.params?.selected || []);
  }, [route.params?.selected]);

  const onRefresh = () => dispatch(fetchRepresented());

  const filterCandidates = () => {
    const filteredByChosenCategory =
      represented[CATEGORIES_MENU_TO_USER_CATEGORY[selectedCategory]] || [];
    if (selectedTags.length > 0 && filteredByChosenCategory.length > 0) {
      const filteredByChosenCategoryAndTags = [];
      for (let index = 0; index < filteredByChosenCategory.length; index++) {
        const element = filteredByChosenCategory[index];
        const isTagExist = selectedTags.some(
          (tag) =>
            checkIfArrayExists(element.Attributes, "custom:tags").indexOf(
              tag
            ) >= 0
        );

        if (isTagExist) filteredByChosenCategoryAndTags.push(element);
      }

      return filteredByChosenCategoryAndTags;
    }
    return filteredByChosenCategory;
  };

  return (
    <Container>
      <HeaderButtons
        rightText=""
        leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
        onLeftClick={() => navigation.goBack()}
        leftText={<BackButton />}
      />
      <Text text="חיפוש" style={[TITLE_STYLE, { marginTop: 27 }]} />
      <SearchTagsContinaer
        onPress={() =>
          navigation.navigate("TagsSearch", {
            selected: selectedTags,
            backScreen: "Search",
          })
        }
      >
        <Ionicons name="search" size={24} color="#AEAEAE" />
        {selectedTags.length > 0 ? (
          <TagsSelectorContinaer>
            {selectedTags.map((x) => (
              <Tag
                key={x}
                text={x}
                selected
                style={{ marginRight: 3 }}
                onPress={() =>
                  setSelectedTags(selectedTags.filter((y) => x !== y))
                }
              />
            ))}
          </TagsSelectorContinaer>
        ) : (
          <Text
            text="חפש לפי תגיות..."
            style={{ color: "#AEAEAE", fontSize: FONT_SIZE.SMALLER }}
          />
        )}
      </SearchTagsContinaer>
      <Menu
        options={MENU_OPTIONS}
        setSelected={setSelectedCategory}
        selectedOtion={selectedCategory}
        fullWidth
      />
      <AnimatedFlatList
        keyExtractor={(item) => item.Username}
        refreshing={loading}
        onRefresh={onRefresh}
        data={filterCandidates()}
        contentContainerStyle={{
          marginTop: 13,
        }}
        renderItem={({ item }) => (
          <Candidate
            onPress={() =>
              navigation.navigate("Profile", {
                represented: item,
              })
            }
          >
            <Text
              text={item.Attributes.name}
              style={{
                marginRight: 15,
                color: "#FFFFFF",
              }}
            />
            <Image
              uri={
                item.Attributes.picture
                  ? {
                      uri: `${imagesBaseUrl}${item.Attributes.picture}`,
                    }
                  : defaultImage
              }
              style={{ height: 41, width: 41 }}
            />
          </Candidate>
        )}
      />
    </Container>
  );
};

export default Search;
