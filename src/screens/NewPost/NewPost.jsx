import React, { useState } from "react";
import * as Yup from "yup";
import { ActivityIndicator, Platform, FlatList } from "react-native";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { createPost, postsSelector, fetchPosts } from "../../store/postsSlice";
import { userSelector } from "../../store/userSlice";
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
import { IMAGE_PERMISSIONS } from "../../constants/alerts";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Title from "../../components/Title/Title";
import Line from "../../components/Line/Line";
import InputWithDescription from "../../components/Inputs/InputWithDescription";
import MultiLineInput from "../../components/Inputs/MultiLine";
import Dropdown from "../../components/Dropdown/DropdownWithDescription";
import KeyboardAvoidingViewHOC from "../../hoc/KeyboardAvoidingViewHOC";
import Text from "../../components/Text/Text";
import Image from "../../components/Image/Image";

import { Container, PostDataContainer, ImageButton } from "./NewPost.styles";

const NewPostSchema = Yup.object().shape({
  email,
  production,
  projectName: project,
  categories: custom_categories,
  salary,
  location,
  phoneNumber: phone_number,
  description,
});

const NewPost = ({ navigation }) => {
  const [postImages, setPostImages] = useState([]);
  const dispatch = useDispatch();
  const { username } = useSelector(userSelector);
  const { loading } = useSelector(postsSelector);

  const askForPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(IMAGE_PERMISSIONS);
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
        setPostImages([...postImages, result.uri]);
      }
    } catch (error) {}
  };

  return (
    <Formik
      initialValues={{
        postId: "",
        production: "",
        projectName: "",
        phoneNumber: "",
        salary: "",
        location: "",
        email: "",
        description: "",
        categories: [],
        images: [],
      }}
      onSubmit={(values) => {
        dispatch(
          createPost({ ...values, owner: username, images: postImages })
        ).then(() => {
          dispatch(fetchPosts()).then(() => {
            navigation.goBack();
          });
        });
      }}
      validationSchema={NewPostSchema}
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
        } = props;
        return (
          <Container>
            <KeyboardAvoidingViewHOC>
              <HeaderButtons
                onLeftClick={() => navigation.goBack()}
                onRightClick={handleSubmit}
                rightText={
                  loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text text="פרסם" />
                  )
                }
              />
              <Title titleText="העלאת מודעה חדשה" />
              <Line bigSpace />
              <PostDataContainer
                contentContainerStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  paddingRight: "5%",
                  paddingLeft: "5%",
                  paddingBottom: 150,
                }}
              >
                <Field
                  onChangeText={handleChange("production")}
                  onBlur={handleBlur("production")}
                  description="חברת הפקה"
                  component={InputWithDescription}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.production && touched.production}
                />
                <Field
                  onChangeText={handleChange("projectName")}
                  onBlur={handleBlur("projectName")}
                  description="פרויקט"
                  component={InputWithDescription}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.projectName && touched.projectName}
                />
                <Field
                  onChange={(item) => {
                    setFieldValue("categories", item);
                  }}
                  component={Dropdown}
                  error={errors["categories"] && touched["categories"]}
                  value={values["categories"]}
                />
                {values["categories"].includes("ילדים") && (
                  <Text text="*בתוספת 20%" style={{ color: "red" }} />
                )}
                <Field
                  onChangeText={handleChange("salary")}
                  onBlur={handleBlur("salary")}
                  description="שכר"
                  component={InputWithDescription}
                  keyboardType="numeric"
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.salary && touched.salary}
                />
                <Field
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  description="מיקום"
                  component={InputWithDescription}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.location && touched.location}
                />
                <Field
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  description="נייד"
                  component={InputWithDescription}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.phoneNumber && touched.phoneNumber}
                />
                <Field
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  description="מייל"
                  component={InputWithDescription}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.email && touched.email}
                />
                <Field
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  inputDescription="מה אני מחפש/ת (פירוט)"
                  component={MultiLineInput}
                  style={{ height: 200 }}
                  value={values.description}
                  // onSubmitEditing={() => emailInput.current.focus()}
                  error={errors.description && touched.description}
                />

                <ImageButton
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <Text text="הוספת תמונות" />
                </ImageButton>
                <FlatList
                  horizontal
                  keyExtractor={(item) => item}
                  data={postImages}
                  contentContainerStyle={{
                    marginTop: 20,
                  }}
                  renderItem={({ item }) => (
                    <Image
                      uri={{ uri: item }}
                      style={{
                        height: 183,
                        width: 112,
                        marginLeft: 10,
                      }}
                    />
                  )}
                />
              </PostDataContainer>
            </KeyboardAvoidingViewHOC>
          </Container>
        );
      }}
    </Formik>
  );
};

export default NewPost;
