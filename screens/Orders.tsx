import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { API_URL } from "../api";
import ShimmerText from "../components/ShimmerText";
import { useQuery } from "@tanstack/react-query";

/* ---------------- FETCH FUNCTIONS ---------------- */

const fetchOrders = async (userId: string) => {
  const res = await axios.get(`${API_URL}orders/${userId}`);
  return res.data.orders || [];
};

const fetchUser = async (userId: string) => {
  const res = await axios.get(`${API_URL}profile/${userId}`);
  return res.data.user;
};

/* ---------------- COMPONENT ---------------- */

export default function Orders() {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);

  /* ---------------- USER DATA ---------------- */

  useEffect(() => {
    if (!userId) return;

    fetchUser(userId).then(setUser).catch(console.log);
  }, [userId]);

  /* ---------------- ORDERS WITH CACHE ---------------- */

  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchOrders(userId as string),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  /* ---------------- HEADER ---------------- */

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: "#00ced1" },
      headerLeft: () => (
        <Image
          source={require("../assets/Bookosaurus.png")}
          resizeMode="contain"
          style={{ width: 130, height: 60, marginRight: 50 }}
        />
      ),
      headerRight: () => (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification" as never)}
          >
            <Image
              source={require("../assets/bell.png")}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchScreen" as never)}
          >
            <Image
              source={require("../assets/search.png")}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);

  /* ---------------- UI ---------------- */

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" }}>
      {/* Top buttons */}
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

        {/* Loading */}
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <ShimmerText text="Loading Orders..." />
          </View>
        ) : orders.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
            }
          >
            {orders.map((order: any, index: number) => (
              <TouchableOpacity
                key={order._id || index}
                onPress={() =>
                  navigation.navigate("OrderedItem" as never, { order })
                }
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
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        marginLeft: 10,
                        paddingRight: 150,
                      }}
                    >
                      {product.name || "Product"}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
            }
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
              No orders found
            </Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}