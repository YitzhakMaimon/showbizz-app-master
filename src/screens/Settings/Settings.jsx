import React, { useState } from "react";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { signOut } from "../../store/userSlice";
import { TITLE_STYLE, FONT_SIZE } from "../../constants/styles";

import BackButton from "../../components/Buttons/BackButton";
import ContactUsModal from "../../components/ContactUsModal/ContactUsModal";
import Text from "../../components/Text/Text";
import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";

import { Container, OptionsContainer, Button } from "./Settings.styles";

const Settings = ({ navigation }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    Alert.alert(
      "האם אתה בטוח?",
      "הפעולה תנתק אותך מהמערכת",
      [
        {
          text: "בטל",
          style: "cancel",
        },
        { text: "התנתק", onPress: () => dispatch(signOut()) },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteCognitoUser = async () => {
    setLoading(true);
    const user = await Auth.currentAuthenticatedUser();
    user.deleteUser((error, data) => {
      if (error) {
        onError();
      }
      // do stuff after deletion
    });
    setLoading(false);
  };

  const accountDeleteHandler = () => {
    Alert.alert(
      "האם אתה בטוח?",
      "המשתמש וכל הפעולות שבוצעו ימחקו",
      [
        {
          text: "בטל",
          style: "cancel",
        },
        {
          text: "מחק",
          onPress: handleDeleteCognitoUser,
          disable: true,
        },
      ],
      { cancelable: false }
    );
  };

  const onError = () => {
    Toast.show({
      text1: "שגיאה",
      text2: "נא נסה שנית מאוחר יותר",
      type: "error",
    });
  };

  return (
    <Container>
      <HeaderButtons
        rightText=""
        leftStyle={{ color: "white", fontSize: FONT_SIZE.NORMAL }}
        onLeftClick={() => navigation.goBack()}
        leftText={<BackButton />}
      />
      <Text text="הגדרות" style={[TITLE_STYLE, { marginTop: 27 }]} />
      <OptionsContainer>
        <Button
          style={{ marginTop: 16 }}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text text="שינוי סיסמה" />
        </Button>
        <Button
          onPress={() => Linking.openURL("mailto:showbizzzinfo@gmail.com")}
        >
          <Text text="צור קשר" />
        </Button>
        <Button onPress={logoutHandler}>
          <Text text="התנתק" />
        </Button>
        <Button onPress={accountDeleteHandler}>
          <Text text="מחק חשבון" style={{ color: "#FF8A1F" }} />
        </Button>
      </OptionsContainer>
      <ContactUsModal
        modalVisible={showContactModal}
        close={() => setShowContactModal(false)}
      />
    </Container>
  );
};

export default Settings;
