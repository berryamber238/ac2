import React from 'react';
import {
  Button,
  Checkbox,
  Circle,
  IconButton,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as TestServiceDraftbitApi from '../apis/TestServiceDraftbitApi.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const CategoryRecordDetailViewScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasBottomSafeArea={true}
      hasTopSafeArea={true}
      scrollable={true}
    >
      {/* Fetch Screen (Category Record Detail View) */}
      <TestServiceDraftbitApi.FetchGetProductsGET>
        {({ loading, error, data, refetchGetProducts }) => {
          const fetchScreenCategoryRecordDetailViewData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* Navigation Bar Component */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', padding: 24 },
                  dimensions.width
                )}
              >
                {/* Left Side Frame */}
                <View
                  style={StyleSheet.applyWidth({ width: 75 }, dimensions.width)}
                >
                  <IconButton
                    color={palettes.Baggage.Shopping_Icon_Button}
                    icon={'AntDesign/left'}
                    size={24}
                  />
                </View>
                {/* Middle Frame */}
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  {/* Navigation Bar Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
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
                    {'Travel Bag'}
                  </Text>
                </View>
                {/* Right Side Frame 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      gap: 12,
                      justifyContent: 'flex-end',
                      width: 75,
                    },
                    dimensions.width
                  )}
                >
                  <IconButton
                    color={palettes.Baggage.Shopping_Icon_Button}
                    icon={'AntDesign/search1'}
                    size={24}
                  />
                  {/* Icon Button 2 */}
                  <IconButton
                    color={palettes.Baggage.Shopping_Icon_Button}
                    icon={'AntDesign/gift'}
                    size={24}
                  />
                </View>
              </View>
              {/* Content Scroll View Frame */}
              <SimpleStyleScrollView
                bounces={true}
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  { marginBottom: 16, marginTop: 16 },
                  dimensions.width
                )}
              >
                {/* Image Background Flex Grow */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor:
                        palettes.Baggage.Shopping_Product_Card_Background,
                      height: 241,
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  {/* Product Card Featured Image */}
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(
                      Images['ProductCardDetailRemovebgPreview']
                    )}
                    style={StyleSheet.applyWidth(
                      { height: 281, width: 281 },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Record Title and Description Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { gap: 12, margin: 24 },
                    dimensions.width
                  )}
                >
                  {/* OverFlow Text Hide */}
                  <View>
                    {/* Text — Component Title */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={2}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Baggage.Shopping_Featured_Title,
                          fontFamily: 'Cantarell_700Bold',
                          fontSize: 16,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                        },
                        dimensions.width
                      )}
                    >
                      {'Backpack with Contrast Straps'}
                    </Text>
                  </View>
                  {/* OverFlow Text Hide */}
                  <View>
                    {/* Text — Component Title Second Line */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Baggage.Shopping_Secondary_Title,
                          fontFamily: 'Montserrat_600SemiBold',
                          fontSize: 12,
                        },
                        dimensions.width
                      )}
                    >
                      {'$15.00'}
                    </Text>
                  </View>
                </View>
                {/* Details Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      gap: 12,
                      marginBottom: 24,
                      marginLeft: 24,
                      marginRight: 24,
                    },
                    dimensions.width
                  )}
                >
                  {/* Component Title Small */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Secondary_Title,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 12,
                        textTransform: 'uppercase',
                      },
                      dimensions.width
                    )}
                  >
                    {'Details'}
                  </Text>
                  {/* Component Title Small w Description */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Featured_Title,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 12,
                      },
                      dimensions.width
                    )}
                  >
                    {
                      'Made from a cotton-poly blend, the No Wrinkles® technology keeps this shirt looking fresh and new. Standard fit button-down with point Belt.'
                    }
                  </Text>
                </View>
                {/* Details Frame 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      gap: 12,
                      marginBottom: 24,
                      marginLeft: 24,
                      marginRight: 24,
                    },
                    dimensions.width
                  )}
                >
                  {/* Component Title Small */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Secondary_Title,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 12,
                        textTransform: 'uppercase',
                      },
                      dimensions.width
                    )}
                  >
                    {'Colour'}
                  </Text>
                  {/* Option Toggles Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        maxWidth: 150,
                      },
                      dimensions.width
                    )}
                  >
                    <Pressable>
                      <Circle
                        bgColor={palettes.Baggage.Shopping_Orange}
                        size={18}
                      />
                    </Pressable>
                    {/* Pressable 2 */}
                    <Pressable>
                      {/* Circle 2 */}
                      <Circle
                        bgColor={palettes.Baggage.Shopping_Indicator_Blue}
                        size={18}
                      />
                    </Pressable>
                    {/* Pressable 3 */}
                    <Pressable>
                      {/* Circle 3 */}
                      <Circle
                        bgColor={palettes.Baggage.Shopping_Icon_Button}
                        size={18}
                      />
                    </Pressable>
                    {/* Pressable 4 */}
                    <Pressable>
                      {/* Circle 4 */}
                      <Circle
                        bgColor={palettes.Baggage.Shopping_Featured_Title}
                        size={18}
                      />
                    </Pressable>
                  </View>
                </View>
                {/* Details Frame 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      gap: 12,
                      marginBottom: 24,
                      marginLeft: 24,
                      marginRight: 24,
                    },
                    dimensions.width
                  )}
                >
                  {/* Component Title Small */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Secondary_Title,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 12,
                        textTransform: 'uppercase',
                      },
                      dimensions.width
                    )}
                  >
                    {'Size'}
                  </Text>
                  {/* Option Toggles Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        maxWidth: 200,
                      },
                      dimensions.width
                    )}
                  >
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinkStyles(theme)['Link'].style,
                          { fontFamily: 'Cantarell_700Bold', fontSize: 12 }
                        ),
                        dimensions.width
                      )}
                      title={'29\n'}
                    />
                    {/* Link 2 */}
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinkStyles(theme)['Link'].style,
                          { fontFamily: 'Cantarell_700Bold', fontSize: 12 }
                        ),
                        dimensions.width
                      )}
                      title={'30'}
                    />
                    {/* Link 3 */}
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinkStyles(theme)['Link'].style,
                          { fontFamily: 'Cantarell_700Bold', fontSize: 12 }
                        ),
                        dimensions.width
                      )}
                      title={'31'}
                    />
                    {/* Link 4 */}
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinkStyles(theme)['Link'].style,
                          { fontFamily: 'Cantarell_700Bold', fontSize: 12 }
                        ),
                        dimensions.width
                      )}
                      title={'32'}
                    />
                  </View>
                </View>
                {/* Component Title Small */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Baggage.Shopping_Secondary_Title,
                      fontFamily: 'Cantarell_700Bold',
                      fontSize: 12,
                      marginBottom: 12,
                      marginLeft: 24,
                      marginRight: 24,
                      textTransform: 'uppercase',
                    },
                    dimensions.width
                  )}
                >
                  {'Similar Products'}
                </Text>
                {/* Scrollable Details Frame */}
                <SimpleStyleScrollView
                  bounces={true}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsHorizontalScrollIndicator={true}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
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
                            'Fetch Screen (Category Record Detail View)->Content Scroll View Frame->Scrollable Details Frame->Fetch->List'
                          }
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <Pressable>
                                {/* Suggested Item Frame */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { width: 100 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Similar Product Image BG */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor:
                                          palettes.Baggage
                                            .Shopping_Light_Background,
                                        borderRadius: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* SP Image */}
                                    <Image
                                      resizeMode={'contain'}
                                      source={imageSource(
                                        Images[
                                          'ProductCardDetailSuggestedImages'
                                        ]
                                      )}
                                      style={StyleSheet.applyWidth(
                                        { height: 92, width: 56 },
                                        dimensions.width
                                      )}
                                    />
                                  </View>
                                  {/* Overflow Text Hide */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { marginTop: 12 },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Name Item */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      ellipsizeMode={'tail'}
                                      numberOfLines={1}
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'center',
                                          color:
                                            palettes.Baggage
                                              .Shopping_Featured_Title,
                                          fontFamily: 'Cantarell_700Bold',
                                          fontSize: 12,
                                          textTransform: 'uppercase',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'Sasha'}
                                    </Text>
                                  </View>
                                  {/* Overflow Text Hide */}
                                  <View>
                                    {/* Price Item */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      ellipsizeMode={'tail'}
                                      numberOfLines={1}
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'center',
                                          color:
                                            'theme.colors.custom_rgb153_153_153',
                                          fontFamily: 'Montserrat_600SemiBold',
                                          fontSize: 12,
                                          marginTop: 4,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'$212'}
                                    </Text>
                                  </View>
                                </View>
                              </Pressable>
                            );
                          }}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          style={StyleSheet.applyWidth(
                            { gap: 12, paddingLeft: 24, paddingRight: 24 },
                            dimensions.width
                          )}
                        />
                      );
                    }}
                  </TestServiceDraftbitApi.FetchGetProductsGET>
                </SimpleStyleScrollView>
              </SimpleStyleScrollView>
              {/* Footer Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: theme.colors.background.brand,
                    flexDirection: 'row',
                    gap: 16,
                    marginBottom: 24,
                    marginLeft: 24,
                    marginRight: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Icon */}
                <Circle
                  bgColor={palettes.Baggage.Shopping_Light_Background}
                  size={36}
                >
                  {/* Heart Checkbox */}
                  <Checkbox
                    onPress={newHeartCheckboxValue => {
                      const checkboxValue = newHeartCheckboxValue;
                      try {
                        setValue(value);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    checkedIcon={'AntDesign/heart'}
                    color={palettes.Brand.Shopping_Primary}
                    size={18}
                    status={checkboxValue}
                    uncheckedColor={palettes.Brand.Shopping_Primary}
                    uncheckedIcon={'AntDesign/hearto'}
                  />
                </Circle>
                {/* Flex Property Frame */}
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  {/* Fixed Button */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('PrimaryBottomNavigator', {
                          screen: 'CartNavigators',
                          params: { screen: 'CartScreen' },
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.Brand.Shopping_Primary,
                        borderRadius: 8,
                        color: palettes.Brand.Surface,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 10,
                        textTransform: 'uppercase',
                      },
                      dimensions.width
                    )}
                    title={'Add to bag'}
                  />
                </View>
              </View>
            </>
          );
        }}
      </TestServiceDraftbitApi.FetchGetProductsGET>
    </ScreenContainer>
  );
};

export default withTheme(CategoryRecordDetailViewScreen);
