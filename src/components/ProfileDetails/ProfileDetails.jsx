import React from "react";

import { Icon } from "react-native-elements";
import { Linking, Dimensions, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FONT_SIZE } from "../../constants/styles";

import Text from "../Text/Text";
import DataView from "../DataView/DataView";
import DataTitle from "../DataView/DataTitle";
import Tag from "../Tag/Tag";

import {
  Container,
  UserDataContainer,
  TitleContainer,
  RowDataContainer,
  TagsContainer,
  YoutubeContainer,
  YoutubeText,
  EditContainer,
  ExperienceContainer,
} from "./ProfileDetails.styles";

const ProfileDetails = ({
  representedData,
  isWatchingIsTheUser,
  navigation,
}) => {
  const {
    name,
    website,
    address,
    gender,
    "custom:height": height,
    "custom:categories": categories,
    "custom:mobility": mobility,
    "custom:age": age,
    "custom:experience": experience,
    "custom:shirt_size": shirt_size,
    "custom:pants_size": pants_size,
    "custom:shoe_size": shoe_size,
    "custom:tags": tags,
  } = representedData.Attributes;

  return (
    <Container>
      <Icon
        name="minus"
        type="antdesign"
        color="#AEAEAE"
        size={60}
        style={{ marginTop: -16 }}
      />
      <UserDataContainer isWatchingIsTheUser={isWatchingIsTheUser}>
        {isWatchingIsTheUser && (
          <EditContainer onPress={() => navigation.navigate("UserProfile")}>
            <FontAwesome name="pencil" size={16} color="white" />
            <Text
              text="עריכה"
              style={{ fontSize: FONT_SIZE.SMALLER, marginLeft: 5 }}
            />
          </EditContainer>
        )}
        <TitleContainer>
          <Text text={name} style={{ fontSize: 30, textAlign: "right" }} />
        </TitleContainer>
      </UserDataContainer>
      <RowDataContainer>
        <DataView title="גובה" value={height} boldValue />
        <DataView title="גיל" value={age} boldValue />
        <DataView title="מין" value={gender} boldValue />
        <DataView
          title="קטגוריות"
          value={JSON.parse(categories).join(", ")}
          boldValue
          style={{ marginTop: 15 }}
        />
        <DataView
          title="מגורים"
          value={address}
          boldValue
          style={{ marginTop: 15 }}
        />
        <DataView
          title="ניידות"
          value={mobility ? "לא" : "כן"}
          boldValue
          style={{ marginTop: 15 }}
        />
      </RowDataContainer>
      {experience && (
        <View style={{ marginTop: 15 }}>
          <ExperienceContainer>
            <DataView title="ניסיון" value={experience} />
          </ExperienceContainer>
        </View>
      )}
      <RowDataContainer>
        <DataView title="חולצה" value={shirt_size} centerValue boldValue />
        <DataView title="מכנסיים" value={pants_size} centerValue boldValue />
        <DataView title="נעליים" value={shoe_size} centerValue boldValue />
      </RowDataContainer>
      {JSON.parse(tags).length > 0 && <DataTitle text="תגיות" marginTop={10} />}
      <TagsContainer
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        style={{
          marginRight: "-2%",
        }}
      >
        {JSON.parse(tags).map((x) => (
          <Tag text={x} key={x} />
        ))}
      </TagsContainer>
      {website && (
        <YoutubeContainer onPress={() => Linking.openURL(website)}>
          <YoutubeText>צפיה בסרטונים</YoutubeText>
          <AntDesign name="youtube" size={24} color="white" />
        </YoutubeContainer>
      )}
    </Container>
  );
};

export default ProfileDetails;
