import React, { useRef } from "react";
import { Keyboard, Dimensions } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";

import { registerUser, userSelector } from "../../store/userSlice";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";
import { TITLE_STYLE, COLORS, FONT_SIZE } from "../../constants/styles";
import { password, passwordConfirm } from "../../constants/yupValidators";
import BackButton from "../../components/Buttons/BackButton";

import {
  Container,
  FormContainer,
  Background,
} from "./RegisterPassword.styles";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Input from "../../components/Inputs/Input";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";
import Text from "../../components/Text/Text";

const RegisterPasswordSchema = Yup.object().shape({
  password,
  passwordConfirm: passwordConfirm("password"),
});

const backgroundImage = require("../../../assets/background-image.png");

const RegisterPassword = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const confirmPassword = useRef(null);
  const { loading } = useSelector(userSelector);

  const attributes = !route.params.values.isClient
    ? { gender: "זכר", "custom:role": route.params.values["custom:role"] }
    : {
        "custom:categories": JSON.stringify(
          route.params.values["custom:categories"]
        ),
        "custom:height": "160",
        address: "",
        gender: "זכר",
        "custom:age": "18",
        website: "",
        "custom:mobility": JSON.stringify(true),
        "custom:experience": "",
      };

  const onSuccess = () => {
    Toast.show({
      text1: "הרשמה",
      text2: "נרשמת בהצלחה ממתין לאישור",
    });
  };

  return (
    <Background source={backgroundImage}>
      <Container>
        <DismissKeyboardHOC>
          <HeaderButtons
            rightText=""
            leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
            onLeftClick={() => navigation.goBack()}
            leftText={<BackButton />}
          />
          <Text
            text="הרשמה"
            style={[
              TITLE_STYLE,
              { marginTop: Dimensions.get("window").height * 0.018 },
            ]}
          />
          <Formik
            initialValues={route.params.values}
            onSubmit={async (values) => {
              Keyboard.dismiss();
              await dispatch(
                registerUser({
                  username: route.params.values.email,
                  password: values.password,
                  attributes: {
                    ...attributes,
                    name: route.params.values.name,
                    phone_number: "+972" + route.params.values.phone_number,
                    gender: "",
                  },
                  clientMetadata: {
                    group: !route.params.values.isClient
                      ? "clients"
                      : "represented",
                  },
                })
              );
              onSuccess();
              navigation.navigate("Login");
            }}
            validationSchema={RegisterPasswordSchema}
          >
            {(props) => {
              const {
                touched,
                handleSubmit,
                errors,
                handleBlur,
                handleChange,
              } = props;
              return (
                <FormContainer>
                  <Field
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    placeholder="סיסמה"
                    autoCompleteType="password"
                    component={Input}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPassword.current.focus()}
                    error={errors.password && touched.password}
                  />
                  {errors.password && touched.password && (
                    <Text
                      text="אורך הסיסמה חייב להיות לפחות 9 תווים"
                      style={{ textAlign: "right", color: COLORS.ORANGE }}
                    />
                  )}
                  <Field
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={handleBlur("passwordConfirm")}
                    secureTextEntry
                    placeholder="אימות סיסמה"
                    innerRef={confirmPassword}
                    autoCompleteType="password"
                    component={Input}
                    returnKeyType="send"
                    error={errors.passwordConfirm && touched.passwordConfirm}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <Text
                      text="הסיסמאות לא זהות"
                      style={{ textAlign: "right", color: COLORS.ORANGE }}
                    />
                  )}
                  <LargeRoundedButton
                    text="יצירת חשבון"
                    isLoading={loading}
                    onPress={handleSubmit}
                    styles={{
                      marginTop: Dimensions.get("window").height * 0.25,
                    }}
                  />
                </FormContainer>
              );
            }}
          </Formik>
        </DismissKeyboardHOC>
      </Container>
    </Background>
  );
};

export default RegisterPassword;
