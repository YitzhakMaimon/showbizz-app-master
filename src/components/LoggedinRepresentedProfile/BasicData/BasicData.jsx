import React, { useState } from "react";
import { Field } from "formik";
import * as ImagePicker from "expo-image-picker";
import { Platform, Keyboard } from "react-native";
import {
  SHIRT_SIZES,
  GENDERS,
  PANT_SIZES,
  HEIGHTS,
  SHOE_SIZES,
  AGES,
} from "../../../constants/userBasicData";
import { FONT_SIZE } from "../../../constants/styles";
import imagesBaseUrl from "../../../constants/imagesBaseUrl";
import {
  MALE_CATEGORIES,
  FEMALE_CATEGORIES,
} from "../../../constants/categories";

import RadioButtonsWithTitle from "../../RadioButtonsWithTitle/RadioButtonsWithTitle";
import InputWithDescription from "../../Inputs/InputWithDescription";
import MultiLineInput from "../../Inputs/MultiLine";
import Line from "../../Line/Line";
import Text from "../../Text/Text";
import Dropdown from "../../Dropdown/DropdownWithDescription";
import Select from "../../Select/Select";
import Image from "../../Image/Image";
import KeyboardAvoidingViewHOC from "../../../hoc/KeyboardAvoidingViewHOC";

import {
  Container,
  PostDataContainer,
  ProfileImageContainer,
} from "./BasicData.styles";

const defaultImage = require("../../../../assets/default-user-image.png");

const BasicData = ({
  values,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
}) => {
  const [mobility, setMobility] = useState(true);
  const [open, setOpen] = useState(false);

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
        <Text
          text="החלף תמונת פרופיל"
          style={{
            marginTop: 13,
            fontSize: FONT_SIZE.SMALLER,
            color: "#aeaeae",
          }}
        />
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
            onFocus={() => setOpen(false)}
            component={InputWithDescription}
            value={values.name}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
            error={errors.name}
          />
          <Field
            onChange={(item) => {
              setFieldValue("custom:categories", item);
            }}
            component={Dropdown}
            setOpen={setOpen}
            open={open}
            error={errors["custom:categories"]}
            value={values["custom:categories"]}
            categories={
              values.gender === "נקבה" ? FEMALE_CATEGORIES : MALE_CATEGORIES
            }
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
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            description="מגורים"
            onFocus={() => setOpen(false)}
            component={InputWithDescription}
            returnKeyType="done"
            value={values.address}
            onSubmitEditing={Keyboard.dismiss}
            error={errors.address}
          />
          <Field
            onChangeText={handleChange("phone_number")}
            onBlur={handleBlur("phone_number")}
            description="נייד"
            onFocus={() => setOpen(false)}
            component={InputWithDescription}
            value={values.phone_number}
            returnKeyType="done"
            keyboardType="numeric"
            onSubmitEditing={Keyboard.dismiss}
            error={errors.phone_number}
          />
          <Field
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            description="מייל"
            autoCompleteType="email"
            onFocus={() => setOpen(false)}
            keyboardType="email-address"
            component={InputWithDescription}
            returnKeyType="done"
            value={values.email}
            onSubmitEditing={Keyboard.dismiss}
            error={errors.email}
          />
          <Field
            onChangeText={handleChange("website")}
            onBlur={handleBlur("website")}
            description="YouTube"
            onFocus={() => setOpen(false)}
            component={InputWithDescription}
            returnKeyType="done"
            value={values.website}
            onSubmitEditing={Keyboard.dismiss}
            error={errors.website}
          />
          <RadioButtonsWithTitle
            selected={mobility}
            onClickFirst={() => setMobility(true)}
            onClickSecond={() => setMobility(false)}
            text="ניידות"
          />
          <Field
            onValueChange={handleChange("custom:height")}
            onBlur={handleBlur("custom:height")}
            text="גובה"
            component={Select}
            selectedValue={values["custom:height"]}
            options={HEIGHTS}
          />
          <Field
            onValueChange={handleChange("custom:age")}
            onBlur={handleBlur("custom:age")}
            text="גיל"
            component={Select}
            selectedValue={values["custom:age"]}
            options={AGES}
          />
          <Field
            onValueChange={handleChange("custom:shirt_size")}
            onBlur={handleBlur("custom:shirt_size")}
            text="חולצה"
            component={Select}
            selectedValue={values["custom:shirt_size"]}
            options={SHIRT_SIZES}
          />
          <Field
            onValueChange={handleChange("custom:pants_size")}
            onBlur={handleBlur("custom:pants_size")}
            text="מכנס"
            component={Select}
            selectedValue={values["custom:pants_size"]}
            options={PANT_SIZES}
          />
          <Field
            onValueChange={handleChange("custom:shoe_size")}
            onBlur={handleBlur("custom:shoe_size")}
            text="נעליים"
            component={Select}
            selectedValue={values["custom:shoe_size"]}
            options={SHOE_SIZES}
          />
          <Field
            onChangeText={handleChange("custom:experience")}
            onBlur={handleBlur("custom:experience")}
            inputDescription="ניסיון"
            component={MultiLineInput}
            noMarginTop
            returnKeyType="done"
            style={{ height: 200 }}
            value={values["custom:experience"]}
            onSubmitEditing={Keyboard.dismiss}
            error={errors["custom:experience"]}
          />
        </PostDataContainer>
      </KeyboardAvoidingViewHOC>
    </Container>
  );
};

export default BasicData;
