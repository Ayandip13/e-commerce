import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import CustomSlider from "../hooks/CustomSlider";

const HomeScreen = () => {
  interface Product {
    id: number;
    image: string;
    name: string;
  }

  const list: Product[] = [
    {
      id: 0,
      image: require("../assets/home.jpg"),
      name: "Home",
    },
    {
      id: 1,
      image: require("../assets/deals.jpg"),
      name: "Deals",
    },
    {
      id: 2,
      image: require("../assets/electronics.jpg"),
      name: "Electronics",
    },
    {
      id: 3,
      image: require("../assets/mobiles.jpg"),
      name: "Mobiles",
    },
    {
      id: 4,
      image: require("../assets/music.jpg"),
      name: "Music",
    },
    {
      id: 5,
      image: require("../assets/fashion.jpg"),
      name: "Fashion",
    },
  ];

  const images = [
    require("../assets/photo(1).webp"),
    require("../assets/photo(2).gif"),
    require("../assets/photo(3).jpg"),
  ];
  return (
    <ScrollView style={{ marginTop: Platform.OS === "android" ? 25 : 0 }}>
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            gap: 10,
            borderRadius: 5,
            height: 40,
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Feather name="search" size={20} color="black" />
            <TextInput placeholder="Search Amazon.in" />
          </View>
        </Pressable>
        <TouchableOpacity>
          <Feather name="mic" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 10,
          backgroundColor: "#afeeee",
        }}
      >
        <Ionicons name="location-outline" size={24} color="black" />
        <TouchableOpacity>
          <Text style={{ fontSize: 13, fontWeight: "500" }}>
            Deliver to Ayandip - Kolkata, 743165
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Image
              source={item.image as any}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontSize: 13,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <CustomSlider
        images={images}
        autoPlay={true}
        interval={3000}
        onImagePress={(index) => console.log("Pressed image:", index)}
      />
    </ScrollView>
  );
};

export default HomeScreen;
