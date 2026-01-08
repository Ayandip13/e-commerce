import { FlatList, Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { API_URL } from "../api";

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
      console.log("error", error);
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
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 10,
          borderRadius: 8,
          elevation: 2,
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
              fontSize: 15,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
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
            onPress={() => {
              isAlreadyOrdered
                ? ToastAndroid.show(
                  "You have already ordered this item",
                  ToastAndroid.SHORT
                )
                : navigation.navigate("InfoScreenBookmark" as never, {
                    item,
                    discountPercent,
                  });
            }}
            style={{
              marginTop: 10,
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: isAlreadyOrdered ? "#666" : "#000" }}>
              {isAlreadyOrdered ? "Already Bought" : "Wanna Buy?"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          elevation: 5,
          padding: 15,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Bookmarked Items
        </Text>
      </View>

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
            }}
          >
            <Text style={{ fontSize: 18, color: "#999" }}>
              No Bookmarked Items 😕
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default BookmarkedItems;
