import { View, Text, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import axios from 'axios'
interface Product {
    id: number;
    image: string;
    title: string;
}
const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const fetchFakeStoreData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchFakeStoreData();
    }, []);
    return (
        <View>
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
                            placeholder="Search by product name"
                            placeholderTextColor="#808080"
                            style={{
                                color: "black",
                            }}
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                </Pressable>
                <TouchableOpacity>
                    <Feather name="mic" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchScreen