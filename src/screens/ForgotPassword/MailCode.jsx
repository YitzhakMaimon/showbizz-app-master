import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import Toast from "react-native-toast-message";
import { email } from "../../constants/yupValidators";

import Input from "../../components/Inputs/Input";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";

import { FormContainer } from "./ForgotPassword.styles";

const MailCodeSchema = Yup.object().shape({
  email,
});

const MailCode = ({ nextStage }) => {
  const [loading, setLoading] = useState(false);

  const onError = () => {
    Toast.show({
      text1: "שגיאה",
      text2: "משתמש לא קיים",
      type: "error",
    });
  };

  const onSuccess = () => {
    Toast.show({
      text1: "שחזור סיסמה",
      text2: "קוד אימות נשלח אליכם למייל, אנא הזינו אותו בשלב הבא",
    });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        Keyboard.dismiss();
        setLoading(true);
        Auth.forgotPassword(values.email)
          .then((data) => onSuccess(data))
          .catch((err) => onError(err));

        setLoading(false);
        nextStage(values.email);
      }}
      validationSchema={MailCodeSchema}
    >
      {(props) => {
        const { touched, handleSubmit, errors, handleBlur, handleChange } =
          props;
        return (
          <FormContainer>
            <Field
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="כתובת מייל"
              component={Input}
              autoCompleteType="email"
              keyboardType="email-address"
              onSubmitEditing={handleSubmit}
              error={errors.email && touched.email}
            />
            <LargeRoundedButton
              text="שלח קוד"
              isLoading={loading}
              onPress={handleSubmit}
              styles={{ marginTop: 150 }}
            />
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default MailCode;
