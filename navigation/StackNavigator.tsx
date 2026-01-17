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
import { ActivityIndicator, View } from "react-native";
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
import CheckCredentials from "../screens/CheckCredentials";
import InfoScreenBookmark from "../screens/InfoScreenBookmark";
import Music from "../screens/categories/Music";
import Home from "../screens/categories/Home";
import Books from "../screens/categories/Books";
import Electronics from "../screens/categories/Electronics";
import Mobiles from "../screens/categories/Mobiles";
import Fashion from "../screens/categories/Fashion";
import Test from "../screens/Test";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
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
              color: "#555",
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
              color: "#555",
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
              color: "#555",
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
          options={{
            headerShown: false,
          }}
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
              color: "#555",
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
              color: "#555",
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "Edit Profile",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
          }}
        />
        <Stack.Screen
          name="CheckCredentials"
          component={CheckCredentials}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
          }}
        />
        <Stack.Screen
          name="InfoScreenBookmark"
          component={InfoScreenBookmark}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Home Appliances",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Books"
          component={Books}
          options={{
            headerTitle: "Books",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Electronics"
          component={Electronics}
          options={{
            headerTitle: "Electronics and Gadgets",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Mobiles"
          component={Mobiles}
          options={{
            headerTitle: "Mobiles",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Music"
          component={Music}
          options={{
            headerTitle: "Musical Instruments",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Fashion"
          component={Fashion}
          options={{
            headerTitle: "Fashion and Accessories",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            headerTitle: "Test",
            headerStyle: {
              backgroundColor: "#00ced1",
            },
            headerTitleStyle: {
              color: "#555",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
