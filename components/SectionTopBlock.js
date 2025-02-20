import React from 'react';
import { Link, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const SectionTopBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
        },
        dimensions.width
      )}
    >
      {/* Title Text */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['H5'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['H5'].style,
          dimensions.width
        )}
      >
        {'Featured'}
      </Text>
      {/* See All Link */}
      <Link
        accessible={true}
        selectable={false}
        style={StyleSheet.applyWidth(
          {
            fontFamily: 'Urbanist_700Bold',
            fontSize: 16,
            letterSpacing: 0.2,
            lineHeight: 22.4,
          },
          dimensions.width
        )}
        title={'See All'}
      />
    </View>
  );
};

export default withTheme(SectionTopBlock);
