import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Image, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const FavoriteButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View>
      {/* Favorite Selected Touchable */}
      <>
        {!Constants['favorite_selected'] ? null : (
          <Touchable>
            {/* Icon VIew */}
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
              {/* Heart Icon */}
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                resizeMode={'contain'}
                source={imageSource(Images['HeartFill'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 24, width: 24 }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </Touchable>
        )}
      </>
      {/* Favorite Unselected Touchable */}
      <>
        {Constants['favorite_selected'] ? null : (
          <Touchable>
            {/* Icon VIew */}
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
              {/* Heart Icon */}
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                resizeMode={'contain'}
                source={imageSource(Images['Heart'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 24, width: 24 }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </Touchable>
        )}
      </>
    </View>
  );
};

export default withTheme(FavoriteButtonBlock);
