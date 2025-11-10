import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";

const Address = () => {
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<number>();
  const [housingNo, setHousingNo] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [pincode, setPincode] = useState<number>();
  const {userId, setUserId} = useContext(UserType)

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    };
    fetchUser();
  }, []);

  console.log(userId);
  

  return (
    <View style={{ marginTop: Platform.OS === "android" ? 25 : 0 }}>
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 28,
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
          style={{ paddingHorizontal: 15, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Add a new Address
            </Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="India"
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 15,
              }}
              placeholderTextColor={"#000"}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Full name (First and last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"#000"}
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
              placeholderTextColor={"#000"}
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
              placeholderTextColor={"#d0d0d0"}
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
              placeholderTextColor={"#d0d0d0"}
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
              placeholderTextColor={"#000"}
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
              placeholderTextColor={"#000"}
              placeholder="enter pincode"
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
        </ScrollView>
        <TouchableOpacity
          //   onPress={handleAddAddress}
          style={{
            backgroundColor: "#ffc72c",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            left: 15,
            right: 15,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Add Address</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Address;
