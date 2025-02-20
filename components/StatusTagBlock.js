import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const StatusTagBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          borderColor: theme.colors.branding.primary,
          borderRadius: 6,
          borderWidth: 1,
          justifyContent: 'center',
          paddingBottom: 6,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 6,
        },
        dimensions.width
      )}
    >
      {/* Status Text */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Body XS Semibold'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['Body XS Semibold'].style,
            { color: theme.colors.branding.primary }
          ),
          dimensions.width
        )}
      >
        {'PAID'}
      </Text>
    </View>
  );
};

export default withTheme(StatusTagBlock);
