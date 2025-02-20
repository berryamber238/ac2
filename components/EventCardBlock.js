import React from 'react';
import { Shadow, Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const EventCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <Shadow
      offsetX={0}
      paintInside={true}
      showShadowCornerBottomEnd={true}
      showShadowCornerBottomStart={true}
      showShadowCornerTopEnd={true}
      showShadowCornerTopStart={true}
      showShadowSideBottom={true}
      showShadowSideEnd={true}
      showShadowSideStart={true}
      showShadowSideTop={true}
      distance={60}
      offsetY={4}
      startColor={'theme.colors["Card Shadow 2"]'}
      style={StyleSheet.applyWidth(
        { borderRadius: 40, opacity: 1 },
        dimensions.width
      )}
    >
      {/* Featured Card Touchable */}
      <Touchable>
        {/* Featured Card VIew */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'theme.colors["White"]',
              borderRadius: 40,
              justifyContent: 'center',
              padding: 16,
            },
            dimensions.width
          )}
        >
          {/* Featured Card Image */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(
              'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
            )}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { borderRadius: 32, height: 250, marginBottom: 12, width: 300 }
              ),
              dimensions.width
            )}
          />
          {/* Featured Card Info */}
          <View
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            {/* Featured Title */}
            <View>
              {/* Title Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['H5'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['H5'].style,
                    { marginBottom: 14 }
                  ),
                  dimensions.width
                )}
              >
                {'National Music Festival'}
              </Text>
            </View>
            {/* Featured Date */}
            <View>
              {/* Date Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { marginBottom: 14 }
                  ),
                  dimensions.width
                )}
              >
                {'Mon, Dec 24 • 18.00 - 23.00 PM'}
              </Text>
            </View>
            {/* Featured Bottom View */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Location Info Touchable */}
              <Touchable>
                {/* Location Info */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Location Icon View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 20,
                        justifyContent: 'center',
                        marginRight: 12,
                        width: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Location Icon */}
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(Images['Location'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 16, width: 16 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Location Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body XL Medium'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body XL Medium'].style,
                      dimensions.width
                    )}
                  >
                    {'Grand Park, New York'}
                  </Text>
                </View>
              </Touchable>
              {/* Favorite Icon Touchable */}
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
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
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
            </View>
          </View>
        </View>
      </Touchable>
    </Shadow>
  );
};

export default withTheme(EventCardBlock);
