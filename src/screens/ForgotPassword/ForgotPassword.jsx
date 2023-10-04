import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DismissKeyboardHOC from "../../hoc/DismissKeyboardHOC";
import { TITLE_STYLE, FONT_SIZE } from "../../constants/styles";

import { Container, Background } from "./ForgotPassword.styles";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import Text from "../../components/Text/Text";
import MailCode from "./MailCode";
import ResetPassword from "./ResetPassword";
import BackButton from "../../components/Buttons/BackButton";

const backgroundImage = require("../../../assets/background-image.png");

const ForgotPassword = ({ navigation }) => {
  const [currentStage, setCurrentStage] = useState("mailcode");
  const [email, setEmail] = useState("");

  const getCurrentStage = () => {
    switch (currentStage) {
      case "mailcode":
        return (
          <MailCode
            nextStage={(userEmail) => {
              setEmail(userEmail);
              setCurrentStage("resetPassword");
            }}
            setEmail={setEmail}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            nextStage={() => navigation.navigate("Login")}
            email={email}
          />
        );
      default:
        return <MailCode />;
    }
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
          <Text text="איפוס סיסמה" style={[TITLE_STYLE, { marginTop: 15 }]} />
          {getCurrentStage()}
        </DismissKeyboardHOC>
      </Container>
    </Background>
  );
};

export default ForgotPassword;
