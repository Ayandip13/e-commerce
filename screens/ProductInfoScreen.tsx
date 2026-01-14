import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { StatusBar } from "expo-status-bar";
import { addToBookmark, removeBookmark } from "../redux/BookmarkReducer";
import { LinearGradient } from "expo-linear-gradient";

const ProductInfoScreen = () => {
  const routeParams = useRoute();
  const route = routeParams.params;
  const { width } = Dimensions.get("window");
  const height = width;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const [pressedBookmark, setPressedBookmark] = useState(false);

  const bookmarks = useSelector((state: any) => state.bookmark.bookmarks);
  // console.log("products from productInfoScreen", routeParams);
  useEffect(() => {
    const currentProductId = String(route?.item?.productId ?? route?.item?.id);
    const isBookmarked = bookmarks.some(
      (bookmarkItem: any) => String(bookmarkItem.productId) === currentProductId
    );
    setPressedBookmark(isBookmarked);
  }, [bookmarks, route?.item]);

  const addItemToCart = (item: any) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => setAddedToCart(false), 1000);
  };

  const handleBookmark = (item: any) => {
    if (pressedBookmark) {
      dispatch(removeBookmark(item));
    } else {
      dispatch(addToBookmark(item));
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />

      <View>
        <View
          style={{
            position: "absolute",
            top: 35,
            left: 15,
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
            20% OFF
          </Text>
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 35,
            right: 15,
            backgroundColor: "#e0e0e0",
            width: 45,
            height: 45,
            borderRadius: 22.5,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <MaterialCommunityIcons name="share-variant" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleBookmark(route?.item)}
          style={{
            position: "absolute",
            bottom: 20,
            left: 15,
            backgroundColor: "#e0e0e0",
            width: 45,
            height: 45,
            borderRadius: 22.5,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <MaterialCommunityIcons
            name={pressedBookmark ? "heart" : "heart-outline"}
            size={28}
          />
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {route?.carouselImages.map((item: string, index: number) => (
            <ImageBackground
              key={index}
              source={{ uri: item }}
              style={{ width, height, marginTop: 25 }}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
      </View>

      {/* Product Details */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500", marginBottom: 10 }}>
          {route?.title}
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "500" }}>₹{route?.price}</Text>

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
            {route?.color}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
        >
          <Text>Size: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {route?.size}
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
          <Text style={{ fontSize: 15 }}>Total: ₹{route?.price}</Text>

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

          <TouchableOpacity onPress={() => addItemToCart(route?.item)}>
            <LinearGradient
              colors={["#fff672", "#ff9900"]}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>{addedToCart ? "Added to Cart" : "Add to Cart"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if(route?.item) {
                 dispatch(addToCart(route?.item));
                 navigation.navigate("Confirm" as never)
              }
            }}
          >
            <LinearGradient
              colors={["#ff9900", "#fff672"]}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>Buy Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;
