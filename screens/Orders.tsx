import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { API_URL } from "../api";
import ShimmerText from "../components/ShimmerText";

export default function Orders() {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}orders/${userId}`);
      if (res.data.orders) {
        setOrders(res.data.orders);
        // Debugging: Notify user of count
        // ToastAndroid.show(`Fetched ${res.data.orders.length} orders`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error", error);
      // ToastAndroid.show("Failed to fetch orders", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        getOrders();
      }
    }, [userId])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: "#00ced1" },
      headerLeft: () => (
        <Image
          source={require("../assets/Bookosaurus.png")}
          resizeMode="contain"
          style={{
            width: 130,
            height: 60,
            marginRight: 50,
          }}
        />
      ),
      headerRight: () => (
        <>
          <Image
            source={require("../assets/bell.png")}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen" as never)}>
            <Image
              source={require("../assets/search.png")}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
          </TouchableOpacity>
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

        {loading && !refreshing ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <ShimmerText
              text="Loading Orders..."
            />
          </View>
        ) : orders.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressBackgroundColor="#dafeffff"
              />
            }
          >
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
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
