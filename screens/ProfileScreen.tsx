import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../api";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>({});
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { userId } = useContext(UserType);
  const [loading, setLoading] = useState({
    pressEdit: false,
    logout: false,
  });
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Profile",
      headerTitleStyle: { fontWeight: '700', color: Colors.textPrimary },
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: Colors.primary },
      headerLeft: () => (
        <Image
          source={require("../assets/Bookmart.png")}
          resizeMode="contain"
          style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}
        />
      ),
      headerRight: () => null,
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
    }, 5);
    setTimeout(() => {
      navigation.navigate("EditProfile" as never, { userData: user });
      setLoading((prev) => ({ ...prev, pressEdit: false }));
    }, 200);
  };

  useEffect(() => {
    getUser();
    // console.log("from profilescreen",user.profileImage);
  }, []);

  const arr = [
    { title: "Your Wishlist Products", screen: "BookmarkedItems" },
    { title: "Check Credentials", screen: "CheckCredentials" },
    { title: "About Us", screen: "Test" },
    { title: "Privacy Policy", screen: "Test" },
    { title: "Terms of Service", screen: "Test" },
    { title: "Help & Support", screen: "Test" },
  ];

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: Colors.background }}
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
            marginTop: 15,
            backgroundColor: loading.pressEdit ? '#77f0dcff' : Colors.white,
            paddingVertical: 8,
            borderRadius: 25,
            paddingHorizontal: 25,
            ...Colors.cardShadow,
            borderWidth: 1,
            borderColor: Colors.lightGray,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.textPrimary,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 15, color: Colors.textPrimary }}>
          {user.name}
        </Text>
        <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 2 }}>
          {user.email || 'Member since 2024'}
        </Text>
      </View>

      <View style={{ marginTop: 30, gap: 12 }}>
        {arr.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen as never)}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 15,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              ...Colors.cardShadow,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: Colors.textPrimary }}>
              {item.title}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color={Colors.gray} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 25 }}>
        <TouchableOpacity
          onPress={() => setLogoutVisible(true)}
          style={{
            paddingVertical: 14,
            backgroundColor: '#FFF5F5',
            borderRadius: 15,
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#FF3B30' }}>Sign Out</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.accent,
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
