import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const InformationCard2Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: 'theme.colors["White"]',
          borderRadius: 28,
          flexDirection: 'column',
          padding: 24,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Name View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Name Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Body M Medium'].style,
            dimensions.width
          )}
        >
          {'Full Name'}
        </Text>
        {/* Name Detail Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
              { color: 'theme.colors["Greyscale 800"]' }
            ),
            dimensions.width
          )}
        >
          {'Andrew Ainsley'}
        </Text>
      </View>
      {/* Phone View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Phone Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Body M Medium'].style,
            dimensions.width
          )}
        >
          {'Phone'}
        </Text>
        {/* Phone Detail Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
              { color: 'theme.colors["Greyscale 800"]' }
            ),
            dimensions.width
          )}
        >
          {'+1 111 467 378 399'}
        </Text>
      </View>
      {/* Email View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Email Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Body M Medium'].style,
            dimensions.width
          )}
        >
          {'Email'}
        </Text>
        {/* Email Detail Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
              { color: 'theme.colors["Greyscale 800"]' }
            ),
            dimensions.width
          )}
        >
          {'andrew_ainsley@yo...com'}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(InformationCard2Block);
