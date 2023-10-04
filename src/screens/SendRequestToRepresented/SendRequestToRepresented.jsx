import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Keyboard } from "react-native";
import { Formik, Field } from "formik";
import notifyRepresentedChosen from "../../utils/actions/notifyRepresentedChosen";
import { TITLE_STYLE } from "../../constants/styles";
import {
  email,
  phone_number,
  production,
  project,
  salary,
  location,
  custom_categories,
  description,
} from "../../constants/yupValidators";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Text from "../../components/Text/Text";
import InputWithDescription from "../../components/Inputs/InputWithDescription";
import RadioButtonsWithTitle from "../../components/RadioButtonsWithTitle/RadioButtonsWithTitle";
import MultiLineInput from "../../components/Inputs/MultiLine";
import Dropdown from "../../components/Dropdown/DropdownWithDescription";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";
import KeyboardAvoidingViewHOC from "../../hoc/KeyboardAvoidingViewHOC";

import {
  Container,
  Spacer,
  PostDataContainer,
} from "./SendRequestToRepresented.styles";

const RequestToRepresentedSchema = Yup.object().shape({
  email,
  production,
  project,
  salary,
  location,
  phonenumber: phone_number,
  description,
  categories: custom_categories,
});

const SendRequestToRepresented = ({ route, navigation }) => {
  const [mobility, setMobility] = useState(true);
  const projectRef = useRef(null);
  const locationRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  return (
    <Formik
      initialValues={{
        categories: [],
        email: "",
        production: "",
        project: "",
        salary: "",
        location: "",
        phonenumber: "",
        description: "",
      }}
      onSubmit={async (values) => {
        await notifyRepresentedChosen(
          route.params.represented.Username,
          values
        );
        navigation.navigate("Home");
      }}
      validationSchema={RequestToRepresentedSchema}
    >
      {(props) => {
        const {
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          handleReset,
          values,
        } = props;
        return (
          <Container>
            <KeyboardAvoidingViewHOC multiLineInput>
              <DismissKeyboardHOC>
                <HeaderButtons
                  onLeftClick={() => {
                    handleReset();
                    navigation.goBack();
                  }}
                  rightText="שלח"
                  onRightClick={handleSubmit}
                />
                <Text text="שליחת בקשה למיוצג" style={TITLE_STYLE} />
                <Spacer />
                <PostDataContainer
                  contentContainerStyle={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    paddingRight: "5%",
                    paddingLeft: "5%",
                  }}
                  style={{ marginBottom: 150 }}
                >
                  <Field
                    onChangeText={handleChange("production")}
                    onBlur={handleBlur("production")}
                    description="הפקה"
                    component={InputWithDescription}
                    value={values.production}
                    onSubmitEditing={() => projectRef.current.focus()}
                    error={errors.production && touched.production}
                  />
                  <Field
                    onChangeText={handleChange("project")}
                    onBlur={handleBlur("project")}
                    description="פרויקט"
                    component={InputWithDescription}
                    innerRef={projectRef}
                    value={values.project}
                    onSubmitEditing={Keyboard.dismiss}
                    error={errors.project && touched.project}
                  />
                  <Field
                    onChange={(item) => {
                      setFieldValue("categories", item);
                    }}
                    component={Dropdown}
                    error={errors.categories && touched.categories}
                    value={values.categories}
                  />
                  <Field
                    onChangeText={handleChange("salary")}
                    onBlur={handleBlur("salary")}
                    description="שכר"
                    component={InputWithDescription}
                    value={values.salary}
                    onSubmitEditing={() => locationRef.current.focus()}
                    error={errors.salary && touched.salary}
                  />
                  <Field
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    description="מיקום"
                    component={InputWithDescription}
                    value={values.location}
                    innerRef={locationRef}
                    onSubmitEditing={() => phoneRef.current.focus()}
                    error={errors.location && touched.location}
                  />
                  <Field
                    onChangeText={handleChange("phonenumber")}
                    onBlur={handleBlur("phonenumber")}
                    description="נייד"
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    component={InputWithDescription}
                    innerRef={phoneRef}
                    returnKeyType="done"
                    value={values.phonenumber}
                    onSubmitEditing={() => emailRef.current.focus()}
                    error={errors.phonenumber && touched.phonenumber}
                  />
                  <Field
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    description="מייל"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    component={InputWithDescription}
                    value={values.email}
                    innerRef={emailRef}
                    onSubmitEditing={Keyboard.dismiss}
                    error={errors.email && touched.email}
                  />
                  <RadioButtonsWithTitle
                    selected={mobility}
                    onClickFirst={() => setMobility(true)}
                    onClickSecond={() => setMobility(false)}
                    text="ניידות"
                  />
                  <Field
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    inputDescription="תיאור"
                    component={MultiLineInput}
                    onSubmitEditing={Keyboard.dismiss}
                    error={errors.description && touched.description}
                  />
                </PostDataContainer>
              </DismissKeyboardHOC>
            </KeyboardAvoidingViewHOC>
          </Container>
        );
      }}
    </Formik>
  );
};

export default SendRequestToRepresented;
