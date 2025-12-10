import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main" as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LottieView
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.5}
        source={require("../assets/thumbs.json")}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        autoPlay
        style={{
          height: 300,
          width: 300,
          alignSelf: "center",
          top: 20,
          position: "absolute",
        }}
        speed={1}
        // loop={false}
      />
    </View>
  );
};

export default OrderScreen;
