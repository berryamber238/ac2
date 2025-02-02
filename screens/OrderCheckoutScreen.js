import React from 'react';
import {
  Button,
  Circle,
  Divider,
  IconButton,
  Pressable,
  RadioButton,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  TextInput,
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

const OrderCheckoutScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [radioButtonGroupValue, setRadioButtonGroupValue] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth({ gap: 24, padding: 24 }, dimensions.width)}
    >
      {/* Navigation Bar Component */}
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
            {'Checkout'}
          </Text>
        </View>
        {/* Icon Button 2 */}
        <View>
          {/* Icon Button 2 */}
          <IconButton
            color={palettes.Baggage.Shopping_Icon_Button}
            icon={'AntDesign/gift'}
            size={24}
          />
          <Circle
            bgColor={palettes.Baggage.Shopping_Indicator_Blue}
            size={19}
            style={StyleSheet.applyWidth(
              { position: 'absolute', right: -8, top: -8 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.background.brand,
                  fontFamily: 'Montserrat_400Regular',
                  fontSize: 8,
                },
                dimensions.width
              )}
            >
              {'1'}
            </Text>
          </Circle>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          { gap: 24, marginTop: 16 },
          dimensions.width
        )}
      >
        {/* Content View Frame */}
        <View
          style={StyleSheet.applyWidth({ flex: 1, gap: 24 }, dimensions.width)}
        >
          {/* Shipping Information */}
          <SimpleStyleKeyboardAwareScrollView
            enableAutomaticScroll={false}
            enableOnAndroid={false}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={true}
            viewIsInsideTabBar={false}
          >
            {/* Shipping Information Frame */}
            <View style={StyleSheet.applyWidth({ gap: 10 }, dimensions.width)}>
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
                {'Shipping Information'}
              </Text>
              {/* Input fields */}
              <View
                style={StyleSheet.applyWidth({ gap: 12 }, dimensions.width)}
              >
                {/* Input Frame Top Line */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* Text Input Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexGrow: 1,
                        flexShrink: 0,
                        height: 36,
                        justifyContent: 'center',
                        marginRight: 6,
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
                      placeholder={'First Name'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
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
                        marginLeft: 6,
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
                      placeholder={'Last Name'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
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
                      placeholder={'Address'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
                        },
                        dimensions.width
                      )}
                    />
                  </View>
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
                      {
                        flexGrow: 1,
                        flexShrink: 0,
                        height: 36,
                        justifyContent: 'center',
                        marginRight: 6,
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
                      placeholder={'City'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
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
                        marginLeft: 6,
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
                      placeholder={'Zip Code'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
                        },
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
                {/* Input Frame Fourth Line */}
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
                        height: 36,
                        justifyContent: 'center',
                        marginRight: 6,
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
                      placeholder={'State'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
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
                        marginLeft: 6,
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
                      placeholder={'Country'}
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
                          paddingLeft: 12,
                          paddingRight: 12,
                        },
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
          </SimpleStyleKeyboardAwareScrollView>
          {/* Payment Method Frame */}
          <View style={StyleSheet.applyWidth({ gap: 10 }, dimensions.width)}>
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
              {'Payment Method'}
            </Text>
            {/* Payment Details Method Frame */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', gap: 16 },
                dimensions.width
              )}
            >
              {/* Flex Attribute Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: palettes.Brand.Shopping_Primary,
                    borderRadius: 10,
                    borderWidth: 1,
                    gap: 4,
                    height: 80,
                    justifyContent: 'center',
                    width: 80,
                  },
                  dimensions.width
                )}
              >
                {/* Payment Method Image 1 */}
                <Image
                  resizeMode={'contain'}
                  source={imageSource(Images['CheckoutCustomIcons2'])}
                  style={StyleSheet.applyWidth(
                    { height: 30, width: 30 },
                    dimensions.width
                  )}
                />
                {/* Option 1 Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Baggage.Shopping_Featured_Title,
                      fontFamily: 'Cantarell_400Regular',
                    },
                    dimensions.width
                  )}
                >
                  {'Bank'}
                </Text>
              </View>

              <Pressable>
                {/* Flex Attribute Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor:
                        palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                      borderRadius: 10,
                      borderWidth: 1,
                      gap: 4,
                      height: 80,
                      justifyContent: 'center',
                      width: 80,
                    },
                    dimensions.width
                  )}
                >
                  {/* Payment Method Image 2 */}
                  <Image
                    resizeMode={'contain'}
                    source={imageSource(Images['CheckoutCustomIcons3'])}
                    style={StyleSheet.applyWidth(
                      { height: 30, width: 30 },
                      dimensions.width
                    )}
                  />
                  {/* Option 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Secondary_Title,
                        fontFamily: 'Cantarell_400Regular',
                      },
                      dimensions.width
                    )}
                  >
                    {'Card'}
                  </Text>
                </View>
              </Pressable>
              {/* Pressable 2 */}
              <Pressable>
                {/* Flex Attribute Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor:
                        palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                      borderRadius: 10,
                      borderWidth: 1,
                      gap: 4,
                      height: 80,
                      justifyContent: 'center',
                      width: 80,
                    },
                    dimensions.width
                  )}
                >
                  {/* Payment Method Image 1 */}
                  <Image
                    resizeMode={'contain'}
                    source={imageSource(Images['CheckoutCustomIcons1'])}
                    style={StyleSheet.applyWidth(
                      { height: 30, width: 30 },
                      dimensions.width
                    )}
                  />
                  {/* Option 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Baggage.Shopping_Secondary_Title,
                        fontFamily: 'Cantarell_400Regular',
                      },
                      dimensions.width
                    )}
                  >
                    {'Paypal'}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          {/* Shipping Cost Frame */}
          <View style={StyleSheet.applyWidth({ gap: 10 }, dimensions.width)}>
            {/* Shipping Cost Section Title */}
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
              {'Shipping Cost'}
            </Text>
            {/* Shipping Details Frame */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: palettes.Baggage.Shopping_Stepper_Toggle_Gray,
                  borderRadius: 4,
                  borderWidth: 1,
                  gap: 16,
                  padding: 16,
                },
                dimensions.width
              )}
            >
              {/* Radio Option Frame */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', gap: 12 },
                  dimensions.width
                )}
              >
                <RadioButton
                  selectedIcon={'MaterialIcons/radio-button-checked'}
                  unselectedIcon={'MaterialIcons/radio-button-unchecked'}
                  color={palettes.Baggage.Shopping_Indicator_Blue}
                  size={18}
                  unselectedColor={palettes.Brand.Shopping_Primary}
                />
                {/* Text 1 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexGrow: 1,
                      flexShrink: 0,
                    },
                    dimensions.width
                  )}
                >
                  {/* Shipping Option Detail */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Cantarell_400Regular',
                      },
                      dimensions.width
                    )}
                  >
                    {'Classic Delivery (14 days)'}
                  </Text>
                </View>
                {/* Text 2 */}
                <View>
                  {/* Shipping Cost Price */}
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
              </View>
              {/* Radio Option Frame */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', gap: 12 },
                  dimensions.width
                )}
              >
                <RadioButton
                  selectedIcon={'MaterialIcons/radio-button-checked'}
                  unselectedIcon={'MaterialIcons/radio-button-unchecked'}
                  color={palettes.Baggage.Shopping_Stepper_Toggle_Gray}
                  size={18}
                  unselectedColor={
                    palettes.Baggage.Shopping_Stepper_Toggle_Gray
                  }
                />
                {/* Text 1 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexGrow: 1,
                      flexShrink: 0,
                    },
                    dimensions.width
                  )}
                >
                  {/* Shipping Option Detail */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Cantarell_400Regular',
                      },
                      dimensions.width
                    )}
                  >
                    {'Express Delivery (7 Days)'}
                  </Text>
                </View>
                {/* Text 2 */}
                <View>
                  {/* Shipping Cost Price */}
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
                    {'$20'}
                  </Text>
                </View>
              </View>
              {/* Radio Option Frame */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', gap: 12 },
                  dimensions.width
                )}
              >
                <RadioButton
                  selectedIcon={'MaterialIcons/radio-button-checked'}
                  unselectedIcon={'MaterialIcons/radio-button-unchecked'}
                  color={palettes.Baggage.Shopping_Stepper_Toggle_Gray}
                  size={18}
                  unselectedColor={
                    palettes.Baggage.Shopping_Stepper_Toggle_Gray
                  }
                />
                {/* Text 1 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexGrow: 1,
                      flexShrink: 0,
                    },
                    dimensions.width
                  )}
                >
                  {/* Shipping Option Detail */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Cantarell_400Regular',
                      },
                      dimensions.width
                    )}
                  >
                    {'Premium Delivery (3 days)'}
                  </Text>
                </View>
                {/* Text 2 */}
                <View>
                  {/* Shipping Cost Price */}
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
                    {'$40'}
                  </Text>
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
      {/* Footer View Frame */}
      <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
        {/* Fixed Button */}
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            try {
              navigation.navigate('OrderConfirmationScreen');
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
    </ScreenContainer>
  );
};

export default withTheme(OrderCheckoutScreen);
