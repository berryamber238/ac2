import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  TextField,
  TextInput,
  Timer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Keyboard, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as HttpClient from '../custom-files/HttpClient';
import * as ShakeAnimation from '../custom-files/ShakeAnimation';
import * as Test from '../custom-files/Test';
import * as Toast from '../custom-files/Toast';
import HttpRequest from '../global-functions/HttpRequest';
import ShowToast from '../global-functions/ShowToast';
import jsonToFormData from '../global-functions/jsonToFormData';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const LoginScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [agreementChecked, setAgreementChecked] = React.useState(false);
  const [areaCodeId, setAreaCodeId] = React.useState(100);
  const [areaCodeValue, setAreaCodeValue] = React.useState('86');
  const [codeError, setCodeError] = React.useState(false);
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [focus, setFocus] = React.useState(0);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordInputValue, setPasswordInputValue] = React.useState('');
  const [phoneInputValue, setPhoneInputValue] = React.useState('');
  const [phoneLogin, setPhoneLogin] = React.useState(true);
  const [sentVCodeBtn, setSentVCodeBtn] = React.useState(
    t(Variables, 'login_in_get_vc')
  );
  const [showVcodeTip, setShowVcodeTip] = React.useState(false);
  const [userError, setUserError] = React.useState(false);
  const [vCodeStatus, setVCodeStatus] = React.useState('waiting');
  const [vcodeInputValue, setVcodeInputValue] = React.useState('');
  const [vcodeLogin, setVcodeLogin] = React.useState(true);
  const getRequestCodeData = () => {
    // {
    //   "scene": "ic_message",
    //   "code_scope": "login",
    //   "phone_number": "18611169707",
    //   "country_code_id": 100
    // }

    const data = {};
    data.scene = 'ic_message';
    data.code_scope = 'login';
    if (phoneLogin) {
      data.phone_number = phoneInputValue;
      data.country_code_id = areaCodeId;
    } else {
      data.email = emailInputValue;
    }

    return data;
  };

  const login = async (navigation, setGlobalVariableValue) => {
    setIsLoading(true);

    if (!agreementChecked) {
      triggerShake();
      ShowToast(t(Variables, 'please_check_the_privacy'));
      setIsLoading(false);
      return;
    }

    let hasError = false;
    const data = {};
    if (phoneLogin) {
      if (phoneInputValue.length <= 8) {
        hasError = true;
        setUserError(true);
      }
      data.country_code_id = areaCodeId;
      data.phone_number = phoneInputValue;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInputValue)) {
        hasError = true;
        setUserError(true);
      }
      data.email = emailInputValue;
    }

    if (vcodeLogin) {
      if (vcodeInputValue.length < 6) {
        hasError = true;
        setCodeError(true);
      }
      data.code = vcodeInputValue;
    } else {
      if (passwordInputValue === null || passwordInputValue.length === 0) {
        hasError = true;
        setCodeError(true);
      }
      data.password = passwordInputValue;
    }

    if (hasError === true) {
      setIsLoading(false);
      return;
    }
    try {
      // const endpoint = HttpClient.apiEndpoints.banners_list;
      // const result = Test.fetch(endpoint.url,endpoint.method,data);
      const url = HttpClient.apiEndpoints['login'];
      const response = await HttpClient.fetcher(url.url, url.method, data);
      const responseCookies = await AsyncStorage.getItem('cookies');

      console.log('saved cookie:' + responseCookies);
      const result = await response.json();

      if (result.code != 200) {
        ShowToast(result?.msg);
        return;
      }
      ShowToast('登录成功！');

      setGlobalVariableValue({ key: 'cookie', value: responseCookies });
      setGlobalVariableValue({ key: 'user_info', value: result.data });
      setGlobalVariableValue({ key: 'is_vip', value: result.data.has_vip });
      setGlobalVariableValue({ key: 'is_login', value: true });
      if (navigation.canGoBack()) {
        navigation.popToTop();
      } else {
        navigation.replace('BottomTabNavigator', {
          screen: 'Mine',
          params: { screen: 'MineIndexScreen' },
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCountryList = navigation => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    navigation.push('MineCountryCodeListScreen', {
      id: areaCodeId,
      callback: selectedAreaCodeCallback,
    });
  };

  const selectedAreaCodeCallback = (id, code) => {
    setAreaCodeValue(code);
    setAreaCodeId(id);
  };
  const shakeAnimationRef = React.useRef();

  const triggerShake = () => {
    if (shakeAnimationRef.current) {
      shakeAnimationRef.current.startShake();
    }
  };

  React.useEffect(() => {
    console.log(Variables.cookie);
  }, [Variables.cookie]);
  const safeAreaInsets = useSafeAreaInsets();
  const timerRef = React.useRef();

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
    >
      {/* 标题 */}
      <View
        onLayout={event => {
          try {
            setSentVCodeBtn(t(Variables, 'login_in_get_vc'));
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 28,
            paddingRight: 28,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* 标题-文字 */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text 2113'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text 2113'].style,
              { fontSize: 28, lineHeight: 36, margin: 5 }
            ),
            dimensions.width
          )}
        >
          {t(Variables, 'login_in')}
        </Text>
        <IconButton
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
          color={palettes.App.appStyle_greyscale_800}
          icon={'AntDesign/close'}
          size={28}
        />
      </View>
      {/* Login Form */}
      <View
        style={StyleSheet.applyWidth(
          {
            marginTop: safeAreaInsets.top + 24,
            paddingLeft: 36,
            paddingRight: 36,
          },
          dimensions.width
        )}
      >
        {/* 手机号Form Item */}
        <>
          {!phoneLogin ? null : (
            <View>
              {/* 手机号Label */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'common_phone')}
              </Text>
              {/* 手机号录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)['Login Form Container']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['Login Form Container']
                      .style,
                    {
                      borderColor:
                        focus === 1
                          ? palettes.Brand.Primary
                          : userError
                          ? palettes.Brand.Error
                          : palettes.App['Custom Color 4'],
                      borderWidth: focus === 1 || userError ? 1.5 : 1,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Touchable
                  onPress={() => {
                    try {
                      openCountryList(navigation);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: 'Urbanist_400Regular',
                          fontSize: 14,
                          paddingRight: 2,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'+'}
                    {areaCodeValue}
                  </Text>
                </Touchable>
                <Icon
                  color={palettes.Brand.Primary}
                  name={'AntDesign/down'}
                  size={14}
                  style={StyleSheet.applyWidth(
                    { marginRight: 4 },
                    dimensions.width
                  )}
                />
                {/* phone input */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newPhoneInputValue => {
                    try {
                      setPhoneInputValue(newPhoneInputValue);
                      if (newPhoneInputValue.trim()?.length > 4) {
                        setVCodeStatus('no');
                      } else {
                        setVCodeStatus('waiting');
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(1);
                      setUserError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                  keyboardType={'numeric'}
                  maxLength={11}
                  placeholder={
                    t(Variables, 'login_enter_your_phone').toString() ?? 'Email'
                  }
                  returnKeyType={'next'}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                    dimensions.width
                  )}
                  textContentType={'emailAddress'}
                  value={phoneInputValue}
                  webShowOutline={false}
                />
              </View>
            </View>
          )}
        </>
        {/* 邮件Form Item */}
        <>
          {!!phoneLogin ? null : (
            <View>
              {/* 邮件地址Label */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'common_email')}
              </Text>
              {/* 邮件地址录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)['Login Form Container']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['Login Form Container']
                      .style,
                    {
                      borderColor:
                        focus === 2
                          ? palettes.Brand.Primary
                          : userError
                          ? palettes.Brand.Error
                          : palettes.App['Custom Color 4'],
                      borderWidth: [
                        { minWidth: Breakpoints.Mobile, value: 1.5 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: focus === 2 || userError ? 1.5 : 1,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* email input */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newEmailInputValue => {
                    try {
                      setEmailInputValue(newEmailInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(2);
                      setUserError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                  keyboardType={'email-address'}
                  placeholder={
                    t(Variables, 'login_enter_your_email').toString() ?? 'Email'
                  }
                  returnKeyType={'next'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={'emailAddress'}
                  value={emailInputValue}
                  webShowOutline={false}
                />
              </View>
            </View>
          )}
        </>
        <View style={StyleSheet.applyWidth({ height: 20 }, dimensions.width)}>
          {/* 用户信息提醒 */}
          <>
            {!userError ? null : (
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                    {
                      color: 'rgb(255, 75, 75)',
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {userError
                  ? phoneLogin
                    ? t(Variables, 'warning_phone_required')
                    : t(Variables, 'warning_email_valid')
                  : undefined}
              </Text>
            )}
          </>
        </View>
        <Spacer left={8} right={8} bottom={3} top={3} />
        {/* 验证码Form Item */}
        <>
          {!vcodeLogin ? null : (
            <View>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* 验证码Label */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_verification_code')}
                </Text>
                {/* 切换密码验证码 */}
                <Pressable
                  onPress={() => {
                    try {
                      setVcodeLogin(false);
                      setCodeError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'login_in_by_password')}
                  </Text>
                </Pressable>
              </View>
              {/* 验证码录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)['Login Form Container']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['Login Form Container']
                      .style,
                    {
                      borderColor:
                        focus === 3
                          ? palettes.Brand.Primary
                          : codeError
                          ? palettes.Brand.Error
                          : palettes.App['Custom Color 4'],
                      borderWidth: [
                        { minWidth: Breakpoints.Mobile, value: 1.5 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: focus === 3 || codeError ? 1.5 : 1,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* vcode input */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newVcodeInputValue => {
                    try {
                      setVcodeInputValue(newVcodeInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(3);
                      setCodeError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                  keyboardType={'numeric'}
                  maxLength={6}
                  placeholder={
                    t(Variables, 'login_enter_verification_code').toString() ??
                    'Email'
                  }
                  returnKeyType={'next'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={'emailAddress'}
                  value={vcodeInputValue}
                  webShowOutline={false}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { overflow: 'hidden', paddingRight: 14 },
                    dimensions.width
                  )}
                >
                  {/* 获取验证码 */}
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          timerRef.current?.reset(120000);

                          timerRef.current?.start();

                          setSentVCodeBtn(120);
                          setVCodeStatus('waiting');
                          setShowVcodeTip(true);
                          const result = await HttpRequest(
                            'request_code',
                            jsonToFormData(getRequestCodeData())
                          );
                          console.log(result);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    disabled={vCodeStatus === 'waiting'}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label']
                            .style,
                          {
                            color: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: palettes.Brand.itemTextNomal,
                              },
                              {
                                minWidth: Breakpoints.Mobile,
                                value:
                                  vCodeStatus !== 'waiting'
                                    ? palettes.Brand.appStyle_primary
                                    : '#596a7a',
                              },
                            ],
                            fontFamily: 'Urbanist_400Regular',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {sentVCodeBtn}
                      {vCodeStatus === 'waiting' &&
                      parseInt(sentVCodeBtn, 10) >= 0
                        ? 's'
                        : ''}
                    </Text>
                  </Touchable>
                </View>
              </View>
            </View>
          )}
        </>
        {/* 密码Form Item */}
        <>
          {!!vcodeLogin ? null : (
            <View>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* 密码Label */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_password')}
                </Text>

                <Pressable
                  onPress={() => {
                    try {
                      setVcodeLogin(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'login_in_by_verification_code')}
                  </Text>
                </Pressable>
              </View>
              {/* 密码录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)['Login Form Container']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['Login Form Container']
                      .style,
                    {
                      borderColor:
                        focus === 4
                          ? palettes.Brand.Primary
                          : codeError
                          ? palettes.Brand.Error
                          : palettes.App['Custom Color 4'],
                      borderWidth: [
                        { minWidth: Breakpoints.Mobile, value: 1.5 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: focus === 4 || codeError ? 1.5 : 1,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* password input */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newPasswordInputValue => {
                    try {
                      setPasswordInputValue(newPasswordInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(4);
                      setCodeError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                  keyboardType={'default'}
                  placeholder={
                    t(Variables, 'login_enter_your_password').toString() ??
                    'Email'
                  }
                  returnKeyType={'next'}
                  secureTextEntry={hidePassword}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={'emailAddress'}
                  value={passwordInputValue}
                  webShowOutline={false}
                />
                <IconButton
                  onPress={() => {
                    try {
                      setHidePassword(!hidePassword);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={palettes.App['Custom Color 4']}
                  icon={hidePassword ? 'Entypo/eye-with-line' : 'Entypo/eye'}
                  size={22}
                  style={StyleSheet.applyWidth(
                    { marginRight: 10 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          )}
        </>
        {/* View 2 */}
        <View style={StyleSheet.applyWidth({ height: 20 }, dimensions.width)}>
          {/* 发送成功提醒 */}
          <>
            {!(showVcodeTip && vcodeLogin) ? null : (
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'register_vc_send')}
                {phoneLogin ? areaCodeValue + phoneInputValue : emailInputValue}
                {t(Variables, 'register_vc_min')}
              </Text>
            )}
          </>
          {/* 密码信息提醒 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                {
                  color: 'rgb(255, 75, 75)',
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                }
              ),
              dimensions.width
            )}
          >
            {codeError
              ? vcodeLogin
                ? t(Variables, 'warning_verification_code_required')
                : t(Variables, 'warning_password_required')
              : undefined}
          </Text>
        </View>
        {/* Sign In Button */}
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                Keyboard.dismiss();
                const result = await login(navigation, setGlobalVariableValue);
                /* hidden 'Run a Custom Function' action */
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={isLoading}
          loading={isLoading}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderRadius: 4,
              fontFamily: 'System',
              fontSize: 16,
              fontWeight: '700',
              height: 45,
              marginTop: 30,
              textAlign: 'center',
            },
            dimensions.width
          )}
          title={`${t(Variables, 'login_in')}`}
        >
          {'Sign Up'}
        </Button>
        {/* 注册&忘记密码View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'space-between' },
            dimensions.width
          )}
        >
          {/* 注册按钮 */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.push('RegisterScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Text Button With Primary']
              .props}
            style={StyleSheet.applyWidth(
              GlobalStyles.ButtonStyles(theme)['Text Button With Primary']
                .style,
              dimensions.width
            )}
            title={`${t(Variables, 'login_sign_up_now')}`}
          />
          {/* 忘记密码按钮 */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.push('WebViewScreen', {
                  url: Constants['base_url'] + '/findBackPassword',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Text Button With Primary']
              .props}
            style={StyleSheet.applyWidth(
              GlobalStyles.ButtonStyles(theme)['Text Button With Primary']
                .style,
              dimensions.width
            )}
            title={`${t(Variables, 'login_forgot')}`}
          />
        </View>
        {/* 分隔符 */}
        <View
          style={StyleSheet.applyWidth(
            { height: 50, justifyContent: 'center' },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom Color_6'],
                flexDirection: 'row',
                height: 2,
                justifyContent: 'center',
              },
              dimensions.width
            )}
          />
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: palettes.Brand.Background,
                height: 50,
                justifyContent: 'center',
                position: 'absolute',
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                { fontFamily: 'System', fontSize: 14, fontWeight: '700' },
                dimensions.width
              )}
            >
              {t(Variables, 'login_in_by_other_style')}
            </Text>
          </View>
        </View>
        {/* 切换登录方式按钮 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setPhoneLogin(!phoneLogin);
                setUserError(false);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.App['Custom Color 7'],
                  borderRadius: 100,
                  height: 60,
                  justifyContent: 'center',
                  width: 60,
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  phoneLogin ? Images['icemail'] : Images['icphone']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 35, width: 35 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text Tip'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text Tip'].style,
                  { marginTop: 10 }
                ),
                dimensions.width
              )}
            >
              {phoneLogin
                ? t(Variables, 'login_buy_email')
                : t(Variables, 'login_buy_phone')}
            </Text>
          </Touchable>
        </View>
      </View>
      <Timer
        onTimerChange={newTimerValue => {
          try {
            const result = sentVCodeBtn - 1;
            setSentVCodeBtn(result);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setSentVCodeBtn(t(Variables, 'common_Resend'));
            setVCodeStatus('sent');
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        {...GlobalStyles.TimerStyles(theme)['Timer'].props}
        countDirection={'down'}
        format={'ss:ms'}
        initialTime={60000}
        ref={timerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TimerStyles(theme)['Timer'].style, {
            opacity: 0,
          }),
          dimensions.width
        )}
        timerEndTime={0}
      />
      {/* Custom Code 2 */}
      <Utils.CustomCodeErrorBoundary>
        <ShakeAnimation.view ref={shakeAnimationRef}>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  setAgreementChecked(!agreementChecked);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  agreementChecked
                    ? Images['icselectactive']
                    : Images['icselectdefault']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 16, marginRight: 4, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text Tip'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Text Tip'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'login_in_agree')}
            </Text>
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.navigate('WebViewScreen', {
                    url: 'https://terms.acecamptech.com/privacy/20210726/index.html',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.LinkStyles(theme)['Link'].style,
                dimensions.width
              )}
              title={`${t(Variables, 'the_privacy')}`}
            />
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text Tip'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Text Tip'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_and')}
            </Text>
            {/* Link 2 */}
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.navigate('WebViewScreen', {
                    url: 'https://terms.acecamptech.com/agreement/index.html',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.LinkStyles(theme)['Link'].style,
                dimensions.width
              )}
              title={`${t(Variables, 'login_in_service')}`}
            />
          </View>
        </ShakeAnimation.view>
      </Utils.CustomCodeErrorBoundary>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
