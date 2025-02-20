import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RtcEngine from 'react-native-agora';

const APP_ID = 'a9b90cd983ad4910b82aba3339cf8b23'; // 替换为你的 Agora App ID
const CHANNEL_NAME = 'ACE_B98D94641E4_RTC_TESTING'; // 替换为你的频道名称
const TOKEN = '006a9b90cd983ad4910b82aba3339cf8b23IADtG45jij'; // 替换为你的 Agora Token

export const Agora = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localView: {
    width: '100%',
    height: '50%',
  },
  remoteView: {
    width: '100%',
    height: '50%',
  },
});
