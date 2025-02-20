import React from 'react';
import { Shadow, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const PopularEventsList2Block2 = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          paddingBottom: 10,
          paddingLeft: 24,
          paddingTop: 24,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Popular Card Touchable */}
      <Touchable
        onPress={() => {
          try {
            /* 'Navigate' action requires configuration: choose a navigation destination */
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 14, marginRight: 14, width: 160 },
          dimensions.width
        )}
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
          distance={20}
          offsetY={2}
          startColor={'theme.colors["Card Shadow 3"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ShadowStyles(theme)['Event Card'].style,
              { borderRadius: 28, width: '100%' }
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
            {/* Card Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  height: 140,
                  marginBottom: 12,
                  overflow: 'hidden',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Card Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  'https://images.unsplash.com/photo-1540929819775-fcc7d4649250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
              {/* Free Tag View */}
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
                {/* Free Text */}
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
            {/* Popular Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { alignContent: 'flex-start', alignItems: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Popular Title */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                      ellipsizeMode={'tail'}
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
                {/* Favorite Button View */}
                <View>
                  {/* Favorite Selected Touchable */}
                  <>
                    {!Constants['favorite_small_selected'] ? null : (
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
                            source={imageSource(Images['HeartFill'])}
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
                    )}
                  </>
                  {/* Favorite Unselected Touchable */}
                  <>
                    {Constants['favorite_small_selected'] ? null : (
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
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </Touchable>
      {/* Popular Card Touchable */}
      <Touchable
        onPress={() => {
          try {
            /* 'Navigate' action requires configuration: choose a navigation destination */
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 14, marginRight: 14, width: 160 },
          dimensions.width
        )}
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
          distance={20}
          offsetY={2}
          startColor={'theme.colors["Card Shadow 3"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ShadowStyles(theme)['Event Card'].style,
              { borderRadius: 28, width: '100%' }
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
            {/* Card Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  height: 140,
                  marginBottom: 12,
                  overflow: 'hidden',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Card Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
            </View>
            {/* Popular Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { alignContent: 'flex-start', alignItems: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Popular Title */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Music Concert'}
                </Text>
              </View>
              {/* Popular Date */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Tue, Dec 19 • 19.00 - 22.00'}
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
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'Central Park, New York'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
                <View>
                  {/* Favorite Selected Touchable */}
                  <>
                    {!Constants['favorite_small_selected'] ? null : (
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
                            source={imageSource(Images['HeartFill'])}
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
                    )}
                  </>
                  {/* Favorite Unselected Touchable */}
                  <>
                    {Constants['favorite_small_selected'] ? null : (
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
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </Touchable>
      {/* Popular Card Touchable */}
      <Touchable
        onPress={() => {
          try {
            /* 'Navigate' action requires configuration: choose a navigation destination */
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 14, marginRight: 14, width: 160 },
          dimensions.width
        )}
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
          distance={20}
          offsetY={2}
          startColor={'theme.colors["Card Shadow 3"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ShadowStyles(theme)['Event Card'].style,
              { borderRadius: 28, width: '100%' }
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
            {/* Card Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  height: 140,
                  marginBottom: 12,
                  overflow: 'hidden',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Card Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  'https://images.unsplash.com/photo-1613211431746-aacbe481a84b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
            </View>
            {/* Popular Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { alignContent: 'flex-start', alignItems: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Popular Title */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Tech Seminar'}
                </Text>
              </View>
              {/* Popular Date */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Sat, Dec 22 • 10.00 - 12.00'}
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
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'Auditorium Building'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
                <View>
                  {/* Favorite Selected Touchable */}
                  <>
                    {!Constants['favorite_small_selected'] ? null : (
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
                            source={imageSource(Images['HeartFill'])}
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
                    )}
                  </>
                  {/* Favorite Unselected Touchable */}
                  <>
                    {Constants['favorite_small_selected'] ? null : (
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
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </Touchable>
      {/* Popular Card Touchable */}
      <Touchable
        onPress={() => {
          try {
            /* 'Navigate' action requires configuration: choose a navigation destination */
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 14, marginRight: 14, width: 160 },
          dimensions.width
        )}
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
          distance={20}
          offsetY={2}
          startColor={'theme.colors["Card Shadow 3"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ShadowStyles(theme)['Event Card'].style,
              { borderRadius: 28, width: '100%' }
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
            {/* Card Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  height: 140,
                  marginBottom: 12,
                  overflow: 'hidden',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Card Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  'https://images.unsplash.com/photo-1484136199491-6603c473c88b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
              {/* Free Tag View */}
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
                {/* Free Text */}
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
            {/* Popular Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { alignContent: 'flex-start', alignItems: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Popular Title */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Mural Painting'}
                </Text>
              </View>
              {/* Popular Date */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Sun, Dec 16 • 11.00 - 13.00'}
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
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'City Space, New York'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
                <View>
                  {/* Favorite Selected Touchable */}
                  <>
                    {!Constants['favorite_small_selected'] ? null : (
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
                            source={imageSource(Images['HeartFill'])}
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
                    )}
                  </>
                  {/* Favorite Unselected Touchable */}
                  <>
                    {Constants['favorite_small_selected'] ? null : (
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
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </Touchable>
      {/* Popular Card Touchable */}
      <Touchable
        onPress={() => {
          try {
            /* 'Navigate' action requires configuration: choose a navigation destination */
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { marginBottom: 14, marginRight: 14, width: 160 },
          dimensions.width
        )}
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
          distance={20}
          offsetY={2}
          startColor={'theme.colors["Card Shadow 3"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ShadowStyles(theme)['Event Card'].style,
              { borderRadius: 28, width: '100%' }
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
            {/* Card Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  height: 140,
                  marginBottom: 12,
                  overflow: 'hidden',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Card Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
            </View>
            {/* Popular Card Info */}
            <View
              style={StyleSheet.applyWidth(
                { alignContent: 'flex-start', alignItems: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Popular Title */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', width: '100%' },
                  dimensions.width
                )}
              >
                {/* Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['H6'].props}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['H6'].style,
                      { flex: 1, marginBottom: 8 }
                    ),
                    dimensions.width
                  )}
                >
                  {'Fitness & Gym Training'}
                </Text>
              </View>
              {/* Popular Date */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
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
                  {'Thu, Dec 21 • 09.00 - 12.00'}
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
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                        dimensions.width
                      )}
                    >
                      {'Health Center, Washington'}
                    </Text>
                  </View>
                </Touchable>
                {/* Favorite Button View */}
                <View>
                  {/* Favorite Selected Touchable */}
                  <>
                    {!Constants['favorite_small_selected'] ? null : (
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
                            source={imageSource(Images['HeartFill'])}
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
                    )}
                  </>
                  {/* Favorite Unselected Touchable */}
                  <>
                    {Constants['favorite_small_selected'] ? null : (
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
                    )}
                  </>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </Touchable>
    </View>
  );
};

export default withTheme(PopularEventsList2Block2);
