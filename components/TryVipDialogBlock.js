import React from 'react';
import {
  Button,
  Divider,
  ExpoImage,
  TextField,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CoverView from '../custom-files/CoverView';
import * as ScrollPicker from '../custom-files/ScrollPicker';
import * as gf from '../custom-files/gf';
import ScrollPickerCancelBtnPress from '../global-functions/ScrollPickerCancelBtnPress';
import ScrollPickerConfirmBtnPress from '../global-functions/ScrollPickerConfirmBtnPress';
import ShowToast from '../global-functions/ShowToast';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { resource_id: null, resource_type: null };

const TryVipDialogBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [contactType, setContactType] = React.useState(
    t(Variables, 'common_phone')
  );
  const [contactTypeId, setContactTypeId] = React.useState('phone');
  const [corporation_list_shown, setCorporation_list_shown] =
    React.useState(false);
  const [data_dic, setData_dic] = React.useState([]);
  const [draft_list_modal_shown, setDraft_list_modal_shown] =
    React.useState(false);
  const [phonenum, setPhonenum] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState(
    'event_enter_your_phone'
  );
  const [reason, setReason] = React.useState(
    t(Variables, 'live_try_vip_from_no')
  );
  const [reasonId, setReasonId] = React.useState('');
  const [scroll_picker_data, setScroll_picker_data] = React.useState([]);
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const initScrollPickerSetting = (
    Variables,
    setGlobalVariableValue,
    type,
    initId
  ) => {
    //设定滚动选择器Modal的确认回调
    ScrollPicker.setConfirmCallback((v, data) => {
      const selectIndex = v['scroll_picker_current_selected_index'];

      if (selectIndex !== -1) {
        // setInit_data((prevInitData) => ({
        // ...prevInitData,
        // type: data[selectIndex].id,
        // }));
        switch (data.type) {
          case 13:
            setContactType(data.data[selectIndex].name);
            setContactTypeId(data.data[selectIndex].id);
            switch (data.data[selectIndex].id) {
              case 'phone':
                setPlaceholder('event_enter_your_phone');
                setPhonenum(
                  '+' +
                    Variables.user_info.country_code +
                    Variables.user_info.phone_number
                );
                break;
              case 'email':
                setPlaceholder('login_enter_your_email');
                setPhonenum(Variables.user_info.email);
                break;
              default:
                setPlaceholder('event_enter_your_wechat');
                setPhonenum('');
            }
            break;
          case 14:
            setReason(data.data[selectIndex].name);
            setReasonId(data.data[selectIndex].id);
            break;
        }
      }
      ScrollPicker.callCancel(setGlobalVariableValue);
      // setGlobalVariableValue({key:"scroll_picker_current_selected_index",value:-1})
      // setGlobalVariableValue({key:"scroll_picker_modal_title",value:""})
      // setGlobalVariableValue({key:"scroll_picker_modal_data",value:{}})
      // setGlobalVariableValue({key:"scroll_picker_modal_shown",value:false})
    });
    setGlobalVariableValue({
      key: 'scroll_picker_modal_style',
      value: { coverHeight: '70%', height: '30%' },
    });
    let title = data_dic[type].title;
    let selectTo = 0;
    const data = data_dic[type];
    setScroll_picker_data(data);

    switch (type) {
      case 13:
        selectTo = data_dic[type].data.findIndex(
          item => item.id === contactTypeId
        );
        break;
      case 14:
        selectTo = data_dic[type].data.findIndex(item => item.id === reasonId);
        break;
    }

    // setGlobalVariableValue({key:"scroll_picker_modal_data",value:data.data})
    setGlobalVariableValue({
      key: 'scroll_picker_current_selected_index',
      value: selectTo,
    });
    setGlobalVariableValue({ key: 'scroll_picker_modal_title', value: title });
    setGlobalVariableValue({ key: 'scroll_picker_modal_shown', value: true });
  };

  const initTypeData = () => {
    const data = [];

    //观点类型
    data.push({
      type: 0,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_type'),
      data: [
        { id: 'stock', name: gf.t(Variables, 'tab_create_point_type_1') },
        { id: 'industry', name: gf.t(Variables, 'tab_create_point_type_2') },
      ],
    });

    //个人观点
    data.push({
      type: 1,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_personal'),
      data: [
        { id: 'bullish', name: gf.t(Variables, 'tab_create_point_personal_1') },
        { id: 'none', name: gf.t(Variables, 'tab_create_point_personal_2') },
        { id: 'bearish', name: gf.t(Variables, 'tab_create_point_personal_3') },
      ],
    });

    ////预期涨幅正面
    data.push({
      type: 2,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '30', name: '+30%' },
        { id: '50', name: '+50%' },
        { id: '100', name: '+100%' },
        { id: '200', name: '+200%' },
        { id: '300', name: '+300%' },
        { id: '500', name: '+500%' },
      ],
    });
    //预期涨幅中性
    data.push({
      type: 3,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '-15', name: '-15%' },
        {
          id: '0',
          name: gf.t(Variables, 'tab_create_point_preview_rate_balance'),
        },
        { id: '15', name: '+15%' },
      ],
    });

    //预期涨幅谨慎
    data.push({
      type: 4,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '-30', name: '-30%' },
        { id: '-50', name: '-50%' },
        { id: '-70', name: '-70%' },
        { id: '-80', name: '-80%' },
      ],
    });

    //预期时间
    data.push({
      type: 5,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_time'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '3', name: gf.t(Variables, 'tab_create_point_preview_time_1') },
        { id: '6', name: gf.t(Variables, 'tab_create_point_preview_time_2') },
        { id: '12', name: gf.t(Variables, 'tab_create_point_preview_time_3') },
        { id: '24', name: gf.t(Variables, 'tab_create_point_preview_time_4') },
        { id: '36', name: gf.t(Variables, 'tab_create_point_preview_time_5') },
      ],
    });
    //是否展示真实身份
    data.push({
      type: 6,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_point_show_name'),
      data: [
        { id: 'real', name: gf.t(Variables, 'tab_point_real_name') },
        { id: 'unreal', name: gf.t(Variables, 'tab_point_nick_name') },
      ],
    });

    //是否展示公司信息
    data.push({
      type: 7,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_point_show_company'),
      data: [
        { id: 'display', name: gf.t(Variables, 'tab_point_is_display') },
        { id: 'hide', name: gf.t(Variables, 'tab_point_is_no_display') },
      ],
    });

    //是否调整核心观点
    data.push({
      type: 8,
      title: gf.t(Variables, 'append_change_point'),
      data: [
        { id: 'true', name: gf.t(Variables, 'common_yes_shi') },
        { id: 'false', name: gf.t(Variables, 'common_no') },
      ],
    });

    //是否投稿给本营
    data.push({
      type: 9,
      title: gf.t(Variables, 'point_to_acecamp'),
      data: [
        { id: 'false', name: gf.t(Variables, 'common_no') },
        {
          id: 'true',
          name:
            gf.t(Variables, 'common_yes_shi') +
            gf.t(Variables, 'point_to_acecamp_delete'),
        },
      ],
    });

    //是否调整核心观点
    data.push({
      type: 10,
      title: gf.t(Variables, 'create_topic_add_vote'),
      data: [
        { id: 'true', name: gf.t(Variables, 'common_yes_shi') },
        { id: 'false', name: gf.t(Variables, 'common_no') },
      ],
    });

    //选择单选or多选
    data.push({
      type: 11,
      title: gf.t(Variables, 'create_topic_vote_setting'),
      data: [
        { id: 'single', name: gf.t(Variables, 'create_topic_vote_single') },
        { id: 'multiple', name: gf.t(Variables, 'create_topic_vote_multiple') },
      ],
    });

    //新建观点or追加观点
    data.push({
      type: 12,
      title: gf.t(Variables, 'tour_point_is_append'),
      data: [
        { id: 'false', name: gf.t(Variables, 'tab_circle_new_point') },
        { id: 'true', name: gf.t(Variables, 'tab_circle_append_point') },
      ],
    });

    //选择联系方式
    data.push({
      type: 13,
      title: gf.t(Variables, 'event_order_contact_type'),
      data: [
        { id: 'email', name: gf.t(Variables, 'common_email') },
        { id: 'phone', name: gf.t(Variables, 'common_phone') },
        { id: 'wechat', name: gf.t(Variables, 'event_order_contact_wechat') },
      ],
    });

    //从哪儿了解我们
    data.push({
      type: 14,
      title: gf.t(Variables, 'common_select'),
      data: [
        {
          id: 'friend_introduction',
          name: gf.t(Variables, 'live_try_vip_from_friend'),
        },
        {
          id: 'wechat_group',
          name: gf.t(Variables, 'live_try_vip_from_wechat_group'),
        },
        {
          id: 'wechat_public_account',
          name: gf.t(Variables, 'live_try_vip_from_wechat_public'),
        },
        { id: 'linkedin', name: gf.t(Variables, 'live_try_vip_from_linkedin') },
        { id: 'internet', name: gf.t(Variables, 'live_try_vip_from_internet') },
        { id: 'other', name: gf.t(Variables, 'live_try_vip_from_other') },
      ],
    });

    setData_dic(data);
    return data;
  };
  const aceCampTestAppointmentTicketsPOST =
    AceCampTestApi.useAppointmentTicketsPOST();
  React.useEffect(() => {
    try {
      initTypeData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: '100%',
        },
        dimensions.width
      )}
    >
      {/* View 4 */}
      <View style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}>
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['16_Title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['16_Title'].style,
                theme.typography.body1,
                { fontFamily: 'System', fontWeight: '700' }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'live_please_contact_to_try_vip')}
          </Text>
        </View>

        <Touchable
          onPress={() => {
            try {
              navigation.push('WebViewScreen', {
                url: Constants['base_url'] + '/vip_turn',
              });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
            resizeMode={'contain'}
            source={imageSource(
              `${
                Constants['current_lang'] === 'CN'
                  ? 'https://static.acecamptech.com/system/vip/sc_vip-plan_h5.png'
                  : 'https://static.acecamptech.com/system/vip/en_vip-plan_h5.png'
              }`
            )}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                { height: 70, marginTop: 16, width: '100%' }
              ),
              dimensions.width
            )}
          />
        </Touchable>
        {/* View 3 */}
        <>
          {!(Constants['customer_info']?.length > 0) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 14'],
                  borderRadius: 8,
                  marginTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
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
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: 'System',
                      fontSize: 20,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 22,
                    },
                    dimensions.width
                  )}
                >
                  {Constants['customer_info'] &&
                    Constants['customer_info'][0]?.name}
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingBottom: 4,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 4,
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
                    source={imageSource(Images['iccomments'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                        {
                          height: 18,
                          marginBottom: 4,
                          marginLeft: 4,
                          marginRight: 4,
                          marginTop: 4,
                          width: 18,
                        }
                      ),
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
                        { color: palettes.App['Custom #ffffff'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_try_vip_comments')}
                  </Text>
                </View>
              </View>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_phone')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {': '}
                  {Constants['customer_info'] &&
                    Constants['customer_info'][0].phone_number}
                </Text>
              </View>
              {/* View 4 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_email')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {': '}
                  {Constants['customer_info'] &&
                    Constants['customer_info'][0]?.email}
                </Text>
              </View>
            </View>
          )}
        </>
        {/* View 5 */}
        <>
          {!(Constants['customer_info']?.length > 1) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 14'],
                  borderRadius: 8,
                  marginTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
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
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: 'System',
                      fontSize: 20,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 22,
                    },
                    dimensions.width
                  )}
                >
                  {Constants['customer_info'] &&
                    Constants['customer_info'][1]?.name}
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingBottom: 4,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 4,
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
                    source={imageSource(Images['iccomments'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                        {
                          height: 18,
                          marginBottom: 4,
                          marginLeft: 4,
                          marginRight: 4,
                          marginTop: 4,
                          width: 18,
                        }
                      ),
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
                        { color: palettes.App['Custom #ffffff'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_try_vip_comments')}
                  </Text>
                </View>
              </View>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_phone')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {': '}
                  {Constants['customer_info'] &&
                    Constants['customer_info'][1]?.phone_number}
                </Text>
              </View>
              {/* View 4 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_email')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    dimensions.width
                  )}
                >
                  {': '}
                  {Constants['customer_info'] &&
                    Constants['customer_info'][1]?.email}
                </Text>
              </View>
            </View>
          )}
        </>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['14 Regular'].style,
              { color: palettes.Brand.itemTextNomal, marginTop: 8 }
            ),
            dimensions.width
          )}
        >
          {t(Variables, '@string/mine_need_upgrade_contact')}
        </Text>
        {/* View 2 */}
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                {
                  color: palettes.Brand.itemTextNomal,
                  fontFamily: 'System',
                  fontWeight: '600',
                  marginBottom: 10,
                  marginTop: 20,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'live_try_vip_your_contact')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row' },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  initScrollPickerSetting(
                    Variables,
                    setGlobalVariableValue,
                    13,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: palettes.App['Custom Color 6'],
                    borderRadius: 4,
                    borderWidth: 1,
                    flexDirection: 'row',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 12,
                    paddingRight: 12,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['14 Regular'].style,
                    dimensions.width
                  )}
                >
                  {contactType}
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
                  source={imageSource(Images['icopeninfo'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 18, width: 18 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </Touchable>
            <TextField
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newStyledTextFieldValue => {
                try {
                  setPhonenum(newStyledTextFieldValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              type={'solid'}
              underlineColor={theme.colors.text.light}
              webShowOutline={true}
              {...GlobalStyles.TextFieldStyles(theme)['Styled Text Field']
                .props}
              activeBorderColor={palettes.Brand.appStyle_primary}
              placeholder={t(Variables, placeholder)}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextFieldStyles(theme)['Styled Text Field']
                    .style,
                  {
                    borderColor: palettes.App['Custom Color 6'],
                    borderRadius: 4,
                    flex: 1,
                    fontFamily: 'System',
                    fontSize: 13,
                    fontWeight: '400',
                    height: 45,
                    letterSpacing: 0.2,
                    lineHeight: 15,
                    marginLeft: 8,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }
                ),
                dimensions.width
              )}
              value={phonenum}
            />
          </View>
        </View>
        {/* View 4 */}
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                {
                  color: palettes.Brand.itemTextNomal,
                  fontFamily: 'System',
                  fontWeight: '600',
                  marginBottom: 10,
                  marginTop: 16,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'live_try_vip_from')}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  initScrollPickerSetting(
                    Variables,
                    setGlobalVariableValue,
                    14,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: palettes.App['Custom Color 6'],
                    borderRadius: 4,
                    borderWidth: 1,
                    flexDirection: 'row',
                    height: 45,
                    justifyContent: 'space-between',
                    paddingLeft: 12,
                    paddingRight: 12,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['14 Regular'].style,
                    dimensions.width
                  )}
                >
                  {reason}
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
                  source={imageSource(Images['icopeninfo'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 18, width: 18 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </Touchable>
          </View>
        </View>
        {/* Touchable 2 */}
        <Touchable
          onPress={() => {
            const handler = async () => {
              try {
                const result = (
                  await aceCampTestAppointmentTicketsPOST.mutateAsync({
                    appointment_type: 'vip',
                    company:
                      Constants['user_info']?.organization_user?.organization
                        ?.name,
                    contact: phonenum,
                    contact_type: contactTypeId,
                    name: Constants['user_info']?.organization_user?.real_name,
                    resource_id: props.resource_id ?? defaultProps.resource_id,
                    resource_type:
                      props.resource_type ?? defaultProps.resource_type,
                    source_type: reasonId,
                  })
                )?.json;
                ShowToast(
                  t(Variables, 'event_order_submit_success'),
                  undefined,
                  undefined
                );
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
        >
          {/* View 6 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.Brand.appStyle_primary,
                borderRadius: 4,
                marginTop: 16,
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
                  { color: palettes.App['Custom #ffffff'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_ok_more')}
            </Text>
          </View>
        </Touchable>
      </View>
      {/* 背景图层 */}
      <>
        {!(
          Constants['label_picker_modal_shown'] ||
          Constants['scroll_picker_modal_shown'] ||
          corporation_list_shown ||
          draft_list_modal_shown
        ) ? null : (
          <Utils.CustomCodeErrorBoundary>
            <CoverView.AnimatedView
              isVisible={
                Constants['label_picker_modal_shown'] ||
                Constants['scroll_picker_modal_shown'] ||
                corporation_list_shown ||
                draft_list_modal_shown
              }
            />
          </Utils.CustomCodeErrorBoundary>
        )}
      </>
      {/* Scroll Picker Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        {...GlobalStyles.ModalStyles(theme)['Modal'].props}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        style={StyleSheet.applyWidth(
          GlobalStyles.ModalStyles(theme)['Modal'].style,
          dimensions.width
        )}
        transparent={true}
        visible={Constants['scroll_picker_modal_shown']}
      >
        <Touchable
          onPress={() => {
            try {
              ScrollPickerCancelBtnPress(setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '70%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, opacity: 0, width: '100%' },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom #ffffff'],
              flexDirection: 'column',
              height: '30%',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Cancel Btn */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  ScrollPickerCancelBtnPress(setGlobalVariableValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Cancel Btn'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Cancel Btn'].style,
                  { color: palettes.App.appStyle_greyscale_500 }
                ),
                dimensions.width
              )}
              title={`${t(Variables, 'common_cancel')}`}
            />
            <View>
              {/* Title */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body S Medium'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                  dimensions.width
                )}
              >
                {Constants['scroll_picker_modal_title']}
              </Text>
            </View>
            {/* Confirm Btn */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'scroll_picker_modal_shown',
                    value: false,
                  });
                  ScrollPickerConfirmBtnPress(Variables);
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Confirm Btn'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.ButtonStyles(theme)['Confirm Btn'].style,
                dimensions.width
              )}
              title={`${t(Variables, 'common_yes')}`}
            />
          </View>
          <Divider
            color={theme.colors.border.base}
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              dimensions.width
            )}
          />
          <Utils.CustomCodeErrorBoundary>
            <ScrollPicker.picker pickerData={scroll_picker_data} />
          </Utils.CustomCodeErrorBoundary>
        </View>
      </Modal>
    </View>
  );
};

export default withTheme(TryVipDialogBlock);
