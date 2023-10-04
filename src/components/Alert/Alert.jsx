import { Alert } from "react-native";

const AlertWrapper = ({ cancelText, acceptText, acceptAction }) => {
  Alert.alert(
    "האם אתה בטוח?",
    "My Alert Msg",
    [
      {
        text: { cancelText },
        style: "cancel",
      },
      { text: { acceptText }, onPress: acceptAction },
    ],
    { cancelable: false }
  );
};

export default AlertWrapper;
