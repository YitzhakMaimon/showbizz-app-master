import React from "react";
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MultiLine from "../Inputs/MultiLine";
import LargeRoundedButton from "../Buttons/LargeRounded";

const ContactUsModal = ({ modalVisible, close }) => (
  <Modal
    animationType="slide"
    transparent
    visible={modalVisible}
    onRequestClose={close}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={close}
          style={{ position: "absolute", left: 15, top: 15 }}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <MultiLine inputDescription="צור קשר" />
        <LargeRoundedButton
          text="שלח"
          small
          onPress={() => {
            close();
          }}
          styles={{
            marginTop: 15,
          }}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    backgroundColor: "#171717",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ContactUsModal;
