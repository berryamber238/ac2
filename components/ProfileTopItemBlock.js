import React from 'react';
import { Divider, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const ProfileTopItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
        },
        dimensions.width
      )}
    >
      {/* Organizer Avatar View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            borderRadius: 60,
            height: 120,
            justifyContent: 'center',
            marginBottom: 24,
            overflow: 'hidden',
            width: 120,
          },
          dimensions.width
        )}
      >
        {/* Organizer Avatar */}
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80'
          )}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: '100%',
              width: '100%',
            }),
            dimensions.width
          )}
        />
      </View>
      {/* Organizer Name */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['H3'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['H3'].style, {
            marginBottom: 24,
          }),
          dimensions.width
        )}
      >
        {'World of Music'}
      </Text>
      <Divider
        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
        color={'theme.colors["Greyscale 200"]'}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.DividerStyles(theme)['Divider'].style,
            { height: 1, marginBottom: 24, width: '100%' }
          ),
          dimensions.width
        )}
      />
      {/* Organizer Info View */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Events View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', width: '30%' },
            dimensions.width
          )}
        >
          {/* Events Number */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H3'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H3'].style, {
                marginBottom: 12,
              }),
              dimensions.width
            )}
          >
            {'24'}
          </Text>
          {/* Events Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Medium'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Body L Medium'].style,
                { color: 'theme.colors["Greyscale 700"]' }
              ),
              dimensions.width
            )}
          >
            {'Events'}
          </Text>
        </View>
        {/* Vertical Divider */}
        <Divider
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          color={'theme.colors["Greyscale 200"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              { height: '100%', width: 1 }
            ),
            dimensions.width
          )}
        />
        {/* Followers View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', width: '30%' },
            dimensions.width
          )}
        >
          {/* Followers Number */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H3'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H3'].style, {
                marginBottom: 12,
              }),
              dimensions.width
            )}
          >
            {'967K'}
          </Text>
          {/* Followers Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Medium'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Body L Medium'].style,
                { color: 'theme.colors["Greyscale 700"]' }
              ),
              dimensions.width
            )}
          >
            {'Followers'}
          </Text>
        </View>
        {/* Vertical Divider */}
        <Divider
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          color={'theme.colors["Greyscale 200"]'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              { height: '100%', width: 1 }
            ),
            dimensions.width
          )}
        />
        {/* Following View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', width: '30%' },
            dimensions.width
          )}
        >
          {/* Following Number */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H3'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H3'].style, {
                marginBottom: 12,
              }),
              dimensions.width
            )}
          >
            {'20'}
          </Text>
          {/* Following Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Medium'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Body L Medium'].style,
                { color: 'theme.colors["Greyscale 700"]' }
              ),
              dimensions.width
            )}
          >
            {'Following'}
          </Text>
        </View>
      </View>
      <Divider
        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
        color={'theme.colors["Greyscale 200"]'}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.DividerStyles(theme)['Divider'].style,
            { height: 1, width: '100%' }
          ),
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(ProfileTopItemBlock);
