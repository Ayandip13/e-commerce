import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useNavigation();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Register to your account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: name ? 14 : 16,
              }}
              autoCapitalize="none"
              keyboardType="default"
              placeholder="Enter your Name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: email ? 14 : 16,
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <TouchableOpacity>
              <AntDesign
                onPress={() => setHidePassword(!hidePassword)}
                name={hidePassword ? "lock" : "unlock"}
                size={24}
                color="gray"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: password ? 14 : 16,
              }}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              placeholder="Enter your Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: "600" }}>
            Forgot Password?
          </Text>
        </View> */}

        <View style={{ marginTop: 40, alignItems: "center" }} />
        <TouchableOpacity
          style={{
            backgroundColor: "#febe10",
            paddingVertical: 15,
            alignItems: "center",
            borderRadius: 5,
            marginHorizontal: 80,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: "gray" }}>
            Already have an account?{" "}
            <Text
              style={{
                color: "#007fff",
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Login" as never)}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
