import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const InfoScreenBookmark = () => {
  const { width } = Dimensions.get("window");
  const height = width;
  const { params } = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item: any) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => setAddedToCart(false), 1000);
  };
  const navigation = useNavigation();
  console.log(params);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 50,
      }}
    >
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            position: "absolute",
            // top: 35,
            backgroundColor: "#c60c30",
            width: 45,
            height: 45,
            borderRadius: 22.5,
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 11,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {params.discountPercent}% {"\n"}OFF
          </Text>
        </View>
        <Image
          source={{ uri: params.item?.image }}
          style={{ width, height }}
          resizeMode="contain"
        />
        <Text numberOfLines={2} style={{ fontSize: 17, marginTop: 10 }}>
          {params.item?.title}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          ₹{params.item?.price}
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
            {params.item?.color}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
        >
          <Text>Size: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {params.item?.size}
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
          <Text style={{ fontSize: 15 }}>Total: ₹{params.item?.price}</Text>

          <Text style={{ fontSize: 15, color: "#00ced1", marginTop: 5 }}>
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
            <Ionicons name="location-outline" size={24} />
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
            onPress={() => addItemToCart(params.item)}
            style={{
              padding: 10,
              marginTop: 10,
              backgroundColor: "#ffc72c",
              borderRadius: 10,
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <Text>{addedToCart ? "Added to Cart" : "Add to Cart"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Confirm" as never)}
            style={{
              padding: 10,
              marginTop: 15,
              backgroundColor: "#ffac1c",
              borderRadius: 10,
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <Text>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoScreenBookmark;
