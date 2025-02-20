import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const LightPurpleButton2Block2 = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: 'theme.colors["Primary 100"]',
          borderRadius: 30,
          bottom: 0,
          height: 58,
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Add Card Touchable */}
      <Touchable
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      >
        {/* Content View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* Button Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Bold'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body L Bold'].style,
              dimensions.width
            )}
          >
            {'Add New Card'}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(LightPurpleButton2Block2);
