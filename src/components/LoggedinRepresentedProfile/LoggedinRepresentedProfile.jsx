import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import equal from "deep-equal";
import * as Yup from "yup";
import { userSelector, updateUserAttributes } from "../../store/userSlice";
import { TITLE_STYLE } from "../../constants/styles";
import {
  email,
  name,
  phone_number,
  picture,
  gender,
  address,
  custom_categories,
  custom_age,
  custom_height,
} from "../../constants/yupValidators";

import Text from "../Text/Text";
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import Menu from "../Menu/Menu";
import BasicData from "./BasicData/BasicData";
import RepresentedTags from "./RepresentedTags/RepresentedTags";
import RepresentedImages from "./RepresentedImages/RepresentedImages";
import BackButton from "../Buttons/BackButton";

import {
  checkIfArrayExists,
  checkIfObjectExists,
} from "../../utils/checkIfPropertyExists";

import { Container } from "./LoggedinRepresentedProfile.styles";

const menuOptions = ["תגיות", "תמונות", "פרטים אישיים"];

const RepresentedSchema = Yup.object().shape({
  email,
  name,
  phone_number,
  "custom:categories": custom_categories,
  "custom:age": custom_age,
  "custom:height": custom_height,
  gender,
  address,
  picture,
});
const LoggedinRepresentedProfile = ({ route, navigation }) => {
  const [selectedView, setSelectedView] = useState("פרטים אישיים");
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const currentView = (
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    setFieldValue
  ) => {
    switch (selectedView) {
      case menuOptions[0]:
        return (
          <RepresentedTags
            navigation={navigation}
            selected={route.params?.selected || values["custom:tags"]}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      case menuOptions[1]:
        return (
          <RepresentedImages
            imagesSelected={route.params?.imagesSelected || []}
            values={values}
            navigation={navigation}
            setFieldValue={setFieldValue}
          />
        );
      case menuOptions[2]:
        return (
          <BasicData
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      default:
        return (
          <BasicData
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
    }
  };

  const resetHandler = (handleReset) => {
    if (isChanged) {
      Alert.alert(
        "האם אתה בטוח?",
        "הפעולה תבטל את כל השינויים שלא נשמרו",
        [
          {
            text: "בטל",
            style: "cancel",
          },
          { text: "כן", onPress: () => handleReset() },
        ],
        { cancelable: false }
      );
    } else {
      navigation.goBack();
    }
  };

  const changeScreenHandler = (newScreen, handleReset) => {
    if (isChanged) {
      Alert.alert(
        "האם אתה בטוח?",
        "הפעולה תבטל את כל השינויים שלא נשמרו",
        [
          {
            text: "בטל",
            style: "cancel",
          },
          {
            text: "כן",
            onPress: () => {
              handleReset();
              setSelectedView(newScreen);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setSelectedView(newScreen);
    }
  };

  const initialValues = {
    email: user.email,
    name: user.name,
    "custom:categories": checkIfArrayExists(user, "custom:categories"),
    "custom:images": checkIfArrayExists(user, "custom:images"),
    "custom:age": checkIfObjectExists(user, "custom:age", "0"),
    "custom:height": checkIfObjectExists(user, "custom:height", "160"),
    "custom:experience": checkIfObjectExists(user, "custom:experience", ""),
    "custom:pants_size": checkIfObjectExists(user, "custom:pants_size", "31"),
    "custom:shirt_size": checkIfObjectExists(user, "custom:shirt_size", "M"),
    "custom:shoe_size": checkIfObjectExists(user, "custom:shoe_size", "40"),
    "custom:mobility": checkIfObjectExists(user, "custom:mobility", true),
    "custom:tags": checkIfArrayExists(user, "custom:tags"),
    gender: checkIfObjectExists(user, "gender", "זכר"),
    picture: checkIfObjectExists(user, "picture"),
    website: checkIfObjectExists(user, "website"),
    phone_number: checkIfObjectExists(user, "phone_number"),
    address: checkIfObjectExists(user, "address"),
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      onSubmit={async (values) => {
        await dispatch(
          updateUserAttributes({
            ...values,
            "custom:categories": JSON.stringify(values["custom:categories"]),
            "custom:tags": JSON.stringify(values["custom:tags"]),
          })
        );
        navigation.navigate("Home");
      }}
      validationSchema={RepresentedSchema}
      enableReinitialize
    >
      {(props) => {
        const {
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          handleReset,
        } = props;
        setIsChanged(!equal(initialValues, values));
        return (
          <Container>
            <HeaderButtons
              onRightClick={handleSubmit}
              onLeftClick={() => resetHandler(handleReset)}
              containerStyle={{ margintop: 57 }}
              leftText={isChanged ? "ביטול" : <BackButton />}
              rightText={
                errors && Object.keys(errors).length === 0 && isChanged ? (
                  user.loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text text="שמור" />
                  )
                ) : (
                  ""
                )
              }
            />
            <Text text="פרופיל" style={[TITLE_STYLE, { marginTop: 15 }]} />
            <Menu
              options={menuOptions}
              setSelected={(newScreen) => {
                changeScreenHandler(newScreen, handleReset);
              }}
              selectedOtion={selectedView}
            />

            {currentView(
              touched,
              errors,
              handleBlur,
              handleChange,
              values,
              setFieldValue
            )}
          </Container>
        );
      }}
    </Formik>
  );
};

export default LoggedinRepresentedProfile;
