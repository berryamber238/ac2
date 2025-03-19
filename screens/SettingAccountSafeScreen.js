import React from 'react';
import {
  ExpoImage,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SettingAccountSafeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [change_email, setChange_email] = React.useState('');
  const [change_phone, setChange_phone] = React.useState('');
  const getAllPhone = userPhoneList => {
    let phoneStr = '';
    if (userPhoneList && userPhoneList.length > 0) {
      for (let i = 0; i < userPhoneList.length; i++) {
        const phone = userPhoneList[i];
        const phoneInfo = `${
          phone.main_phone
            ? t(Variables, 'setting_primary_phone_number')
            : t(Variables, 'setting_vice_phone_number')
        } +${phone.country_code}${phone.phone_number}`;
        if (i === 0) {
          phoneStr = phoneInfo;
        } else {
          phoneStr += ` ${phoneInfo}`;
        }
      }
    }
    return phoneStr;
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* 主题栏 */}
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 5,
              width: '100%',
              zIndex: 1000,
            },
            dimensions.width
          )}
        >
          <Touchable>
            {/* 返回Btn */}
            <IconButton
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
              color={palettes.App.appStyle_black}
              icon={'AntDesign/left'}
              size={24}
            />
          </Touchable>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              adjustsFontSizeToFit={true}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App.appStyle_black,
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 22,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_security')}
            </Text>
          </View>
        </View>
      </View>

      <Touchable
        onPress={() => {
          try {
            if (Constants['is_login']) {
              navigation.push('SettingUserPhoneScreen');
            } else {
              navigation.push('LoginScreen');
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 52,
              justifyContent: 'space-between',
              padding: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                {
                  color: palettes.App.appStyle_black,
                  fontFamily: 'System',
                  fontWeight: '600',
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'common_phone')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
              dimensions.width
            )}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {Constants['user_info']?.user_phones &&
              Constants['user_info']?.user_phones?.length > 0
                ? getAllPhone(Constants['user_info']?.user_phones)
                : t(Variables, 'setting_no_bind')}
            </Text>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              resizeMode={'contain'}
              source={imageSource(Images['icminenext'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 20, width: 20 }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
      </Touchable>
      {/* Touchable 2 */}
      <Touchable
        onPress={() => {
          try {
            navigation.push('ChangeUserEmailScreen');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth({ height: 52 }, dimensions.width)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                {
                  color: palettes.App.appStyle_black,
                  fontFamily: 'System',
                  fontWeight: '600',
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'common_email')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
              dimensions.width
            )}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {Constants['user_info']?.email
                ? Constants['user_info']?.email
                : t(Variables, 'setting_no_bind')}
            </Text>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              resizeMode={'contain'}
              source={imageSource(Images['icminenext'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 20, width: 20 }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
      </Touchable>
      {/* Touchable 3 */}
      <Touchable
        onPress={() => {
          try {
            navigation.push('SettingChangePasswordScreen');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth({ height: 52 }, dimensions.width)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                {
                  color: palettes.App.appStyle_black,
                  fontFamily: 'System',
                  fontWeight: '600',
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'mine_login_password')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
              dimensions.width
            )}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {Constants['user_info']?.has_password
                ? t(Variables, 'mine_change_password')
                : t(Variables, 'mine_set_password')}
            </Text>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              resizeMode={'contain'}
              source={imageSource(Images['icminenext'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 20, width: 20 }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
      </Touchable>
      {/* Touchable 4 */}
      <Touchable
        onPress={() => {
          try {
            navigation.push('AccountCancellationScreen');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth({ height: 52 }, dimensions.width)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                {
                  color: palettes.App.appStyle_black,
                  fontFamily: 'System',
                  fontWeight: '600',
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_account_cancellation')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
              dimensions.width
            )}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_warning')}
            </Text>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              resizeMode={'contain'}
              source={imageSource(Images['icminenext'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 20, width: 20 }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
      </Touchable>
    </ScreenContainer>
  );
};

export default withTheme(SettingAccountSafeScreen);
