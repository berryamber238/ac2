import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const BottomTabNavigation2Block2 = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: 'theme.colors["White"]',
          bottom: 0,
          paddingBottom: 8,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 8,
          position: 'absolute',
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Tab Buttons View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            height: 48,
            justifyContent: 'space-between',
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Home Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: 38, width: 56 },
            dimensions.width
          )}
        >
          {/* Home Selected Touchable */}
          <Touchable>
            {/* Home Selected */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: 38, width: 56 },
                dimensions.width
              )}
            >
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Home Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['HomeFill'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Home Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XS Bold'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Body XS Bold'].style,
                  dimensions.width
                )}
              >
                {'Home'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* Explore Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: 38, width: 56 },
            dimensions.width
          )}
        >
          {/* Explore Unselected Touchable */}
          <Touchable>
            {/* Explore Unselected */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: 38, width: 56 },
                dimensions.width
              )}
            >
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Explore Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['Explore'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Explore Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XS Bold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XS Bold'].style,
                    { color: 'theme.colors["Greyscale 500"]' }
                  ),
                  dimensions.width
                )}
              >
                {'Explore'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* Favorites Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: 38, width: 56 },
            dimensions.width
          )}
        >
          {/* Favorites Unselected Touchable */}
          <Touchable>
            {/* Favorites Unselected */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: 38, width: 56 },
                dimensions.width
              )}
            >
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Favorites Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['HeartU'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Favorites Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XS Bold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XS Bold'].style,
                    { color: 'theme.colors["Greyscale 500"]' }
                  ),
                  dimensions.width
                )}
              >
                {'Favorites'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* Tickets Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: 38, width: 56 },
            dimensions.width
          )}
        >
          {/* Tickets Unselected Touchable */}
          <Touchable>
            {/* Tickets Unselected */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: 38, width: 56 },
                dimensions.width
              )}
            >
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Tickets Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['Ticket'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Tickets Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XS Bold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XS Bold'].style,
                    { color: 'theme.colors["Greyscale 500"]' }
                  ),
                  dimensions.width
                )}
              >
                {'Tickets'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* Profile Container */}
        <View
          style={StyleSheet.applyWidth(
            { height: 38, width: 56 },
            dimensions.width
          )}
        >
          {/* Profile Unselected Touchable */}
          <Touchable>
            {/* Profile Unselected */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: 38, width: 56 },
                dimensions.width
              )}
            >
              {/* Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Profile Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['Profile'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Profile Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XS Bold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XS Bold'].style,
                    { color: 'theme.colors["Greyscale 500"]' }
                  ),
                  dimensions.width
                )}
              >
                {'Profile'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default withTheme(BottomTabNavigation2Block2);
