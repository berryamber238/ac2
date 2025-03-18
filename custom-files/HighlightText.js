import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Component = ({ text, highlight, style, numberOfLines }) => {
  // 将文字拆分成高亮前、高亮部分和高亮后
  let parts;
  if (highlight) {
    parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  }

  return highlight ? (
    <Text style={style} numberOfLines={numberOfLines}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  ) : (
    <Text style={style} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    lineHeight: 22,
    // marginBottom: 8,
    // marginTop: 8,
  },
  highlight: {
    color: '#ffffff', // 高亮背景色
    backgroundColor: '#2b33e6',
    borderRadius: 4,
  },
});
