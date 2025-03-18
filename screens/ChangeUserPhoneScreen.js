import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  ScreenContainer,
  TextInput,
  Timer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { main_phone: false, user_phone: null };

const ChangeUserPhoneScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [areaCodeId, setAreaCodeId] = React.useState(100);
  const [areaCodeValue, setAreaCodeValue] = React.useState(86);
  const [code, setCode] = React.useState('');
  const [code_err, setCode_err] = React.useState('');
  const [current_time, setCurrent_time] = React.useState(0);
  const [focus, setFocus] = React.useState(0);
  const [is_timer_runing, setIs_timer_runing] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [phoneInputValue, setPhoneInputValue] = React.useState('');
  const [phoneStatus, setPhoneStatus] = React.useState(false);
  const [phone_err, setPhone_err] = React.useState('');
  const [send_btn_text, setSend_btn_text] = React.useState('login_in_get_vc');
  const [tv_warning_send, setTv_warning_send] = React.useState(false);
  const [userError, setUserError] = React.useState(false);
  const [vCodeStatus, setVCodeStatus] = React.useState(false);
  const selectAreaCodeCallback = () => {
    setAreaCodeValue(code);
    setAreaCodeId(id);
  };
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestChangePhoneNumberPUT =
    AceCampTestApi.useChangePhoneNumberPUT();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  const viewTimerRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom #ffffff'] },
        dimensions.width
      )}
    >
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
            style={StyleSheet.applyWidth(
              { left: 16, position: 'absolute', top: 11 },
              dimensions.width
            )}
          />
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
              {props.route?.params?.main_phone ?? defaultProps.main_phone
                ? t(Variables, 'setting_change_phone')
                : t(Variables, 'setting_bind_phone')}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom #ffffff'],
            borderRadius: 4,
            flexDirection: 'row',
            height: '100%',
            justifyContent: 'center',
            padding: 16,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              borderColor: palettes.App['Custom Color 86'],
              borderRadius: 4,
              borderWidth: 1,
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* 手机号Form Item */}
          <View
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Brand.itemTextNomal,
                  fontFamily: 'System',
                  fontSize: 12,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 14,
                  marginBottom: 4,
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'common_new_phone')}
            </Text>
            {/* 手机号录入框 */}
            <View
              {...GlobalStyles.ViewStyles(theme)['Login Form Container'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['Login Form Container'].style,
                  {
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 6'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          focus === 1
                            ? palettes.Brand.appStyle_primary
                            : userError
                            ? palettes.Brand.Error
                            : palettes.App['Custom Color 6'],
                      },
                    ],
                    borderRadius: 4,
                  }
                ),
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.push('MineCountryCodeListScreen', {
                      id: areaCodeId,
                      callback: () => selectAreaCodeCallback(),
                    });
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
                      setPhoneStatus(true);
                    } else {
                      setPhoneStatus(false);
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
                onSubmitEditing={() => {
                  try {
                    vcodeInputRef.current.focus();
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
                placeholderTextColor={palettes.App['Custom Color 4']}
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
            <>
              {!phone_err ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'warning_phone_required')}
                </Text>
              )}
            </>
          </View>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.itemTextNomal,
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 14,
                marginBottom: 4,
                marginTop: 16,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'common_verification_code')}
          </Text>
          {/* 验证码输入框 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderColor: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 6'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value:
                      focus === 2 ? palettes.Brand.appStyle_primary : undefined,
                  },
                ],
                borderRadius: 4,
                borderWidth: 1,
                flexDirection: 'row',
                height: 45,
                justifyContent: 'space-between',
                marginTop: 8,
                width: '100%',
              },
              dimensions.width
            )}
          >
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
              onChangeText={newTextInputValue => {
                try {
                  setCode(newTextInputValue);
                  if (newTextInputValue?.length >= 4) {
                    setVCodeStatus(true);
                  } else {
                    setVCodeStatus(false);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              onFocus={() => {
                try {
                  setFocus(2);
                } catch (err) {
                  console.error(err);
                }
              }}
              keyboardType={'numeric'}
              maxLength={6}
              numberOfLines={1}
              placeholder={t(
                Variables,
                'login_enter_verification_code'
              ).toString()}
              placeholderTextColor={palettes.App['Custom Color 4']}
              returnKeyType={'none'}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App.appStyle_black,
                  flexGrow: 1,
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  height: '100%',
                  letterSpacing: 0.2,
                  lineHeight: 16,
                  marginLeft: 10,
                },
                dimensions.width
              )}
              value={code}
              webShowOutline={false}
            />
            <View
              style={StyleSheet.applyWidth({ flexShrink: 1 }, dimensions.width)}
            >
              <>
                {is_timer_runing ? null : (
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const result = (
                            await AceCampTestApi.requestCodePOST(Constants, {
                              code_scope: 'update',
                              country_code_id: areaCodeId,
                              phone_number: phoneInputValue,
                            })
                          )?.json;
                          console.log(result);
                          if (result?.code === 200) {
                          } else {
                            ShowToast(result?.msg, 'bottom', 'error');
                            if (true) {
                              return;
                            }
                          }

                          setTv_warning_send(true);
                          setIs_timer_runing(true);

                          viewTimerRef.current?.reset(120000);

                          viewTimerRef.current?.start();
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-end',
                          marginLeft: 6,
                          marginRight: 6,
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.appStyle_primary,
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, send_btn_text)}
                      </Text>
                    </View>
                  </Touchable>
                )}
              </>
            </View>
            <>
              {!is_timer_runing ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.itemTextNomal,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                      marginRight: 6,
                    },
                    dimensions.width
                  )}
                >
                  {current_time}
                  {'s'}
                </Text>
              )}
            </>
            {/* Text 2 */}
            <>
              {!code_err ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'warning_phone_required')}
                </Text>
              )}
            </>
          </View>

          <View
            style={StyleSheet.applyWidth({ paddingTop: 4 }, dimensions.width)}
          >
            {/* Text 4 */}
            <>
              {!tv_warning_send ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'register_vc_send')}
                  {areaCodeValue}
                  {phoneInputValue}
                  {t(Variables, 'register_vc_min')}
                </Text>
              )}
            </>
          </View>
        </View>
        <Timer
          format={'mm:ss'}
          onTimerChange={newTimerValue => {
            try {
              setCurrent_time(newTimerValue / 1000);
            } catch (err) {
              console.error(err);
            }
          }}
          onTimerEnd={() => {
            try {
              setIs_timer_runing(false);
              setSend_btn_text('common_Resend');
            } catch (err) {
              console.error(err);
            }
          }}
          updateInterval={1000}
          {...GlobalStyles.TimerStyles(theme)['Timer'].props}
          countDirection={'down'}
          initialTime={120000}
          ref={viewTimerRef}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TimerStyles(theme)['Timer'].style, {
              fontSize: 0,
            }),
            dimensions.width
          )}
          timerEndTime={0}
        />
      </View>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 0,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            position: 'absolute',
            right: 0,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Button 3 */}
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                let can_submit = true;
                if (phoneInputValue?.length <= 7) {
                  can_submit = false;
                  setPhone_err(true);
                } else {
                  setPhone_err(false);
                }

                if (code?.length < 4) {
                  can_submit = false;
                  setCode_err(true);
                } else {
                  setCode_err(false);
                }

                const result = (
                  await aceCampTestChangePhoneNumberPUT.mutateAsync({
                    code: code,
                    country_code_id: areaCodeId,
                    main_phone:
                      props.route?.params?.main_phone ??
                      defaultProps.main_phone,
                    password: (
                      props.route?.params?.user_phone ?? defaultProps.user_phone
                    )?.password,
                    phone_number: phoneInputValue,
                    user_code: (
                      props.route?.params?.user_phone ?? defaultProps.user_phone
                    )?.user_code,
                    user_country_code_id: (
                      props.route?.params?.user_phone ?? defaultProps.user_phone
                    )?.user_country_code_id,
                    user_phone_number: (
                      props.route?.params?.user_phone ?? defaultProps.user_phone
                    )?.user_phone_number,
                  })
                )?.json;
                console.log(result);
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={!vCodeStatus}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderRadius: 4,
              color: palettes.App['Custom #ffffff'],
              fontFamily: 'System',
              fontSize: 14,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 16,
              width: '100%',
            },
            dimensions.width
          )}
          title={`${t(Variables, 'common_save')}`}
        />
      </View>
      <Toast.ele />
    </ScreenContainer>
  );
};

export default withTheme(ChangeUserPhoneScreen);
