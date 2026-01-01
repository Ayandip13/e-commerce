import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const BookmarkedItems = () => {
  const item = useSelector((state: any) => state.bookmark.bookmarks);
  return (
    <View>
      {item.map((item: any, index: number) => (
        <View key={index} style={{ margin: 10, alignItems: "center" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ))}
    </View>
  );
};

export default BookmarkedItems;
