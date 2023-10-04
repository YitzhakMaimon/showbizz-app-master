import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import equal from "deep-equal";
import { userSelector, updateUserAttributes } from "../../store/userSlice";
import { fetchUserPosts } from "../../store/postsSlice";
import { TITLE_STYLE } from "../../constants/styles";
import {
  email,
  name,
  phone_number,
  custom_role,
  picture,
  gender,
} from "../../constants/yupValidators";

import Text from "../Text/Text";
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import Menu from "../Menu/Menu";
import BasicData from "./BasicData/BasicData";
import ClientPosts from "./ClientPosts/ClientPosts";
import BackButton from "../Buttons/BackButton";
import { checkIfObjectExists } from "../../utils/checkIfPropertyExists";

import { Container } from "./LoggedinClientProfile.styles";

const menuOptions = ["הפוסטים שלי", "פרטים אישיים"];

const ClientSchema = Yup.object().shape({
  email,
  name,
  phone_number,
  "custom:role": custom_role,
  gender,
  picture,
});

const LoggedinClientProfile = ({ navigation }) => {
  const [selectedView, setSelectedView] = useState("פרטים אישיים");
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchUserPosts(user.username));
  }, []);

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
        return <ClientPosts navigation={navigation} />;
      case menuOptions[1]:
        return (
          <BasicData
            touched={touched}
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
            touched={touched}
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
    "custom:role": checkIfObjectExists(user, "custom:role"),
    gender: checkIfObjectExists(user, "gender"),
    picture: checkIfObjectExists(user, "picture"),
    address: checkIfObjectExists(user, "address"),
    phone_number: user.phone_number,
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      onSubmit={async (values) => {
        await dispatch(
          updateUserAttributes({
            ...values,
            "custom:role": "custom:role",
          })
        );
        navigation.navigate("Home");
      }}
      enableReinitialize
      validationSchema={ClientSchema}
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
                setIsChanged(!equal(initialValues, values));
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

export default LoggedinClientProfile;
