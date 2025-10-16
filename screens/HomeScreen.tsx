import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <ScrollView style={{ marginTop: Platform.OS === "android" ? 25 : 0 }}>
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            gap: 10,
            borderRadius: 5,
            height: 40,
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Feather name="search" size={20} color="black" />
            <TextInput placeholder="Search Amazon.in" />
          </View>
        </Pressable>
        <Feather name="mic" size={20} color="black" />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 10,
          backgroundColor: "#afeeee",
        }}
      >
        <Ionicons name="location-outline" size={24} color="black" />
        <TouchableOpacity>
          <Text style={{ fontSize: 13, fontWeight: "500" }}>
            Deliver to Ayandip - Kolkata, 743165
          </Text>
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
