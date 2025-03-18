import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const action = ({ text, highlights, textstyle }) => {
  const renderText = () => {
    debugger;
    let parts = [text];
    highlights.forEach(({ word, style, onPress }) => {
      parts = parts.flatMap(part =>
        typeof part === 'string'
          ? part.split(new RegExp(`(${word})`, 'gi'))
          : [part]
      );
    });

    return parts.map((part, index) => {
      const highlight = highlights.find(
        ({ word }) => word.toLowerCase() === part.toLowerCase()
      );
      if (highlight) {
        return (
          <TouchableOpacity key={index} onPress={highlight.onPress}>
            <Text style={[highlight.style]}>{part}</Text>
          </TouchableOpacity>
        );
      }
      return (
        <Text key={index} style={[textstyle]}>
          {part}
        </Text>
      );
    });
  };

  return <Text style={textstyle}>{renderText()}</Text>;
};
