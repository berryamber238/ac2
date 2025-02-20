import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const ImageItem120x120Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          borderRadius: 20,
          height: 120,
          justifyContent: 'center',
          marginRight: 16,
          overflow: 'hidden',
          width: 120,
        },
        dimensions.width
      )}
    >
      <Image
        resizeMode={'cover'}
        {...GlobalStyles.ImageStyles(theme)['Image'].props}
        source={imageSource(
          'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        )}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
            height: 120,
            width: 120,
          }),
          dimensions.width
        )}
      />
      {/* Free Tag */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors.branding.primary,
            borderRadius: 6,
            paddingBottom: 6,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 6,
            position: 'absolute',
            right: 12,
            top: 12,
          },
          dimensions.width
        )}
      >
        {/* Tag Text */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body XS Semibold'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Body XS Semibold'].style,
            dimensions.width
          )}
        >
          {'FREE'}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(ImageItem120x120Block);
