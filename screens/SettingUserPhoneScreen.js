import React from 'react';
import {
  ExpoImage,
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Modal, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import PhoneSelectActionSheetBlock from '../components/PhoneSelectActionSheetBlock';
import VCodeFormBlock from '../components/VCodeFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as gf from '../custom-files/gf';
import ShowToast from '../global-functions/ShowToast';
import StringFormat from '../global-functions/StringFormat';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SettingUserPhoneScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [change_style, setChange_style] = React.useState(0);
  const [delete_modal_visiable, setDelete_modal_visiable] =
    React.useState(false);
  const [err_array, setErr_array] = React.useState([]);
  const [main_phone, setMain_phone] = React.useState(false);
  const [new_pass, setNew_pass] = React.useState('');
  const [operation_type, setOperation_type] = React.useState('');
  const [request_code_type, setRequest_code_type] = React.useState('');
  const [retry_pass, setRetry_pass] = React.useState('');
  const [selected_country_code, setSelected_country_code] = React.useState(0);
  const [selected_country_code_id, setSelected_country_code_id] =
    React.useState(0);
  const [selected_phone, setSelected_phone] = React.useState('');
  const [show_code_modal, setShow_code_modal] = React.useState(false);
  const [show_menu, setShow_menu] = React.useState(true);
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [vcode, setVcode] = React.useState('');
  const [verify, setVerify] = React.useState('');
  const [verify_data, setVerify_data] = React.useState({});
  const close = () => {
    actionSheetRef.current?.hide();
  };

  const delete_phone = async () => {
    const result = (
      await aceCampTestDeleteOtherPhoneDELETE.mutateAsync({
        country_code_id: selected_country_code_id,
        phone_number: selected_phone,
      })
    )?.json;

    if (result.data) {
      setGlobalVariableValue({ key: 'user_info', value: result.data });
    }

    setDelete_modal_visiable(false);
  };

  const selectMenu = index => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const show = () => {
    actionSheetRef.current?.show();

    // debugger
    // gf.SheetManager.show('hello').then(result => {
    //           console.log('User will star on github?', result);
    //           if (result) {
    //             Linking.openURL(
    //               'https://github.com/ammarahm-ed/react-native-actions-sheet',
    //             );
    //           }
    //         });
  };

  const switch_main_phone = async () => {
    console.log('start switch');
    const data = {
      user_code: verify_data?.user_code,
      user_country_code_id: verify_data?.user_country_code_id,
      user_phone_number: verify_data?.user_phone_number,
      password: verify_data?.password,
      country_code_id: selected_country_code_id,
      phone_number: selected_phone,
    };
    console.log('data' + JSON.stringify(data));
    try {
      const result = (await aceCampTestSwitchMainPhonePUT.mutateAsync(data))
        ?.json;
      if (result.data) {
        setGlobalVariableValue({
          key: 'user_info',
          value: result.data,
        });
      }
      console.log('switch phone : ' + JSON.stringify(result));
    } catch (e) {
      console.log(e);
    }
    setTip_modal_visiable(false);
  };
  const actionSheetRef = React.useRef(null);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestSwitchMainPhonePUT = AceCampTestApi.useSwitchMainPhonePUT();
  const aceCampTestOrganizationUpdatePUT =
    AceCampTestApi.useOrganizationUpdatePUT();
  const aceCampTestDeleteOtherPhoneDELETE =
    AceCampTestApi.useDeleteOtherPhoneDELETE();
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
              {t(Variables, 'common_phone')}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { paddingLeft: 16, paddingRight: 16 },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 14'],
              marginBottom: 12,
              marginTop: 12,
              padding: 10,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 4'],
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 16,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'setting_phone_warning')}
          </Text>
        </View>
        <SimpleStyleFlatList
          data={Constants['user_info']?.user_phones}
          decelerationRate={'normal'}
          horizontal={false}
          inverted={false}
          keyExtractor={(listData, index) =>
            listData?.id ??
            listData?.uuid ??
            index?.toString() ??
            JSON.stringify(listData)
          }
          keyboardShouldPersistTaps={'never'}
          listKey={'View->List'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          pagingEnabled={false}
          renderItem={({ item, index }) => {
            const listData = item;
            return (
              <Touchable
                onPress={() => {
                  try {
                    setMain_phone(listData?.main_phone);
                    show();
                    setSelected_phone(listData?.phone_number);
                    setSelected_country_code_id(listData?.country_code_id);
                    setSelected_country_code(listData?.country_code);
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
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {listData?.main_phone
                      ? t(Variables, 'setting_primary_phone')
                      : t(Variables, 'setting_vice_phone')}
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
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color 4'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          letterSpacing: 0.2,
                          lineHeight: 14,
                        },
                        dimensions.width
                      )}
                    >
                      {'+'}
                      {listData?.country_code}
                      {listData?.phone_number}
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
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          snapToAlignment={'start'}
        />
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { bottom: 16, left: 16, position: 'absolute', right: 16 },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              setShow_code_modal(true);
              setVerify(true);
              setRequest_code_type('change_phone_number');
              setOperation_type('new');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* View 2 */}
          <>
            {Constants['user_info']?.user_phones?.length > 2 ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.Brand.appStyle_primary,
                    borderRadius: 4,
                    flexDirection: 'row',
                    height: 40,
                    justifyContent: 'center',
                  },
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
                  source={imageSource(Images['icaddphone'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 16, width: 16 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                      marginLeft: 8,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'setting_add_new_phone')}
                </Text>
              </View>
            )}
          </>
        </Touchable>
      </View>
      {/* 保存验证码 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={show_code_modal}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              bottom: 0,
              height: '100%',
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
            },
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
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
          <VCodeFormBlock
            comfirm_modal={(confirm, code, type, call_back_data) => {
              const handler = async () => {
                try {
                  /* hidden 'Run a Custom Function' action */
                  setShow_code_modal(false);
                  if (confirm && operation_type === 'modify') {
                    navigation.push('ChangeUserPhoneScreen', {
                      main_phone: true,
                      user_phone: code,
                    });
                  } else {
                  }

                  if (confirm && operation_type === 'new') {
                    navigation.push('ChangeUserPhoneScreen', {
                      main_phone: false,
                      user_phone: code,
                    });
                  } else {
                  }

                  /* hidden 'API Request' action */
                  if (confirm && operation_type === 'switch_main_phone') {
                    setTip_modal_visiable(true);
                    setVerify_data(code);
                    /* hidden 'Set Variable' action */
                    /* hidden 'API Request' action */
                  } else {
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            request_code_type={request_code_type}
            verify={verify}
          />
        </View>
      </Modal>
      <Utils.CustomCodeErrorBoundary>
        <gf.ActionSheet
          indicatorStyle={{
            marginTop: 10,
            width: 150,
          }}
          gestureEnabled
          drawUnderStatusBar
          ref={actionSheetRef}
        >
          <PhoneSelectActionSheetBlock
            selectMenu={index => {
              const handler = async () => {
                console.log('Phone-Select-ActionSheet selectMenu Start');
                let error = null;
                try {
                  console.log('Start null:0 CUSTOM_FUNCTION');
                  close();
                  console.log('Complete null:0 CUSTOM_FUNCTION');
                  console.log('Start null:1 IF');
                  if (index === 3) {
                    setDelete_modal_visiable(true);
                    (
                      await aceCampTestDeleteOtherPhoneDELETE.mutateAsync({
                        country_code_id: selected_country_code_id,
                        phone_number: selected_phone,
                      })
                    )?.json;
                  } else {
                  }
                  console.log('Complete null:1 IF');
                  console.log('Start null:2 IF');
                  if (index === 1) {
                    setShow_code_modal(true);
                    setRequest_code_type('change_phone_number');
                    setVerify(true);
                    setOperation_type('modify');
                  } else {
                  }
                  console.log('Complete null:2 IF');
                  console.log('Start null:3 IF');
                  if (index === 2) {
                    setShow_code_modal(true);
                    setRequest_code_type('change_phone_number');
                    setVerify(true);
                    setOperation_type('switch_main_phone');
                  } else {
                  }
                  console.log('Complete null:3 IF');
                } catch (err) {
                  console.error(err);
                  error = err.message ?? err;
                }
                console.log(
                  'Phone-Select-ActionSheet selectMenu Complete',
                  error ? { error } : 'no error'
                );
              };
              handler();
            }}
            mainPhone={main_phone}
          />
        </gf.ActionSheet>
      </Utils.CustomCodeErrorBoundary>
      {/* 提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'common_tips')}
          message={StringFormat(
            t(Variables, 'setting_to_primary_number_sure'),
            ['+' + selected_country_code + selected_phone]
          )}
          confirmBtn={t(Variables, 'common_yes')}
          cancelBtn={t(Variables, 'common_cancel')}
          onConfirm={switch_main_phone}
          onCancel={() => {
            setTip_modal_visiable(false);
          }}
          visible={tip_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
      {/* 删除提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'common_tips')}
          message={StringFormat(t(Variables, 'setting_to_delete_phone'), [
            '+' + selected_country_code + selected_phone,
          ])}
          negativeBtn={t(Variables, 'common_delete')}
          cancelBtn={t(Variables, 'common_cancel')}
          onNegative={delete_phone}
          onCancel={() => {
            setDelete_modal_visiable(false);
          }}
          visible={delete_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(SettingUserPhoneScreen);
