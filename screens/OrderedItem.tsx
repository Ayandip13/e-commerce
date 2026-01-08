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
const { width } = Dimensions.get("window");

const OrderedItem = () => {
  const route = useRoute();
  const itemsWithProduct = route?.params?.order?.products || [];
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: any) => state.bookmark.bookmarks);

  const formattedDate = new Date(
    route?.params?.order?.createdAt
  ).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
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
                  bottom: "650%",
                  left: 0,
                  backgroundColor: "#c60c30",
                  width: 45,
                  height: 45,
                  borderRadius: 22.5,
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: "bold",
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
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                ₹ {item?.price}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
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
                  ToastAndroid.show(
                    "Order can't be Cancelled",
                    ToastAndroid.SHORT
                  );
                }}
                style={{
                  alignSelf: "center",
                  backgroundColor: "#ffc72c",
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  shadowColor: "#f0c14b",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  width: width * 0.9,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Cancel Order
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Delivery Address:{" "}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "300" }}>
                  {route?.params?.order?.shippingAddress?.landmark},{" "}
                  {route?.params?.order?.shippingAddress?.street}
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Pin Code:
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "300" }}>
                  {route?.params?.order?.shippingAddress?.postalCode}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Delivery to:{" "}
              </Text>
              <Text style={{ fontSize: 17 }}>
                {route?.params?.order?.shippingAddress?.name}
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
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Total amount:{" "}
              </Text>
              <Text style={{ fontSize: 17 }}>
                ₹ {route?.params?.order?.totalPrice}
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
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Payment Method:{" "}
              </Text>
              <Text style={{ fontWeight: "400", fontSize: 20, color: "green" }}>
                {route?.params?.order?.paymentMethod}
              </Text>
              <Entypo name="credit-card" size={20} color="black" />
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
