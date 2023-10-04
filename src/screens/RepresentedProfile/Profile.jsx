import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector } from "react-redux";
import { Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_SIZE } from "../../constants/styles";
import { userSelector } from "../../store/userSlice";
import imagesBaseUrl from "../../constants/imagesBaseUrl";

import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import Text from "../../components/Text/Text";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import BackButton from "../../components/Buttons/BackButton";

import { Container, IntrestedButton } from "./Profile.styles";

const Profile = ({ route, navigation }) => {
  const {
    "cognito:groups": [group],
    username,
  } = useSelector(userSelector);
  const insets = useSafeAreaInsets();
  const sheetRef = React.useRef(null);

  const images = route.params.represented.Attributes.hasOwnProperty(
    "custom:images"
  )
    ? JSON.parse(route.params.represented.Attributes["custom:images"]).map(
        (x) => `${imagesBaseUrl}${x}`
      )
    : [];

  const renderContent = () => (
    <ProfileDetails
      representedData={route.params.represented}
      isWatchingIsTheUser={username === route.params.represented.Username}
      navigation={navigation}
    />
  );
  const renderHeaderIfUserIsAClient = () => (
    <HeaderButtons
      rightText={
        group === "clients" && (
          <IntrestedButton
            onPress={() => {
              navigation.navigate("SendRequestToRepresented", {
                represented: route.params.represented,
              });
            }}
          >
            <Text text="מעוניין" style={{ color: "black" }} />
          </IntrestedButton>
        )
      }
      leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
      leftText={<BackButton />}
      onLeftClick={() => navigation.goBack()}
      containerStyle={{
        position: "absolute",
        zIndex: 4,
        elevation: 3,
        top: insets.top + 16,
      }}
    />
  );

  return (
    <Container>
      {renderHeaderIfUserIsAClient()}
      <SliderBox
        inactiveDotColor="#AEAEAE"
        dotColor="white"
        circleLoop
        sliderBoxHeight={Dimensions.get("window").height * 0.65}
        paginationBoxVerticalPadding={
          Dimensions.get("window").height * 0.65 -
          Dimensions.get("window").height * 0.58
        }
        images={images}
        imageLoadingColor="white"
      />
      {/* <Portal> */}
      <BottomSheet
        snapPoints={["40%", Platform.OS === "web" ? "40%" : "70%"]}
        ref={sheetRef}
        borderRadius={25}
        renderContent={renderContent}
      />
      {/* </Portal> */}
    </Container>
  );
};

export default Profile;
