import React from 'react';
import {
  Button,
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Stepper,
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

const CartScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [stepperValue, setStepperValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasBottomSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth({ gap: 24, padding: 24 }, dimensions.width)}
    >
      {/* Header View Frame */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        <IconButton
          color={palettes.Baggage.Shopping_Icon_Button}
          icon={'AntDesign/left'}
          size={24}
        />
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
            {'Shopping Cart'}
          </Text>
        </View>
        <IconButton
          color={palettes.Baggage.Shopping_Icon_Button}
          icon={'AntDesign/search1'}
          size={24}
        />
      </View>
      {/* Scrolling Content Frame */}
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
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
                listKey={'Scrolling Content Frame->Fetch->List'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* Shopping Cart List Frame */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        {/* Image Background Flex Grow */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor:
                                palettes.Baggage.Shopping_Light_Background,
                              borderRadius: 10,
                              height: 75,
                              justifyContent: 'center',
                              width: 75,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Shopping Cart List Item */}
                          <Image
                            resizeMode={'contain'}
                            source={imageSource(Images['ShoppingCart'])}
                            style={StyleSheet.applyWidth(
                              { height: 52, width: 52 },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* Cart Item Details Frame */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1, gap: 8, margin: 12 },
                            dimensions.width
                          )}
                        >
                          {/* Cart Item Title */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Baggage.Shopping_Featured_Title,
                                fontFamily: 'Cantarell_700Bold',
                                fontSize: 14,
                                textTransform: 'uppercase',
                              },
                              dimensions.width
                            )}
                          >
                            {'Mila Kunista'}
                          </Text>
                          {/* Price Size Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 12 },
                              dimensions.width
                            )}
                          >
                            {/* Cart Item Price */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Featured_Title,
                                  fontFamily: 'Montserrat_600SemiBold',
                                  fontSize: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {'$42'}
                            </Text>
                            {/* Cart Item Size */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color:
                                    palettes.Baggage.Shopping_Cart_Stone_Gray,
                                  fontFamily: 'Cantarell_700Bold',
                                  fontSize: 10,
                                  textTransform: 'uppercase',
                                },
                                dimensions.width
                              )}
                            >
                              {'Size 33'}
                            </Text>
                          </View>
                        </View>
                        {/* Toggle Frame */}
                        <View
                          style={StyleSheet.applyWidth(
                            { justifyContent: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* Cart Item Count Stepper */}
                          <Stepper
                            onChange={newCartItemCountStepperValue => {
                              try {
                                setStepperValue(newCartItemCountStepperValue);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            iconColor={
                              palettes.Baggage.Shopping_Stepper_Toggle_Gray
                            }
                            iconSize={24}
                            style={StyleSheet.applyWidth(
                              {
                                fontFamily: 'System',
                                fontSize: 16,
                                fontWeight: '400',
                              },
                              dimensions.width
                            )}
                            value={stepperValue}
                          />
                        </View>
                      </View>
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
                style={StyleSheet.applyWidth({ gap: 16 }, dimensions.width)}
              />
            );
          }}
        </TestServiceDraftbitApi.FetchGetProductsGET>
      </SimpleStyleScrollView>
      {/* Footer Frame */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: theme.colors.background.brand,
            flexGrow: 1,
            flexShrink: 0,
            gap: 20,
            justifyContent: 'flex-end',
          },
          dimensions.width
        )}
      >
        {/* Total Price Frame */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'space-between' },
            dimensions.width
          )}
        >
          {/* Total Price Title */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Icon_Button,
                fontFamily: 'Cantarell_400Regular',
              },
              dimensions.width
            )}
          >
            {'Total Price'}
          </Text>
          {/* Total Price */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Featured_Title,
                fontFamily: 'Cantarell_700Bold',
              },
              dimensions.width
            )}
          >
            {'$420'}
          </Text>
        </View>
        {/* Flex Property Button Frame */}
        <View>
          {/* Fixed Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('CheckoutFlowStack', {
                  screen: 'OrderCheckoutScreen',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Shopping_Primary,
                borderRadius: 64,
                color: palettes.Brand.Surface,
                fontFamily: 'Cantarell_700Bold',
                fontSize: 10,
                textAlign: 'center',
                textTransform: 'uppercase',
              },
              dimensions.width
            )}
            title={'Place Order'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CartScreen);
