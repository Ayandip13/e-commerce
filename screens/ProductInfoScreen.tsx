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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const navigation = useNavigation();

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
            style={{ width, height, marginTop: 25 }}
            key={index}
            source={{ uri: item }}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: "#c60c30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  20% off
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: "#e0e0e0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="#000"
                />
              </View>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginBottom: 20,
                marginLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color="#000"
              />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          {route?.params.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {route?.params.price}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
