import React, { useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

const NewTicketFAB = ({ onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={animateIn}
      onPressOut={animateOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Ionicons
          name="add"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.text}>
          New Ticket
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default NewTicketFAB;

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    right: 20,
    bottom: 24,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#5B3DF5",

    paddingHorizontal: 22,
    paddingVertical: 15,

    borderRadius: 30,

    shadowColor: "#5B3DF5",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  text: {
    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "700",
  },
});