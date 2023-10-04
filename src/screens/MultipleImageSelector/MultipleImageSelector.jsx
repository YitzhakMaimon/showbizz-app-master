import React, { useMemo } from "react";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  FONT_SIZE,
  COLORS,
  ARIMO_BOLD_FONT_FAMILY,
} from "../../constants/styles";
import { Container } from "./MultipleImageSelector.styles";
import { MediaType } from "expo-media-library";
import { useNavigation } from "@react-navigation/core";

const MultipleImageSelector = ({ route }) => {
  const navigation = useNavigation();
  const onSuccess = (data: any) => {
    navigation.navigate("UserProfile", {
      imagesSelected: data,
    });
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const _buttonStyle = {
    color: "white",
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: ARIMO_BOLD_FONT_FAMILY,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "בחר",
        back: "חזור",
        selected: "נבחרו",
      },
      midTextColor: COLORS.ORANGE,
      minSelection: 1,
      buttonStyle: _buttonStyle,
      onBack: () => {
        navigation.goBack();
      },
      onSuccess: (e: any) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "black",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#1b1b1b75",
        size: 26,
      },
    }),
    []
  );
  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection: route.params.maxSelections,
      portraitCols: 4,
      landscapeCols: 5,
    }),
    []
  );
  return (
    <Container>
      <AssetsSelector
        Settings={widgetSettings}
        Styles={widgetStyles}
        Errors={widgetErrors}
        Navigator={widgetNavigator}
      />
    </Container>
  );
};

export default MultipleImageSelector;
