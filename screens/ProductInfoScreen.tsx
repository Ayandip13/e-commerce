import {
    Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window")

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginTop: 45, backgroundColor: "white" }}
    >
      <View
        style={{
          backgroundColor: "#00ced1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 15,
        }}
      >
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="mic" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width: 500, height: 500, marginTop: 25 }}
            key={index}
            source={{ uri: item }}
          >
            <View>
              <Text>{item}</Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
