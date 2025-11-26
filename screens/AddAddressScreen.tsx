import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [address, setAddress] = useState<fetchedAddress[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchAddresses();
  }, []);

  //We are using the useFocusEffect hook to refetch the addresses when the screen is comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  //refresh the addresses when the component comes into focus ie basically when we navigate back

  interface fetchedAddress {
    _id: string;
    houseNo: string;
    landmark: string;
    mobileNo: string;
    name: string;
    postalCode: string;
    street: string;
  }

  const fetchAddresses = async () => {
    try {
      const response = await axios.get<{ addresses: fetchedAddress[] }>(
        `http://192.168.0.102:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      // 'response' is the full Axios response; 'response.data' is the backend data.
      // This line extracts the 'addresses' field (an array) from that data.
      setAddress(addresses);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };
  console.log("addresses", address);
  console.log(userId);

  return (
    <ScrollView
      style={{ marginTop: Platform.OS === "android" ? 25 : 0 }}
      showsVerticalScrollIndicator={false}
    >
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
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            marginHorizontal: 10,
            marginBottom: 5,
          }}
        >
          Your Addresses
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add" as never)}
          style={{
            marginVertical: 5,
            borderWidth: 1,
            flexDirection: "row",
            padding: 10,
            borderColor: "#d0d0d0",
            justifyContent: "space-between",
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10, marginBottom: 30 }}>
          {address.map((item, index) => (
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <Text style={{ fontSize: 15, color: "#181818" }}>India</Text>
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
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
