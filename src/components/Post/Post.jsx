import React from "react";
import { HOUR_IN_MS, DAY_IN_MS } from "../../constants/times";
import { COLORS } from "../../constants/styles";
import imagesBaseUrl from "../../constants/imagesBaseUrl";
import checkIfSpecialUser from "../../utils/checkIfSpecialUser";
import { FlatList } from "react-native";

import DataView from "../DataView/DataView";
import Text from "../Text/Text";
import LargeRoundedButton from "../Buttons/LargeRounded";
import Image from "../Image/Image";

import {
  Container,
  PosterDataContainer,
  PostTime,
  PostUserName,
  SumDataContainer,
  DescriptionScrollView,
} from "./Post.styles";

function timeDiffConverter(createdAt) {
  const today = new Date();
  const postCreationDate = new Date(parseFloat(createdAt));
  const diffMs = today - postCreationDate;
  if (diffMs >= HOUR_IN_MS && diffMs <= HOUR_IN_MS * 1.5) {
    return "פורסם לפני שעה";
  }
  if (diffMs > HOUR_IN_MS * 1.5 && diffMs <= HOUR_IN_MS * 3) {
    return "פורסם לפני שעתיים";
  }
  if (diffMs >= DAY_IN_MS && diffMs < DAY_IN_MS * 2) {
    return "פורסם אתמול";
  }
  if (diffMs >= DAY_IN_MS * 2 && diffMs < DAY_IN_MS * 3) {
    return "פורסם שלשום";
  }
  if (diffMs >= HOUR_IN_MS * 3 && diffMs < DAY_IN_MS) {
    return `פורסם לפני ${Math.floor((diffMs % 86400000) / 3600000)} שעות`;
  }
  return `${postCreationDate.getDate()}.${
    postCreationDate.getMonth() + 1
  }.${postCreationDate.getFullYear()}`;
}
const Post = ({
  onPress,
  data,
  isButtonShow,
  isLoading,
  buttonType,
  isAlreadyCandidate,
  isCategoryChildren,
}) => {
  const calculatePrice = () => {
    if (buttonType) {
      if (isCategoryChildren) {
        return data.salary * 0.8;
      }
      return data.salary * 0.7;
    }
    return data.salary;
  };

  return (
    <Container>
      <PostTime>{timeDiffConverter(data.createdAt)}</PostTime>
      <PosterDataContainer>
        <PostUserName isSpecialUser={checkIfSpecialUser(data.owner.email)}>
          {data.owner.name}
        </PostUserName>
        <Image
          uri={{ uri: imagesBaseUrl + data.owner.picture }}
          style={{ width: 53, height: 53 }}
        />
      </PosterDataContainer>
      <Text
        text={data.projectName}
        style={{ textAlign: "right", marginRight: "5%", marginTop: 15 }}
      />
      <SumDataContainer>
        <DataView title="מיקום" value={data.location} boldValue centerValue />
        <DataView
          title="שכר"
          value={`₪ ${calculatePrice()}`}
          boldValue
          centerValue
        />
        <DataView
          title="קטגוריות"
          value={data.categories.join(", ")}
          boldValue
          centerValue
        />
      </SumDataContainer>
      <DescriptionScrollView
        contentContainerStyle={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "5%",
          paddingLeft: "5%",
        }}
      >
        <Text text={data.description} style={{ textAlign: "right" }} />
      </DescriptionScrollView>
      {Array.isArray(data?.images) && (
        <FlatList
          horizontal
          keyExtractor={(item) => item}
          data={data.images}
          contentContainerStyle={{
            marginTop: 20,
            height: 183,
          }}
          renderItem={({ item }) => (
            <Image
              uri={{ uri: `${imagesBaseUrl}${item}` }}
              style={{
                height: 183,
                width: 112,
                marginLeft: 10,
              }}
            />
          )}
        />
      )}
      {isButtonShow && (
        <LargeRoundedButton
          text={
            buttonType
              ? isAlreadyCandidate
                ? "הסר מועמדות"
                : "הגשת מועמדות"
              : "רשימת מועמדים"
          }
          isLoading={isLoading}
          onPress={onPress}
          small
          styles={{
            alignSelf: "center",
            width: 140,
            marginTop: 20,
            backgroundColor: isAlreadyCandidate ? "white" : COLORS.ORANGE,
          }}
          disabled={false}
        />
      )}
    </Container>
  );
};

Post.defaultProps = {
  isButtonShow: true,
};

export default Post;
