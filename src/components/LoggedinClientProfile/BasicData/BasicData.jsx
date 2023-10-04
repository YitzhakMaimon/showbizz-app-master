import React from "react";
import { Field } from "formik";
import * as ImagePicker from "expo-image-picker";
import { Platform, Keyboard } from "react-native";
import imagesBaseUrl from "../../../constants/imagesBaseUrl";
import { GENDERS } from "../../../constants/userBasicData";

import InputWithDescription from "../../Inputs/InputWithDescription";
import Line from "../../Line/Line";
import Image from "../../Image/Image";
import Select from "../../Select/Select";
import KeyboardAvoidingViewHOC from "../../../hoc/KeyboardAvoidingViewHOC";

import {
  Container,
  PostDataContainer,
  ProfileImageContainer,
  ProfileImageText,
} from "./BasicData.styles";

const defaultImage = require("../../../../assets/default-user-image.png");

const BasicData = ({
  values,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
}) => {
  const askForPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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

      if (!result.cancelled) {
        setFieldValue("picture", result.uri);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <ProfileImageContainer onPress={pickImage}>
        <Image
          uri={
            values.picture
              ? {
                  uri: !values.picture?.includes("file://")
                    ? `${imagesBaseUrl}${values.picture}`
                    : values.picture,
                }
              : defaultImage
          }
          style={{ height: 131, width: 131 }}
        />
        <ProfileImageText>החלף תמונת פרופיל</ProfileImageText>
      </ProfileImageContainer>
      <Line />
      <KeyboardAvoidingViewHOC multiLineInput>
        <PostDataContainer
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={{ marginBottom: 65 }}
        >
          <Field
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            description="שם מלא"
            component={InputWithDescription}
            value={values.name}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            error={errors.name}
          />
          <Field
            onChangeText={handleChange("custom:role")}
            onBlur={handleBlur("custom:role")}
            description="תפקיד"
            component={InputWithDescription}
            value={values.role}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            error={errors.role}
          />
          <Field
            onValueChange={handleChange("gender")}
            onBlur={handleBlur("gender")}
            text="מין"
            component={Select}
            selectedValue={values.gender}
            options={GENDERS}
          />
          <Field
            onChangeText={handleChange("phone_number")}
            onBlur={handleBlur("phone_number")}
            description="נייד"
            component={InputWithDescription}
            value={values.phone_number}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            error={errors.phone_number}
          />
          <Field
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            description="מייל"
            component={InputWithDescription}
            value={values.email}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            error={errors.email}
          />
        </PostDataContainer>
      </KeyboardAvoidingViewHOC>
    </Container>
  );
};

export default BasicData;
