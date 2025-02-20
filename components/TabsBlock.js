import React from 'react';
import {
  Shadow,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const TabsBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View style={StyleSheet.applyWidth({ zIndex: 0 }, dimensions.width)}>
      {/* Organizer Tabs */}
      <TabView
        activeColor={theme.colors.branding.primary}
        iconPosition={'top'}
        initialTabIndex={0}
        keyboardDismissMode={'auto'}
        scrollEnabled={false}
        swipeEnabled={true}
        tabBarPosition={'top'}
        tabsBackgroundColor={theme.colors.background.base}
        inactiveColor={'theme.colors["Greyscale 500"]'}
        indicatorColor={theme.colors.branding.primary}
        pressColor={'"rgba(0, 0, 0, 0)"'}
        style={StyleSheet.applyWidth(
          {
            fontFamily: 'Urbanist_600SemiBold',
            fontSize: 18,
            letterSpacing: 0.2,
            lineHeight: 25.2,
          },
          dimensions.width
        )}
      >
        {/* Events Tab */}
        <TabViewItem
          style={StyleSheet.applyWidth(
            {
              paddingBottom: 24,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 24,
            },
            dimensions.width
          )}
          title={'Events'}
        >
          {/* Result Card */}
          <Touchable>
            <Shadow
              offsetX={0}
              offsetY={0}
              paintInside={true}
              showShadowCornerBottomEnd={true}
              showShadowCornerBottomStart={true}
              showShadowCornerTopEnd={true}
              showShadowCornerTopStart={true}
              showShadowSideBottom={true}
              showShadowSideEnd={true}
              showShadowSideStart={true}
              showShadowSideTop={true}
              distance={20}
              startColor={'theme.colors["Card Shadow 3"]'}
              stretch={false}
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 28,
                  position: 'relative',
                  width: '100%',
                  zIndex: 1,
                },
                dimensions.width
              )}
            >
              {/* Results Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Result Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'theme.colors["White"]',
                      borderRadius: 28,
                      flexDirection: 'row',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderRadius: 20,
                        height: 120,
                        justifyContent: 'center',
                        marginRight: 16,
                        overflow: 'hidden',
                        width: 120,
                      },
                      dimensions.width
                    )}
                  >
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(
                        'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                      )}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 120, width: 120 }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Free Tag */}
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
                      {/* Tag Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Body XS Semibold']
                          .props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Body XS Semibold']
                            .style,
                          dimensions.width
                        )}
                      >
                        {'FREE'}
                      </Text>
                    </View>
                  </View>
                  {/* Information View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: 1, paddingBottom: 16, paddingTop: 16 },
                      dimensions.width
                    )}
                  >
                    {/* Information Title */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['H5'].props}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['H5'].style,
                          { marginBottom: 10 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'International Concert'}
                    </Text>
                    {/* Information Subtitle */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                        .props}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .style,
                          { marginBottom: 10 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Sun, Dec 23 • 19.00 - 23.00 PM'}
                    </Text>
                    {/* Information Bottom Section */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
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
                        {/* Location Info View */}
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
                            <Image
                              resizeMode={'cover'}
                              {...GlobalStyles.ImageStyles(theme)['Image']
                                .props}
                              source={imageSource(Images['Location'])}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image']
                                    .style,
                                  { height: 14, width: 14 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>

                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Body M Regular']
                              .props}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Body M Regular']
                                  .style,
                                { color: 'theme.colors["Greyscale 700"]' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Grand Park, New York'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Favorite Button View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', justifyContent: 'center' },
                          dimensions.width
                        )}
                      >
                        {/* Favorite Unselected Touchable */}
                        <Touchable>
                          {/* Button View */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                height: 24,
                                justifyContent: 'center',
                                width: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Favorite Icon */}
                            <Image
                              resizeMode={'cover'}
                              {...GlobalStyles.ImageStyles(theme)['Image']
                                .props}
                              source={imageSource(Images['Heart'])}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image']
                                    .style,
                                  { height: 20, width: 20 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
        </TabViewItem>
        {/* Collections Tab */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              {
                borderColor: 'theme.colors["Greyscale 200"]',
                borderTopWidth: 0.5,
              }
            ),
            dimensions.width
          )}
          title={'Collections'}
        />
        {/* About Tab */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              {
                borderColor: 'theme.colors["Greyscale 200"]',
                borderTopWidth: 0.5,
              }
            ),
            dimensions.width
          )}
          title={'About'}
        />
      </TabView>
    </View>
  );
};

export default withTheme(TabsBlock);
