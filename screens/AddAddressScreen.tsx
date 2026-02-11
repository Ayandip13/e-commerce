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
import { API_URL } from "../api";
import Colors from "../constants/Colors";

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
        `${API_URL}addresses/${userId}`
      );
      const { addresses } = response.data;
      // 'response' is the full Axios response; 'response.data' is the backend data.
      // This line extracts the 'addresses' field (an array) from that data.
      setAddress(addresses);
    } catch (error) {
      // console.log("Error fetching addresses:", error);
    }
  };
  // console.log("addresses", address);
  // console.log(userId);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: Colors.textPrimary,
              marginHorizontal: 5,
            }}
          >
            Saved Locations
          </Text>
          <Text style={{ fontSize: 13, color: Colors.textSecondary, marginHorizontal: 5, marginTop: 2 }}>
            Manage where your orders are delivered
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add" as never)}
          style={{
            marginVertical: 8,
            borderRadius: 15,
            backgroundColor: Colors.white,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            ...Colors.cardShadow,
            borderWidth: 1,
            borderColor: Colors.primary + '20', // Subtle primary border
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="plus-circle" size={24} color={Colors.primary} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.textPrimary, marginLeft: 10 }}>
              Add a new Address
            </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.gray} />
        </TouchableOpacity>

        <View style={{ gap: 15 }}>
          {address.map((item, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: Colors.white,
                borderRadius: 15,
                padding: 15,
                ...Colors.cardShadow,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Entypo size={22} name="location-pin" color={Colors.primary} />
                <Text style={{ fontWeight: "700", fontSize: 16, color: Colors.textPrimary, marginLeft: 5 }}>
                  {item?.name}
                </Text>
              </View>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  <Text style={{ fontWeight: "600", color: Colors.textSecondary }}>House No: </Text>
                  #{item?.houseNo}
                </Text>
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  <Text style={{ fontWeight: "600", color: Colors.textSecondary }}>Area: </Text>
                  {item?.street}
                </Text>
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  <Text style={{ fontWeight: "600", color: Colors.textSecondary }}>Landmark: </Text>
                  {item?.landmark}
                </Text>
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  <Text style={{ fontWeight: "600", color: Colors.textSecondary }}>Pincode: </Text>
                  {item?.postalCode}
                </Text>
                <Text style={{ fontSize: 14, color: Colors.textPrimary }}>
                  <Text style={{ fontWeight: "600", color: Colors.textSecondary }}>Phone: </Text>
                  {item?.mobileNo}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: Colors.lightGray, gap: 10 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.textPrimary }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF5F5',
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FF3B30' }}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1.5,
                    backgroundColor: Colors.primary + '15',
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.accent }}>Set as Default</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAddressScreen;
