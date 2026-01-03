import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#f5f5f5" }}
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
