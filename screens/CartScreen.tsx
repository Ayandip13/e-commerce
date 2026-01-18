import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, removeCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import ShimmerText from "../components/ShimmerText";

const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();
  const incrementQuantity = (item: any) => {
    dispatch(addToCart(item));
  };

  const decrementQuantity = (item: any) => {
    dispatch(removeCart(item));
  };

  const removeFromCart = (item: any) => {
    dispatch(decrement(item));
  };

  // console.log("Cart is", cart);
  const totalPrice = cart
    .map((item: any) => item.price * item.quantity)
    .reduce((current: number, prev: number) => current + prev, 0);
  // console.log(totalPrice);
  //state is the store object, state.cart is the cart slice, state.cart.cart is the cart array
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: "#00ced1",
          paddingHorizontal: 10,
          paddingBottom: 15,
          paddingTop: 47,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
        onPress={() => navigation.navigate('SearchScreen' as never)}
      >
        <View
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
            <TextInput
              placeholder="Search Bookosaurus.in"
              placeholderTextColor="#808080"
              readOnly
            />
          </View>
        </View>
        <Pressable>
          <Feather name="mic" size={20} color="black" />
        </Pressable>
      </TouchableOpacity>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17 }}>Subtotal: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {totalPrice.toFixed(2)} ₹
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>EMI details Available</Text>
          <TouchableOpacity
            onPress={() => {
              if (cart.length > 0) {
                navigation.navigate("Confirm" as never);
              } else {
                ToastAndroid.show("Please Add Items ", ToastAndroid.SHORT);
              }
            }}
          >
            <LinearGradient
              colors={["#fcb900", "#ffe49b"]}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {cart.length > 0 ? (
                <Text style={{ fontSize: 16 }}>
                  Proceed to Buy {cart.length} items
                </Text>
              ) : (
                <Text style={{ fontSize: 16 }}>Proceed to Buy</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#000000",
          height: 0.5,
          width: "100%",
        }}
      />

      <View style={{ flex: 1, marginVertical: 10 }}>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
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
                    flexDirection: "row",
                  }}
                >
                  <ShimmerText
                    text="No Items in Cart"
                  />
                  <Text style={{ fontSize: 20 }}>
                    {" "}🛒
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
                        resizeMode="contain"
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
                        {item?.price} ₹
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

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    {item?.quantity === 1 ? (
                      <TouchableOpacity
                        onPress={() => removeFromCart(item)}
                        style={{
                          backgroundColor: "#e5f5ffff",
                          padding: 3,
                          borderRadius: 5,
                          width: 50,
                          alignItems: "center",
                          marginTop: 5,
                          marginLeft: 15,
                          marginBottom: 5,
                        }}
                      >
                        <AntDesign name="delete" size={22} color="black" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => decrementQuantity(item)}
                        style={{
                          backgroundColor: "#e5f5ffff",
                          padding: 3,
                          borderRadius: 5,
                          width: 50,
                          alignItems: "center",
                          marginTop: 5,
                          marginLeft: 15,
                          marginBottom: 5,
                        }}
                      >
                        <AntDesign name="minus" size={22} color="black" />
                      </TouchableOpacity>
                    )}
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item?.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(item)}
                      style={{
                        backgroundColor: "#e5f5ffff",
                        padding: 3,
                        borderRadius: 5,
                        width: 50,
                        alignItems: "center",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <AntDesign name="plus" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item)}
                      style={{
                        borderWidth: 0.5,
                        borderColor: "#bbe4ffff",
                        paddingHorizontal: 7,
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 10,
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 15,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        borderColor: "#bbe4ffff",
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 5,
                        backgroundColor: "#d3eeffff",
                      }}
                    >
                      <Text>Save for later</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        borderColor: "#bbe4ffff",
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 5,
                        backgroundColor: "#d3eeffff",
                      }}
                    >
                      <Text>See more like this</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
