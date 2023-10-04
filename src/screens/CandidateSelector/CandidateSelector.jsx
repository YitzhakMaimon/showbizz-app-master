import React, { useState } from "react";
import { FlatList, Alert } from "react-native";
import { useDispatch } from "react-redux";
import imagesBaseUrl from "../../constants/imagesBaseUrl";
import { FONT_SIZE } from "../../constants/styles";
import serverApi from "../../apis/server";
import { fetchPosts } from "../../store/postsSlice";

import Text from "../../components/Text/Text";
import Line from "../../components/Line/Line";
import Image from "../../components/Image/Image";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import BackButton from "../../components/Buttons/BackButton";

import { Container, Candidate, TextStyle } from "./CandidateSelector.styles";

const defaultImage = require("../../../assets/default-user-image.png");

const CandidateSelector = ({ route, navigation }) => {
  const [chosenCandidates, setChosenCandidates] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const dispatch = useDispatch();

  const saveChosenCandidates = async (newUsername) => {
    try {
      await serverApi.patch(`/moveCandidateToChosen`, {
        postId: route.params.postId,
        newUsername,
      });
      await serverApi.post(`/sendMail`, {
        postId: route.params.postId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRightHeaderClick = () => {
    if (!isSelecting) {
      setIsSelecting(true);
    } else if (chosenCandidates.length === 0) {
      setIsSelecting(false);
    } else {
      Alert.alert("יצירת קשר", "האם לשלוח למשרד בקשה בקשר למועמדים שנבחרו?", [
        {
          text: "ביטול",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "שלח",
          onPress: async () => {
            await saveChosenCandidates(chosenCandidates);
            setChosenCandidates([]);
            setIsSelecting(false);
            dispatch(fetchPosts()).then(() => {
              navigation.goBack();
            });
          },
        },
      ]);
    }
  };

  const contactAlert = (candidate, isChosen) => {
    if (isChosen) {
      setChosenCandidates(chosenCandidates.filter((x) => x !== candidate));
    } else {
      setChosenCandidates([...chosenCandidates, candidate]);
    }
  };

  const renderCandidates = (candidates, canBeSelected) => (
    <FlatList
      keyExtractor={(item) => item.sub}
      data={candidates}
      contentContainerStyle={{
        marginTop: 13,
      }}
      renderItem={({ item }) => {
        const isChosen = chosenCandidates.includes(item.sub);
        return (
          <Candidate
            onPress={() =>
              isSelecting && canBeSelected
                ? contactAlert(item.sub, isChosen)
                : navigation.navigate("Profile", {
                    represented: { Attributes: item },
                  })
            }
            chosen={isChosen}
          >
            <Text
              text={item.name}
              style={{
                marginRight: 15,
                color: isChosen ? "#1B1B1B" : "#FFFFFF",
              }}
            />
            <Image
              uri={
                item.picture
                  ? {
                      uri: !item.picture?.includes("file://")
                        ? `${imagesBaseUrl}${item.picture}`
                        : item.picture,
                    }
                  : defaultImage
              }
              style={{ height: 41, width: 41 }}
            />
          </Candidate>
        );
      }}
    />
  );

  return (
    <Container>
      <HeaderButtons
        rightText={
          isSelecting ? `אישור ${chosenCandidates.length}` : "לבחירת מועמדים"
        }
        leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
        onLeftClick={() => navigation.goBack()}
        onRightClick={handleRightHeaderClick}
        leftText={<BackButton />}
      />
      <Text text="נבחרו לתפקיד" style={TextStyle} />
      {renderCandidates(route.params.chosenCandidates, false)}
      <Line />
      <Text text="מועמדים" style={TextStyle} />
      {renderCandidates(route.params.candidates, true)}
    </Container>
  );
};

export default CandidateSelector;
