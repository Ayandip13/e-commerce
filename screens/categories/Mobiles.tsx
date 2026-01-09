import {
  FlatList,
  Image,
  Text,
  View,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

interface itemData {
  id: number;
  title: string;
  oldPrice: number;
  price: number;
  image: string;
  carouselImages: string[];
  color: string;
  size: string;
}

const Mobiles = () => {
  const [data, setData] = useState<itemData[]>([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const response = await axios.get<{ products: itemData[] }>(
      "http://192.168.0.101:8000/categories/Mobiles?page=1"
    );
    setData(response.data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem: ListRenderItem<itemData> = ({ item }) => {
    const oldPrice = Number(item.oldPrice);
    const price = Number(item.price);
    const discountPercent =
      oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 1,
          borderRadius: 8,
          elevation: 2,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />

        <View
          style={{
            flex: 1,
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 10 }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#888",
              textDecorationLine: "line-through",
              marginTop: 6,
            }}
          >
            ₹{oldPrice}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                marginTop: 2,
              }}
            >
              ₹{price}
            </Text>

            {discountPercent > 0 && (
              <Text
                style={{
                  fontSize: 13,
                  color: "green",
                  fontWeight: "600",
                  marginTop: 4,
                }}
              >
                {discountPercent}% OFF
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductInfoScreen", item)}
          >
            <LinearGradient
              colors={["#8afdff", "#04cfd3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                alignItems: "center",
                borderRadius: 8,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  paddingVertical: 8,
                  paddingHorizontal: 50,
                }}
              >
                See Details
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Mobiles;
