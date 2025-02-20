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

const PageTopBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'row',
          height: 48,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Back Icon View */}
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
        {/* Back Button Touchable */}
        <Touchable>
          {/* Back Icon */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['ArrowLeft'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 20, width: 20 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
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
        {'Notification'}
      </Text>
      {/* More Icon View */}
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

export default withTheme(PageTopBlock);
