import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const BottomButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: 'theme.colors["White"]',
          bottom: 0,
          justifyContent: 'center',
          paddingBottom: 36,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 24,
          position: 'absolute',
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Booking Button Touchable */}
      <Touchable
        style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
      >
        {/* Button View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: theme.colors.branding.primary,
              borderRadius: 30,
              height: 58,
              justifyContent: 'center',
              paddingBottom: 16,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Button Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Bold'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Body L Bold'].style,
                { color: 'theme.colors["White"]' }
              ),
              dimensions.width
            )}
          >
            {'Book Event'}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(BottomButtonBlock);
