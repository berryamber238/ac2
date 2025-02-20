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

const HorizontalButtonsBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Follow Button */}
      <View
        {...GlobalStyles.ViewStyles(theme)['Button With Icon Filled'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Button With Icon Filled'].style,
          dimensions.width
        )}
      >
        {/* Icon View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 20,
              justifyContent: 'center',
              marginRight: 8,
              width: 20,
            },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['AddUserWhiteFill'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 16, width: 16 }
              ),
              dimensions.width
            )}
          />
        </View>

        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body XL Bold'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body XL Bold'].style,
              {
                color: 'theme.colors["White"]',
                fontFamily: 'Urbanist_600SemiBold',
              }
            ),
            dimensions.width
          )}
        >
          {'Follow'}
        </Text>
      </View>
      {/* Message Button */}
      <View
        {...GlobalStyles.ViewStyles(theme)['Button With Icon'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Button With Icon'].style,
          dimensions.width
        )}
      >
        {/* Icon View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 20,
              justifyContent: 'center',
              marginRight: 8,
              width: 20,
            },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['MessageFill'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 16, width: 16 }
              ),
              dimensions.width
            )}
          />
        </View>

        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body XL Bold'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body XL Bold'].style,
              {
                color: theme.colors.branding.primary,
                fontFamily: 'Urbanist_600SemiBold',
              }
            ),
            dimensions.width
          )}
        >
          {'Message'}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(HorizontalButtonsBlock);
