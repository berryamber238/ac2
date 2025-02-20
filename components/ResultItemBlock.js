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

const ResultItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        { flexDirection: 'row', padding: 14 },
        dimensions.width
      )}
    >
      {/* Image View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            borderRadius: 20,
            height: 120,
            justifyContent: 'center',
            marginRight: 16,
            overflow: 'hidden',
            width: 120,
          },
          dimensions.width
        )}
      >
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(
            'https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
          )}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 120,
              width: 120,
            }),
            dimensions.width
          )}
        />
      </View>
      {/* Information View */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, paddingBottom: 16, paddingTop: 16 },
          dimensions.width
        )}
      >
        {/* Information Title */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['H5'].props}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['H5'].style, {
              marginBottom: 10,
            }),
            dimensions.width
          )}
        >
          {'International Concert'}
        </Text>
        {/* Information Subtitle */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Body M Semibold'].props}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Body M Semibold'].style,
              { marginBottom: 10 }
            ),
            dimensions.width
          )}
        >
          {'Sun, Dec 23 • 19.00 - 23.00 PM'}
        </Text>
        {/* Information Bottom Section */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Location Info Touchable */}
          <Touchable
            style={StyleSheet.applyWidth({ width: '85%' }, dimensions.width)}
          >
            {/* Location Info View */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginRight: 8 },
                dimensions.width
              )}
            >
              {/* Location Icon View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 16,
                    justifyContent: 'center',
                    marginRight: 8,
                    width: 16,
                  },
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['Location'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 14, width: 14 }
                    ),
                    dimensions.width
                  )}
                />
              </View>

              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body M Regular'].props}
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body M Regular'].style,
                    { color: 'theme.colors["Greyscale 700"]' }
                  ),
                  dimensions.width
                )}
              >
                {'Grand Park, New York'}
              </Text>
            </View>
          </Touchable>
          {/* Favorite Button View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', justifyContent: 'center' },
              dimensions.width
            )}
          >
            {/* Favorite Unselected Touchable */}
            <Touchable>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 24,
                    justifyContent: 'center',
                    width: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Favorite Icon */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['Heart'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default withTheme(ResultItemBlock);
