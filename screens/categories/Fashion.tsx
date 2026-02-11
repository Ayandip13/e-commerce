import {
  FlatList,
  Image,
  Text,
  View,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../api";
import ShimmerText from "../../components/ShimmerText";
import Colors from "../../constants/Colors";

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

const Fashion = () => {
  const [data, setData] = useState<itemData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation();

  const fetchData = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await axios.get<{ products: itemData[] }>(
        `${API_URL}categories/Fashion?page=${pageNumber}`
      );

      const newProducts = response.data.products;

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newProducts]);
        setPage(pageNumber);
      }
    } catch (error) {
      console.log("Fashion pagination error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
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
          backgroundColor: Colors.white,
          padding: 15,
          marginVertical: 5,
          borderRadius: 12,
          ...Colors.cardShadow,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />

        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.textPrimary }}>
            {item.title}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.gray,
              textDecorationLine: "line-through",
              marginTop: 4,
            }}
          >
            ₹{oldPrice}
          </Text>

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.accent }}>₹{price}</Text>

            {discountPercent > 0 && (
              <Text style={{ color: "#22C55E", fontWeight: "600", fontSize: 13 }}>
                {discountPercent}% OFF
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductInfoScreen" as never, { ...item, item: item } as never)
            }
          >
            <LinearGradient
              colors={Colors.buttonGradient as any}
              style={{
                alignItems: "center",
                borderRadius: 8,
                marginTop: 12,
              }}
            >
              <Text style={{ paddingVertical: 10, color: Colors.white, fontWeight: "600" }}>
                See Details
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingHorizontal: 15 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => fetchData(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ShimmerText text="Loading..." /> : null
        }
      />
    </View>
  );
};

export default Fashion;
