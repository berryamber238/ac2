import React from 'react';
import { Divider, Shadow, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const TotalCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <Shadow
      offsetX={0}
      paintInside={true}
      showShadowCornerBottomEnd={true}
      showShadowCornerBottomStart={true}
      showShadowCornerTopEnd={true}
      showShadowCornerTopStart={true}
      showShadowSideBottom={true}
      showShadowSideEnd={true}
      showShadowSideStart={true}
      showShadowSideTop={true}
      distance={20}
      offsetY={3}
      startColor={'theme.colors["Card Shadow 2"]'}
      style={StyleSheet.applyWidth(
        { borderRadius: 28, marginBottom: 24, width: '100%' },
        dimensions.width
      )}
    >
      {/* Total Card View */}
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
        {/* Seats View */}
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
          {/* Seats Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body M Medium'].style,
              dimensions.width
            )}
          >
            {'1 Seats (Economy)'}
          </Text>
          {/* Seats Detail Text */}
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
            {'$50.00'}
          </Text>
        </View>
        {/* Tax View */}
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
          {/* Tax Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body M Medium'].style,
              dimensions.width
            )}
          >
            {'Tax'}
          </Text>
          {/* Tax Detail Text */}
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
            {'$5.00'}
          </Text>
        </View>
        <Divider
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          color={'theme.colors["Greyscale 200"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              { height: 1, marginBottom: 20 }
            ),
            dimensions.width
          )}
        />
        {/* Total View */}
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
          {/* Total Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body M Medium'].style,
              dimensions.width
            )}
          >
            {'Total\n'}
          </Text>
          {/* total Detail Text */}
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
            {'$55.00'}
          </Text>
        </View>
      </View>
    </Shadow>
  );
};

export default withTheme(TotalCardBlock);
