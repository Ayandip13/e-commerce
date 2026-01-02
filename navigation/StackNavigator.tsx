import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Alert, View } from "react-native";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import Address from "../screens/Address";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import OrderedItem from "../screens/OrderedItem";
import BookmarkedItems from "../screens/BookmarkedItems";
import Orders from "../screens/Orders";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfile from "../screens/EditProfile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
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
        name="Orders"
        options={{
          tabBarLabel: "Orders",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="shop" size={24} color={"#008e97"} />
            ) : (
              <Entypo name="shop" size={24} color="#aaaaaa" />
            ),
        }}
        component={Orders}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarLabel: "Cart",
          headerShown: false,
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
        // screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductInfoScreen"
          component={ProductInfoScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
        <Stack.Screen
          name="Add"
          component={Address}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderedItem"
          component={OrderedItem}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
        <Stack.Screen
          name="BookmarkedItems"
          component={BookmarkedItems}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#00ced1",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
