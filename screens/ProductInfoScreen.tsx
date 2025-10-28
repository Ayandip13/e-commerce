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
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
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
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          ₹{route?.params.price}
        </Text>

        <View
          style={{
            backgroundColor: "#aaaaaa",
            width: "100%",
            height: 1,
            marginTop: 5,
          }}
        />

        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <Text>Color: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {route?.params.color}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
        >
          <Text>Size: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {route?.params.size}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#aaaaaa",
            width: "100%",
            height: 1,
            marginTop: 5,
          }}
        />
        <View style={{ marginTop: 10, marginBottom: 50 }}>
          <Text style={{ fontSize: 15 }}>Total: ₹{route?.params.price}</Text>
          <Text
            style={{
              fontSize: 15,
              color: "#00ced1",
              marginTop: 5,
            }}
          >
            Free delivery tomorrow by 3PM. Order within 10 hours 30 minutes
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 5,
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver to Ayandip - Kolkata 743165
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "green",
              marginVertical: 5,
            }}
          >
            In Stock
          </Text>

          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              backgroundColor: "#ffc72c",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 15,
              backgroundColor: "#ffac1c",
              borderRadius: 10,
              alignItems: "center",
              // marginBottom: 20,
            }}
          >
            <Text>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
