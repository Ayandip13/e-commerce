import { View, Text, Pressable, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import axios from 'axios'
import { API_URL } from '../api';
import { useNavigation } from '@react-navigation/native';
import ShimmerText from '../components/ShimmerText';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface Product {
    id: number;
    title: string;
    oldPrice: number;
    price: number;
    image: string;
    carouselImages: string[];
    color: string;
    size: string;
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

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const navigation = useNavigation();
    const deals: Deal[] = [
        {
            id: "21",
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
            id: "22",
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
            id: "23",
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
            id: "24",
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
            id: "25",
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
            id: "26",
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
            id: "27",
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
            id: "28",
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
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [fake, Electronics, Books, Mobiles, Fashion, Home, Music] = await Promise.all([
                    axios.get('https://fakestoreapi.com/products'),
                    axios.get(`${API_URL}categories/electronics/all`),
                    axios.get(`${API_URL}categories/books/all`),
                    axios.get(`${API_URL}categories/mobiles/all`),
                    axios.get(`${API_URL}categories/fashion/all`),
                    axios.get(`${API_URL}categories/home/all`),
                    axios.get(`${API_URL}categories/music/all`)
                ]);

                setProducts([
                    ...fake.data,
                    ...(Electronics.data.products || []),
                    ...(Books.data.products || []),
                    ...(Mobiles.data.products || []),
                    ...(Fashion.data.products || []),
                    ...(Home.data.products || []),
                    ...(Music.data.products || []),
                    ...deals,
                    ...offers,
                ]);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAll();
    }, []);
    const filteredProducts =
        searchQuery.trim().length === 0
            ? []
            : products.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}>
            <View
                style={{
                    backgroundColor: Colors.primary,
                    paddingHorizontal: 15,
                    paddingBottom: 15,
                    paddingTop: 50,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        gap: 12,
                        borderRadius: 8,
                        height: 42,
                        flex: 1,
                        paddingHorizontal: 15,
                        ...Colors.cardShadow,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Feather name="search" size={20} color={Colors.gray} />
                        <TextInput
                            placeholder="Search by product name"
                            placeholderTextColor={Colors.gray}
                            style={{
                                color: Colors.textPrimary,
                                flex: 1,
                                fontSize: 15,
                            }}
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{ marginLeft: 15 }}>
                    <Feather name="mic" size={20} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={{
                    marginTop: 10,
                }}
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: '30%',
                    }}>
                        <ShimmerText text="No results found..." />
                    </View>
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: Colors.white,
                            marginVertical: 8,
                            marginHorizontal: 15,
                            borderRadius: 12,
                            padding: 15,
                            ...Colors.cardShadow,
                        }}
                    >
                        <View>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <View
                            style={{
                                gap: 5,
                                width: '70%',
                            }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: Colors.textPrimary,
                                }}>{item.title}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 4,
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: "700", color: Colors.accent }}>₹{item.price}</Text>
                                {item.oldPrice ? (
                                    <Text style={{ textDecorationLine: "line-through", color: Colors.gray, fontSize: 14 }}>
                                        ₹{item.oldPrice}
                                    </Text>
                                ) : null}
                            </View>
                            {
                                item.size ? (
                                    <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 4 }}>{item.size}</Text>
                                ) : (
                                    <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 4 }}>Standard Size</Text>
                                )
                            }
                            <TouchableOpacity
                                onPress={() => (navigation as any).navigate("ProductInfoScreen", {
                                    id: item.id,
                                    title: item.title,
                                    price: item.price,
                                    carouselImages: item.carouselImages || [item.image],
                                    color: item.color,
                                    size: item.size,
                                    oldPrice: item.oldPrice,
                                    item: item,
                                })}
                                style={{
                                    flex: 1,
                                    alignItems: "flex-end",
                                }}>
                                <Text
                                    style={{
                                        color: Colors.accent,
                                        fontWeight: "600",
                                        fontSize: 14,
                                    }}>See more ...</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default SearchScreen