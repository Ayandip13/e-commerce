import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get(`http://192.168.0.101:8000/orders/${userId}`);
      const filteredOrder = res.data.orders;
      setOrders(filteredOrder);
      // console.log(res.data.orders);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.101:8000/profile/${userId}`
      );
      const filteredUser = res.data.user;
      setUser(filteredUser);
      // console.log(res.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
    getOrders();
  }, []);
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
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "#00ced1",
      },
      headerLeft: () => (
        <Image
          source={require("../assets/amazon.png")}
          resizeMode="contain"
          style={{
            width: 100,
            height: 40,
          }}
        />
      ),
      headerRight: () => (
        <>
          <Image
            source={require("../assets/bell.png")}
            style={{
              width: 25,
              height: 25,
              marginRight: 10,
            }}
          />
          <Image
            source={require("../assets/search.png")}
            style={{
              width: 25,
              height: 25,
              marginRight: 10,
            }}
          />
        </>
      ),
    });
  });
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome {user?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
