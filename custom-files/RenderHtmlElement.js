import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const Ele = ({ htmlContent }) => {
  return (
    <RenderHtml
      style={{ flex: 1, padding: 10 }}
      source={{ html: htmlContent }}
    />
  );
};
