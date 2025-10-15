import React, { useEffect, useState } from "react";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Alert, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color={"#008e97"} />
            ) : (
              <Entypo name="home" size={24} color="#aaaaaa" />
            ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="user" size={24} color={"#008e97"} />
            ) : (
              <Entypo name="user" size={24} color="#aaaaaa" />
            ),
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="shopping-cart" size={24} color={"#008e97"} />
            ) : (
              <Entypo name="shopping-cart" size={24} color="#aaaaaa" />
            ),
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setInitialRoute(token ? "Main" : "Login");
      } catch (error) {
        console.error("Error checking login status:", error);
        setInitialRoute("Login");
      }
    };
    checkLoginStatus();
  }, []);

  if (!initialRoute) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
