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
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import containsSpecialCharacters from '../global-functions/containsSpecialCharacters';
import containsUpperLowerDigit from '../global-functions/containsUpperLowerDigit';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const SettingChangePasswordScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [change_style, setChange_style] = React.useState(1);
  const [code_err, setCode_err] = React.useState('');
  const [count_down, setCount_down] = React.useState(0);
  const [edit_folder_item_shown, setEdit_folder_item_shown] =
    React.useState(false);
  const [email_code, setEmail_code] = React.useState('');
  const [err_array, setErr_array] = React.useState([]);
  const [is_count_start, setIs_count_start] = React.useState(false);
  const [new_pass, setNew_pass] = React.useState('');
  const [organizationInfo, setOrganizationInfo] = React.useState({});
  const [retry_pass, setRetry_pass] = React.useState('');
  const [send_code_btn_text, setSend_code_btn_text] = React.useState(
    t(Variables, 'login_in_get_vc')
  );
  const [v_code_send, setV_code_send] = React.useState(false);
  const [vcode, setVcode] = React.useState('');
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestChangePasswordPUT = AceCampTestApi.useChangePasswordPUT();
  React.useEffect(() => {
    try {
      setChange_style(Constants['user_info']?.phone_number ? 1 : 2);
    } catch (err) {
      console.error(err);
    }
  }, []);
  const timerRef = React.useRef();

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
              {Constants['user_info']?.has_password
                ? t(Variables, 'mine_change_password')
                : t(Variables, 'mine_set_password')}
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

                    if (new_pass) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([1]);
                    }

                    if (new_pass?.length >= 8) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([2]);
                    }

                    if (containsUpperLowerDigit(new_pass)) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([3]);
                    }

                    if (containsSpecialCharacters(new_pass)) {
                      can_submit = false;
                      new_arr = new_arr.concat([4]);
                    } else {
                    }

                    if (retry_pass) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([5]);
                    }

                    if (new_pass === retry_pass) {
                    } else {
                      can_submit = false;
                      new_arr = new_arr.concat([6]);
                    }

                    setErr_array(new_arr);
                    if (!can_submit) {
                      return;
                    }
                    (
                      await aceCampTestChangePasswordPUT.mutateAsync({
                        code: vcode,
                        country_code_id:
                          change_style === 1
                            ? Constants['user_info']?.country_code_id
                            : undefined,
                        email:
                          change_style === 2
                            ? Constants['user_info']?.email
                            : undefined,
                        password: new_pass,
                        password_confirmation: retry_pass,
                        phone_number:
                          change_style === 1
                            ? Constants['user_info']?.phone_number
                            : undefined,
                      })
                    )?.json;
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
        {/* 手机号 */}
        <>
          {!(change_style === 1) ? null : (
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
                {t(Variables, 'common_phone')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.App['Custom Color 68'],
                      paddingBottom: 8,
                      paddingTop: 10,
                    }
                  ),
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
        {/* 邮箱 */}
        <>
          {!(change_style === 2) ? null : (
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
                {t(Variables, 'common_email')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.App['Custom Color 68'],
                      paddingBottom: 8,
                      paddingTop: 10,
                    }
                  ),
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
        {/* 验证码 2 */}
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
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    const result = (
                      await AceCampTestApi.requestCodePOST(Constants, {
                        code_scope: 'change_password',
                        country_code_id:
                          change_style === 1
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

                    timerRef.current?.start();

                    setIs_count_start(true);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabled={is_count_start}
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
                is_count_start ? count_down + 's' : send_code_btn_text
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
        {/* 密码 */}
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
            {t(Variables, 'common_password')}
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
                  setNew_pass(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={t(Variables, 'login_enter_your_password').toString()}
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
              value={new_pass}
            />
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 新密码为空警告 */}
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
                {t(Variables, 'warning_new_password_required')}
              </Text>
            )}
          </>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 4'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: err_array.includes(2) ? '#ff4b4b' : undefined,
                  },
                ],
                fontFamily: 'System',
                fontSize: 10,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 12,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'warning_password_more_size')}
          </Text>
          {/* Text 4 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 4'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: err_array.includes(3) ? '#ff4b4b' : undefined,
                  },
                ],
                fontFamily: 'System',
                fontSize: 10,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 12,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'warning_password_tips_type')}
          </Text>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 4'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: err_array.includes(4) ? '#ff4b4b' : undefined,
                  },
                ],
                fontFamily: 'System',
                fontSize: 10,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 12,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'warning_password_tips_special')}
          </Text>
        </View>
        {/* 确认密码 */}
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
            {t(Variables, 'common_confirm_password')}
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
                  setRetry_pass(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={t(Variables, 'login_enter_your_password').toString()}
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
              value={retry_pass}
            />
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 新密码为空警告 */}
          <>
            {!err_array.includes(5) ? null : (
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
                {t(Variables, 'warning_confirm_password_required')}
              </Text>
            )}
          </>
          {/* 新密码为空警告 2 */}
          <>
            {!err_array.includes(6) ? null : (
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
                {t(Variables, 'warning_password_not_match')}
              </Text>
            )}
          </>
        </View>
      </View>
      <Timer
        format={'mm:ss'}
        onTimerChange={newTimerValue => {
          try {
            setCount_down(newTimerValue / 1000);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setIs_count_start(false);
            setSend_code_btn_text(t(Variables, 'common_Resend'));
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        countDirection={'down'}
        initialTime={120000}
        ref={timerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(theme.typography.headline4, { fontSize: 0 }),
          dimensions.width
        )}
        timerEndTime={0}
      />
    </ScreenContainer>
  );
};

export default withTheme(SettingChangePasswordScreen);
