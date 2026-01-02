import { Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../api";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const { userId } = useContext(UserType);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: "#00ced1" },
      headerLeft: () => (
        <Image
          source={require("../assets/amazon.png")}
          resizeMode="contain"
          style={{ width: 100, height: 40 }}
        />
      ),
      headerRight: () => (
        <>
          <Image
            source={require("../assets/bell.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Image
            source={require("../assets/search.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </>
      ),
    });
  }, [navigation]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}profile/${userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login" as never);
      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log("error", error);
      ToastAndroid.show("Error logging out", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home" as never)}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>Buy Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
