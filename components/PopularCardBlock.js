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

const PopularCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <Touchable
      style={StyleSheet.applyWidth({ width: '50%' }, dimensions.width)}
    >
      {/* Popular Card Shadow */}
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
        {...GlobalStyles.ShadowStyles(theme)['Event Card'].props}
        distance={60}
        offsetY={4}
        startColor={'theme.colors["Card Shadow 2"]'}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ShadowStyles(theme)['Event Card'].style,
            { width: '100%' }
          ),
          dimensions.width
        )}
      >
        {/* Popular Card VIew */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              backgroundColor: 'theme.colors["White"]',
              borderRadius: 28,
              flexDirection: 'column',
              justifyContent: 'center',
              paddingBottom: 16,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 14,
            },
            dimensions.width
          )}
        >
          {/* Popular Card Image */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(
              'https://images.unsplash.com/photo-1540929819775-fcc7d4649250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
            )}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { borderRadius: 20, height: 150, marginBottom: 12 }
              ),
              dimensions.width
            )}
          />
          {/* Popular Card Info */}
          <View
            style={StyleSheet.applyWidth(
              { alignContent: 'flex-start', alignItems: 'flex-start' },
              dimensions.width
            )}
          >
            {/* Popular Title */}
            <View>
              {/* Title Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['H6'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['H6'].style,
                    { marginBottom: 8 }
                  ),
                  dimensions.width
                )}
              >
                {'Art Workshops'}
              </Text>
            </View>
            {/* Popular Date */}
            <View>
              {/* Date Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body S Semibold'].props}
                numberOfLines={1}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Body S Semibold'].style,
                  dimensions.width
                )}
              >
                {'Fri, Dec 20 • 13.00 - 15.00'}
              </Text>
            </View>
            {/* Popular Bottom View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Location Info Touchable */}
              <Touchable
                style={StyleSheet.applyWidth(
                  { width: '85%' },
                  dimensions.width
                )}
              >
                {/* Location Info */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginRight: 8,
                    },
                    dimensions.width
                  )}
                >
                  {/* Location Icon View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 16,
                        justifyContent: 'center',
                        marginRight: 8,
                        width: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Location Icon */}
                    <Image
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      resizeMode={'contain'}
                      source={imageSource(Images['Location'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 14, width: 14 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Location Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body S Medium'].props}
                    ellipsizeMode={'head'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                      dimensions.width
                    )}
                  >
                    {'New Avenue, Washington'}
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
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
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
                        { height: 16, width: 16 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Shadow>
    </Touchable>
  );
};

export default withTheme(PopularCardBlock);
