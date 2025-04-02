// LoginPrompt.js
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";
import t from "../global-functions/t";
import * as GlobalVariables from "../config/GlobalVariableContext";

const LoginPrompt = ({ gotoScreen }) => {
  const navigation = useNavigation();
  const Variables = GlobalVariables.useValues();
  if (!Variables.is_login) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(Variables, "home_no_login")}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          gotoScreen("LoginScreen");
        }}
      >
        <Text style={styles.buttonText}>{t(Variables, "event_go_login")} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    height: 48,
    backgroundColor: "#0B152DA6",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: "#343cf6",
    width: 56,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 11,
  },
  text: {
    color: "white",
    marginRight: 10,
  },
});

export default LoginPrompt;
