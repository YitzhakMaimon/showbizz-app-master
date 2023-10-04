import React, { useState } from "react";
import { Formik, Field } from "formik";
import { Keyboard } from "react-native";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/styles";
import { password, mailResetPasswordCode } from "../../constants/yupValidators";

import Input from "../../components/Inputs/Input";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";
import Text from "../../components/Text/Text";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";

import { FormContainer } from "./ForgotPassword.styles";

const ResetPasswordSchema = Yup.object().shape({
  password,
  code: mailResetPasswordCode,
});

const ResetPassword = ({ email, navigation }) => {
  const [loading, setLoading] = useState(false);

  const onError = (err) => {
    Toast.show({
      text1: "שגיאה",
      text2:
        err.code === "LimitExceededException"
          ? "יותר מידי ניסיונות איפוס - נא נסה שנית מאוחר יותר"
          : "משתמש לא קיים",
      type: "error",
    });
  };

  const onSuccess = () => {
    Toast.show({
      text1: "איפוס סיסמה",
      text2: "הסיסמה אופסה בהצלחה!",
    });
    navigation.navigate("Login");
  };

  return (
    <DismissKeyboardHOC>
      <Formik
        initialValues={{ code: "", password: "" }}
        onSubmit={(values) => {
          Keyboard.dismiss();
          setLoading(true);
          Auth.forgotPasswordSubmit(email, values.code, values.password)
            .then(() => onSuccess())
            .catch((err) => onError(err));

          setLoading(false);
        }}
        validationSchema={ResetPasswordSchema}
      >
        {(props) => {
          const { touched, handleSubmit, errors, handleBlur, handleChange } =
            props;
          return (
            <FormContainer>
              <Field
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                placeholder="קוד"
                component={Input}
                keyboardType="postal-code"
                returnKeyType="next"
                onSubmitEditing={() => {}}
                error={errors.code && touched.code}
              />
              <Field
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                placeholder="סיסמה"
                autoCompleteType="password"
                component={Input}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                error={errors.password && touched.password}
              />
              {errors.password && touched.password && (
                <Text
                  text="אורך הסיסמה חייב להיות לפחות 9 תווים"
                  style={{ textAlign: "right", color: COLORS.ORANGE }}
                />
              )}
              <LargeRoundedButton
                text="החלף סיסמה"
                isLoading={loading}
                onPress={handleSubmit}
                styles={{ marginTop: 150 }}
              />
            </FormContainer>
          );
        }}
      </Formik>
    </DismissKeyboardHOC>
  );
};

export default ResetPassword;
