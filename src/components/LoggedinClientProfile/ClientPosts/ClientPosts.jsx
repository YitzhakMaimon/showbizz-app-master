import React from "react";
import { useSelector } from "react-redux";
import { postsSelector } from "../../../store/postsSlice";
import { userSelector } from "../../../store/userSlice";

import Post from "../../Post/Post";

import { Container, PostsContainer } from "./ClientPosts.styles";

const ClientPosts = ({ navigation }) => {
  const { userPosts, loading } = useSelector(postsSelector);

  const {
    "cognito:groups": [group],
    username,
    name,
    email,
    picture,
  } = useSelector(userSelector);

  const isRepresented = group === "represented";

  return (
    <Container>
      <PostsContainer
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: "5%",
          paddingLeft: "5%",
        }}
      >
        {userPosts.map((item) => (
          <Post
            key={item.postId}
            onPress={() =>
              navigation.navigate("CandidateSelector", {
                postId: item.postId,
                candidates: item.candidates,
                chosenCandidates: item.chosenCandidates,
              })
            }
            data={{ ...item, owner: { name, picture, email } }}
            buttonType={isRepresented}
          />
        ))}
      </PostsContainer>
    </Container>
  );
};

export default ClientPosts;
