import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  // console.log("Cart is", cart);
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((current, prev) => current + prev, 0);
  console.log(totalPrice);
  //state is the store object, state.cart is the cart slice, state.cart.cart is the cart array
  return (
    <ScrollView style={{ marginTop: 40, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            gap: 10,
            borderRadius: 5,
            height: 40,
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Feather name="search" size={20} color="black" />
            <TextInput placeholder="Search Amazon.in" />
          </View>
        </Pressable>
        <TouchableOpacity>
          <Feather name="mic" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Subtotal: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {totalPrice.toFixed(2)}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>EMI details Available</Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            {cart.length > 0 ? (
              <Text style={{ fontSize: 16 }}>
                Proceed to Buy {cart.length} items
              </Text>
            ) : (
              <Text style={{ fontSize: 16 }}>Proceed to Buy</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#333",
          height: 1,
          width: "100%",
        }}
      />
      <View style={{ padding: 15 }}>
        <FlatList
          data={cart}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  No Items in Cart 🛒
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 0.5,
                  marginRight: 15,
                }}
                key={index}
              >
                <TouchableOpacity
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                  }}
                  activeOpacity={0.5}
                >
                  <View>
                    <Image
                      source={{ uri: item?.image }}
                      style={{ width: 140, height: 140 }}
                    />
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                      numberOfLines={3}
                    >
                      {item?.title}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item?.price}
                    </Text>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{
                        uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "green",
                      }}
                    >
                      In Stock
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CartScreen;
