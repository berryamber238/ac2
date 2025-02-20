import React from 'react';
import {
  Divider,
  Shadow,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  currentRoute: { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
  routes: [
    { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
    { icon: 'Entypo/home', name: 'RouteTwo', label: 'Route 2' },
    { icon: 'Entypo/home', name: 'RouteThree', label: 'Route 3' },
  ],
};

const EventsScrollBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <TabView
      iconPosition={'top'}
      initialTabIndex={0}
      keyboardDismissMode={'auto'}
      scrollEnabled={false}
      swipeEnabled={true}
      tabBarPosition={'top'}
      tabsBackgroundColor={theme.colors.background.base}
      activeColor={palettes.Brand.appStyle_primary}
      inactiveColor={palettes.App.appStyle_greyscale_500}
      indicatorColor={palettes.Brand.appStyle_primary}
      pressColor={'"rgba(0, 0, 0, 0)"'}
      style={StyleSheet.applyWidth(
        {
          flex: 1,
          fontFamily: 'Urbanist_600SemiBold',
          fontSize: 18,
          letterSpacing: 0.2,
          lineHeight: 25.2,
        },
        dimensions.width
      )}
    >
      {/* Upcoming Tab */}
      <TabViewItem title={'Upcoming'}>
        {/* Upcoming Events Scroll */}
        <ScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={StyleSheet.applyWidth(
            { padding: 24 },
            dimensions.width
          )}
        >
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginBottom: 12 },
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
                          'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'National Music Festival'}
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
                        {'Mon, Dec 24 • 18.00 - 23.00 PM'}
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
                            { width: '75%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'clip'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Grand Park, New York'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand.appStyle_primary }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand.appStyle_primary }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Paid'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Brand.appStyle_greyscale_200}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 1, marginBottom: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Horizontal Buttons */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                          .style,
                        { justifyContent: 'space-between' }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Cancel Button Touchable */}
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* Cancel Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)[
                          'Button With Icon Filled'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)[
                              'Button With Icon Filled'
                            ].style,
                            {
                              alignSelf: 'stretch',
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Body M Semibold']
                              .style,
                            dimensions.width
                          )}
                        >
                          {'Cancel Booking'}
                        </Text>
                      </View>
                    </Touchable>
                    {/* View Ticket Touchable */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('Mine');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* View ETicket Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)['Button With Icon']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)['Button With Icon']
                              .style,
                            {
                              alignSelf: 'stretch',
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Body M Semibold']
                                .style,
                              { color: palettes.App.appStyle_white }
                            ),
                            dimensions.width
                          )}
                        >
                          {'View E-Ticket'}
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginBottom: 12 },
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
                          'https://images.unsplash.com/photo-1623905450682-6ee456a80c87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Art & Mural Workshop'}
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
                        {'Wed, Dec 27 • 14.00 - 16.00 PM'}
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
                            { width: '75%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'clip'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Central Art, Washington'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand.appStyle_primary }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand.appStyle_primary }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Paid'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Brand.appStyle_greyscale_200}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 1, marginBottom: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Horizontal Buttons */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                          .style,
                        { justifyContent: 'space-between' }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Cancel Button Touchable */}
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* Cancel Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)[
                          'Button With Icon Filled'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)[
                              'Button With Icon Filled'
                            ].style,
                            {
                              alignSelf: 'stretch',
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Body M Semibold']
                              .style,
                            dimensions.width
                          )}
                        >
                          {'Cancel Booking'}
                        </Text>
                      </View>
                    </Touchable>
                    {/* View Ticket Touchable */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('Mine');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* View ETicket Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)['Button With Icon']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)['Button With Icon']
                              .style,
                            {
                              alignSelf: 'stretch',
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Body M Semibold']
                                .style,
                              { color: palettes.App.appStyle_white }
                            ),
                            dimensions.width
                          )}
                        >
                          {'View E-Ticket'}
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
        </ScrollView>
      </TabViewItem>
      {/* Completed Tab */}
      <TabViewItem title={'Completed'}>
        {/* Completed Events Scroll */}
        <ScrollView
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          bounces={false}
          contentContainerStyle={StyleSheet.applyWidth(
            { padding: 24 },
            dimensions.width
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginBottom: 12 },
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
                          'https://images.unsplash.com/photo-1598495494482-172d89ff078c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Art & Painting Training'}
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
                        {'Wed, Dec 26 • 18.00 - 21.00 PM'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Central Art, Washington'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.App.appStyle_success }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.App.appStyle_success }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Completed'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Brand.appStyle_greyscale_200}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 1, marginBottom: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Horizontal Buttons */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                          .style,
                        { justifyContent: 'space-between' }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Review Button Touchable */}
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* Review Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)[
                          'Button With Icon Filled'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)[
                              'Button With Icon Filled'
                            ].style,
                            {
                              alignSelf: 'stretch',
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Body M Semibold']
                              .style,
                            dimensions.width
                          )}
                        >
                          {'Leave a Review'}
                        </Text>
                      </View>
                    </Touchable>
                    {/* View Ticket Touchable */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('Mine');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* View ETicket Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)['Button With Icon']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)['Button With Icon']
                              .style,
                            {
                              alignSelf: 'stretch',
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Body M Semibold']
                                .style,
                              { color: palettes.App.appStyle_white }
                            ),
                            dimensions.width
                          )}
                        >
                          {'View E-Ticket'}
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginBottom: 12 },
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
                          'https://images.unsplash.com/photo-1565035010268-a3816f98589a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'DJ & Music Concert'}
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
                        {'Tue, Dec 30 • 18.00 - 22.00 PM'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'New Avenue, New York'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.App.appStyle_success }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.App.appStyle_success }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Completed'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Brand.appStyle_greyscale_200}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 1, marginBottom: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Horizontal Buttons */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                          .style,
                        { justifyContent: 'space-between' }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Review Button Touchable */}
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* Review Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)[
                          'Button With Icon Filled'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)[
                              'Button With Icon Filled'
                            ].style,
                            {
                              alignSelf: 'stretch',
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Body M Semibold']
                              .style,
                            dimensions.width
                          )}
                        >
                          {'Leave a Review'}
                        </Text>
                      </View>
                    </Touchable>
                    {/* View Ticket Touchable */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('Mine');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* View ETicket Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)['Button With Icon']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)['Button With Icon']
                              .style,
                            {
                              alignSelf: 'stretch',
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Body M Semibold']
                                .style,
                              { color: palettes.App.appStyle_white }
                            ),
                            dimensions.width
                          )}
                        >
                          {'View E-Ticket'}
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginBottom: 12 },
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
                          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Fitness & Gym Training'}
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
                        {'Grand Build, New Jersey'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'New Avenue, New York'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.App.appStyle_success }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.App.appStyle_success }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Completed'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Brand.appStyle_greyscale_200}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 1, marginBottom: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Horizontal Buttons */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['Horizontal Buttons']
                          .style,
                        { justifyContent: 'space-between' }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Review Button Touchable */}
                    <Touchable
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* Review Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)[
                          'Button With Icon Filled'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)[
                              'Button With Icon Filled'
                            ].style,
                            {
                              alignSelf: 'stretch',
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Body M Semibold']
                              .style,
                            dimensions.width
                          )}
                        >
                          {'Leave a Review'}
                        </Text>
                      </View>
                    </Touchable>
                    {/* View Ticket Touchable */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('Mine');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '48%' },
                        dimensions.width
                      )}
                    >
                      {/* View ETicket Button */}
                      <View
                        {...GlobalStyles.ViewStyles(theme)['Button With Icon']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ViewStyles(theme)['Button With Icon']
                              .style,
                            {
                              alignSelf: 'stretch',
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderColor: palettes.Brand.appStyle_primary,
                              flexDirection: 'column',
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {/* Button Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Body M Semibold']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Body M Semibold']
                                .style,
                              { color: palettes.App.appStyle_white }
                            ),
                            dimensions.width
                          )}
                        >
                          {'View E-Ticket'}
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
        </ScrollView>
      </TabViewItem>
      {/* Cancelled */}
      <TabViewItem
        style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
        title={'Cancelled'}
      >
        {/* Cancelled Events Scroll */}
        <ScrollView
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          bounces={false}
          contentContainerStyle={StyleSheet.applyWidth(
            { padding: 24 },
            dimensions.width
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
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
                          'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Traditional Dance Festival'}
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
                        {'Tue, Dec 16 • 18.00 - 22.00 PM'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'New Avenue, New York'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand['appStyle-error'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand['appStyle-error'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Cancelled'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
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
                          'https://images.unsplash.com/photo-1656381428168-0b782534259e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Painting Workshops'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Grand Park, New Jersey'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand['appStyle-error'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand['appStyle-error'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Cancelled'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
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
                          'https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'Gebyar Music Festival'}
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
                        {'Thu, Dec 20 • 17.00 - 22.00 PM'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Central Hall, Washington'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand['appStyle-error'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand['appStyle-error'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Cancelled'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
          {/* Event Card */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 24 },
              dimensions.width
            )}
          >
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
              startColor={palettes.App.appStyle_cardShadow_3}
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
              {/* Event Container */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                {/* Event Item View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 28,
                      flexDirection: 'column',
                      padding: 14,
                    },
                    dimensions.width
                  )}
                >
                  {/* Event Details View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
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
                          'https://images.unsplash.com/photo-1576416066728-3a83469793b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 120, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
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
                        {'National Concert of Jazz'}
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
                        {'Wed, Dec 18 • 18.00 - 22.00 PM'}
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
                            { width: '55%' },
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Body M Regular'
                              ].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Body M Regular'
                                  ].style,
                                  {
                                    color:
                                      palettes.Brand.appStyle_greyscale_700,
                                    flex: 1,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Central Park, New York'}
                            </Text>
                          </View>
                        </Touchable>
                        {/* Status Tag */}
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Status Tag']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Status Tag']
                                .style,
                              { borderColor: palettes.Brand['appStyle-error'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Status Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)[
                              'Body XS Semibold'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)[
                                  'Body XS Semibold'
                                ].style,
                                { color: palettes.Brand['appStyle-error'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Cancelled'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </Touchable>
        </ScrollView>
      </TabViewItem>
    </TabView>
  );
};

export default withTheme(EventsScrollBlock);
