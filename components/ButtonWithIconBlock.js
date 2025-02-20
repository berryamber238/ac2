import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const ButtonWithIconBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: theme.colors.branding.primary,
          borderRadius: 50,
          flexDirection: 'row',
          paddingBottom: 6,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 6,
        },
        dimensions.width
      )}
    >
      {/* Icon View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 12,
            justifyContent: 'center',
            marginRight: 8,
            width: 12,
          },
          dimensions.width
        )}
      >
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(Images['CalendarWhiteFIll'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 10,
              width: 10,
            }),
            dimensions.width
          )}
        />
      </View>

      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Body M Semibold'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['Body M Semibold'].style,
            { color: 'theme.colors["White"]' }
          ),
          dimensions.width
        )}
      >
        {'Add to My Calendar'}
      </Text>
    </View>
  );
};

export default withTheme(ButtonWithIconBlock);
