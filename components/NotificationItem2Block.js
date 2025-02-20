import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const NotificationItem2Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View style={StyleSheet.applyWidth({ marginBottom: 24 }, dimensions.width)}>
      {/* Notification Top */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row', marginBottom: 20 },
          dimensions.width
        )}
      >
        {/* Notification Icon View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'theme.colors["Primary 8p"]',
              borderRadius: 30,
              height: 60,
              justifyContent: 'center',
              marginRight: 16,
              width: 60,
            },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['CalendarFIll'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 24, width: 24 }
              ),
              dimensions.width
            )}
          />
        </View>
        {/* Notification Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, marginRight: 16 },
            dimensions.width
          )}
        >
          {/* Title Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H5'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H5'].style, {
                marginBottom: 6,
              }),
              dimensions.width
            )}
          >
            {'Booking Successful!'}
          </Text>
          {/* Subtitle Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body M Medium'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body M Medium'].style,
              dimensions.width
            )}
          >
            {'20 Dec, 2022 | 20:49 PM'}
          </Text>
        </View>
        {/* Notification Tag View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              alignSelf: 'auto',
              backgroundColor: theme.colors.branding.primary,
              borderRadius: 6,
              justifyContent: 'flex-start',
              paddingBottom: 6,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 6,
            },
            dimensions.width
          )}
        >
          {/* Tag Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body XS Semibold'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body XS Semibold'].style,
              dimensions.width
            )}
          >
            {'New'}
          </Text>
        </View>
      </View>
      {/* Notification Text */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Body M Regular'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Body M Regular'].style,
          dimensions.width
        )}
      >
        {
          "You have successfully booked the Art Workshops. The event will be held on Sunday, December 22, 2022, 13.00 - 14.00 PM. Don't forget to activate your reminder. Enjoy the event!"
        }
      </Text>
    </View>
  );
};

export default withTheme(NotificationItem2Block);
