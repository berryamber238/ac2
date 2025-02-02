import React from 'react';
import {
  Button,
  IconButton,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const OrderVouchersScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
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
            {'Gift Cards & Coupons'}
          </Text>
        </View>
        <IconButton
          color={palettes.Baggage.Shopping_Icon_Button}
          icon={'AntDesign/search1'}
          size={24}
        />
      </View>
      {/* Content View Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 0, flexShrink: 0, gap: 24 },
          dimensions.width
        )}
      >
        {/* Featured Section Frame */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, justifyContent: 'center', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Featured Title Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Featured_Title,
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                marginBottom: 6,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Activate your gift card'}
          </Text>
          {/* Featured Details Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Secondary_Title,
                fontFamily: 'Cantarell_400Regular',
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {
              'Enter your code and get up to $25 in free shipping for each shopping for 1 year '
            }
          </Text>
        </View>
        {/* Code Frame */}
        <View>
          <Surface
            elevation={2}
            style={StyleSheet.applyWidth({ padding: 32 }, dimensions.width)}
          >
            {/* Code Image Flex Box */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center' },
                dimensions.width
              )}
            >
              {/* Code Image */}
              <Image
                resizeMode={'cover'}
                source={imageSource(Images['VouchersCustomIcon'])}
                style={StyleSheet.applyWidth(
                  { height: 48, width: 48 },
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Baggage.Shopping_Icon_Button,
                  fontFamily: 'Cantarell_400Regular',
                  marginBottom: 6,
                  marginTop: 15,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'Your Referal Code:'}
            </Text>

            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Baggage.Shopping_Indicator_Blue,
                  fontFamily: 'Cantarell_700Bold',
                  marginBottom: 21,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'ZHIJ7Y6S'}
            </Text>
            {/* Fixed Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
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
          </Surface>
        </View>
      </View>
      {/* Footer Notes Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-between' },
          dimensions.width
        )}
      >
        {/* Note 1 */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.Baggage.Shopping_Icon_Button,
              fontFamily: 'Cantarell_400Regular',
              fontSize: 11,
              marginTop: 6,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'You can get Gift Card in our office'}
        </Text>
        {/* Note 2 */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.Baggage.Shopping_Icon_Button,
              fontFamily: 'Cantarell_400Regular',
              fontSize: 10,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Terms & Service'}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(OrderVouchersScreen);
