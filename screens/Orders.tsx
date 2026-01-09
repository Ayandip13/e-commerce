import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { API_URL } from "../api";

export default function Orders() {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}profile/${userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
    getOrders();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: "#00ced1" },
      headerLeft: () => (
        <Image
          source={require("../assets/amazon.png")}
          resizeMode="contain"
          style={{ width: 100, height: 40 }}
        />
      ),
      headerRight: () => (
        <>
          <Image
            source={require("../assets/bell.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Image
            source={require("../assets/search.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("BookmarkedItems" as never)}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            Your Wishlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen" as never)}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>Buy Again</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: 15, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Your Orders
        </Text>

        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
              Loading...
            </Text>
          </View>
        ) : orders.length > 0 ? (
          <ScrollView showsHorizontalScrollIndicator={false}>
            {orders.map((order, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderedItem" as never, { order })
                }
                key={order._id || index}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderWidth: 0.5,
                  borderColor: "#30b3ff",
                  backgroundColor: "#fff",
                  shadowColor: "#30b3ff",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  marginBottom: 10,
                }}
              >
                {order.products?.map((product: any, pIndex: number) => (
                  <View
                    key={product._id || pIndex}
                    style={{
                      alignItems: "center",
                      marginBottom: 10,
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        backgroundColor: "#30b3ff",
                        width: 0.5,
                        height: 100,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 10,
                        paddingRight: 150,
                      }}
                      numberOfLines={2}
                    >
                      {product.name || "Product"}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
              No orders found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
