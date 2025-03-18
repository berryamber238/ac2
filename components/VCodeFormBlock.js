import React from 'react';
import {
  Button,
  Link,
  TextInput,
  Timer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
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

const defaultProps = {
  call_back_data: null,
  comfirm_modal: () => {},
  request_code_type: 'change_info',
  verify: false,
};

const VCodeFormBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [code, setCode] = React.useState('');
  const [current_time, setCurrent_time] = React.useState(0);
  const [is_timer_runing, setIs_timer_runing] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [send_btn_text, setSend_btn_text] = React.useState('login_in_get_vc');
  const [textInputValue, setTextInputValue] = React.useState('{{txt}}');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [tv_warning_send, setTv_warning_send] = React.useState(false);
  const [v_code_type, setV_code_type] = React.useState(true);
  const getRequestData = () => {
    const data = {};

    if (v_code_type) {
      data.user_code = code;
    } else {
      data.password = password;
    }

    data.user_country_code_id = Variables.user_info.country_code_id;
    data.user_phone_number = Variables.user_info.phone_number;

    console.log(data);

    return data;
  };
  const aceCampTestVerifyCodePOST = AceCampTestApi.useVerifyCodePOST();
  const aceCampTestVerifyPasswordPOST = AceCampTestApi.useVerifyPasswordPOST();
  const timerRef = React.useRef();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'center',
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
            padding: 24,
            width: 328,
          },
          dimensions.width
        )}
      >
        <>
          {props.verify ?? defaultProps.verify ? null : (
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'center',
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'common_confirm_password')}
            </Text>
          )}
        </>
        {/* Text 4 */}
        <>
          {!(props.verify ?? defaultProps.verify) ? null : (
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'center',
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'setting_to_authentication')}
            </Text>
          )}
        </>
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
          {t(Variables, 'common_phone')}
        </Text>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 7'],
              borderRadius: 4,
              height: 40,
              justifyContent: 'center',
              paddingLeft: 8,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Text 4 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 87'],
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 16,
              },
              dimensions.width
            )}
          >
            {'+'}
            {Constants['user_info']?.country_code}
            {Constants['user_info']?.phone_number}
          </Text>
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
        <>
          {!v_code_type ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 45,
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
                onChangeText={newTextInputValue => {
                  try {
                    setCode(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
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
                    flex: 1,
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
              />
              <>
                {is_timer_runing ? null : (
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const result = (
                            await AceCampTestApi.requestCodePOST(Constants, {
                              code_scope:
                                props.request_code_type ??
                                defaultProps.request_code_type,
                              country_code_id:
                                Constants['user_info']?.country_code_id,
                              phone_number:
                                Constants['user_info']?.phone_number,
                            })
                          )?.json;
                          if (result?.code !== 200) {
                            return;
                          }
                          setTv_warning_send(true);
                          setIs_timer_runing(true);

                          timerRef.current?.reset(120000);

                          timerRef.current?.start();
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
            </View>
          )}
        </>
        {/* 密码输入框 */}
        <>
          {v_code_type ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 45,
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
                onChangeText={newTextInputValue => {
                  try {
                    setPassword(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                keyboardType={'default'}
                numberOfLines={1}
                placeholder={t(
                  Variables,
                  'login_enter_your_password'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 4']}
                returnKeyType={'none'}
                secureTextEntry={true}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    flex: 1,
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
                value={password}
              />
            </View>
          )}
        </>
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
                {Constants['user_info']?.country_code}
                {Constants['user_info']?.phone_number}
                {t(Variables, 'register_vc_min')}
              </Text>
            )}
          </>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <>
            {!v_code_type ? null : (
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
                    lineHeight: 15,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_can_not_v_code')}
              </Text>
            )}
          </>
          <>
            {!v_code_type ? null : (
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    setV_code_type(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectable={false}
                {...GlobalStyles.LinkStyles(theme)['Link'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinkStyles(theme)['Link'].style,
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'mine_use_password')}`}
              />
            )}
          </>
          {/* Link 2 */}
          <>
            {v_code_type ? null : (
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    setV_code_type(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectable={false}
                {...GlobalStyles.LinkStyles(theme)['Link'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinkStyles(theme)['Link'].style,
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'mine_use_v_code')}`}
              />
            )}
          </>
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 24,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                props.comfirm_modal?.(false, undefined, undefined, undefined);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom #ffffff'],
                borderColor: palettes.App['Custom Color 6'],
                borderRadius: 4,
                borderWidth: 1,
                color: palettes.App.appStyle_black,
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                height: 44,
                letterSpacing: 0.2,
                lineHeight: 16,
                width: '48%',
              },
              dimensions.width
            )}
            title={`${t(Variables, 'common_cancel')}`}
          />
          {/* Button 3 */}
          <>
            {props.verify ?? defaultProps.verify ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    let input_value = '';
                    if (v_code_type) {
                      input_value = code;
                    } else {
                      input_value = password;
                    }

                    if (input_value?.length === 0) {
                      if (v_code_type) {
                        ShowToast(
                          t(Variables, 'warning_verification_code_required'),
                          'top',
                          'error'
                        );
                      } else {
                        ShowToast(
                          t(Variables, 'warning_password_required'),
                          'top',
                          'error'
                        );
                      }

                      if (true) {
                        return;
                      }
                    } else {
                    }

                    props.comfirm_modal?.(
                      true,
                      input_value,
                      v_code_type,
                      undefined
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
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
                    width: '48%',
                  },
                  dimensions.width
                )}
                title={`${t(Variables, 'common_yes')}`}
              />
            )}
          </>
          {/* Button 2 */}
          <>
            {!(props.verify ?? defaultProps.verify) ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    console.log('Button 2 ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 DECLARE_VARIABLE');
                      let input_value = '';
                      console.log('Complete ON_PRESS:0 DECLARE_VARIABLE', {
                        input_value,
                      });
                      console.log('Start ON_PRESS:1 IF');
                      if (v_code_type) {
                        input_value = code;
                      } else {
                        input_value = password;
                      }
                      console.log('Complete ON_PRESS:1 IF');
                      console.log('Start ON_PRESS:2 IF');
                      if (input_value?.length === 0) {
                        if (v_code_type) {
                          ShowToast(
                            t(Variables, 'warning_verification_code_required'),
                            'top',
                            'error'
                          );
                        } else {
                          ShowToast(
                            t(Variables, 'warning_password_required'),
                            'top',
                            'error'
                          );
                        }

                        if (true) {
                          return;
                        }
                      } else {
                        let verify_result = false;
                        if (v_code_type) {
                          const result = (
                            await aceCampTestVerifyCodePOST.mutateAsync({
                              code_scope:
                                props.request_code_type ??
                                defaultProps.request_code_type,
                              user_code: input_value,
                              user_country_code_id:
                                Constants['user_info']?.country_code_id,
                              user_phone_number:
                                Constants['user_info']?.phone_number,
                            })
                          )?.json;
                          verify_result = result;
                        } else {
                          const result2 = (
                            await aceCampTestVerifyPasswordPOST.mutateAsync({
                              password: input_value,
                              user_country_code_id:
                                Constants['user_info']?.country_code_id,
                              user_phone_number:
                                Constants['user_info']?.phone_number,
                            })
                          )?.json;
                          verify_result = result2;
                        }

                        /* hidden 'Log to Console' action */
                        if (verify_result?.code === 200) {
                          props.comfirm_modal?.(
                            true,
                            getRequestData(),
                            v_code_type,
                            props.call_back_data ?? defaultProps.call_back_data
                          );
                        } else {
                          ShowToast(verify_result?.msg, 'bottom', 'error');
                          return;
                        }
                      }
                      console.log('Complete ON_PRESS:2 IF');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'Button 2 ON_PRESS Complete',
                      error ? { error } : 'no error'
                    );
                  };
                  handler();
                }}
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
                    width: '48%',
                  },
                  dimensions.width
                )}
                title={`${t(Variables, 'common_next')}`}
              />
            )}
          </>
        </View>
        <>
          {v_code_type ? null : (
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.push('SettingChangePasswordScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinkStyles(theme)['Link'].style,
                  {
                    alignSelf: 'center',
                    color: palettes.Brand.appStyle_primary,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                    marginTop: 10,
                  }
                ),
                dimensions.width
              )}
              title={`${t(Variables, 'login_forgot')}`}
            />
          )}
        </>
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
        ref={timerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TimerStyles(theme)['Timer'].style, {
            fontSize: 0,
          }),
          dimensions.width
        )}
        timerEndTime={0}
      />
      <Toast.ele />
    </View>
  );
};

export default withTheme(VCodeFormBlock);
