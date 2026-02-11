import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { Toast } from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../api";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import ShimmerText from "../components/ShimmerText";
import Colors from "../constants/Colors";

const Address = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [housingNo, setHousingNo] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const { userId, setUserId } = useContext(UserType);
  const [loading, setLoading] = useState<boolean>(false);

  interface DecodedToken {
    userId: string;
  }

  const handleAddAddress = async () => {
    if (!name || !phone || !housingNo || !street || !landmark || !pincode) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      return;
    }
    const address = {
      name: name.trim(),
      mobileNo: Number(phone),
      houseNo: housingNo.trim(),
      street: street.trim(),
      landmark: landmark.trim(),
      postalCode: Number(pincode),
    };
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}addresses`, {
        userId,
        address,
      });
      if (response) {
        Toast.success("Addresses added successfully");
        setName("");
        setPhone("");
        setHousingNo("");
        setStreet("");
        setLandmark("");
        setPincode("");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (error: any) {
      ToastAndroid.show(
        error?.response?.data?.message || "Error",
        ToastAndroid.SHORT
      );
      // console.log("Error adding address", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode<DecodedToken>(token);
          const userId = decodedToken?.userId;
          setUserId(userId);
        } else {
          // console.log("No token found");
        }
      } catch (error) {
        // console.log("error decoding token", error);
      }
    };
    fetchUser();
  }, []);

  // console.log(userId);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 5 }}>
              Country / Region
            </Text>
            <TextInput
              placeholder="India"
              readOnly
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 12,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
              placeholderTextColor={Colors.gray}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>
              Full name (First and last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={Colors.gray}
              placeholder="Enter your full name"
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>
              Mobile number
            </Text>
            <TextInput
              placeholderTextColor={Colors.gray}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter your mobile number"
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>
              Flat, House no., Building, Company
            </Text>
            <TextInput
              value={housingNo}
              onChangeText={(text) => setHousingNo(text)}
              placeholderTextColor={Colors.gray}
              placeholder="..."
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>
              Area, Street, Sector, Village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={Colors.gray}
              placeholder="..."
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
              keyboardType="default"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={Colors.gray}
              placeholder="Eg. Near Metro Station"
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
              keyboardType="default"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.textSecondary, marginBottom: 5 }}>Pincode</Text>
            <TextInput
              value={pincode}
              onChangeText={(text) => setPincode(text)}
              placeholderTextColor={Colors.gray}
              placeholder="Enter pincode"
              style={{
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                color: Colors.textPrimary,
                ...Colors.cardShadow,
              }}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleAddAddress}
          style={{ paddingVertical: 20 }}
        >
          <LinearGradient
            colors={Colors.buttonGradient as any}
            style={{
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginHorizontal: 20,
              ...Colors.cardShadow,
              marginBottom: '10%',
            }}
          >
            {loading ? <ShimmerText text="Adding Address..." /> : <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.white }}>
              Add Address
            </Text>}
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Address;
