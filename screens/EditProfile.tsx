import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const EditProfile = () => {
  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#f5f5f5" }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ alignItems: "center", marginTop: 20 }}
        onPress={() => console.log("Edit Profile pressed")}
      >
        <Image
          source={require("../assets/person.png")}
          style={{ width: 150, height: 90, borderRadius: 50, marginTop: 20 }}
          resizeMode="contain"
          tintColor="#008e97"
        />
        <Entypo
          name="edit"
          size={25}
          color="#000"
          style={{
            position: "absolute",
            right: "35%",
            top: "80%",
          }}
        />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
          Edit Your Profile
        </Text>
        {/* Add form fields for editing profile information here */}
      </View>
    </View>
  );
};

export default EditProfile;
