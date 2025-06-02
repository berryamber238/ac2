import React from 'react';
import { Button, ExpoImage, withTheme } from '@draftbit/ui';
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

const defaultProps = { gotoScreen: () => {}, type: 3 };

const EmptyViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: palettes.App['Custom #ffffff'],
          bottom: 0,
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        },
        dimensions.width
      )}
    >
      <>
        {!((props.type ?? defaultProps.type) === 1) ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'column' },
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
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              source={imageSource(Images['icnoauth'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 80, width: 80 }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.Brand.itemTextNomal, marginTop: 10 }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'home_no_login')}
            </Text>
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.push('LoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                  theme.typography.button,
                  {
                    backgroundColor: palettes.App['Custom Color 104'],
                    borderRadius: 4,
                    color: palettes.App['Custom #ffffff'],
                    marginBottom: 50,
                    marginTop: 16,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
              title={`${t(Variables, 'home_go_login')}`}
            />
          </View>
        )}
      </>
      {/* View 2 */}
      <>
        {!((props.type ?? defaultProps.type) === 2) ? null : (
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
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              source={imageSource(Images['icnoauth'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 80, width: 80 }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.Brand.itemTextNomal, marginTop: 10 }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'home_no_auth')}
            </Text>
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.push('MineAuthScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                  theme.typography.button,
                  {
                    backgroundColor: palettes.App['Custom Color 104'],
                    borderRadius: 4,
                    color: palettes.App['Custom #ffffff'],
                    marginBottom: 50,
                    marginTop: 16,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                  }
                ),
                dimensions.width
              )}
              title={`${t(Variables, 'mine_go_auth')}`}
            />
          </View>
        )}
      </>
      {/* View 3 */}
      <>
        {!((props.type ?? defaultProps.type) === 3) ? null : (
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
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              source={imageSource(Images['icpointpending'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 80, width: 80 }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.Brand.itemTextNomal, marginTop: 10 }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'home_pending')}
            </Text>
          </View>
        )}
      </>
      {/* View 4 */}
      <>
        {!((props.type ?? defaultProps.type) === 4) ? null : (
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
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              source={imageSource(Images['icnoauth'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 80, width: 80 }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.Brand.itemTextNomal, marginTop: 10 }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'home_no_limit')}
            </Text>
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(EmptyViewBlock);
