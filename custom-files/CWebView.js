import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const New = ({ url, setTitle }) => {
  const webviewRef = useRef(null);
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const handleMessage = event => {
    const { data } = event.nativeEvent;
    setTitle(data);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{
          uri: url,
          headers: {
            Cookie: Variables.cookie,
          },
        }}
        onMessage={handleMessage}
        injectedJavaScript={`
          (function() {
            window.ReactNativeWebView.postMessage(document.title);
          })();
        `}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    margin: 10,
  },
  webview: {
    flex: 1,
  },
});
