import React from 'react';
import { Shadow, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const FeaturedScrollViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <ScrollView
      keyboardShouldPersistTaps={'never'}
      nestedScrollEnabled={false}
      bounces={false}
      contentContainerStyle={StyleSheet.applyWidth(
        { paddingBottom: 24, paddingLeft: 24, paddingTop: 24 },
        dimensions.width
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Card Shadow */}
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
        distance={30}
        offsetY={3}
        startColor={'theme.colors["Card Shadow 3"]'}
        style={StyleSheet.applyWidth(
          { borderRadius: 60, marginRight: 16, opacity: 1 },
          dimensions.width
        )}
      >
        {/* Featured Card Touchable */}
        <Touchable
          onPress={() => {
            try {
              /* 'Navigate' action requires configuration: choose a navigation destination */
            } catch (err) {
              console.error(err);
            }
          }}
        >
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
                  {
                    borderRadius: 32,
                    height: 250,
                    marginBottom: 12,
                    width: 300,
                  }
                ),
                dimensions.width
              )}
            />
            {/* Featured Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { padding: 6, width: '100%' },
                dimensions.width
              )}
            >
              {/* Featured Title */}
              <View>
                {/* Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['H4'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['H4'].style,
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
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* Location Info Touchable */}
                <Touchable>
                  {/* Location Info */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginRight: 12,
                      },
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
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        resizeMode={'contain'}
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
                      {...GlobalStyles.TextStyles(theme)['Body XL Medium']
                        .props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body XL Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'Grand Park, New York'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
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
              </View>
            </View>
          </View>
        </Touchable>
      </Shadow>
      {/* Card Shadow */}
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
        distance={30}
        offsetY={3}
        startColor={'theme.colors["Card Shadow 3"]'}
        style={StyleSheet.applyWidth(
          { borderRadius: 60, marginRight: 16, opacity: 1 },
          dimensions.width
        )}
      >
        {/* Featured Card Touchable */}
        <Touchable
          onPress={() => {
            try {
              /* 'Navigate' action requires configuration: choose a navigation destination */
            } catch (err) {
              console.error(err);
            }
          }}
        >
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
                'https://images.unsplash.com/photo-1533137098665-47ca60257cec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
              )}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image'].style,
                  {
                    borderRadius: 32,
                    height: 250,
                    marginBottom: 12,
                    width: 300,
                  }
                ),
                dimensions.width
              )}
            />
            {/* Featured Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { padding: 6, width: '100%' },
                dimensions.width
              )}
            >
              {/* Featured Title */}
              <View>
                {/* Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['H4'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['H4'].style,
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
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* Location Info Touchable */}
                <Touchable>
                  {/* Location Info */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginRight: 12,
                      },
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
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        resizeMode={'contain'}
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
                      {...GlobalStyles.TextStyles(theme)['Body XL Medium']
                        .props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body XL Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'Grand Park, New York'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
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
              </View>
            </View>
          </View>
        </Touchable>
      </Shadow>
    </ScrollView>
  );
};

export default withTheme(FeaturedScrollViewBlock);
