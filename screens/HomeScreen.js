import React from 'react';
import {
  Button,
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as TestServiceDraftbitApi from '../apis/TestServiceDraftbitApi.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.Baggage.Shopping_Pure_White, gap: 24 },
        dimensions.width
      )}
    >
      {/* Header View Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 0, flexShrink: 1, gap: 16 },
          dimensions.width
        )}
      >
        {/* Navigation Bar Component */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row', padding: 24 },
            dimensions.width
          )}
        >
          {/* Left Icon */}
          <IconButton icon={'Ionicons/menu-outline'} size={28} />
          {/* Navigation Bar Text */}
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            {/* Navigation Bar Text */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Baggage.Shopping_Featured_Title,
                  fontFamily: 'Cantarell_400Regular',
                  fontSize: 16,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Home'}
            </Text>
          </View>
          {/* Right Icon */}
          <IconButton icon={'AntDesign/search1'} size={24} />
        </View>
        {/* Highlight Section Component */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              gap: 6,
              height: 225,
              minHeight: 225,
              overflow: 'hidden',
            },
            dimensions.width
          )}
        >
          {/* Title */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Featured_Title,
                fontFamily: 'Cantarell_700Bold',
                fontSize: 18,
                letterSpacing: 2,
                textAlign: 'center',
                textTransform: 'uppercase',
              },
              dimensions.width
            )}
          >
            {'Fall Winter 2023\nSuperior Collection'}
          </Text>
          {/* Button Solid */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('CategoryDetailViewRecommendedTabScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Shopping_Primary,
                borderRadius: 64,
                color: palettes.Baggage.Shopping_Pure_White,
                fontFamily: 'Cantarell_700Bold',
                fontSize: 10,
                height: 36,
                letterSpacing: 1,
                minHeight: 36,
                textTransform: 'uppercase',
              },
              dimensions.width
            )}
            title={'Shop Now'}
          />
          {/* Highlight Image */}
          <Image
            resizeMode={'contain'}
            source={imageSource(Images['HeroImageRemovebgPreview'])}
            style={StyleSheet.applyWidth(
              { height: 204, marginTop: -24, width: 204, zIndex: -10 },
              dimensions.width
            )}
          />
        </View>
      </View>
      {/* Content View Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 0, flexShrink: 0, gap: 24 },
          dimensions.width
        )}
      >
        {/* Product Slider Component Slide View */}
        <SimpleStyleScrollView
          bounces={true}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          horizontal={false}
        >
          <TestServiceDraftbitApi.FetchGetProductsGET>
            {({ loading, error, data, refetchGetProducts }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <SimpleStyleFlatList
                  data={fetchData}
                  decelerationRate={'normal'}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ??
                    listData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(listData)
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={
                    'Content View Frame->Product Slider Component Slide View->Fetch->List'
                  }
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate(
                              'CategoryRecordDetailViewScreen'
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Product Slider Record Item */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor:
                                palettes.Baggage.Shopping_Light_Background,
                              borderRadius: 10,
                              gap: 8,
                              height: 112,
                              overflow: 'hidden',
                              paddingBottom: 24,
                              paddingLeft: 24,
                              paddingTop: 24,
                              width: 248,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Overflow Text Hide */}
                          <View>
                            {/* Product Slider Title */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Component_Title,
                                  fontFamily: 'Cantarell_700Bold',
                                  fontSize: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {'Danimo\nFiesta Obscure'}
                            </Text>
                          </View>
                          {/* Overflow Text Hide */}
                          <View>
                            {/* Product Slider Text */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'head'}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Secondary_Title,
                                  fontFamily: 'Montserrat_600SemiBold',
                                  fontSize: 12,
                                  letterSpacing: 2,
                                },
                                dimensions.width
                              )}
                            >
                              {'$22.00'}
                            </Text>
                          </View>
                          {/* Absolute Image */}
                          <View
                            style={StyleSheet.applyWidth(
                              { position: 'absolute', right: -24, top: 0 },
                              dimensions.width
                            )}
                          >
                            <Image
                              resizeMode={'cover'}
                              source={imageSource(
                                Images['ScrollHorizontalSlanted']
                              )}
                              style={StyleSheet.applyWidth(
                                { height: 112, overflow: 'hidden', width: 112 },
                                dimensions.width
                              )}
                            />
                          </View>
                        </View>
                      </Touchable>
                    );
                  }}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    { gap: 16, paddingLeft: 24 },
                    dimensions.width
                  )}
                />
              );
            }}
          </TestServiceDraftbitApi.FetchGetProductsGET>
        </SimpleStyleScrollView>
        {/* List View Component */}
        <View
          style={StyleSheet.applyWidth(
            { marginLeft: 18, marginRight: 18 },
            dimensions.width
          )}
        >
          {/* List TItle */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Secondary_Title,
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                marginLeft: 6,
                marginRight: 6,
                textTransform: 'uppercase',
              },
              dimensions.width
            )}
          >
            {'Trending'}
          </Text>

          <TestServiceDraftbitApi.FetchGetProductsGET>
            {({ loading, error, data, refetchGetProducts }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <SimpleStyleFlatList
                  data={fetchData}
                  decelerationRate={'normal'}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ??
                    listData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(listData)
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={
                    'Content View Frame->List View Component->Fetch->List'
                  }
                  nestedScrollEnabled={false}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <>
                        {/* Flex Attribute Frame */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flexGrow: 1, flexShrink: 0 },
                            dimensions.width
                          )}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate(
                                  'CategoryRecordDetailViewScreen'
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* List Record Item Wrapper */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    palettes.Baggage.Shopping_Light_Background,
                                  borderRadius: 8,
                                  marginBottom: 12,
                                  marginLeft: 6,
                                  marginRight: 6,
                                  marginTop: 12,
                                  padding: 16,
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'contain'}
                                source={imageSource(
                                  Images['HomeTrendingONGBackpack']
                                )}
                                style={StyleSheet.applyWidth(
                                  { height: 80, width: 52 },
                                  dimensions.width
                                )}
                              />
                              {/* Overflow Text Hide */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginTop: 6 },
                                  dimensions.width
                                )}
                              >
                                {/* Name */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        palettes.Baggage
                                          .Shopping_Featured_Title,
                                      fontFamily: 'Cantarell_700Bold',
                                      fontSize: 13,
                                      lineHeight: 17,
                                      textTransform: 'uppercase',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Shrek Co'}
                                </Text>
                              </View>
                              {/* Overflow Text Hide */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginTop: 12 },
                                  dimensions.width
                                )}
                              >
                                {/* Price */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color:
                                        palettes.Baggage
                                          .Shopping_Secondary_Title,
                                      fontFamily: 'Montserrat_600SemiBold',
                                      fontSize: 12,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'$32.00'}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                        </View>
                      </>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                  numColumns={2}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </TestServiceDraftbitApi.FetchGetProductsGET>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
