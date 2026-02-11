import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
const OrderScreen = () => {
  const navigation = useNavigation();
  const handleOrderPlaced = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order placed 📦",
        body: "Your order was successful!",
      },
      trigger: null,
    });
  };
  useEffect(() => {
    const placeFlow = async () => {
      await handleOrderPlaced();
      navigation.navigate("Main" as never);
    };

    const timer = setTimeout(placeFlow, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
      <LottieView
        style={{
          height: 200,
          width: 200,
        }}
        autoPlay
        loop={false}
        speed={0.8}
        source={require("../assets/thumbs.json")}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          textAlign: "center",
          color: Colors.textPrimary,
          marginTop: 20,
        }}
      >
        Order Successfully Placed!
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: Colors.textSecondary,
          textAlign: "center",
          marginTop: 10,
          lineHeight: 22,
        }}
      >
        Thank you for shopping with us. Your items are on the way!
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        autoPlay
        style={{
          height: 400,
          width: 400,
          alignSelf: "center",
          top: 50,
          position: "absolute",
        }}
        speed={1}
      />
    </View>
  );
};

export default OrderScreen;
