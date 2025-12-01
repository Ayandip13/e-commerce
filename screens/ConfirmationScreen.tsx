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
import { Entypo } from "@expo/vector-icons";

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
        paddingHorizontal: 30,
        paddingTop: 15,
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
                      backgroundColor: "green",
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select delivery Address:
          </Text>
          <TouchableOpacity>
            {addresses.map((item, index) => {
              return (
                <View>
                  <Entypo name="circle" size={24} color="black" />
                  <Pressable
                    key={index}
                    style={{
                      marginVertical: 5,
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "#d0d0d0",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
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
                  </Pressable>
                </View>
              );
            })}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;
