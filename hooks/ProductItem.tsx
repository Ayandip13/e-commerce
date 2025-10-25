import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface itemprop {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductItemProps {
  item: itemprop;
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ marginHorizontal: 20, marginVertical: 10 }}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: "stretch" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>₹{item?.price}</Text>
        <Text style={{ fontWeight: "bold", color: "#ffc72c" }}>
          {item?.rating.rate} ratings
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
