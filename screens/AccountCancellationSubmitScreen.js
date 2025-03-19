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
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { description: null, reasons: null };

const AccountCancellationSubmitScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [code, setCode] = React.useState('');
  const [code_err, setCode_err] = React.useState('');
  const [current_time, setCurrent_time] = React.useState(0);
  const [focus, setFocus] = React.useState(0);
  const [is_timer_runing, setIs_timer_runing] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [send_btn_text, setSend_btn_text] = React.useState('login_in_get_vc');
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [tv_warning_send, setTv_warning_send] = React.useState(false);
  const submit_delete = async () => {
    const result = (
      await aceCampTestDeleteAccountPOST.mutateAsync({
        description:
          props.route?.params?.description ?? defaultProps.description,
        reasons: props.route?.params?.reasons ?? defaultProps.reasons,
        user_code: code,
        user_country_code_id: Constants['user_info']?.country_code_id,
        user_phone_number: Constants['user_info']?.phone_number,
      })
    )?.json;
    if (result?.code === 200) {
      ShowToast(
        t(Variables, 'toast_submitted_successfully'),
        undefined,
        undefined
      );
      setGlobalVariableValue({
        key: 'user_info',
        value: null,
      });
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('Home');
    } else {
      ShowToast(result?.msg, undefined, 'error');
    }
  };
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestDeleteAccountPOST = AceCampTestApi.useDeleteAccountPOST();
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
              {t(Variables, 'setting_apply_account_cancellation')}
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
              {t(Variables, 'common_phone')}
            </Text>
            {/* Text 3 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  theme.typography.body1,
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
                              country_code_id:
                                Constants['user_info']?.country_code_id,
                              phone_number:
                                Constants['user_info']?.phone_number,
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
          </View>
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
                {t(Variables, 'warning_verification_code_required')}
              </Text>
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
                  {null}
                  {'+' +
                    Constants['user_info']?.country_code +
                    Constants['user_info']?.phone_number}
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
            try {
              if (code?.length < 4) {
                setCode_err(true);
              } else {
                setCode_err(false);
                setTip_modal_visiable(true);
              }

              /* hidden 'API Request' action */
              /* hidden 'If/Else' action */
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
              width: '100%',
            },
            dimensions.width
          )}
          title={`${t(Variables, 'common_submit')}`}
        />
      </View>
      <Toast.ele />
      {/* 删除提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'setting_take_notice_that')}
          message={
            t(Variables, 'setting_take_notice_warning_one') +
            t(Variables, 'setting_take_notice_warning_two') +
            t(Variables, 'setting_take_notice_warning_three')
          }
          cancelBtn={t(Variables, 'common_cancel')}
          confirmBtn={t(Variables, 'common_yes')}
          onConfirm={() => {
            setTip_modal_visiable(false);
          }}
          onCancel={submit_delete}
          visible={tip_modal_visiable}
          txtAlign={'left'}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountCancellationSubmitScreen);
