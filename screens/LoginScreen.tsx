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
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  // TODO:Use different stack for authentication and main app.. and move this logic to root navigator
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Main" }],
            })
          );
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "An error occurred while checking login status.");
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        ToastAndroid.show("Please fill in all the fields.", ToastAndroid.SHORT);
        return;
      }
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
          return;
        }
      }

      setLoading(true);
      const user = {
        email: email.trim(),
        password: password.trim(),
      };
      const response = await axios.post(
        "http://192.168.0.100:8000/login",
        user
      );
      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);

      console.log(response);
      ToastAndroid.show(
        "Logged in successfully! Welcome back.",
        ToastAndroid.SHORT
      );
      setEmail("");
      setPassword("");

      //Completely reset the navigation stack — remove all previous screens.
      //TODO:Use different stack for authentication and main app
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed", "Please try again.");
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
            Login in to your account
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

        <View
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
        </View>

        <View style={{ marginTop: 40, alignItems: "center" }} />
        <TouchableOpacity
          onPress={handleLogin}
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
            <Text style={{ color: "white", fontWeight: "600" }}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: "gray" }}>
            Don't have an account?{" "}
            <Text
              style={{
                color: "#007fff",
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Register" as never)}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
