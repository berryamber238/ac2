import React from 'react';
import {
  Button,
  Divider,
  IconButton,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Image, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const OrderPaymentMethodScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [radioButtonGroupValue, setRadioButtonGroupValue] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [visibleModal, setVisibleModal] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { flex: 1, gap: 24, padding: 24 },
        dimensions.width
      )}
    >
      {/* Navigation Bar Component */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* Left Frame */}
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
            {'Checkout'}
          </Text>
        </View>
        {/* Right Frame */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-end', width: 75 },
            dimensions.width
          )}
        >
          <Link
            accessible={true}
            selectable={false}
            {...GlobalStyles.LinkStyles(theme)['Link'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
                color: palettes.Baggage.Shopping_Indicator_Blue,
                fontFamily: 'Cantarell_400Regular',
                fontSize: 12,
                textTransform: 'uppercase',
              }),
              dimensions.width
            )}
            title={'add card'}
          />
        </View>
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        viewIsInsideTabBar={false}
        showsVerticalScrollIndicator={false}
      >
        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          style={StyleSheet.applyWidth({ gap: 24 }, dimensions.width)}
        >
          {/* Cards Frame */}
          <View>
            <Swiper
              dotColor={theme.colors.text.light}
              dotsTouchable={true}
              hideDots={false}
              loop={false}
              minDistanceForAction={0.2}
              minDistanceToCapture={5}
              timeout={0}
              vertical={false}
              dotActiveColor={palettes.Brand.Shopping_Primary}
              style={StyleSheet.applyWidth({ height: 239 }, dimensions.width)}
            >
              <SwiperItem
                style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}
              >
                <Pressable>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.Brand.Shopping_Primary,
                        borderRadius: 12,
                        height: 180,
                        justifyContent: 'space-between',
                        padding: 32,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Top Line Frame */}
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {'Dillion Brooks'}
                      </Text>
                      <Image
                        resizeMode={'contain'}
                        source={imageSource(
                          'https://static.draftbit.com/images/example-screens/visa-logo.png'
                        )}
                        style={StyleSheet.applyWidth(
                          { height: 20, width: 50 },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Footer Section Frame */}
                    <View
                      style={StyleSheet.applyWidth(
                        { gap: 6 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Light Inverse'],
                            fontFamily: 'Inter_500Medium',
                            fontSize: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {'06/17'}
                      </Text>

                      <Text
                        accessible={true}
                        selectable={false}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {'3872 9812 9812 0931'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </SwiperItem>

              <SwiperItem
                style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}
              >
                <Pressable>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors.text.strong,
                        borderRadius: 12,
                        height: 180,
                        justifyContent: 'space-between',
                        padding: 32,
                      },
                      dimensions.width
                    )}
                  >
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {'Apply Pay Gift Card'}
                      </Text>
                      <Image
                        resizeMode={'contain'}
                        source={imageSource(
                          'https://static.draftbit.com/images/example-screens/apple-pay-logo.png'
                        )}
                        style={StyleSheet.applyWidth(
                          { height: 20, width: 50 },
                          dimensions.width
                        )}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { gap: 6 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Light Inverse'],
                            fontFamily: 'Inter_500Medium',
                          },
                          dimensions.width
                        )}
                      >
                        {'Balance'}
                      </Text>

                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {'$1,440.12'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </SwiperItem>

              <SwiperItem
                style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}
              >
                <Pressable>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors.background.danger,
                        borderRadius: 12,
                        height: 180,
                        justifyContent: 'space-between',
                        padding: 32,
                      },
                      dimensions.width
                    )}
                  >
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {'Wells Fargo Credit'}
                      </Text>
                      <Image
                        resizeMode={'cover'}
                        source={imageSource(
                          'https://static.draftbit.com/images/example-screens/mastercard-logo.png'
                        )}
                        style={StyleSheet.applyWidth(
                          { height: 20, width: 50 },
                          dimensions.width
                        )}
                      />
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { gap: 6 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Light Inverse'],
                            fontFamily: 'Inter_500Medium',
                          },
                          dimensions.width
                        )}
                      >
                        {'07/26'}
                      </Text>

                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.Surface,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {'7383 9827 3901 8346'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </SwiperItem>
            </Swiper>
          </View>
          {/* Content View Frame */}
          <View style={StyleSheet.applyWidth({ gap: 12 }, dimensions.width)}>
            {/* Component Title Small */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Baggage.Shopping_Secondary_Title,
                  fontFamily: 'Cantarell_400Regular',
                  fontSize: 10,
                  textTransform: 'uppercase',
                },
                dimensions.width
              )}
            >
              {'Card Information'}
            </Text>
            {/* Input Fields */}
            <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
              {/* Text Input Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexGrow: 1,
                    flexShrink: 0,
                    height: 36,
                    justifyContent: 'center',
                    maxHeight: 36,
                    minHeight: 36,
                  },
                  dimensions.width
                )}
              >
                {/* Text Input Component */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  webShowOutline={true}
                  placeholder={"Card Holder's Name"}
                  placeholderTextColor={
                    palettes.Baggage.Shopping_Default_Text_Field
                  }
                  style={StyleSheet.applyWidth(
                    {
                      borderBottomWidth: 1,
                      borderColor:
                        palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                      borderLeftWidth: 1,
                      borderRadius: 64,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: palettes.Baggage.Shopping_Component_Title,
                      fontFamily: 'Cantarell_400Regular',
                      fontSize: 11,
                      height: '100%',
                      paddingLeft: 8,
                      paddingRight: 8,
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Text Input Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexGrow: 1,
                    flexShrink: 0,
                    height: 36,
                    justifyContent: 'center',
                    maxHeight: 36,
                    minHeight: 36,
                  },
                  dimensions.width
                )}
              >
                {/* Text Input Component */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  webShowOutline={true}
                  placeholder={'Card Number'}
                  placeholderTextColor={
                    palettes.Baggage.Shopping_Default_Text_Field
                  }
                  style={StyleSheet.applyWidth(
                    {
                      borderBottomWidth: 1,
                      borderColor:
                        palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                      borderLeftWidth: 1,
                      borderRadius: 64,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      color: palettes.Baggage.Shopping_Component_Title,
                      fontFamily: 'Cantarell_400Regular',
                      fontSize: 11,
                      height: '100%',
                      paddingBottom: 0,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 0,
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Input Frame Third Line */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
                  dimensions.width
                )}
              >
                {/* Text Input Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, height: 36, marginRight: 4 },
                    dimensions.width
                  )}
                >
                  {/* Text Input Component */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    placeholder={'Expiration Date'}
                    placeholderTextColor={
                      palettes.Baggage.Shopping_Default_Text_Field
                    }
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor:
                          palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                        borderLeftWidth: 1,
                        borderRadius: 64,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: palettes.Baggage.Shopping_Component_Title,
                        fontFamily: 'Cantarell_400Regular',
                        fontSize: 11,
                        height: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Text Input Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, height: 36, marginLeft: 4 },
                    dimensions.width
                  )}
                >
                  {/* Text Input Component 2 */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    placeholder={'CVV'}
                    placeholderTextColor={
                      palettes.Baggage.Shopping_Default_Text_Field
                    }
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor:
                          palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                        borderLeftWidth: 1,
                        borderRadius: 64,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: palettes.Baggage.Shopping_Component_Title,
                        fontFamily: 'Cantarell_400Regular',
                        fontSize: 11,
                        height: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Summary Checkout Frame */}
          <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
            {/* Component Title Small */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Baggage.Shopping_Secondary_Title,
                  fontFamily: 'Cantarell_400Regular',
                  fontSize: 12,
                  textTransform: 'uppercase',
                },
                dimensions.width
              )}
            >
              {'Summary'}
            </Text>

            <View style={StyleSheet.applyWidth({ gap: 16 }, dimensions.width)}>
              {/* Summary Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    borderColor: palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                    borderRadius: 4,
                    borderWidth: 1,
                    gap: 8,
                    padding: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Summary Line Item Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', justifyContent: 'space-between' },
                    dimensions.width
                  )}
                >
                  {/* Line Item Detail 1 */}
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
                    {'Item cost (4)'}
                  </Text>
                  {/* Line Item Detail 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Featured_Title,
                        fontFamily: 'Montserrat_600SemiBold',
                        fontSize: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {'$236'}
                  </Text>
                </View>
                {/* Summary Line Item Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', justifyContent: 'space-between' },
                    dimensions.width
                  )}
                >
                  {/* Line Item Detail 1 */}
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
                    {'Shipping Cost'}
                  </Text>
                  {/* Line Item Detail 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Featured_Title,
                        fontFamily: 'Montserrat_600SemiBold',
                        fontSize: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {'$10'}
                  </Text>
                </View>
                <Divider
                  {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                  color={palettes.Baggage.Shopping_Stepper_Toggle_Gray}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      { marginBottom: 8, marginTop: 8 }
                    ),
                    dimensions.width
                  )}
                />
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
                        color: palettes.Brand.Shopping_Secondary,
                        fontFamily: 'Cantarell_700Bold',
                        fontSize: 12,
                      },
                      dimensions.width
                    )}
                  >
                    {'$420'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
      {/* Fixed Button */}
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          try {
            navigation.navigate('OrderCheckoutScreen');
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
        title={'Proceed Checkout'}
      />
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle={'overFullScreen'}
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.Baggage.Shopping_Featured_Title,
            justifyContent: 'center',
          },
          dimensions.width
        )}
        transparent={true}
        visible={visibleModal}
      >
        {/* Modal BG */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
              zIndex: 500,
            },
            dimensions.width
          )}
        >
          {/* Black Transparent View */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Baggage.Shopping_Featured_Title,
                bottom: 0,
                left: 0,
                opacity: 0.61,
                position: 'absolute',
                right: 0,
                top: 0,
              },
              dimensions.width
            )}
          />
          {/* Modal White BG Frame */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.background.brand,
                borderRadius: 4,
                gap: 12,
                maxHeight: 253,
                maxWidth: 327,
                minWidth: 327,
                padding: 16,
              },
              dimensions.width
            )}
          >
            {/* Absolute Frame */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'absolute', right: 6, top: 6 },
                dimensions.width
              )}
            >
              <IconButton
                color={palettes.Baggage.Shopping_Icon_Button}
                icon={'AntDesign/close'}
                size={24}
              />
            </View>
            {/* Title Frame */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', marginTop: 10 },
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
                    fontFamily: 'Montserrat_600SemiBold',
                    fontSize: 16,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  },
                  dimensions.width
                )}
              >
                {'Card Edit'}
              </Text>
            </View>
            {/* Input Frame */}
            <View
              style={StyleSheet.applyWidth(
                { gap: 12, marginTop: 8 },
                dimensions.width
              )}
            >
              {/* Input Frame Top Line */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
                  dimensions.width
                )}
              >
                {/* Text Input Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexGrow: 1,
                      flexShrink: 0,
                      height: 40,
                      justifyContent: 'center',
                      minHeight: 40,
                    },
                    dimensions.width
                  )}
                >
                  {/* Text Input Component */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    placeholder={"Card Holder's Name"}
                    placeholderTextColor={
                      palettes.Baggage.Shopping_Default_Text_Field
                    }
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor:
                          palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                        borderLeftWidth: 1,
                        borderRadius: 64,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: palettes.Baggage.Shopping_Component_Title,
                        fontFamily: 'Cantarell_400Regular',
                        fontSize: 11,
                        height: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
              {/* Input Frame Second Line */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
                  dimensions.width
                )}
              >
                {/* Text Input Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      height: 40,
                      justifyContent: 'center',
                      marginRight: 4,
                      minHeight: 40,
                    },
                    dimensions.width
                  )}
                >
                  {/* Text Input Component */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    placeholder={'Expiration Date'}
                    placeholderTextColor={
                      palettes.Baggage.Shopping_Default_Text_Field
                    }
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor:
                          palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                        borderLeftWidth: 1,
                        borderRadius: 64,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: palettes.Baggage.Shopping_Component_Title,
                        fontFamily: 'Cantarell_400Regular',
                        fontSize: 11,
                        height: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Text Input Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      flexGrow: 1,
                      flexShrink: 0,
                      height: 40,
                      marginLeft: 4,
                      minHeight: 40,
                    },
                    dimensions.width
                  )}
                >
                  {/* Text Input Component */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    webShowOutline={true}
                    placeholder={'CVV'}
                    placeholderTextColor={
                      palettes.Baggage.Shopping_Default_Text_Field
                    }
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor:
                          palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                        borderLeftWidth: 1,
                        borderRadius: 64,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        color: palettes.Baggage.Shopping_Component_Title,
                        fontFamily: 'Cantarell_400Regular',
                        fontSize: 11,
                        height: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
            {/* Button Frame */}
            <View>
              {/* Fixed Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setVisibleModal(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Shopping_Primary,
                    borderRadius: 61,
                    color: palettes.Brand.Surface,
                    fontFamily: 'Cantarell_700Bold',
                    fontSize: 10,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  },
                  dimensions.width
                )}
                title={'Save Changes'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(OrderPaymentMethodScreen);
