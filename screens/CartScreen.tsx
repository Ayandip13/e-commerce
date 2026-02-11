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
import Colors from "../constants/Colors";

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
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 15,
          paddingBottom: 15,
          paddingTop: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate('SearchScreen' as never)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            gap: 12,
            borderRadius: 8,
            height: 42,
            flex: 1,
            paddingHorizontal: 15,
            ...Colors.cardShadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Feather name="search" size={20} color={Colors.gray} />
            <TextInput
              placeholder="Search Bookosaurus.in"
              placeholderTextColor="#808080"
              readOnly
            />
          </View>
        </View>
        <Pressable style={{ marginLeft: 15 }}>
          <Feather name="mic" size={20} color={Colors.textSecondary} />
        </Pressable>
      </TouchableOpacity>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 17, color: Colors.textSecondary }}>Subtotal: </Text>
          <Text style={{ fontWeight: "700", fontSize: 18, color: Colors.textPrimary }}>
            ₹{totalPrice.toFixed(2)}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, color: Colors.textSecondary, marginBottom: 10 }}>EMI details Available</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (cart.length > 0) {
                navigation.navigate("Confirm" as never);
              } else {
                ToastAndroid.show("Please Add Items ", ToastAndroid.SHORT);
              }
            }}
          >
            <LinearGradient
              colors={Colors.buttonGradient as any}
              style={{
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                ...Colors.cardShadow,
              }}
            >
              {cart.length > 0 ? (
                <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.white }}>
                  Proceed to Buy {cart.length} items
                </Text>
              ) : (
                <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.white }}>Proceed to Buy</Text>
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
                    marginVertical: 5,
                    marginHorizontal: 2,
                    backgroundColor: Colors.white,
                    borderRadius: 12,
                    padding: 10,
                    ...Colors.cardShadow,
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
                          fontWeight: "500",
                          color: Colors.textPrimary,
                        }}
                        numberOfLines={3}
                      >
                        {item?.title}
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.accent, marginTop: 4 }}>
                        ₹{item?.price}
                      </Text>
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={{
                          uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: "#22C55E",
                          marginTop: 4,
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
                          backgroundColor: Colors.lightGray,
                          padding: 8,
                          borderRadius: 20,
                          width: 44,
                          height: 44,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="delete" size={20} color={Colors.textPrimary} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => decrementQuantity(item)}
                        style={{
                          backgroundColor: Colors.lightGray,
                          padding: 8,
                          borderRadius: 20,
                          width: 44,
                          height: 44,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="minus" size={20} color={Colors.textPrimary} />
                      </TouchableOpacity>
                    )}
                    <Text style={{ fontSize: 18, fontWeight: "700", minWidth: 20, textAlign: 'center' }}>
                      {item?.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(item)}
                      style={{
                        backgroundColor: Colors.lightGray,
                        padding: 8,
                        borderRadius: 20,
                        width: 44,
                        height: 44,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AntDesign name="plus" size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item)}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: Colors.lightGray,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: Colors.textSecondary, fontWeight: "600" }}>Remove</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 10,
                      marginTop: 15,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: Colors.lightGray,
                      }}
                    >
                      <Text style={{ fontSize: 13, color: Colors.textSecondary, fontWeight: "600" }}>Save for later</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: Colors.lightGray,
                      }}
                    >
                      <Text style={{ fontSize: 13, color: Colors.textSecondary, fontWeight: "600" }}>See more like this</Text>
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
