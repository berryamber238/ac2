// This import is required if you are defining react components in this module.
import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => <BaseToast {...props} />,
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => <ErrorToast {...props} />,
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, text2, props }) => (
    <View style={styles.container}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

export const ele = () => {
  return (
    <>
      <Toast config={toastConfig} />
    </>
  );
};

export const showToast = (msg, position) => {
  Toast.show({
    type: 'tomatoToast',
    text1: msg,
    bottomOffset: 50,
    position: position ? position : 'bottom',
  });
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    zIndex: 1001,
  },
  text: {
    color: 'white',
  },
});
