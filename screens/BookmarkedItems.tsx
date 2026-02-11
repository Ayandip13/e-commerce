import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { API_URL } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import ShimmerText from "../components/ShimmerText";
import Colors from "../constants/Colors";

const BookmarkedItems = () => {
  const bookmarks = useSelector((state: any) => state.bookmark.bookmarks);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserType);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}orders/${userId}`);
      setOrders(res.data.orders);
      // console.log(res.data.orders);
    } catch (error) {
      // console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const orderedProducts = useMemo(() => {
    return orders.flatMap((order: any) =>
      order.products.map((product: any) => ({
        ...product,
        orderId: order._id,
        orderedAt: order.createdAt,
      }))
    );
  }, [orders]);

  const isItemOrdered = (bookmarkItem: any) => {
    return orderedProducts.some(
      (product: any) => product.name === bookmarkItem.title
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderItem = ({ item }: any) => {
    const oldPrice = Number(item.oldPrice);
    const price = Number(item.price);
    const discountPercent =
      oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
    const isAlreadyOrdered = isItemOrdered(item);

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.white,
          padding: 15,
          marginVertical: 8,
          marginHorizontal: 15,
          borderRadius: 12,
          ...Colors.cardShadow,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: 120,
            height: 120,
          }}
          resizeMode="contain"
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: Colors.textPrimary,
              marginTop: 10,
            }}
          >
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

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: Colors.accent,
              }}
            >
              ₹{price}
            </Text>

            {discountPercent > 0 && (
              <Text
                style={{
                  fontSize: 13,
                  color: "#22C55E",
                  fontWeight: "600",
                }}
              >
                {discountPercent}% OFF
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              isAlreadyOrdered
                ? ToastAndroid.show(
                  "You have already ordered this item",
                  ToastAndroid.SHORT
                )
                : (navigation as any).navigate("InfoScreenBookmark", {
                  item,
                  discountPercent,
                });
            }}
          >
            <LinearGradient
              colors={isAlreadyOrdered ? [Colors.lightGray, Colors.lightGray] as any : Colors.buttonGradient as any}
              style={{
                marginTop: 12,
                width: "100%",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: isAlreadyOrdered ? Colors.textSecondary : Colors.white, fontWeight: "bold" }}>
                {isAlreadyOrdered ? "Already Bought" : "Wanna Buy?"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item: any) => item.productId || item._id || item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: bookmarks.length === 0 ? 1 : undefined,
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ShimmerText text="No Bookmarked Items" />
            <Text style={{ fontSize: 20 }}>
              {" "}
              🕵️
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default BookmarkedItems;
