import React from 'react';
import { Button, IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const OrderConfirmationScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasBottomSafeArea={true}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth({ padding: 24 }, dimensions.width)}
    >
      {/* Navigation Bar Component */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        <IconButton
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
          color={palettes.Baggage.Shopping_Icon_Button}
          icon={'AntDesign/close'}
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
            {'Confirmation'}
          </Text>
        </View>
        <IconButton
          color={palettes.Baggage.Shopping_Icon_Button}
          icon={'AntDesign/search1'}
          size={24}
        />
      </View>
      {/* Content Frame */}
      <View
        style={StyleSheet.applyWidth(
          { flexGrow: 1, flexShrink: 0, gap: 24, justifyContent: 'center' },
          dimensions.width
        )}
      >
        {/* Featured Image Frame */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          {/* Confirmation Image */}
          <Image
            resizeMode={'cover'}
            source={imageSource(Images['OrderConfirmationIllustration'])}
            style={StyleSheet.applyWidth(
              { height: 120, width: 120 },
              dimensions.width
            )}
          />
        </View>
        {/* Featured Section Frame */}
        <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
          {/* Featured Title Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Featured_Title,
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 14,
                textAlign: 'center',
                textTransform: 'uppercase',
              },
              dimensions.width
            )}
          >
            {'Your order was sent'}
          </Text>
          {/* Featured Details Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Baggage.Shopping_Secondary_Title,
                fontFamily: 'Cantarell_400Regular',
                fontSize: 12,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'You’ll get a response within a few minutes'}
          </Text>
        </View>
      </View>
      {/* Fixed Button */}
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          try {
            navigation.navigate('PrimaryBottomNavigator', {
              screen: 'HomeNavigators',
              params: { screen: 'HomeScreen' },
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
            textAlign: 'center',
            textTransform: 'uppercase',
          },
          dimensions.width
        )}
        title={'Continue Shopping'}
      />
    </ScreenContainer>
  );
};

export default withTheme(OrderConfirmationScreen);
