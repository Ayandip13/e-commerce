
import {
  FlatList,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { addToBookmark, removeBookmark } from "../redux/BookmarkReducer";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
import * as Notifications from "expo-notifications";
import Colors from "../constants/Colors";

const OrderedItem = () => {
  const route = useRoute();
  const itemsWithProduct = (route?.params as any)?.order?.products || [];
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: any) => state.bookmark.bookmarks);

  const formattedDate = new Date(
    (route?.params as any)?.order?.createdAt
  ).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleOrderPlaced = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Cancellation 😐",
        body: "Order can't be Cancelled, as it has already been Delivered!",
      },
      trigger: null,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <FlatList
        data={itemsWithProduct}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: width,
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={{ uri: item?.image }}
              style={{
                width: width * 0.85,
                height: width * 0.85,
                resizeMode: "contain",
                borderRadius: 10,
                alignSelf: "center",
                marginBottom: -30,
              }}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View
                style={{
                  position: "absolute",
                  top: 30,
                  left: 0,
                  backgroundColor: Colors.accent,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  justifyContent: "center",
                  zIndex: 10,
                  ...Colors.cardShadow,
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  20% OFF
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d0d0d0",
                  borderRadius: 50,
                  height: width * 0.11,
                  width: width * 0.11,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/share.png")}
                  style={{
                    width: width * 0.07,
                    height: width * 0.07,
                    resizeMode: "contain",
                    borderRadius: 10,
                    alignSelf: "center",
                    position: "absolute",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width * 0.9,
                height: 1,
                backgroundColor: "#E0E0E0",
                marginVertical: 15,
              }}
            />

            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: Colors.textPrimary,
              }}
            >
              {item?.name}
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: Colors.accent,
                }}
              >
                ₹ {item?.price}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              >
                Qty: {item?.quantity}
              </Text>
            </View>

            <View
              style={{
                width: width * 0.9,
                height: 1,
                backgroundColor: "#E0E0E0",
                marginVertical: 15,
              }}
            />

            <View>
              <TouchableOpacity
                onPress={() => {
                  handleOrderPlaced();
                }}
              >
                <LinearGradient
                  colors={Colors.buttonGradient as any}
                  style={{
                    paddingVertical: 14,
                    borderRadius: 8,
                    alignItems: "center",
                    ...Colors.cardShadow,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      textAlign: "center",
                      color: Colors.white,
                    }}
                  >
                    Cancel Order
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "700", fontSize: 18, color: Colors.textPrimary }}>
                  Delivery Address:{" "}
                </Text>
                <Text style={{ fontSize: 16, color: Colors.textSecondary }}>
                  {(route?.params as any)?.order?.shippingAddress?.landmark},{" "}
                  {(route?.params as any)?.order?.shippingAddress?.street}
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
                  Pin Code:
                </Text>
                <Text style={{ fontSize: 16, color: Colors.textSecondary }}>
                  {(route?.params as any)?.order?.shippingAddress?.postalCode}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
                Delivery to:{" "}
              </Text>
              <Text style={{ fontSize: 16, color: Colors.textSecondary }}>
                {(route?.params as any)?.order?.shippingAddress?.name}
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
                Total amount:{" "}
              </Text>
              <Text style={{ fontSize: 16, color: Colors.accent, fontWeight: "700" }}>
                ₹ {(route?.params as any)?.order?.totalPrice}
              </Text>
            </View>

            <View
              style={{
                width: width * 0.9,
                height: 1,
                backgroundColor: "#E0E0E0",
                marginVertical: 2,
              }}
            />
            <View
              style={{
                width: width * 0.9,
                height: 1,
                backgroundColor: "#E0E0E0",
              }}
            />

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.textPrimary }}>
                Payment Method:{" "}
              </Text>
              <Text style={{ fontWeight: "700", fontSize: 18, color: "#22C55E" }}>
                {(route?.params as any)?.order?.paymentMethod}
              </Text>
              <Entypo name="credit-card" size={20} color={Colors.textPrimary} />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 17, color: "gray" }}>
                Ordered on: {formattedDate}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderedItem;
