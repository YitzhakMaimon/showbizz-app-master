import React, { useState, useEffect } from "react";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BottomSheet from "reanimated-bottom-sheet";
import { Portal } from "react-native-portalize";
import { IMAGE_PERMISSIONS } from "../../../constants/alerts";
import imagesBaseUrl from "../../../constants/imagesBaseUrl";
import * as MediaLibrary from "expo-media-library";

import Text from "../../Text/Text";
import Image from "../../Image/Image";
import BottomButtons from "./BottomButtons";

import {
  Container,
  ImageUploadContainer,
  ImageUploadIconContainer,
  UserImagesContainer,
  ImageButton,
  ScrollableImagesContainer,
} from "./RepresentedImages.styles";

const defaultImage = require("../../../../assets/default-user-image.png");

const RepresentedImages = ({
  values,
  setFieldValue,
  navigation,
  imagesSelected,
}) => {
  const [currentSelectedImageIndex, setCurrentSelectedImageIndex] =
    useState(null);
  const [isBottomSheetShow, setIsBottomSheetShow] = useState(
    Platform.OS !== "web"
  );
  const sheetRef = React.useRef(null);

  const closeBottomMenu = () =>
    Platform.OS !== "web"
      ? sheetRef.current.snapTo(0)
      : setIsBottomSheetShow(false);

  useEffect(() => {
    const getDeviceLocation = async () => {
      if (imagesSelected.length) {
        const imagesToAdd = [];
        for (let index = 0; index < imagesSelected.length; index++) {
          const element = imagesSelected[index];
          let returnedAssetInfo = await MediaLibrary.getAssetInfoAsync(
            element.id
          );
          const indexOfImage = values["custom:images"].findIndex(
            (x) => x === returnedAssetInfo.localUri
          );
          if (indexOfImage === -1) imagesToAdd.push(returnedAssetInfo.localUri);
        }
        if (imagesToAdd.length > 0) {
          setFieldValue("custom:images", [
            ...values["custom:images"],
            ...imagesToAdd,
          ]);
        }
      }
    };
    getDeviceLocation();
  }, [imagesSelected]);

  const askForPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(IMAGE_PERMISSIONS);
      }
    }
  };

  const pickImage = async () => {
    try {
      await askForPermission();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
      });

      if (!result.cancelled && !currentSelectedImageIndex) {
        setFieldValue("custom:images", [
          ...values["custom:images"],
          result.uri,
        ]);
      } else if (currentSelectedImageIndex && !result.cancelled) {
        setFieldValue(
          "custom:images",
          values["custom:images"].map((x, i) =>
            i !== currentSelectedImageIndex ? x : result.uri
          )
        );
        closeBottomMenu();
      }
    } catch (error) {}
  };

  const removeImage = async () => {
    setFieldValue(
      "custom:images",
      values["custom:images"].filter((x, i) => i !== currentSelectedImageIndex)
    );
    setCurrentSelectedImageIndex(null);
    closeBottomMenu();
  };

  const renderUserImages = () =>
    values["custom:images"].map((x, i) => (
      <ImageButton
        onPress={() => {
          setCurrentSelectedImageIndex(i);
          if (Platform.OS !== "web") {
            sheetRef.current.snapTo(1);
          } else {
            setIsBottomSheetShow(true);
          }
        }}
        key={`${x}${i}`}
      >
        <Image
          uri={
            x
              ? {
                  uri:
                    !x.includes("file://") && !x.includes("assets-library://")
                      ? `${imagesBaseUrl}${x}`
                      : x,
                }
              : defaultImage
          }
          style={{ height: 180, width: "100%" }}
        />
      </ImageButton>
    ));

  const renderImageButtonIfNeeded = () => {
    if (values["custom:images"].length < 9) {
      return (
        <ImageButton
          onPress={() => {
            if (Platform.OS !== "web") {
              navigation.navigate("MultipleImageSelector", {
                maxSelections: 9 - values["custom:images"].length,
              });
            } else {
              pickImage();
            }
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo name="plus" size={30} color="white" />
        </ImageButton>
      );
    }
    return null;
  };

  const renderContent = () => (
    <BottomButtons
      closeMenu={closeBottomMenu}
      deletePicture={() => removeImage()}
      replacePicture={pickImage}
    />
  );

  return (
    <Container>
      <ScrollableImagesContainer
        contentContainerStyle={{
          paddingRight: "5%",
          paddingLeft: "5%",
        }}
        style={{ marginBottom: 200, marginTop: 15 }}
      >
        {values["custom:images"].length === 0 && (
          <ImageUploadContainer
            onPress={() => {
              if (Platform.OS !== "web") {
                navigation.navigate("MultipleImageSelector", {
                  maxSelections: 9 - values["custom:images"].length,
                });
              } else {
                pickImage();
              }
            }}
          >
            <ImageUploadIconContainer>
              <MaterialCommunityIcons
                name="plus-circle"
                size={31}
                color="white"
              />
            </ImageUploadIconContainer>
            <Text text="העלאת תמונות" />
            <Text
              text="ניתן להעלות עד 9 תמונות"
              style={{ color: "#AEAEAE", marginTop: 7 }}
            />
          </ImageUploadContainer>
        )}
        <UserImagesContainer>
          {renderUserImages()}
          {renderImageButtonIfNeeded()}
        </UserImagesContainer>
      </ScrollableImagesContainer>
      {(Platform.OS !== "web" || isBottomSheetShow) && (
        <Portal>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[Platform.OS === "web" ? "22%" : "0", "22%"]}
            borderRadius={10}
            renderContent={renderContent}
          />
        </Portal>
      )}
    </Container>
  );
};

export default RepresentedImages;
