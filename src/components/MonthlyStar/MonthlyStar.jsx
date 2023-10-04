import React from "react";
import { useSelector } from "react-redux";
import imagesBaseUrl from "../../constants/imagesBaseUrl";
import { FONT_SIZE } from "../../constants/styles";

import { starOfTheMonthSelector } from "../../store/starOfTheMonthSlice";
import Text from "../Text/Text";
import Image from "../Image/Image";

import {
  Container,
  MonthlyStarDataContainer,
  MonthlyStarDescriptionContainer,
  MonthlyStarImageContainer,
} from "./MonthlyStar.styles";

const MonthlyStar = ({ navigation }) => {
  const { starOfTheMonth } = useSelector(starOfTheMonthSelector);
  return (
    <Container
      onPress={() =>
        navigation.navigate("Profile", {
          represented: { Attributes: starOfTheMonth.representedData },
        })
      }
    >
      <Text text="כותרות" style={{ textAlign: "right" }} />
      <MonthlyStarDataContainer>
        <MonthlyStarImageContainer>
          <Image
            uri={{
              uri: imagesBaseUrl + starOfTheMonth.representedData.picture,
            }}
            style={{ width: 112, height: 119 }}
          />
        </MonthlyStarImageContainer>
        <MonthlyStarDescriptionContainer>
          <Text
            text={starOfTheMonth.description}
            style={{ textAlign: "right", fontSize: FONT_SIZE.SMALLER }}
          />
        </MonthlyStarDescriptionContainer>
      </MonthlyStarDataContainer>
    </Container>
  );
};

export default MonthlyStar;
