import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Keyboard, Dimensions, StatusBar, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import Toast from "react-native-toast-message";
import { loginUser, userSelector } from "../../store/userSlice";
import { UNKNOWN_ERROR, USET_EXISTS_ERROR } from "../../constants/alerts";
import { TITLE_STYLE, FONT_SIZE } from "../../constants/styles";
import { password, email } from "../../constants/yupValidators";

import Input from "../../components/Inputs/Input";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";
import Text from "../../components/Text/Text";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";

import {
  Container,
  InputsContainer,
  ForgotPasswordButton,
  FormContainer,
  ButtonsContainer,
  Background,
} from "./Login.styles";

const LoginSchema = Yup.object().shape({
  password,
  email,
});

const backgroundImage = require("../../../assets/background-image.png");

const Login = ({ navigation }) => {
  const passwordInput = useRef(null);
  const dispatch = useDispatch();
  const { loading, error, errorMessage } = useSelector(userSelector);
  const insets = useSafeAreaInsets();
  const height =
    Platform.OS !== "ios" &&
    Dimensions.get("screen").height !== Dimensions.get("window").height &&
    StatusBar.currentHeight > 24
      ? Dimensions.get("window").height - StatusBar.currentHeight
      : Dimensions.get("window").height;
  useEffect(() => {
    if (error) {
      Toast.show({
        text1: "שגיאה",
        text2:
          errorMessage === "An account with the given email already exists."
            ? USET_EXISTS_ERROR
            : UNKNOWN_ERROR,
        type: "error",
      });
    }
  }, [error, loading]);

  return (
    <Background source={backgroundImage}>
      <Container>
        <DismissKeyboardHOC>
          <Text
            text="ברוכים הבאים"
            style={[
              TITLE_STYLE,
              {
                marginTop: height * 0.117 - insets.top,
              },
            ]}
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              Keyboard.dismiss();
              const user = {
                username: values.email,
                password: values.password,
              };
              dispatch(loginUser(user));
            }}
            validationSchema={LoginSchema}
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
                  <InputsContainer>
                    <Field
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="כתובת מייל"
                      component={Input}
                      autoCompleteType="email"
                      keyboardType="email-address"
                      onSubmitEditing={() => passwordInput.current.focus()}
                      error={errors.email && touched.email}
                    />
                    <Field
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry
                      placeholder="סיסמה"
                      innerRef={passwordInput}
                      autoCompleteType="password"
                      component={Input}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit}
                      error={errors.password && touched.password}
                    />
                    <ForgotPasswordButton
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text
                        text="שכחת סיסמה?"
                        style={{ fontSize: FONT_SIZE.SMALL }}
                      />
                    </ForgotPasswordButton>
                  </InputsContainer>
                  <ButtonsContainer>
                    <LargeRoundedButton
                      text="התחבר"
                      isLoading={loading}
                      onPress={handleSubmit}
                    />
                    <LargeRoundedButton
                      text="יצירת חשבון"
                      dark
                      onPress={() => navigation.navigate("Register")}
                    />
                  </ButtonsContainer>
                </FormContainer>
              );
            }}
          </Formik>
        </DismissKeyboardHOC>
      </Container>
    </Background>
  );
};

export default Login;
