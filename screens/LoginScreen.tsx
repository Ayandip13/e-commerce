import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 100, marginBottom: 10 }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 170, height: 70 }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Login in to your account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput placeholder="Enter your Email" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
