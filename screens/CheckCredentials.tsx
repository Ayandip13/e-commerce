import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

const CheckCredentials = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const { userId } = useContext(UserType);

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}profile/${userId}`);
      // console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      // console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#d3d3d3",
        }}
      />
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Name:</Text>
          <Text style={{ fontSize: 16 }}>{user.name}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email:</Text>
          <Text style={{ fontSize: 16 }}>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: Colors.primary,
          padding: 10,
          width: "80%",
          alignSelf: "center",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={() => navigation.navigate("EditProfile" as never)}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 15,
          }}
        >
          Edit Credentials
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckCredentials;
