import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../api";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { userId } = useContext(UserType);
  const [loading, setLoading] = useState({
    pressEdit: false,
    logout: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#00ced1" },
      headerLeft: () => (
        <Image
          source={require("../assets/amazon.png")}
          resizeMode="contain"
          style={{ width: 100, height: 40 }}
        />
      ),
      headerRight: () => (
        <>
          <Image
          // source={require("../assets/bell.png")}
          // style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Image
          // source={require("../assets/search.png")}
          // style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </>
      ),
    });
  }, [navigation]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}profile/${userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login" as never);
      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log("error", error);
      ToastAndroid.show("Error logging out", ToastAndroid.SHORT);
    }
  };

  const pressEdit = () => {
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, pressEdit: true }));
    }, 10);
    setTimeout(() => {
      navigation.navigate("EditProfile" as never, { userData: user });
      setLoading((prev) => ({ ...prev, pressEdit: false }));
    }, 200);
  };

  useEffect(() => {
    getUser();
    // console.log("from profilescreen",user.profileImage);
  }, []);

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#ffffff" }}
    >
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          onLongPress={() => navigation.navigate("EditProfile" as never)}
        >
          <Image
            source={
              user.profileImage
                ? { uri: user.profileImage }
                : require("../assets/person.png")
            }
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pressEdit}
          style={{
            marginTop: 10,
            backgroundColor: loading.pressEdit ? "#c3f6ffff" : "#ffffff",
            borderWidth: loading.pressEdit ? 0 : 0.3,
            paddingVertical: 5,
            borderRadius: 20,
            paddingHorizontal: 30,
            borderColor: "#75dfffff",
            shadowColor: "#c3f1ffff",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
          {user.name}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookmarkedItems" as never)}
          style={{
            marginTop: 12,
            borderRadius: 5,
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 0.5,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            See your Wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Test" as never)}
          style={{
            marginTop: 2,
            borderRadius: 5,
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 0.5,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BookmarkedItems" as never)}
          style={{
            marginTop: 2,
            borderRadius: 5,
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 0.5,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            See your Wishlist
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => setLogoutVisible(true)}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 14 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={logoutVisible}
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Logout?</Text>
            <Text style={styles.subtitle}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, styles.cancel]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.logout]}
                onPress={() => {
                  setLogoutVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  logout: {
    backgroundColor: "#ff3b30",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
