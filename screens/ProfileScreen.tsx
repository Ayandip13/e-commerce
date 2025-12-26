import { Image, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
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
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Image
            source={require("../assets/search.png")}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
        </>
      ),
    });
  });
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
