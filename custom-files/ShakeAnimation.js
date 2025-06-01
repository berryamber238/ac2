import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export const view = forwardRef((props, ref) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { children } = props;
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -5,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 30,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useImperativeHandle(ref, () => ({
    startShake,
  }));
  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: shakeAnimation }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
