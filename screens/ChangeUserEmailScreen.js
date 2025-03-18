import React from 'react';
import {
  Button,
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
import * as reactNativeToastMessage from 'react-native-toast-message';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import isValidEmail from '../global-functions/isValidEmail';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const ChangeUserEmailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [change_style, setChange_style] = React.useState(1);
  const [e_code_send, setE_code_send] = React.useState(false);
  const [e_count_down, setE_count_down] = React.useState(0);
  const [e_send_code_btn_text, setE_send_code_btn_text] = React.useState(
    t(Variables, 'login_in_get_vc')
  );
  const [ecode, setEcode] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [err_array, setErr_array] = React.useState([]);
  const [is_e_count_start, setIs_e_count_start] = React.useState(false);
  const [is_v_count_start, setIs_v_count_start] = React.useState(false);
  const [v_code_send, setV_code_send] = React.useState(false);
  const [v_count_down, setV_count_down] = React.useState(0);
  const [v_send_code_btn_text, setV_send_code_btn_text] = React.useState(
    t(Variables, 'login_in_get_vc')
  );
  const [vcode, setVcode] = React.useState('');
  const show = () => {
    reactNativeToastMessage.default.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestChangePasswordPUT = AceCampTestApi.useChangePasswordPUT();
  const aceCampTestChangeEmailPUT = AceCampTestApi.useChangeEmailPUT();
  React.useEffect(() => {
    try {
      if (Constants['user_info']?.phone_number) {
        setChange_style(1);
      } else {
        setChange_style(2);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  const vTimerRef = React.useRef();
  const eTimerRef = React.useRef();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
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
              {Constants['user_info']?.email
                ? t(Variables, 'setting_change_email')
                : t(Variables, 'setting_bind_email')}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { position: 'absolute', right: 16 },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    let can_submit = true;
                    let new_arr = [];
                    if (vcode) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([0]);
                    }

                    if (email && isValidEmail(email)) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([1]);
                    }

                    if (ecode) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([2]);
                    }

                    setErr_array(new_arr);
                    if (!can_submit) {
                      return;
                    }
                    /* hidden 'API Request' action */
                    const result = (
                      await aceCampTestChangeEmailPUT.mutateAsync({
                        code: ecode,
                        email: email,
                        user_code: vcode,
                        user_country_code_id:
                          change_style === 1
                            ? Constants['user_info']?.country_code_id
                            : undefined,
                        user_email:
                          change_style === 2
                            ? Constants['user_info']?.email
                            : undefined,
                        user_phone_number:
                          change_style === 1
                            ? Constants['user_info']?.phone_number
                            : undefined,
                      })
                    )?.json;
                    console.log(result);
                    if (result?.data) {
                      setGlobalVariableValue({
                        key: 'user_info',
                        value: result?.data,
                      });
                      ShowToast(
                        Constants['user_info']?.email
                          ? t(Variables, 'toast_email_change_success')
                          : t(Variables, 'toast_email_bind_success'),
                        undefined,
                        undefined
                      );
                    } else {
                      ShowToast(result?.msg, 'bottom', 'error');
                    }
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
                    backgroundColor: palettes.Brand.appStyle_primary,
                    borderRadius: 3,
                    paddingBottom: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 4,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_save')}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { paddingLeft: 16, paddingRight: 16 },
          dimensions.width
        )}
      >
        <>
          {!(change_style === 1) ? null : (
            <View>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 14,
                    marginTop: 16,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'common_phone')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 68'],
                    fontFamily: 'System',
                    fontSize: 15,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 17,
                    paddingBottom: 8,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'+'}
                {Constants['user_info']?.country_code}
                {Constants['user_info']?.phone_number}
              </Text>
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 7'],
                    height: 1,
                  },
                  dimensions.width
                )}
              />
            </View>
          )}
        </>
        {/* View 2 */}
        <>
          {!(change_style === 2) ? null : (
            <View>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 14,
                    marginTop: 16,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'common_email')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 68'],
                    fontFamily: 'System',
                    fontSize: 15,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 17,
                    paddingBottom: 8,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {Constants['user_info']?.email}
              </Text>
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 7'],
                    height: 1,
                  },
                  dimensions.width
                )}
              />
            </View>
          )}
        </>
        {/* 手机验证码 */}
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                { marginTop: 16 }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'common_verification_code')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setVcode(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={t(
                Variables,
                'login_enter_verification_code'
              ).toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  flex: 1,
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
              value={vcode}
            />
            {/* Button 2 */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    const result = (
                      await AceCampTestApi.requestCodePOST(Constants, {
                        code_scope: 'change_email',
                        country_code_id: change_style
                          ? Constants['user_info']?.country_code_id
                          : undefined,
                        email:
                          change_style === 2
                            ? Constants['user_info']?.email
                            : undefined,
                        phone_number:
                          change_style === 1
                            ? Constants['user_info']?.phone_number
                            : undefined,
                        scene: 'ic_message',
                      })
                    )?.json;
                    console.log(result);
                    setV_code_send(true);

                    vTimerRef.current?.start();

                    setIs_v_count_start(true);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabled={is_v_count_start}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: palettes.Brand.appStyle_primary,
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 15,
                  paddingRight: 0,
                },
                dimensions.width
              )}
              title={`${
                is_v_count_start ? v_count_down + 's' : v_send_code_btn_text
              }`}
            />
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 手机验证码发送 */}
          <>
            {!(v_code_send && change_style === 1) ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'register_vc_send') +
                  (Constants['user_info']?.country_code +
                    Constants['user_info']?.phone_number) +
                  t(Variables, 'register_vc_min')}
              </Text>
            )}
          </>
          {/* 邮箱验证码发送 */}
          <>
            {!(v_code_send && change_style === 2) ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'register_vc_send') +
                  Constants['user_info']?.email +
                  t(Variables, 'register_vc_min')}
              </Text>
            )}
          </>
          {/* 验证码为空警告 */}
          <>
            {!err_array.includes(0) ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'warning_verification_code_required')}
              </Text>
            )}
          </>
        </View>
        {/* 邮箱 */}
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                { marginTop: 16 }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_bind_email')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setEmail(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={t(Variables, 'login_enter_your_email').toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  flex: 1,
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
              value={email}
            />
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 邮箱不合法警告 */}
          <>
            {!err_array.includes(1) ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'warning_email_valid')}
              </Text>
            )}
          </>
        </View>
        {/* 邮箱验证码 */}
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                { marginTop: 16 }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'common_verification_code')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setEcode(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={t(
                Variables,
                'login_enter_verification_code'
              ).toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  flex: 1,
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
              value={ecode}
            />
            {/* Button 2 */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    const result = (
                      await AceCampTestApi.requestCodePOST(Constants, {
                        code_scope: 'update',
                        email: email,
                        scene: 'ic_message',
                      })
                    )?.json;
                    console.log(result);
                    setE_code_send(true);

                    eTimerRef.current?.start();

                    setIs_e_count_start(true);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabled={is_e_count_start}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: palettes.Brand.appStyle_primary,
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 15,
                  paddingRight: 0,
                },
                dimensions.width
              )}
              title={`${
                is_e_count_start ? e_count_down + 's' : e_send_code_btn_text
              }`}
            />
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 手机验证码发送 */}
          <>
            {!e_code_send ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'register_vc_send') +
                  email +
                  t(Variables, 'register_vc_min')}
              </Text>
            )}
          </>
          {/* 验证码为空警告 */}
          <>
            {!err_array.includes(2) ? null : (
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
                    marginTop: 4,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'warning_verification_code_required')}
              </Text>
            )}
          </>
        </View>
      </View>
      {/* VTimer */}
      <Timer
        format={'mm:ss'}
        onTimerChange={newTimerValue => {
          try {
            setV_count_down(newTimerValue / 1000);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setIs_v_count_start(false);
            setV_send_code_btn_text(t(Variables, 'common_Resend'));
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        countDirection={'down'}
        initialTime={120000}
        ref={vTimerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(theme.typography.headline4, { fontSize: 0 }),
          dimensions.width
        )}
        timerEndTime={0}
      />
      {/* ETimer */}
      <Timer
        format={'mm:ss'}
        onTimerChange={newTimerValue => {
          try {
            setE_count_down(newTimerValue / 1000);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setIs_e_count_start(false);
            setE_send_code_btn_text(t(Variables, 'common_Resend'));
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        countDirection={'down'}
        initialTime={120000}
        ref={eTimerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(theme.typography.headline4, { fontSize: 0 }),
          dimensions.width
        )}
        timerEndTime={0}
      />
    </ScreenContainer>
  );
};

export default withTheme(ChangeUserEmailScreen);
