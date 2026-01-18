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
    <View style={{ marginTop: Platform.OS === "android" ? 0 : 0 }}>
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={{ paddingHorizontal: 15, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Add a new Address
            </Text>
            <TextInput
              placeholder="India"
              readOnly
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
              placeholderTextColor={"#6b6b6bff"}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Full name (First and last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"#6b6b6bff"}
              placeholder="enter full name"
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Mobile number
            </Text>
            <TextInput
              placeholderTextColor={"#6b6b6bff"}
              value={phone}
              onChangeText={(text) => setPhone(Number(text))}
              placeholder="enter mobile number"
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
                color: "#000000",
              }}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Flat, House no., Building, Company
            </Text>
            <TextInput
              value={housingNo}
              onChangeText={(text) => setHousingNo(text)}
              placeholderTextColor={"#6b6b6bff"}
              placeholder="..."
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Area, Street, Sector, Village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"#6b6b6bff"}
              placeholder="..."
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
              keyboardType="default"
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={"#6b6b6bff"}
              placeholder="Eg. Near Metro Station"
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
              keyboardType="default"
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Pincode</Text>
            <TextInput
              value={pincode}
              onChangeText={(text) => setPincode(Number(text))}
              placeholderTextColor={"#6b6b6bff"}
              placeholder="enter pincode"
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
                color: "#000000",
              }}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleAddAddress}
        >
          <LinearGradient
            colors={["#ffc72c", "#ffefc2ff", "#ffc72c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              marginHorizontal: 15,
            }}
          >
            {loading ? <ShimmerText text="Adding the data.." /> : <Text style={{ fontSize: 17, fontWeight: "500" }}>
              Add Address
            </Text>}
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Address;
