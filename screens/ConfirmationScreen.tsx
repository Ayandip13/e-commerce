import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address From" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  return (
    <View>
      <Text>ConfirmationScreen</Text>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
