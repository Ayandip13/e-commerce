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
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../api";
import axios from "axios";
import { UserType } from "../UserContext";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState({
    updateProfile: false,
    fetchCameraPhoto: false,
    fetchGalleryPhoto: false,
  });
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState({});

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

      setLoading((prev) => ({ ...prev, updateProfile: true }));

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

      // console.log("Profile updated:", response.data);

      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error?.response?.data || error);
      ToastAndroid.show(
        "An error occurred while updating profile.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading((prev) => ({ ...prev, updateProfile: false }));
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}profile/${userId}`);
      setUser(res.data.user);
    } catch (error) {
      // console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const pickFromGallery = async () => {
    try {
      setLoading((prev) => ({ ...prev, fetchGalleryPhoto: true }));
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

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
    } catch (error) {
      console.log("Error picking image from gallery:", error);
      ToastAndroid.show(
        "An error occurred while accessing the gallery.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading((prev) => ({ ...prev, fetchGalleryPhoto: false }));
    }
  };

  const pickFromCamera = async () => {
    try {
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
      setLoading((prev) => ({ ...prev, fetchCameraPhoto: true }));
    } catch (error) {
      console.log("Error picking image from camera:", error);
      ToastAndroid.show(
        "An error occurred while accessing the camera.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading((prev) => ({ ...prev, fetchCameraPhoto: false }));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 20 }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={
              (user as any)?.profileImage
                ? { uri: (user as any)?.profileImage }
                : require("../assets/person.png")
            }
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              marginTop: 20,
            }}
          />
          <MaterialIcons
            name="photo-camera"
            size={24}
            color={Colors.white}
            style={{
              position: "absolute",
              right: 0,
              bottom: 5,
              backgroundColor: Colors.primary,
              padding: 8,
              borderRadius: 20,
              ...Colors.cardShadow,
            }}
          />
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{
              position: "absolute",
              top: "50%",
              display:
                loading.fetchCameraPhoto || loading.fetchGalleryPhoto
                  ? "flex"
                  : "none",
            }}
          />
        </TouchableOpacity>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.textPrimary }}>
            Personal Information
          </Text>
          <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 4 }}>
            Update your details below to keep your profile fresh
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginBottom: 8 }}>
              Full Name
            </Text>
            <TextInput
              placeholder="Enter your full name"
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
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginBottom: 8 }}>
              Email Address
            </Text>
            <TextInput
              placeholder="Enter your Email"
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
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.textSecondary, marginBottom: 8 }}>
              New Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 15,
                ...Colors.cardShadow,
              }}
            >
              <TextInput
                placeholder="Enter new password"
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  fontSize: 15,
                  color: Colors.textPrimary,
                }}
                placeholderTextColor={Colors.gray}
                secureTextEntry={hidePassword}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TouchableOpacity
                onPress={() => setHidePassword((prev) => !prev)}
                style={{ padding: 5 }}
              >
                <Entypo
                  name={hidePassword ? "eye" : "eye-with-line"}
                  size={20}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleUpdateProfile}
            style={{ marginTop: 40 }}
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
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {loading.updateProfile ? "Updating..." : "Save Changes"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>

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
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              paddingBottom: 30,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              ...Colors.cardShadow,
            }}
          >
            <View style={{ width: 40, height: 4, backgroundColor: Colors.lightGray, borderRadius: 2, alignSelf: 'center', marginVertical: 15 }} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
                color: Colors.textPrimary,
                marginBottom: 20,
              }}
            >
              Profile Photo
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: Colors.background,
                  padding: 20,
                  borderRadius: 15,
                  width: '40%',
                }}
                onPress={pickFromCamera}
              >
                <Ionicons name="camera" size={32} color={Colors.primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    marginTop: 8,
                    color: Colors.textPrimary,
                  }}
                >
                  Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: Colors.background,
                  padding: 20,
                  borderRadius: 15,
                  width: '40%',
                }}
                onPress={pickFromGallery}
              >
                <Ionicons name="image" size={32} color={Colors.primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    marginTop: 8,
                    color: Colors.textPrimary,
                  }}
                >
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                paddingVertical: 15,
                marginHorizontal: 20,
                borderRadius: 15,
                backgroundColor: '#FFF5F5',
                alignItems: 'center',
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#FF3B30', fontWeight: '700', fontSize: 15 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
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
