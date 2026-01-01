import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import CustomSlider from "../hooks/CustomSlider";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../hooks/ProductItem";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import { StatusBar } from "expo-status-bar";
import { API_URL } from "../api";

interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface Product {
  id: number;
  image: string;
  name: string;
}

interface Deal {
  id: string;
  title: string;
  oldPrice: number;
  price: number;
  image: string;
  carouselImages: string[];
  color: string;
  size: string;
}

interface offer {
  id: string;
  title: string;
  offer: string;
  oldPrice: number;
  price: number;
  image: string;
  carouselImages: string[];
  color: string;
  size: string;
}

const list: Product[] = [
  {
    id: 0,
    image: require("../assets/home.jpg"),
    name: "Home",
  },
  {
    id: 1,
    image: require("../assets/book.png"),
    name: "Books",
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

const deals: Deal[] = [
  {
    id: "20",
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
    oldPrice: 25000,
    price: 19000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
      "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
    ],
    color: "Stellar Green",
    size: "6 GB RAM 128GB Storage",
  },
  {
    id: "30",
    title:
      "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
    oldPrice: 74000,
    price: 26000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
    ],
    color: "Cloud Navy",
    size: "8 GB RAM 128GB Storage",
  },
  {
    id: "40",
    title:
      "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
    oldPrice: 16000,
    price: 14000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
    ],
    color: "Icy Silver",
    size: "6 GB RAM 64GB Storage",
  },
  {
    id: "50",
    title:
      "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
    oldPrice: 12999,
    price: 10999,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
    ],
    color: "Prime Blue",
    size: "4 GB RAM 64GB Storage",
  },
];

const offers: offer[] = [
  {
    id: "0",
    title:
      "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
    offer: "72% off",
    oldPrice: 7500,
    price: 4500,
    image:
      "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
    ],
    color: "Green",
    size: "Normal",
  },
  {
    id: "1",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
    ],
    color: "black",
    size: "Normal",
  },
  {
    id: "2",
    title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
    carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
    color: "black",
    size: "Normal",
  },
  {
    id: "3",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
    offer: "40%",
    oldPrice: 24999,
    price: 19999,
    image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
    ],
    color: "Norway Blue",
    size: "8GB RAM, 128GB Storage",
  },
];

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [address, setAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("electronics");
  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const filteredProducts = products?.filter(
    (item) => item.category == category
  );

  interface DecodedToken {
    userId: string;
  }
  // console.log("Ayadreses", selectedAddress);
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken?.userId;
        setUserId(userId);
        // console.log(userId);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.log("error decoding token", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddress();
    }
  }, [userId]);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}addresses/${userId}`);
      setAddress(response.data.addresses);
      // 'response' is the full Axios response; 'response.data' is the backend data.
      // This line extracts the 'addresses' field (an array) from that data.
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        setProducts(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
      }
    };
    fetchData();
    fetchUser();
    return () => controller.abort();
  }, []);

  // console.log("Products are", products);
  const images = [
    require("../assets/photo(1).webp"),
    require("../assets/photo(2).gif"),
    require("../assets/photo(3).jpg"),
  ];

  const cart = useSelector((state: any) => state.cart.cart);
  //state is the store object, state.cart is the cart slice, state.cart.cart is the cart array

  // console.log(cart);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar style="dark" />

      <View
        style={{
          backgroundColor: "#00ced1",
          paddingHorizontal: 10,
          paddingBottom: 15,
          paddingTop: 47,
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
            <TextInput
              placeholder="Search Amazon.in"
              placeholderTextColor="#808080"
            />
          </View>
        </Pressable>
        <TouchableOpacity>
          <Feather name="mic" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: Platform.OS === "android" ? 0 : 0 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#afeeee",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <View>
            {address ? (
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Deliver to{" "}
                {selectedAddress ? selectedAddress?.name : address[0]?.name} -{" "}
                {selectedAddress ? selectedAddress.street : address[0]?.street},
                {selectedAddress
                  ? selectedAddress.postalCode
                  : address[0]?.postalCode}
              </Text>
            ) : (
              <Text>Add Addresses</Text>
            )}
          </View>
          <View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </View>
        </TouchableOpacity>

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

        <Text style={{ fontSize: 18, fontWeight: "600", padding: 10 }}>
          Trending Deals of the week
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          {deals.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductInfoScreen", {
                  id: item?.id,
                  title: item?.title,
                  price: item?.price,
                  carouselImages: item?.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              key={index}
              style={{
                width: "48%",
                marginBottom: 15,
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 5,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 180,
                  resizeMode: "contain",
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            height: 1,
            borderColor: "#d0d0d0",
            borderWidth: 2,
            marginVertical: 10,
          }}
        />
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Today's Deals
        </Text>

        <FlatList
          data={offers}
          keyExtractor={(index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductInfoScreen", {
                    id: item?.id,
                    title: item?.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ height: 150, width: 150, resizeMode: "contain" }}
                />

                <View
                  style={{
                    backgroundColor: "#e31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 5,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            height: 1,
            borderColor: "#d0d0d0",
            borderWidth: 2,
            marginVertical: 10,
          }}
        />

        <View
          style={{
            marginHorizontal: 20,
            width: "45%",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              borderWidth: 0.5,
              height: 30,
              marginBottom: open ? 10 : 10,
            }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={{ color: "#B7B7B7" }}
            zIndex={3000}
            zIndexInverse={1000}
            dropDownContainerStyle={{
              borderColor: "#B7B7B7",
              borderWidth: 0.5,
            }}
          />
        </View>

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={filteredProducts}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
          numColumns={2}
          renderItem={({ item }) => {
            return <ProductItem item={item} />;
          }}
        />
      </ScrollView>
      <BottomModal
        swipeDirection={["up", "down"]}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 430 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Choose your location
            </Text>
            <Text style={{ marginTop: 5, color: "#666", fontSize: 15 }}>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {address.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedAddress(item);
                  setActiveIndex((prevIndex) =>
                    prevIndex === index ? null : index
                  );
                }}
                key={index}
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#aaa",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 160,
                  width: 160,
                  marginRight: 10,
                  backgroundColor:
                    activeIndex === index ? "#dbfaffff" : "#ffffff",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 15, color: "#181818" }}
                  >
                    <Text style={{ fontWeight: "500" }}>House No: </Text>#
                    {item?.houseNo},
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 15,
                      color: "#181818",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "#181818",
                      }}
                    >
                      {" "}
                      Landmark:{" "}
                    </Text>
                    {item?.landmark}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#181818",
                      textAlign: "center",
                    }}
                  >
                    {item?.street}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Address" as never);
                setModalVisible(false);
              }}
              style={{
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                borderColor: "#aaa",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                height: 160,
                width: 160,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#0066b2",
                }}
              >
                Add an address {"\n"} or pickup point
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View
            style={{
              marginBottom: 35,
              gap: 10,
              marginLeft: -5,
              alignItems: "flex-start",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" color="#0066b2" size={22} />
              <Text style={{ fontSize: 15, gap: 10, color: "#0066b2" }}>
                Enter an Indian pincode
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" color="#0066b2" size={22} />
              <Text style={{ fontSize: 15, gap: 10, color: "#0066b2" }}>
                Use my current location
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="globe" color="#0066b2" size={22} />
              <Text style={{ fontSize: 15, gap: 10, color: "#0066b2" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default HomeScreen;
