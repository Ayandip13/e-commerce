import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

const OrderedItem = () => {
  const route = useRoute();
  const item = route.params;
  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: "15%",
          paddingHorizontal: "7%",
        }}
      >
        <Image
          source={{ uri: item?.order?.products[0]?.image }}
          style={{ width: 350, height: 350 }}
          resizeMode="contain"
        />
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#ddd",
            height: 1,
            width: "100%",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginTop: 20,
          }}
        >
          {item?.order?.products[0]?.name}
        </Text>
      </View>
    </View>
  );
};

export default OrderedItem;

const styles = StyleSheet.create({});
