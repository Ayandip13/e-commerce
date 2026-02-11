import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartReducer";
import RazorpayCheckout from "react-native-razorpay";
import { StatusBar } from "expo-status-bar";
import { API_URL } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const ConfirmationScreen = () => {
  interface fetchedAddress {
    _id: string;
    houseNo: string;
    landmark: string;
    mobileNo: string;
    name: string;
    postalCode: string;
    street: string;
  }
  const steps = [
    { title: "Address", content: "Address From" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState<any[]>([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState<any>("");
  const [options, setOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const cartItems = useSelector((state: any) => state.cart.cart);
  //state is the store object, state.cart is the cart slice, state.cart.cart is the cart array
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get<{ addresses: fetchedAddress[] }>(
        `${API_URL}addresses/${userId}`
      );
      const { addresses } = response.data;
      // 'response' is the full Axios response; 'response.data' is the backend data.
      // This line extracts the 'addresses' field (an array) from that data.
      setAddresses(addresses);
    } catch (error) {
      // console.log("Error fetching addresses:", error);
    }
  };
  const totalPrice = cartItems
    .map((item: any) => item.price * item.quantity)
    .reduce((acc: number, curr: number) => acc + curr, 0)
    .toFixed(2);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        userId,
        cartItems,
        totalPrice,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };
      const response = await axios.post(`${API_URL}orders`, orderData);
      if (response.status === 201) {
        navigation.navigate("OrderScreen" as never);
        dispatch(cleanCart());
        // console.log("Order placed successfully", response.data);
      } else {
        // console.log("Error placing order", response.data);
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pay = async () => {
    try {
      const options = {
        description: "Adding to wallet",
        currency: "INR",
        name: "amazon",
        key: "rzp_test_Rt8PpDIRVoaieq",
        amount: totalPrice * 100,
        prefill: {
          email: "batman@gotham.com",
          contact: "0000000000",
          name: "Razorpay Software",
        },
        theme: {
          color: "#4bbdff5b",
        },
      };
      const data = await RazorpayCheckout.open(options);
      // console.log('paymentdata',data); it gives just payment id
      setCurrentStep(3);
      const orderData = {
        userId,
        cartItems,
        totalPrice,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
        paymentStatus: "paid",
        paymentId: data.razorpay_payment_id,
      };

      const response = await axios.post(`${API_URL}orders`, orderData);
      if (response.status === 201) {
        navigation.navigate("OrderScreen" as never);
        dispatch(cleanCart());
        // console.log("Order placed successfully", response.data);
      } else {
        // console.log("Error placing order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <View
        style={{
          backgroundColor: Colors.white,
          paddingTop: 50,
          paddingBottom: 15,
          paddingHorizontal: 15,
          ...Colors.cardShadow,
          zIndex: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((step, index) => (
            <View key={index} style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: index <= currentStep ? Colors.primary : Colors.lightGray,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {index < currentStep ? (
                  <MaterialIcons name="check" size={16} color={Colors.white} />
                ) : (
                  <Text style={{ color: index === currentStep ? Colors.white : Colors.gray, fontWeight: '700', fontSize: 12 }}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ fontSize: 10, fontWeight: '600', color: index <= currentStep ? Colors.textPrimary : Colors.gray, marginTop: 4 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 0 && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: Colors.textPrimary,
                marginBottom: 15,
              }}
            >
              Where should we deliver?
            </Text>
            <Pressable style={{ marginBottom: 50 }}>
              {addresses.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setSelectedAddress(item)}
                    key={index}
                    style={{
                      backgroundColor: Colors.white,
                      borderRadius: 15,
                      padding: 15,
                      marginBottom: 15,
                      borderWidth: selectedAddress?._id === item._id ? 0.5 : 0,
                      borderColor: Colors.primary,
                      ...Colors.cardShadow,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                      <View style={{ marginTop: 2 }}>
                        {selectedAddress?._id === item._id ? (
                          <FontAwesome
                            name="dot-circle-o"
                            size={22}
                            color={Colors.primary}
                          />
                        ) : (
                          <Entypo name="circle" size={20} color={Colors.lightGray} />
                        )}
                      </View>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text style={{ fontWeight: "700", fontSize: 16, color: Colors.textPrimary }}>
                            {item?.name}
                          </Text>
                          <Entypo size={20} name="location-pin" color={Colors.primary} style={{ marginLeft: 4 }} />
                        </View>
                        <View style={{ gap: 2 }}>
                          <Text style={{ fontSize: 14, color: Colors.textPrimary }}>#{item?.houseNo}, {item?.landmark}</Text>
                          <Text style={{ fontSize: 14, color: Colors.textPrimary }}>{item?.street}</Text>
                          <Text style={{ fontSize: 14, color: Colors.textPrimary }}>{item?.postalCode}, India</Text>
                          <Text style={{ fontSize: 14, color: Colors.textSecondary, marginTop: 4 }}>Phone: {item?.mobileNo}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12, gap: 10 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: Colors.background,
                              paddingHorizontal: 15,
                              paddingVertical: 6,
                              borderRadius: 8,
                            }}
                          >
                            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary }}>Edit</Text>
                          </TouchableOpacity>
                        </View>
                        {selectedAddress?._id === item._id && (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              selectedAddress
                                ? setCurrentStep(1)
                                : ToastAndroid.show(
                                  "Please select an address",
                                  ToastAndroid.SHORT
                                );
                            }}
                            style={{ marginTop: 15 }}
                          >
                            <LinearGradient
                              colors={Colors.buttonGradient as any}
                              style={{
                                alignItems: "center",
                                paddingVertical: 12,
                                borderRadius: 8,
                                ...Colors.cardShadow,
                              }}
                            >
                              <Text
                                style={{ color: Colors.white, fontWeight: "700", fontSize: 15 }}
                              >
                                Deliver to this address
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Pressable>
          </View>
        )}

        {currentStep === 1 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.textPrimary, marginBottom: 20 }}>
              Delivery Options
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setOptions(!options)}
              style={{
                padding: 15,
                backgroundColor: Colors.white,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                ...Colors.cardShadow,
                borderWidth: options ? 0.5 : 0,
                borderColor: Colors.primary,
              }}
            >
              {options ? (
                <FontAwesome name="dot-circle-o" size={24} color={Colors.primary} />
              ) : (
                <Entypo name="circle" size={20} color={Colors.lightGray} />
              )}

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "600", color: "#22C55E" }}>
                  Tomorrow by 10:00 AM
                </Text>
                <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 2 }}>
                  Free Express Delivery with Prime
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                options
                  ? setCurrentStep(2)
                  : ToastAndroid.show("Select an option", ToastAndroid.SHORT);
              }}
            >
              <LinearGradient
                colors={Colors.buttonGradient as any}
                style={{
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: Colors.white, fontWeight: "700" }}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {currentStep === 2 && (
          <View style={{ marginBottom: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.textPrimary, marginBottom: 20 }}>
              Payment Method
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedOption("cash")}
              style={{
                padding: 15,
                backgroundColor: Colors.white,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                ...Colors.cardShadow,
                borderWidth: selectedOption === "cash" ? 0.5 : 0,
                borderColor: Colors.primary,
                marginBottom: 5,
              }}
            >
              {selectedOption === "cash" ? (
                <FontAwesome name="dot-circle-o" size={24} color={Colors.primary} />
              ) : (
                <Entypo name="circle" size={20} color={Colors.lightGray} />
              )}
              <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginLeft: 10 }}>Cash on Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSelectedOption("upi/card");
                Alert.alert("Pay Online", "Securely pay using UPI, Cards or Netbanking", [
                  { text: "Cancel", style: 'cancel' },
                  { text: "Proceed", onPress: () => pay() },
                ]);
              }}
              style={{
                padding: 15,
                backgroundColor: Colors.white,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                ...Colors.cardShadow,
                borderWidth: selectedOption === "upi/card" ? 0.5 : 0,
                borderColor: Colors.primary,
                marginBottom: 15,
              }}
            >
              {selectedOption === "upi/card" ? (
                <FontAwesome name="dot-circle-o" size={24} color={Colors.primary} />
              ) : (
                <Entypo name="circle" size={20} color={Colors.lightGray} />
              )}
              <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginLeft: 10 }}>UPI / Debit or Credit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                selectedOption
                  ? setCurrentStep(3)
                  : ToastAndroid.show("Select an option", ToastAndroid.SHORT);
              }}
            >
              <LinearGradient
                colors={Colors.buttonGradient as any}
                style={{
                  paddingVertical: 15,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Text style={{ color: Colors.white, fontWeight: "700", fontSize: 16 }}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {
          currentStep === 3 && (
            <View style={{ marginBottom: 40 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: Colors.textPrimary, marginBottom: 15 }}>Order Summary</Text>
              <View>
                <TouchableOpacity
                  style={{
                    padding: 15,
                    backgroundColor: Colors.white,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    ...Colors.cardShadow,
                    marginBottom: 20,
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "700", fontSize: 16, color: Colors.textPrimary }}>
                      Save 5% on Future Orders
                    </Text>
                    <Text style={{ color: Colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                      Subscribe and save with auto-deliveries
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 20,
                  backgroundColor: Colors.white,
                  borderRadius: 8,
                  ...Colors.cardShadow,
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 15 }}>Shipping to {selectedAddress?.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                    paddingTop: 15,
                    borderTopWidth: 1,
                    borderTopColor: Colors.lightGray,
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: 18, color: Colors.textPrimary }}>
                    Order Total
                  </Text>
                  <Text
                    style={{ color: Colors.accent, fontWeight: "800", fontSize: 18 }}
                  >
                    ₹ {totalPrice}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  marginTop: 20,
                  borderRadius: 8,
                  ...Colors.cardShadow,
                }}
              >
                <Text style={{ fontSize: 14, color: Colors.textSecondary, marginBottom: 5 }}>Payment Method</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#22C55E" }}>
                  {selectedOption === 'cash' ? 'Cash on Delivery' : 'Paid via Online'}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handlePlaceOrder}
                style={{ marginTop: 30 }}
                activeOpacity={0.7}
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
                  {loading ? (
                    <Text style={{ color: Colors.white, fontWeight: '700' }}>Placing order...</Text>
                  ) : (
                    <Text style={{ fontWeight: "700", color: Colors.white, fontSize: 16 }}>Place your order</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default ConfirmationScreen;
