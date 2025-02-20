import React from 'react';
import { Icon, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SettingsItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        { alignItems: 'center', flexDirection: 'row' },
        dimensions.width
      )}
    >
      {/* Setting Icon View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 28,
            justifyContent: 'center',
            marginRight: 20,
            width: 28,
          },
          dimensions.width
        )}
      >
        <Image
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          resizeMode={'contain'}
          source={imageSource(Images['CalendarRoundFill'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 24,
              width: 24,
            }),
            dimensions.width
          )}
        />
      </View>
      {/* Setting Text */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
            { color: 'theme.colors["Greyscale 900"]', marginRight: 20 }
          ),
          dimensions.width
        )}
      >
        {'Manage Events'}
      </Text>
      {/* Settings Arrow View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 20,
            justifyContent: 'center',
            width: 20,
          },
          dimensions.width
        )}
      >
        <Icon name={'Entypo/chevron-thin-right'} size={16} />
      </View>
    </View>
  );
};

export default withTheme(SettingsItemBlock);
