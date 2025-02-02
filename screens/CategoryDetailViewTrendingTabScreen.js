import React from 'react';
import {
  Checkbox,
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

const CategoryDetailViewTrendingTabScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth({ gap: 24 }, dimensions.width)}
    >
      {/* Header View Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 0, flexShrink: 0, gap: 16 },
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
          {/* Left Side Frame */}
          <View style={StyleSheet.applyWidth({ width: 75 }, dimensions.width)}>
            <IconButton
              color={palettes.Baggage.Shopping_Icon_Button}
              icon={'AntDesign/left'}
              size={24}
            />
          </View>
          {/* Middle Frame */}
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
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
              {'Products Category'}
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
        {/* Nav Bar Additional Configuration */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 24,
              paddingRight: 24,
            },
            dimensions.width
          )}
        >
          {/* Left Side Frame */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', gap: 12 },
              dimensions.width
            )}
          >
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.navigate('PrimaryBottomNavigator', {
                    screen: 'HomeNavigators',
                    params: {
                      screen: 'CategoryDetailViewRecommendedTabScreen',
                    },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinkStyles(theme)['Link'].style,
                  {
                    color: palettes.Baggage.Shopping_Secondary_Title,
                    fontFamily: 'Cantarell_400Regular',
                    fontSize: 12,
                    textTransform: 'uppercase',
                  }
                ),
                dimensions.width
              )}
              title={'Recommended'}
            />
            {/* Link 2 */}
            <Link
              accessible={true}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinkStyles(theme)['Link'].style,
                  {
                    color: palettes.Baggage.Shopping_Featured_Title,
                    fontFamily: 'Cantarell_400Regular',
                    fontSize: 12,
                    textTransform: 'uppercase',
                  }
                ),
                dimensions.width
              )}
              title={'Trending'}
            />
          </View>
          {/* Right Side Frame */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 12 },
              dimensions.width
            )}
          >
            <IconButton
              color={palettes.Baggage.Shopping_Inactive_Icon}
              icon={'Feather/square'}
              size={20}
            />
            {/* Icon Button 2 */}
            <IconButton
              color={palettes.Brand.Shopping_Primary}
              icon={'Feather/grid'}
              size={20}
            />
          </View>
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
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'Content Scroll View Frame->Fetch->List'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Pressable>
                      {/* List Record Item Wrapper */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: 'stretch',
                            flexDirection: 'row',
                            flexGrow: 1,
                            flexShrink: 0,
                            marginBottom: 10,
                            marginLeft: 24,
                            marginRight: 24,
                            marginTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Left Side Wrapper */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1, flexDirection: 'row', gap: 18 },
                            dimensions.width
                          )}
                        >
                          {/* Light BG */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes.Baggage.Shopping_Light_Background,
                                borderRadius: 10,
                                height: 65,
                                justifyContent: 'center',
                                width: 65,
                              },
                              dimensions.width
                            )}
                          >
                            {/* List Item Image */}
                            <Image
                              resizeMode={'contain'}
                              source={imageSource(Images['ProductCategory'])}
                              style={StyleSheet.applyWidth(
                                { height: 48, width: 30 },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* Record Details Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flex: 1, justifyContent: 'center' },
                              dimensions.width
                            )}
                          >
                            {/* List Item Title */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Featured_Title,
                                  fontFamily: 'Cantarell_400Regular',
                                  fontSize: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {'Very Bradley Green Boroque'}
                            </Text>
                            {/* List Item Color */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Secondary_Title,
                                  fontFamily: 'Cantarell_400Regular',
                                  fontSize: 8,
                                  marginTop: 4,
                                },
                                dimensions.width
                              )}
                            >
                              {'Black'}
                            </Text>
                            {/* Pricing Frame */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4, marginTop: 8 },
                                dimensions.width
                              )}
                            >
                              {/* List Item Original Price */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      palettes.Baggage.Shopping_Icon_Button,
                                    fontFamily: 'Montserrat_400Regular',
                                    fontSize: 10,
                                    textDecorationLine: 'line-through',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'$800'}
                              </Text>
                              {/* List Item Sale Price */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      palettes.Baggage.Shopping_Featured_Title,
                                    fontFamily: 'Montserrat_400Regular',
                                    fontSize: 10,
                                    marginLeft: 3,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'$420'}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {/* Icon Flex Properties Flex End */}
                        <View
                          style={StyleSheet.applyWidth(
                            { justifyContent: 'flex-end' },
                            dimensions.width
                          )}
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
                            size={20}
                            status={checkboxValue}
                            uncheckedColor={palettes.Brand.Shopping_Primary}
                            uncheckedIcon={'AntDesign/hearto'}
                          />
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            );
          }}
        </TestServiceDraftbitApi.FetchGetProductsGET>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(CategoryDetailViewTrendingTabScreen);
