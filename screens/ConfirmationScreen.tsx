import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, FontAwesome } from "@expo/vector-icons";

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
  const [addresses, setAddresses] = useState<any[]>([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState<string | null>("");
  const [options, setOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get<{ addresses: fetchedAddress[] }>(
        `http://192.168.0.100:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      // 'response' is the full Axios response; 'response.data' is the backend data.
      // This line extracts the 'addresses' field (an array) from that data.
      setAddresses(addresses);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };
  console.log(addresses);
  return (
    <ScrollView
      style={{
        marginTop: 50,
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {index > 0 && (
                <View
                  style={[
                    { position: "absolute" },
                    index <= currentStep && {
                      backgroundColor: "#ffffff",
                      width: 50,
                      height: 2,
                      marginBottom: 5,
                    },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Select delivery Address:
          </Text>
          <Pressable style={{ marginBottom: 50 }}>
            {addresses.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedAddress(item)}
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    marginTop: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingVertical: 8,
                    elevation: 4,
                    shadowColor: "#00b7ffff",
                    paddingHorizontal: 10,
                  }}
                >
                  {selectedAddress?._id === item._id ? (
                    <FontAwesome
                      name="dot-circle-o"
                      size={27.5}
                      color="#008e97"
                    />
                  ) : (
                    <Entypo name="circle" size={24} color="#008e97" />
                  )}
                  <View
                    style={{
                      borderRadius: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        {item?.name}
                      </Text>
                      <Entypo size={25} name="location-pin" color="red" />
                    </View>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      <Text style={{ fontWeight: "500" }}>House No: </Text>#
                      {item?.houseNo},
                      <Text style={{ fontWeight: "500" }}> Landmark: </Text>
                      {item?.landmark}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      <Text style={{ fontWeight: "500" }}>Street: </Text>
                      {item?.street}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      India
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      <Text style={{ fontWeight: "500" }}>Mobile No: </Text>
                      {item?.mobileNo}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      <Text style={{ fontWeight: "500" }}>Postal Code: </Text>
                      {item?.postalCode}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          marginVertical: 5,
                          gap: 5,
                          marginRight: 10,
                          borderColor: "#435663",
                          borderWidth: 0.5,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          paddingVertical: 5,
                        }}
                      >
                        <Text style={{ fontSize: 15 }}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          marginVertical: 5,
                          gap: 5,
                          marginRight: 10,
                          borderColor: "#435663",
                          borderWidth: 0.5,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          paddingVertical: 5,
                        }}
                      >
                        <Text style={{ fontSize: 15 }}>Remove</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          marginVertical: 5,
                          gap: 5,
                          marginRight: 10,
                          borderColor: "#435663",
                          borderWidth: 0.5,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          paddingVertical: 5,
                        }}
                      >
                        <Text style={{ fontSize: 15 }}>Set as Default</Text>
                      </TouchableOpacity>
                    </View>
                    {selectedAddress?._id === item._id && (
                      <TouchableOpacity
                        onPress={() => setCurrentStep(1)}
                        style={{
                          alignItems: "center",
                          backgroundColor: "#008e97",
                          paddingVertical: 10,
                          borderRadius: 20,
                          marginTop: 5,
                          alignSelf: "center",
                          paddingHorizontal: 30,
                        }}
                      >
                        <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                          Deliver to this address
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </View>
      )}

      {currentStep === 1 && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Choose your delivery options
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOptions(!options)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 5,
              elevation: 5,
              shadowColor: "#00b7ffff",
              gap: 10,
            }}
          >
            {options ? (
              <FontAwesome name="dot-circle-o" size={27.5} color="#008e97" />
            ) : (
              <Entypo name="circle" size={24} color="#aaaaaa" />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500", color: "green" }}>
                Tomorrow by 10:00 AM
              </Text>
              - Free Delivery with Prime membership
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentStep(2)} //TODO: Change this to only work when an option is selected(implement validation)
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ marginBottom: 50 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Select your payment method
          </Text>

          <TouchableOpacity
            onPress={() => setSelectedOption("cash")}
            style={{
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 5,
              elevation: 5,
              shadowColor: "#00b7ffff",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome name="dot-circle-o" size={27.5} color="#008e97" />
            ) : (
              <Entypo name="circle" size={24} color="#aaaaaa" />
            )}
            <Text>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedOption("upi/card")}
            style={{
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 5,
              elevation: 5,
              shadowColor: "#00b7ffff",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            {selectedOption === "upi/card" ? (
              <FontAwesome name="dot-circle-o" size={27.5} color="#008e97" />
            ) : (
              <Entypo name="circle" size={24} color="#aaaaaa" />
            )}
            <Text>UPI / Debit or Credit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentStep(3)} //TODO: Change this to only work when an option is selected(implement validation)
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;
