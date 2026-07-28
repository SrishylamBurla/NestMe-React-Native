import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Loader from "../../components/Loader";

export default function PremiumSplash() {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={["#1E1B4B", "#020617", "#083344"]}
        style={styles.container}
      >
        {/* Glow */}

        <View style={styles.orb1} />

        <View style={styles.orb2} />

        <Animated.View
          style={[
            styles.center,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Image
            source={require("../../assets/icons/splashlogo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>
            nestme
            <Text style={styles.domain}>.in</Text>
          </Text>

          <Text style={styles.subtitle}>
            Find your dream home
          </Text>

          <View
            style={{
              marginTop: 25,
            }}
          >
            <Loader />
          </View>
        </Animated.View>

        <Text style={styles.footer}>
          © 2026 NestMe Technologies
        </Text>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    alignItems: "center",
    zIndex: 2,
  },

  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },

  title: {
    marginTop: 18,
    color: "#fff",
    fontSize: 44,
    fontWeight: "800",
  },

  domain: {
    color: "#818CF8",
  },

  subtitle: {
    marginTop: 12,
    color: "#d1d5db",
    fontSize: 18,
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    bottom: 35,
    color: "#7c7c7c",
    fontSize: 12,
  },

  orb1: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#6366F1",
    opacity: 0.18,
    top: -60,
    left: -100,
  },

  orb2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#06B6D4",
    opacity: 0.16,
    bottom: -70,
    right: -90,
  },
});