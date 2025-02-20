import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const PageTopWithLogoBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      {...GlobalStyles.ViewStyles(theme)['Page Top 7'].props}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(GlobalStyles.ViewStyles(theme)['Page Top 7'].style, {
          marginBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
        }),
        dimensions.width
      )}
    >
      {/* Eveno Logo View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 28,
            justifyContent: 'center',
            marginRight: 16,
            width: 28,
          },
          dimensions.width
        )}
      >
        {/* Eveno Logo */}
        <Image
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          resizeMode={'contain'}
          source={imageSource(Images['EvenoLogo'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 24,
              width: 24,
            }),
            dimensions.width
          )}
        />
      </View>
      {/* Screen Title */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['H4'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['H4'].style, {
            flex: 1,
            marginRight: 16,
          }),
          dimensions.width
        )}
      >
        {'Tickets'}
      </Text>
      {/* Search Button View */}
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
        {/* Search Button Touchable */}
        <Touchable>
          {/* Search Icon */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['SearchG900'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 22, width: 22 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
      {/* More Button View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 28,
            justifyContent: 'center',
            width: 28,
          },
          dimensions.width
        )}
      >
        {/* More Button Touchable */}
        <Touchable>
          {/* More Icon */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['MoreCircle'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 22, width: 22 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(PageTopWithLogoBlock);
