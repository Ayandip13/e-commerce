import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface SliderProps {
  images: any[];
  autoPlay?: boolean;
  interval?: number; // ms
  imageStyle?: object;
  onImagePress?: (index: number) => void;
}

const { width } = Dimensions.get("window");

const CustomSlider: React.FC<SliderProps> = ({
  images,
  autoPlay = true,
  interval = 3000,
  imageStyle,
  onImagePress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Autoplay effect
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, images.length]);

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onImagePress?.(index)}
          >
            <Image
              source={item}
              style={[{ width, height: 200, resizeMode: "cover" }, imageStyle]}
            />
          </TouchableOpacity>
        )}
      />

      {/* Dot indicators */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === currentIndex ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});

export default CustomSlider;
