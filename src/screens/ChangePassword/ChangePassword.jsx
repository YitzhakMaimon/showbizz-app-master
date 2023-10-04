import React, { useRef, useState } from "react";
import { Auth } from "aws-amplify";
import Toast from "react-native-toast-message";
import { Keyboard, ActivityIndicator } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";
import { TITLE_STYLE, COLORS } from "../../constants/styles";
import { password, passwordConfirm } from "../../constants/yupValidators";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Input from "../../components/Inputs/Input";
import Text from "../../components/Text/Text";

import { Container, FormContainer } from "./ChangePassword.styles";

const ChangePasswordSchema = Yup.object().shape({
  password,
  newPassword: password,
  newPasswordConfirm: passwordConfirm("newPassword"),
});

const ChangePassword = ({ navigation }) => {
  const newPassword = useRef(null);
  const confirmNewPassword = useRef(null);
  const [loading, setLoading] = useState(false);

  const onError = () => {
    Toast.show({
      text1: "שגיאה",
      text2: "נא נסה שנית מאוחר יותר",
      type: "error",
    });
  };

  const onSuccess = () => {
    Toast.show({
      text1: "שינוי סיסמה",
      text2: "הסיסמה שונתה בהצלחה",
    });

    navigation.navigate("Settings");
  };

  const changePassword = (oldPassword, newUserPassword) => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((user) => Auth.changePassword(user, oldPassword, newUserPassword))
      .then(onSuccess)
      .catch(onError);
    setLoading(false);
  };

  return (
    <Container>
      <DismissKeyboardHOC>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={(values) => {
            Keyboard.dismiss();
            changePassword(values.password, values.newPassword);
          }}
          validationSchema={ChangePasswordSchema}
        >
          {(props) => {
            const {
              touched,
              handleSubmit,
              errors,
              handleBlur,
              handleChange,
              handleReset,
            } = props;
            return (
              <FormContainer>
                <HeaderButtons
                  onRightClick={handleSubmit}
                  onLeftClick={() => {
                    handleReset();
                    navigation.goBack();
                  }}
                  containerStyle={{ margintop: 57 }}
                  rightText={
                    loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text text="שמור" />
                    )
                  }
                />
                <Text text="הגדרות חשבון" style={TITLE_STYLE} />
                <Field
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  placeholder="סיסמה נוכחית"
                  autoCompleteType="password"
                  component={Input}
                  returnKeyType="next"
                  onSubmitEditing={() => newPassword.current.focus()}
                  error={errors.password && touched.password}
                  style={{ marginTop: 100 }}
                />
                <Field
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  secureTextEntry
                  placeholder="סיסמה חדשה"
                  autoCompleteType="newPassword"
                  innerRef={newPassword}
                  component={Input}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmNewPassword.current.focus()}
                  error={errors.newPassword && touched.newPassword}
                />
                {errors.newPassword && touched.newPassword && (
                  <Text
                    text="אורך הסיסמה חייב להיות לפחות 9 תווים"
                    style={{ textAlign: "right", color: COLORS.ORANGE }}
                  />
                )}
                <Field
                  onChangeText={handleChange("newPasswordConfirm")}
                  onBlur={handleBlur("newPasswordConfirm")}
                  secureTextEntry
                  placeholder="אימות סיסמה"
                  innerRef={confirmNewPassword}
                  autoCompleteType="password"
                  component={Input}
                  returnKeyType="send"
                  error={
                    errors.newPasswordConfirm && touched.newPasswordConfirm
                  }
                />
                {errors.newPasswordConfirm && touched.newPasswordConfirm && (
                  <Text
                    text="הסיסמאות לא זהות"
                    style={{ textAlign: "right", color: COLORS.ORANGE }}
                  />
                )}
              </FormContainer>
            );
          }}
        </Formik>
      </DismissKeyboardHOC>
    </Container>
  );
};

export default ChangePassword;
