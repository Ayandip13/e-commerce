import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

export default function ShimmerText({ text }: { text: string }) {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1600,
                useNativeDriver: true,
            })
        );

        animation.start();

        return () => {
            animation.stop();
        };
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-120, 120],
    });

    return (
        <MaskedView
            maskElement={
                <Text style={styles.text}>
                    {text}
                </Text>
            }
        >
            {/* Base text color (important!) */}
            <Text style={[styles.text, styles.baseText]}>
                {text}
            </Text>

            {/* Shimmer layer */}
            <AnimatedLinearGradient
                colors={["transparent", "rgba(255,255,255,0.8)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.shimmer,
                    { transform: [{ translateX }] },
                ]}
            />
        </MaskedView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
    },
    baseText: {
        color: "#8e8e8e", // text stays visible
    },
    shimmer: {
        position: "absolute",
        width: 120,
        height: "100%",
    },
});
