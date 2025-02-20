import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
// let isVisible = false;
export const AnimatedView = ({ isVisible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0.6 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]} />;
};

export const show = () => {
  isVisible = true;
};

export const hide = () => {
  isVisible = false;
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#9E9E9E',
  },
});
