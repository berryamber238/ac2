import React from 'react';
import { ExpoImage, Pressable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  currentRoute: { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
  routes: [
    { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
    { icon: 'Entypo/home', name: 'RouteTwo', label: 'Route 2' },
    { icon: 'Entypo/home', name: 'RouteThree', label: 'Route 3' },
  ],
};

const TabBarBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View>
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            borderColor: palettes.App['Custom Color 10'],
            borderTopWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 6,
            paddingTop: 6,
          },
          dimensions.width
        )}
      >
        <Pressable
          onPress={() => {
            try {
              console.log(
                (props.currentRoute ?? defaultProps.currentRoute)?.name
              );
              navigation.navigate('Home');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              source={imageSource(
                (props.currentRoute ?? defaultProps.currentRoute)?.name ===
                  'Home'
                  ? Images['companyactive']
                  : Images['companydefault']
              )}
              style={StyleSheet.applyWidth(
                { height: 20, width: 20 },
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['14 Regular'].style,
                  {
                    color:
                      (props.currentRoute ?? defaultProps.currentRoute)
                        ?.name === 'Home'
                        ? palettes.Brand.appStyle_primary
                        : '#7a7a7a',
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '900',
                    letterSpacing: 0.4,
                    lineHeight: 14,
                    marginTop: 2,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'tab_home')}
            </Text>
          </View>
        </Pressable>
        {/* Pressable 4 */}
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('Company');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              source={imageSource(
                (props.currentRoute ?? defaultProps.currentRoute)?.name ===
                  'Company'
                  ? Images['indexactive']
                  : Images['indexdefault']
              )}
              style={StyleSheet.applyWidth(
                { height: 20, width: 20 },
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['14 Regular'].style,
                  {
                    color:
                      (props.currentRoute ?? defaultProps.currentRoute)
                        ?.name === 'Company'
                        ? palettes.Brand.appStyle_primary
                        : '#7a7a7a',
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '900',
                    letterSpacing: 0.4,
                    lineHeight: 14,
                    marginTop: 2,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_company')}
            </Text>
          </View>
        </Pressable>
        {/* Pressable 3 */}
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('AI');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              source={imageSource(
                (props.currentRoute ?? defaultProps.currentRoute)?.name === 'AI'
                  ? Images['aiactive']
                  : Images['aidefault']
              )}
              style={StyleSheet.applyWidth(
                { height: 20, width: 20 },
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['14 Regular'].style,
                  {
                    color:
                      (props.currentRoute ?? defaultProps.currentRoute)
                        ?.name === 'AI'
                        ? palettes.Brand.appStyle_primary
                        : '#7a7a7a',
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '900',
                    letterSpacing: 0.4,
                    lineHeight: 14,
                    marginTop: 2,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_ai')}
            </Text>
          </View>
        </Pressable>
        {/* Pressable 2 */}
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('Mine');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              source={imageSource(
                (props.currentRoute ?? defaultProps.currentRoute)?.name ===
                  'Mine'
                  ? Images['mineactive']
                  : Images['minedefault']
              )}
              style={StyleSheet.applyWidth(
                { height: 20, width: 20 },
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['14 Regular'].style,
                  {
                    color:
                      (props.currentRoute ?? defaultProps.currentRoute)
                        ?.name === 'Mine'
                        ? palettes.Brand.appStyle_primary
                        : '#7a7a7a',
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '900',
                    letterSpacing: 0.4,
                    lineHeight: 14,
                    marginTop: 2,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'tab_my')}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default withTheme(TabBarBlock);
