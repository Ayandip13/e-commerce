import {
    Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const AddAddressScreen = () => {
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
        <TouchableOpacity>
          <Feather name="mic" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
