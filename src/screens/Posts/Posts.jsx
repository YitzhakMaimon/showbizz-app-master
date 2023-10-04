import React, { useState } from "react";
import { FlatList, Animated, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  postsSelector,
  addCandidateToPost,
  fetchPosts,
  removeCandidateFromPost,
} from "../../store/postsSlice";
import { userSelector } from "../../store/userSlice";
import { TITLE_STYLE } from "../../constants/styles";

import Text from "../../components/Text/Text";
import Post from "../../components/Post/Post";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";
import Menu from "../../components/Menu/Menu";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import {
  MENU_OPTIONS,
  CATEGORIES_MENU_TO_USER_CATEGORY,
} from "../../constants/categories";

import { Container } from "./Posts.styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Posts = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("שחקנים");
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(postsSelector);

  const {
    "cognito:groups": [group],
    username,
  } = useSelector(userSelector);

  const isRepresented = group === "represented";

  const onRefresh = () => dispatch(fetchPosts());

  return (
    <Container>
      <HeaderButtons
        rightText={
          <Text text="דרושים" style={[TITLE_STYLE, { paddingRight: 0 }]} />
        }
        onLeftClick={() => navigation.goBack()}
        leftText={
          !isRepresented && (
            <LargeRoundedButton
              text="+ מודעה חדשה"
              onPress={() => navigation.navigate("NewPost")}
              styles={{ backgroundColor: "#FF8A1F" }}
              small
            />
          )
        }
        containerStyle={{ paddingRight: "5%", paddingLeft: "5%" }}
      />
      <Menu
        options={MENU_OPTIONS}
        setSelected={setSelectedCategory}
        selectedOtion={selectedCategory}
        fullWidth
      />
      <AnimatedFlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            title="משוך לרענון"
            tintColor="#fff"
            titleColor="#fff"
          />
        }
        keyExtractor={(item) => item.postId}
        data={posts.filter((x) =>
          x.categories.includes(
            CATEGORIES_MENU_TO_USER_CATEGORY[selectedCategory]
          )
        )}
        style={{ marginBottom: 50 }}
        contentContainerStyle={{
          paddingRight: "5%",
          paddingLeft: "5%",
        }}
        renderItem={({ item }) => {
          const isAlreadyCandidate =
            item?.candidates?.includes(username) ||
            item?.chosenCandidates?.includes(username);
          return (
            <Post
              data={item}
              buttonType={isRepresented}
              isButtonShow={isRepresented}
              isAlreadyCandidate={isAlreadyCandidate}
              isLoading={loading === item.postId}
              isCategoryChildren={selectedCategory === "ילדים"}
              onPress={() =>
                isAlreadyCandidate
                  ? dispatch(
                      removeCandidateFromPost({ postId: item.postId, username })
                    )
                  : dispatch(
                      addCandidateToPost({ postId: item.postId, username })
                    )
              }
            />
          );
        }}
      />
    </Container>
  );
};

export default Posts;
