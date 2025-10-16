import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Toast } from "toastify-react-native";

const RegisterScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        ToastAndroid.show("Please fill in all the fields.", ToastAndroid.SHORT);
        return;
      }
      //check if email valid or not
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
          return;
        }
      }

      setLoading(true);
      const user = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      const response = await axios.post(
        "http://192.168.0.102:8000/register",
        user
      );
      console.log(response.data);
      Toast.success("Registration Successful! Please log in.");
      setEmail("");
      setPassword("");
      setName("");
      navigation.navigate("Login" as never);
    } catch (error) {
      console.log(error);
      Alert.alert("Registration Failed", "Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={{ marginTop: 40, alignItems: "center" }} />
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#febe10",
            paddingVertical: 15,
            alignItems: "center",
            borderRadius: 5,
            marginHorizontal: 80,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "600" }}>Sign Up</Text>
          )}
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

export default RegisterScreen;

const styles = StyleSheet.create({});
