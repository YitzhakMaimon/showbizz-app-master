import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { CheckBox } from "react-native-elements";
import { Keyboard, Dimensions, Platform } from "react-native";
import { TITLE_STYLE, FONT_SIZE } from "../../constants/styles";
import {
  email,
  name,
  phone_number,
  custom_categories,
  custom_role,
} from "../../constants/yupValidators";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Input from "../../components/Inputs/Input";
import Text from "../../components/Text/Text";
import LargeRoundedButton from "../../components/Buttons/LargeRounded";
import Dropdown from "../../components/Dropdown/Dropdown";
import ButtonsGroupWrapper from "../../components/Buttons/ButtonsGroupWrapper";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";
import KeyboardAvoidingViewHOC from "../../hoc/KeyboardAvoidingViewHOC";
import BackButton from "../../components/Buttons/BackButton";

import {
  Container,
  ForgotPasswordButton,
  FormContainer,
  ButtonsContainer,
  Background,
  CheckBoxText,
} from "./Register.styles";

const userDefaultSchema = {
  email,
  name,
  phone_number,
};

const CandidateSchema = Yup.object().shape({
  ...userDefaultSchema,
  "custom:categories": custom_categories,
});

const ClientSchema = Yup.object().shape({
  ...userDefaultSchema,
  "custom:role": custom_role,
});

const backgroundImage = require("../../../assets/background-image.png");

const Register = ({ navigation }) => {
  const [isClient, setIsClient] = useState(1);
  const [open, setOpen] = useState(false);
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
  const [isTermsError, setIsTermsError] = useState(false);
  const emailInput = useRef(null);
  const phoneNumberInput = useRef(null);
  const roleInput = useRef(null);

  return (
    <Background source={backgroundImage}>
      <Container>
        <KeyboardAvoidingViewHOC>
          <DismissKeyboardHOC>
            <HeaderButtons
              rightText=""
              leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
              onLeftClick={() => navigation.goBack()}
              leftText={<BackButton />}
            />
            <Text
              text="הרשמה"
              style={[TITLE_STYLE, Platform.OS !== "ios" && { marginTop: 0 }]}
            />
            <Formik
              initialValues={{
                email: "",
                name: "",
                phone_number: "",
                "custom:categories": [],
                "custom:role": "",
              }}
              onSubmit={(values) => {
                if (isAcceptedTerms) {
                  setIsTermsError(false);
                  navigation.navigate("RegisterPassword", {
                    values: { ...values, isClient: isClient === 1 },
                  });
                } else {
                  setIsTermsError(true);
                }
              }}
              validationSchema={isClient === 1 ? CandidateSchema : ClientSchema}
            >
              {(props) => {
                const {
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                } = props;
                return (
                  <FormContainer keyboardShouldPersistTaps="never">
                    <ButtonsGroupWrapper
                      isClient={isClient}
                      setIsClient={setIsClient}
                    />
                    <Field
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      onFocus={() => setOpen(false)}
                      placeholder="שם מלא"
                      component={Input}
                      onSubmitEditing={() => emailInput.current.focus()}
                      error={errors.name && touched.name}
                      style={{
                        marginTop: Dimensions.get("window").height * 0.06,
                      }}
                    />
                    <Field
                      onChangeText={handleChange("email")}
                      onFocus={() => setOpen(false)}
                      onBlur={handleBlur("email")}
                      placeholder="כתובת מייל"
                      component={Input}
                      innerRef={emailInput}
                      autoCompleteType="email"
                      keyboardType="email-address"
                      onSubmitEditing={() => phoneNumberInput.current.focus()}
                      error={errors.email && touched.email}
                    />
                    <Field
                      onChangeText={handleChange("phone_number")}
                      onBlur={handleBlur("phone_number")}
                      placeholder="נייד"
                      onFocus={() => setOpen(false)}
                      component={Input}
                      keyboardType="phone-pad"
                      autoCompleteType="tel"
                      returnKeyType="done"
                      innerRef={phoneNumberInput}
                      onSubmitEditing={() =>
                        isClient === 1
                          ? Keyboard.dismiss()
                          : roleInput.current.focus()
                      }
                      error={errors.phone_number && touched.phone_number}
                    />
                    {isClient === 1 ? (
                      <Field
                        onChange={(item) => {
                          setFieldValue("custom:categories", item);
                        }}
                        component={Dropdown}
                        error={
                          errors["custom:categories"] &&
                          touched["custom:categories"]
                        }
                        setOpen={setOpen}
                        open={open}
                        value={values["custom:categories"]}
                      />
                    ) : (
                      <Field
                        onChangeText={handleChange("custom:role")}
                        onBlur={handleBlur("custom:role")}
                        placeholder="תפקיד"
                        component={Input}
                        returnKeyType="done"
                        innerRef={roleInput}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        error={errors["custom:role"] && touched["custom:role"]}
                      />
                    )}
                    <CheckBox
                      right
                      title={
                        <CheckBoxText>
                          <Text
                            text=" לתקנון תנאי השימוש"
                            style={{ textDecorationLine: "underline" }}
                          />
                          <Text text="קראתי והסכמתי" />
                        </CheckBoxText>
                      }
                      iconRight
                      checked={isAcceptedTerms}
                      onPress={() => setIsAcceptedTerms(!isAcceptedTerms)}
                      iconType="ionicon"
                      checkedIcon="md-checkbox-outline"
                      uncheckedIcon="square-outline"
                      checkedColor="white"
                      uncheckedColor={isTermsError ? "#FF8A1F" : "white"}
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 0,
                        marginRight: 0,
                        paddingRight: 0,
                        marginTop: Dimensions.get("window").height * 0.05,
                      }}
                    />
                    <ButtonsContainer>
                      <LargeRoundedButton text="המשך" onPress={handleSubmit} />
                    </ButtonsContainer>
                  </FormContainer>
                );
              }}
            </Formik>
            <ForgotPasswordButton onPress={() => navigation.navigate("Login")}>
              <Text
                text="יש לך כבר חשבון? התחבר"
                style={{
                  textDecorationLine: "underline",
                  textAlign: "center",
                }}
              />
            </ForgotPasswordButton>
          </DismissKeyboardHOC>
        </KeyboardAvoidingViewHOC>
      </Container>
    </Background>
  );
};

export default Register;
