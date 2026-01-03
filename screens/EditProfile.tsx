import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../api";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  const handleUpdateProfile = async () => {
    try {
      if (!image) {
        ToastAndroid.show("Please select an image.", ToastAndroid.SHORT);
        return;
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
          return;
        }
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("profileImage", {
        uri: image,
        name: "profile.jpg",
        type: "image/jpeg",
      });

      if (name) formData.append("name", name.trim());
      if (email) formData.append("email", email.trim());
      if (password) formData.append("password", password.trim());

      const response = await axios.put(
        `${API_URL}edit-profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEmail("");
      setName("");
      setPassword("");
      setImage(null);

      console.log("Profile updated:", response.data);

      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error updating profile:", error?.response?.data || error);
      ToastAndroid.show(
        "An error occurred while updating profile.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("user Token:", token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", marginTop: 20 }}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={image ? { uri: image } : require("../assets/person.png")}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            marginTop: 20,
          }}
        />
        <MaterialIcons
          name="mode-edit"
          size={28}
          color="#999"
          style={{
            position: "absolute",
            right: "30%",
            bottom: 10,
          }}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 15 }}>
        Edit Your Profile
      </Text>
      <View
        style={{
          height: 0.5,
          backgroundColor: "#ccc",
          marginTop: 5,
          width: "45%",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Update Full Name:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <TextInput
                placeholder="Enter your full name"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 14,
                  color: "#000",
                }}
                placeholderTextColor="#d0d0d0"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Update Email:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <TextInput
                placeholder="Enter your Email"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 14,
                }}
                placeholderTextColor="#d0d0d0"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Update Password:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setHidePassword((prev) => !prev)}
              >
                <Entypo
                  name={hidePassword ? "eye" : "eye-with-line"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Enter your Password"
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: "#000",
                }}
                placeholderTextColor="#d0d0d0"
                secureTextEntry={hidePassword}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleUpdateProfile}
            style={{
              marginTop: "15%",
              alignItems: "center",
              padding: 15,
              backgroundColor: "#febe10",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {loading ? "Updating..." : "Submit Changes"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.12)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              height: "30%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Change Profile Photo
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-evenly",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  gap: 12,
                }}
                onPress={pickFromCamera}
              >
                <Ionicons name="camera" size={50} color="#008e97" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Take Photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  gap: 12,
                }}
                onPress={pickFromGallery}
              >
                <Ionicons name="image" size={50} color="#008e97" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Choose from {"\n"} Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 14,
                },
                styles.cancel,
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  cancel: {
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
  },
  cancelText: {
    textAlign: "center",
    color: "#ff3b30",
    fontSize: 15,
    fontWeight: "600",
  },
});
