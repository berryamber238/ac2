import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  LinearGradient,
  Link,
  Picker,
  ScreenContainer,
  SimpleStyleFlatList,
  TextField,
  withTheme,
} from '@draftbit/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as HttpClient from '../custom-files/HttpClient';
import * as MemberChange from '../custom-files/MemberChange';
import getDicArrayForPicker from '../global-functions/getDicArrayForPicker';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  event_id: null,
  expert_code: null,
  expert_id: null,
  live_id: 1117943,
  meeting_id: 10001376,
};

const LiveScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [current_price, setCurrent_price] = React.useState(0);
  const [customer_list, setCustomer_list] = React.useState([
    {
      name: 'Lu Yu',
      email: 'luyu@acecamptech.com',
      avatar:
        'https://wework.qpic.cn/wwpic3az/654320_Q8xGVqwjTXqivOC_1727064850/0',
      phone_number: '+8613261690696',
      customer_service_url:
        'https://work.weixin.qq.com/kfid/kfc4932588fb2a00cf5',
    },
  ]);
  const [is_guest, setIs_guest] = React.useState(false);
  const [is_mute, setIs_mute] = React.useState(true);
  const [is_show_file, setIs_show_file] = React.useState(false);
  const [is_video_show, setIs_video_show] = React.useState(false);
  const [msg_count, setMsg_count] = React.useState(22);
  const [pickerValue, setPickerValue] = React.useState('');
  const [show_waiting_index, setShow_waiting_index] = React.useState(-1);
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [styledTextFieldValue2, setStyledTextFieldValue2] = React.useState('');
  const [token, setToken] = React.useState({
    id: 1117942,
    rtc: {
      token:
        '006a9b90cd983ad4910b82aba3339cf8b23IADtP96knTYzMQOLp0KMRwx120fro/+UYfOJs5COgAfu4z1hm6osdb78IgCmj9VnHDV9ZwQAAQDJDXxnAgDJDXxnAwDJDXxnBADJDXxn',
      channel: 'ACE_665594299D2_RTC_TESTING',
    },
    rtm: {
      token:
        '006a9b90cd983ad4910b82aba3339cf8b23IACelMBCsBMDdWYZbmNjGvDEZkC8v/5z3PE+66Ju6cM2FSx1vvwAAAAAEAAB1PUUHDV9ZwEA6APJDXxn',
      channel: 'ACE_665594299D2_RTM_TESTING',
    },
    demo: true,
    help: '注意事项\n1.点击【举手】排队等待发言，或发送问题给主持人，主持人代为提问;\n2.主持人允许您发言时，系统将使用您的麦克风，请点击“允许”。',
    logo: null,
    name: 'Test LL',
    role: 'broadcaster',
    state: 'unprepare',
    app_id: 'a9b90cd983ad4910b82aba3339cf8b23',
    vendor: 'agora',
    en_help:
      'Attention\n1.Click [Raise Hand], wait for the host to unmute, or send the question to the host\n2.When the host allows you to speak, the system will access your microphone , please click "Allow".',
    meeting: {},
    sc_help:
      '注意事项\n1.点击【举手】排队等待发言，或发送问题给主持人，主持人代为提问;\n2.主持人允许您发言时，系统将使用您的麦克风，请点击“允许”。',
    user_id: 10000412,
    settings: {
      hide: false,
      mute: false,
      volume: 100,
      hands_up: null,
      manage_mute: true,
      view_message: true,
      view_attendee: true,
      view_member_count: true,
      virtual_background: null,
    },
    connector: { title: 'Connector', online_state: 'notcall' },
    user_type: 'user',
    background: null,
    banner_url: null,
    user_score: 5,
    description: '',
    announcement: {},
    live_experts: [],
    position_name: 'Chairman',
    primary_users: {
      staff: [],
      experts: [],
      converter: null,
      broadcasters: ['10000412'],
      online_player: null,
      unmute_audiences: [],
      hands_up_audiences: [],
    },
    remindered_at: null,
    user_nickname: '用户10000412',
    en_description: '',
    sc_description: '',
    user_full_name: 'Test LL',
    super_moderator: true,
    organization_name: null,
    live_preview_files: [],
    organization_score: 0,
    virtual_backgrounds: [
      'https://image.acecamptech.com/virtual_backgrounds/1.png',
      'https://image.acecamptech.com/virtual_backgrounds/2.png',
      'https://image.acecamptech.com/virtual_backgrounds/3.png',
      'https://image.acecamptech.com/virtual_backgrounds/4.png',
      'https://image.acecamptech.com/virtual_backgrounds/5.png',
      'https://image.acecamptech.com/virtual_backgrounds/6.png',
      'https://image.acecamptech.com/virtual_backgrounds/7.png',
      'https://image.acecamptech.com/virtual_backgrounds/8.png',
      'https://image.acecamptech.com/virtual_backgrounds/9.png',
      'https://image.acecamptech.com/virtual_backgrounds/10.png',
    ],
    allow_public_channel: false,
    en_organization_name: null,
    organization_type_id: 5,
    privilege_expired_ts: 1736183241,
    sc_organization_name: null,
    screen_share_user_id: null,
    can_upload_background: true,
    compliance_risk_audio:
      'https://static.acecamptech.com/system/live/compliance_risk_warning.mp3',
    compliance_risk_audio_en:
      'https://static.acecamptech.com/system/live/compliance_risk_warning_en.mp3',
  });
  const [user_type, setUser_type] = React.useState('user');
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const LiveAction = it => {
    switch (it.type) {
      case '1': //查看详细资料
        // MemberInfoDialog.newInstance(it.getLogo(), it.getName(),
        //         it.getCompanyName(), DictUtil.getNameById(DictUtil.DICT_ORGANIZATION_TYPES, it.getIdentity()), it.getPosition()).show(this);
        break;
      case '2': //静音or解除静音
        // if (it.isStatus()) {
        //     sendPeerMessage(it.getUid(), "muteVolume");
        //     mPresenter.setMemberInfo(liveId, it.getUid(), "mute");
        // } else {
        //     sendPeerMessage(it.getUid(), "unmuteVolume");
        //     mPresenter.setMemberInfo(liveId, it.getUid(), "unmute");
        // }
        break;
      case '3': //停止嘉宾共享
        // DefaultDialog.newInstance(getResources().getString(R.string.live_sure_stop_share),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.common_ok_more)).setConvertListener(position -> {
        //     sendPeerMessage(it.getUid(), "stopUserShareScreen");
        // }).show(this);
        break;
      case '4': //停止嘉宾视频
        // DefaultDialog.newInstance(getResources().getString(R.string.live_sure_stop_expert_video),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.common_ok_more)).setConvertListener(position -> {
        //     sendPeerMessage(it.getUid(), "stopUserVideo");
        // }).show(this);
        break;
      case '5': //转为嘉宾or撤销嘉宾
        // if (it.isStatus()) {
        //     sendPeerMessage(it.getUid(), "toExpert");
        //     mPresenter.setMemberInfo(liveId, it.getUid(), "to_expert");
        // } else {
        //     DefaultDialog.newInstance(getResources().getString(R.string.live_sure_expert_to_audience),
        //             getResources().getString(R.string.common_cancel),
        //             getResources().getString(R.string.common_ok_more)).setConvertListener(position -> {
        //         sendPeerMessage(it.getUid(), "toAudience");
        //         mPresenter.setMemberInfo(liveId, it.getUid(), "to_audience");

        //     }).show(this);
        // }
        break;
      case '6': //转为主持人
        // DefaultDialog.newInstance(getString(R.string.live_are_you_sure_trans_host) + it.getName() + getString(R.string.live_are_you_sure_trans_host_right),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.common_ok_more)).setConvertListener(position -> {
        //     sendPeerMessage(it.getUid(), "toBroadcaster");
        //     mPresenter.setMemberInfo(liveId, it.getUid(), "transfer_broadcaster");
        //     liveInfo.setRole("audience");
        //     liveInfo.getSettings().setMute(true);
        //     liveInfo.getSettings().setView_attendee(false);
        //     liveInfo.getSettings().setView_member_count(false);
        //     liveInfo.getSettings().setView_message(false);
        //     liveInfo.getSettings().setHands_up("null");
        //     runOnUiThread(() -> {
        //         LiveEventBus.get("REFRESH_LiveMemberDialog").post(liveInfo);
        //         initLive();
        //         if (opLocalVideo) {
        //             setupLocalVideo();
        //         }
        //         initMute();
        //         setMemberInfo();
        //     });
        // }).show(this);
        break;
      case '7': //允许or停止查看观众名单
        // sendPeerMessage(it.getUid(), it.isStatus() ? "allowViewAllList" : "stopViewAllList");
        // mPresenter.setMemberInfo(liveId, it.getUid(), it.isStatus() ? "view_attendee" : "unview_attendee");
        break;
      case '8': //允许or停止查看观众提问
        // sendPeerMessage(it.getUid(), it.isStatus() ? "allowViewMessage" : "stopViewMessage");
        // mPresenter.setMemberInfo(liveId, it.getUid(), it.isStatus() ? "view_message" : "unview_message");
        break;
      case '9': //允许or停止查看观众数量
        // sendPeerMessage(it.getUid(), it.isStatus() ? "allowViewCount" : "stopViewCount");
        // mPresenter.setMemberInfo(liveId, it.getUid(), it.isStatus() ? "view_member_count" : "unview_member_count");
        break;
      case '10': //收回主持人
        // DefaultDialog.newInstance(getResources().getString(R.string.live_sure_back_broadcaster),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.common_ok_more)).setConvertListener(position -> {
        //     List<String> hostListStr = SPUtils.getInstance(SP_LIVE_NAME_SPACE + liveId).getList("HOST_LIST", String.class);
        //     if(hostListStr!=null&&hostListStr.size()>0){
        //         sendPeerMessage(hostListStr.get(0), "recallBroadcaster");
        //     }
        //     mPresenter.setMemberInfo(liveId, it.getUid(), "recycle_broadcaster");
        //     liveInfo.setRole("broadcaster");
        //     liveInfo.getSettings().setMute(false);
        //     liveInfo.getSettings().setView_attendee(true);
        //     liveInfo.getSettings().setView_member_count(true);
        //     liveInfo.getSettings().setView_message(true);
        //     liveInfo.getSettings().setHands_up("null");
        //     runOnUiThread(() -> {
        //         LiveEventBus.get("REFRESH_LiveMemberDialog").post(liveInfo);
        //         initLive();
        //         initMute();
        //         setMemberInfo();
        //         mPresenter.monitor(liveId);//查询监控链接
        //     });
        // }).show(this);
        break;
      case '11': //发起提问
        // MemberChatDialog.newInstance(it.getChatMessageBean(), liveInfo).show(this);
        break;
      case '12': //发送消息
        // sendChannelMessage(it.getUid(), it.getName(),it.isStatus());
        break;
      case '13': //一键移除
        // DefaultDialog.newInstance(getResources().getString(R.string.live_sure_remove_no_pay),
        //         getResources().getString(R.string.live_remove_no_join),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.live_sure_remove), true)
        //         .setConvertListener(p -> {
        //             mPresenter.removeAll(liveId);
        //         }).show(this);
        break;
      case '14': //发送付费提醒
        // DefaultDialog.newInstance(
        //         getResources().getString(R.string.live_sure_show_remind),
        //         getResources().getString(R.string.common_cancel),
        //         getResources().getString(R.string.common_yes), true)
        //         .setConvertListener(p -> {
        //             mPresenter.payForReminder(liveId);
        //         }).show(this);
        break;
      case '15': //手放下
        // sendPeerMessage(it.getUid(), "handsDown");
        // mPresenter.setMemberInfo(liveId, it.getUid(), "hands_down");
        break;
      case '16': //停止or允许自由发言
        // sendPeerMessage(it.getUid(), it.isStatus() ? "allowManageMute" : "stopManageMute");
        // mPresenter.setMemberInfo(liveId, it.getUid(), it.isStatus() ? "manage_mute" : "unmanage_mute");
        break;
    }
  };
  const safeAreaInsets = useSafeAreaInsets();
  React.useEffect(() => {
    const cookie =
      'aceid=1728914880.f2086a4ea71e; user_token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDAwMDQxMiwicmVmcmVzaF9hdCI6MTczNjE0MzQ1My44MjQwMTIsImV4cGlyZXNfaW4iOjMxNTU2OTUyfQ.dsoFzt6QBoRmKRoq12qihnaZQj8oBtP4h32UUvHJiDw; meeting_token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAwMDA0MTIsInVzZXJfdHlwZSI6InVzZXIiLCJsaXZlX2lkIjoxMTE3OTQyfQ.LDVCcc_KOLpuCWNJp5n4QQOD6Xm42NZWRdzPD8CDGak; _ace_camp_tech_testing_session=t6BO7r0drhSylac%2F8%2BEI5LclxrAqJBF5olZYeO1MrcfvD67hNIQHy34Om9fukiN2sZYZm%2BcvxX1FpgHme4UFtVXNlNse5nW3DXxz5oHA7B0QZqeutfmIE4QNVRW%2FTe3CTTRa30vqxIufw6pLNw9WgqE%2FnCU76GmX143Fl0CUB%2Buqyd6%2Fk4gyqSei3IawgG3i8APmkkaKNJ2eMeRT9pFwHJyeGAFtpsk4lZZOipPFU%2Bo3i6voRTAL0hHPVDrYPmkAATSxqFBxW9x8ig%3D%3D--yjRE2n22o5IYxp1m--i3fbfy4coDnScMheqhlPcA%3D%3D';
    setGlobalVariableValue({
      key: 'cookie',
      value: cookie,
    });

    if (!(props.route?.params?.expert_id ?? defaultProps.expert_id)) {
      setUser_type('user');
    } else {
      setUser_type('expert');
    }

    const initUi = async code => {
      switch (code) {
        case 10005: //直播未开始
          initLiveUI(7);
          break;
        case 10006: //未报名
          initLiveUI(6);
          break;
        case 10007: //未登陆
          initLiveUI(5);
          break;
        case 10008: //直播结束
          initLiveUI(3);
          break;
        case 10009: //密码错误
          ToastUtil.showToastError(getString(R.string.live_wrong_psd));
          break;
        case 10018: //被踢掉
          mPresenter.getMeetingPrice(meetingId);
          break;
        case 10029: //完善信息
          mPresenter.getEventInfo(eventId);
          break;
        case 10031: //活动取消
          initLiveUI(12);
          break;
      }
    };

    const getToken = async () => {
      try {
        await AsyncStorage.setItem('cookies', Variables.cookie);
        const url = HttpClient.apiEndpoints['liveToken'];
        const data = {
          user_type: user_type,
          demo: true,
          get_canceled: true,
          re_registration: false,
        };
        const response = await HttpClient.fetcher(
          url.url.replace('{{live_id}}', props.route?.params?.live_id),
          url.method,
          data
        );

        setGlobalVariableValue({
          key: 'cookie',
          value: await AsyncStorage.getItem('cookies'),
        });
        const result = response.json();
        if (result.code !== 200) {
          initUi(result.code);
        }
        setToken(result.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, []);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* hidden 'Set Variable' action */

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
    >
      <ImageBackground
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        backfaceVisibility={'visible'}
        resizeMode={'repeat'}
        source={imageSource(Images['bgliveacecamp'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            {
              bottom: 0,
              flex: null,
              height: '100%',
              position: 'absolute',
              width: dimensions.width,
            }
          ),
          dimensions.width
        )}
      />
      {/* 标题 */}
      <View
        onLayout={event => {
          const handler = async () => {
            try {
              if (
                (props.route?.params?.meeting_id ?? defaultProps.meeting_id) ===
                'tutorial'
              ) {
                return;
              }
              let result = (
                await AceCampTestApi.meetingPriceGET(Constants, {
                  meeting_id:
                    props.route?.params?.meeting_id ?? defaultProps.meeting_id,
                })
              )?.json;
              result = {
                ret: true,
                code: 200,
                data: {
                  has_paid: false,
                  paid_info: null,
                  goods_info: {
                    id: 10001376,
                    free: false,
                    event: {
                      id: 10001030,
                      name: '11111212',
                      type: 'PublicEvent',
                      state: 'finished',
                      en_name: '11111212',
                      is_test: false,
                      sc_name: '11111212',
                      event_type_id: 3,
                      event_type_group_id: 1,
                    },
                    expert: {
                      id: 113,
                      name: '丁希华',
                      tags: [],
                      state: 'interview_accepted',
                      gender: 'male',
                      signed: false,
                      source: {
                        id: 101,
                        name: '吕梦洋',
                        avatar:
                          'https://wework.qpic.cn/wwpic3az/907248_piJSdFHOSY2BVwj_1735722853/0',
                        is_expert: false,
                        is_analyst: false,
                      },
                      company: '北京融易通信息技术有限公司',
                      position: '前端开发工程师',
                      has_email: true,
                      created_at: 1733972954,
                      deleted_at: null,
                      industries: ['互联网'],
                      expert_role: 'unknown',
                      attachment_tags: [],
                    },
                    end_time: 1735552800,
                    assistant: null,
                    expert_id: 113,
                    start_time: 1735549200,
                    expert_role: 'employee',
                    meeting_way: 'default_online',
                    assistant_id: null,
                    meeting_type: 'public',
                    time_zone_id: 1,
                    current_price: 300,
                    expert_demand: {
                      id: 333,
                      name: '医保局专家（中等-指派伊）',
                      staff: {
                        id: 46,
                        name: '伊珊慧',
                        avatar:
                          'https://wework.qpic.cn/wwpic3az/785648_2SodsfYqRCqWRtm_1731288022/0',
                        is_expert: false,
                        is_analyst: false,
                      },
                      state: 'finished',
                      staffs: [],
                      priority: 30,
                      created_at: 1735200330,
                      deleted_at: null,
                      organization: {
                        id: 10000241,
                        logo: 'https://image.ca3test.com/avatar/10000408/0.17917076636607354.jpg?x-oss-process=style/avatar_w256',
                        name: '崔-分析师',
                        state: 'passed',
                        en_name: '崔-分析师',
                        sc_name: '崔-分析师',
                        description: null,
                        en_description: null,
                        sc_description: null,
                        organization_type_id: 3,
                      },
                      organization_user: {
                        id: 20001156,
                        tel: '15075351924',
                        email: '1573250559@qq.com',
                        state: 'passed',
                        user_id: 10000408,
                        real_name: '崔-分析师',
                        position_id: null,
                        country_code: '86',
                        dismissed_at: null,
                        introduction: '自我介绍',
                        state_events: [],
                        position_name: null,
                        country_code_id: 100,
                      },
                    },
                    expert_source: 'AceCamp',
                    original_price: 300,
                    expert_demand_id: 333,
                  },
                  goods_type: 'Meeting',
                },
                meta: { ts: 1736228700 },
              };
              console.log(result);
              if (result?.code !== 200) {
                return;
              }
              setCurrent_price(result?.data?.goods_info?.current_price);
              setIs_guest(
                !result?.data?.has_paid && !result?.data?.goods_info?.free
              );
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
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
          color={palettes.App['Custom #ffffff']}
          icon={'AntDesign/left'}
          size={22}
        />
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 10,
              paddingLeft: 4,
              paddingRight: 4,
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
                color: palettes.App['Custom #ffffff'],
                flexShrink: 1,
                fontFamily: 'System',
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 28,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {t(Variables, 'live_meeting_info')}
          </Text>
          <Icon
            color={palettes.App['Custom #ffffff']}
            name={'EvilIcons/exclamation'}
            size={20}
          />
        </View>

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
          <Icon
            color={palettes.App['Custom Color 53']}
            name={'Foundation/info'}
            size={20}
            style={StyleSheet.applyWidth({ marginRight: 4 }, dimensions.width)}
          />
          {/* 注意事项 */}
          <Link
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 53'],
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 24,
              },
              dimensions.width
            )}
            title={`${t(Variables, 'live_question_style')}`}
          />
        </View>
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, width: dimensions.width },
          dimensions.width
        )}
      >
        {/* 公告信息 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'rgb(87, 134, 255)',
              flexDirection: 'row',
              height: 36,
              justifyContent: 'space-between',
              marginLeft: 8,
              marginRight: 8,
              paddingLeft: 8,
              paddingRight: 8,
              position: 'absolute',
              top: 0,
              width: [
                { minWidth: Breakpoints.Mobile, value: 100 },
                { minWidth: Breakpoints.Mobile, value: dimensions.width - 16 },
              ],
              zIndex: 200,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom #ffffff'],
                borderRadius: 16,
                marginRight: 4,
                padding: 4,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom Color 56']}
              name={'FontAwesome/volume-up'}
              size={12}
            />
          </View>
          {/* View 2 */}
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
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
                  lineHeight: 19,
                },
                dimensions.width
              )}
            >
              {'Lorem ipsum dolor sit amet'}
            </Text>
          </View>
          {/* View 3 */}
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
            <Icon
              color={palettes.App['Custom Color_11']}
              name={'FontAwesome/trash-o'}
              size={16}
            />
            {/* Icon 2 */}
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'AntDesign/close'}
              size={16}
              style={StyleSheet.applyWidth({ marginLeft: 8 }, dimensions.width)}
            />
          </View>
        </View>
        {/* 支付提示 */}
        <>
          {token?.role === 'broadcaster' ||
          !token?.meeting ||
          !token?.meeting?.id ||
          token?.meeting?.free ||
          token?.meeting?.has_paid ||
          (props.route?.params?.expert_id ?? defaultProps.expert_id) ||
          token?.state === 'stopped' ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 54'],
                  marginLeft: 8,
                  marginRight: 8,
                  paddingBottom: 4,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 4,
                  position: 'absolute',
                  top: 0,
                  width: dimensions.width - 16,
                  zIndex: 200,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 55'],
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 19.6,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_for_free_five_min')}
                {/* 升级VIP */}
                <>
                  {!Constants['is_vip'] ? null : (
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.LinkStyles(theme)['Link'].style,
                        dimensions.width
                      )}
                      title={`${t(Variables, 'mine_upgrade_vip')}`}
                    />
                  )}
                </>
                {/* 试用VIP */}
                <>
                  {Constants['is_vip'] ? null : (
                    <Link
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.LinkStyles(theme)['Link'].style,
                        dimensions.width
                      )}
                      title={`${t(Variables, 'live_try_vip')}`}
                    />
                  )}
                </>
                <Text accessible={true} selectable={false}>
                  {t(Variables, 'live_or')}
                </Text>
                {/* 支付A币 */}
                <Link
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.LinkStyles(theme)['Link'].style,
                    dimensions.width
                  )}
                  title={`${t(Variables, 'live_user_pay')}${current_price} ${t(
                    Variables,
                    'live_user_a_currency'
                  )}`}
                />
              </Text>
            </View>
          )}
        </>
        {/* 等待视图 0 */}
        <>
          {!(show_waiting_index === 0) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: palettes.Brand.Primary,
                      borderRadius: 0,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '600',
                      height: 48,
                      paddingLeft: 70,
                      paddingRight: 70,
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'live_prepare_meeting')}`}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 26,
                      marginTop: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'live_prepare_info')}
              </Text>
            </View>
          )}
        </>
        {/* 等待视图 1 */}
        <>
          {!(show_waiting_index === 1) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 5'],
                    bottom: 0,
                    height: 60,
                    opacity: 0.31,
                    position: 'absolute',
                    width: '100%',
                  },
                  dimensions.width
                )}
              />
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'center',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={palettes.App['Custom #ffffff']}
                  name={'AntDesign/hourglass'}
                  size={24}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
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
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: 0.2,
                      lineHeight: 22,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_waiting_start')}
                </Text>
              </View>
            </View>
          )}
        </>
        {/* 等待视图 2 */}
        <>
          {!(show_waiting_index === 2) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: palettes.Brand.Primary,
                      borderRadius: 0,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '600',
                      height: 48,
                      paddingLeft: 70,
                      paddingRight: 70,
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'live_start_meeting')}`}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 26,
                      marginTop: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'live_start_info')}
              </Text>
            </View>
          )}
        </>
        {/* 等待视图 3 */}
        <>
          {!(show_waiting_index === 3) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-start',
                  paddingTop: 30,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['icliveend'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 26,
                      marginTop: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'live_meeting_end')}
              </Text>
            </View>
          )}
        </>
        {/* 等待视图 4 */}
        <>
          {!(show_waiting_index === 4) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['iclivepassword'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
                  ),
                  dimensions.width
                )}
              />
              <TextField
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newStyledTextFieldValue => {
                  const textFieldValue = newStyledTextFieldValue;
                  try {
                    setStyledTextFieldValue(newStyledTextFieldValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                type={'solid'}
                underlineColor={theme.colors.text.light}
                webShowOutline={true}
                activeBorderColor={palettes.Brand.Primary}
                placeholder={t(Variables, 'mine_please_enter_meeting_password')}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'center',
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderRadius: 5,
                    fontFamily: 'System',
                    fontSize: 13,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                    marginBottom: 20,
                    paddingBottom: 10,
                    paddingTop: 10,
                    textAlign: 'center',
                    width: '75%',
                  },
                  dimensions.width
                )}
                value={styledTextFieldValue}
              />
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: palettes.Brand.Primary,
                      borderRadius: 5,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '600',
                      height: 48,
                      letterSpacing: 5,
                      paddingLeft: 70,
                      paddingRight: 70,
                      width: '75%',
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'common_yes')}`}
              />
            </View>
          )}
        </>
        {/* 等待视图 5 */}
        <>
          {!(show_waiting_index === 5) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['iclivelogin'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
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
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.2,
                    lineHeight: 22,
                    marginBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_not_login')}
              </Text>
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: palettes.Brand.Primary,
                      borderRadius: 5,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '400',
                      height: 48,
                      letterSpacing: 5,
                      paddingLeft: 70,
                      paddingRight: 70,
                      width: '75%',
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'login_in')}`}
              />
            </View>
          )}
        </>
        {/* 等待视图 6 */}
        <>
          {!(show_waiting_index === 6) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['iclivesign'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
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
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                    lineHeight: 22,
                    marginBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_need_sign_up')}
              </Text>
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: palettes.Brand.Primary,
                      borderRadius: 5,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '400',
                      height: 48,
                      letterSpacing: 0.3,
                      paddingLeft: 70,
                      paddingRight: 70,
                      width: '75%',
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'dialog_sign_up_now')}`}
              />
            </View>
          )}
        </>
        {/* 等待视图 7 */}
        <>
          {!(show_waiting_index === 7) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['iclivewaitinghalf'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
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
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                    lineHeight: 22,
                    marginBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_no_start')}
              </Text>
            </View>
          )}
        </>
        {/* 等待视图 8 */}
        <>
          {!(show_waiting_index === 8) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-start',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['icliveopenvip'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, marginTop: 2, width: 150 }
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
                    fontSize: 18,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                    lineHeight: 22,
                    marginBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_try_is_over')}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { borderRadius: 4, height: 40 },
                    dimensions.width
                  )}
                >
                  <LinearGradient
                    endX={100}
                    endY={100}
                    startX={0}
                    startY={0}
                    {...GlobalStyles.LinearGradientStyles(theme)[
                      'Linear Gradient'
                    ].props}
                    color1={palettes.App['Custom Color 57']}
                    color2={palettes.App['Custom Color 58']}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.LinearGradientStyles(theme)[
                          'Linear Gradient'
                        ].style,
                        {
                          justifyContent: 'center',
                          paddingLeft: 24,
                          paddingRight: 24,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          {
                            color: palettes.App['Custom Color 55'],
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '400',
                            marginRight: null,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {Constants['user_info']?.has_vip
                        ? t(Variables, 'mine_upgrade_vip')
                        : t(Variables, 'live_try_vip')}
                    </Text>
                  </LinearGradient>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.Primary,
                      justifyContent: 'center',
                      marginLeft: 16,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Title'].style,
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '400',
                          lineHeight: 24,
                          marginRight: null,
                          paddingLeft: 24,
                          paddingRight: 24,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_user_pay')}
                    {current_price}
                    {t(Variables, 'live_user_a_currency')}
                  </Text>
                </View>
              </View>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'System',
                    fontSize: 20,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                    lineHeight: 24,
                    marginTop: 24,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'event_live_open_vip')}
              </Text>

              <AceCampTestApi.FetchCustomerServiceGET
                Wechat_Appid={Constants['wechat_app_id']}
                Wechat_Code={Constants['wechat_app_code']}
                handlers={{
                  onData: fetchData => {
                    try {
                      if (fetchData?.data?.length === 0) {
                      } else {
                        setCustomer_list(fetchData?.data);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  },
                }}
              >
                {({ loading, error, data, refetchCustomerService }) => {
                  const fetchData = data?.json;
                  if (loading) {
                    return <ActivityIndicator />;
                  }

                  if (error || data?.status < 200 || data?.status >= 300) {
                    return <ActivityIndicator />;
                  }

                  return (
                    <SimpleStyleFlatList
                      data={customer_list}
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
                      listKey={'View 2->等待视图 8->Fetch->List'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                  borderRadius: 4,
                                  margin: 16,
                                  paddingBottom: 16,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  width: dimensions.width - 32,
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
                                      fontSize: 22,
                                      fontWeight: '600',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {listData?.name}
                                </Text>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: palettes.Brand.Primary,
                                      borderRadius: 4,
                                      flexDirection: 'row',
                                      paddingBottom: 4,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      paddingTop: 4,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Icon
                                    size={24}
                                    color={palettes.App['Custom #ffffff']}
                                    name={
                                      'MaterialCommunityIcons/comment-account'
                                    }
                                    style={StyleSheet.applyWidth(
                                      { marginRight: 8 },
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
                                        fontSize: 16,
                                        fontWeight: '600',
                                        letterSpacing: 0.3,
                                        lineHeight: 20,
                                      },
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
                                  { flexDirection: 'row', marginTop: 16 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {t(Variables, 'live_phone')}
                                </Text>
                                {/* Text 2 */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {listData?.phone_number}
                                </Text>
                              </View>
                              {/* View 3 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row', marginTop: 4 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
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
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {listData?.email}
                                </Text>
                              </View>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      snapToAlignment={'start'}
                    />
                  );
                }}
              </AceCampTestApi.FetchCustomerServiceGET>
            </View>
          )}
        </>
        {/* 等待视图 10 */}
        <>
          {!(show_waiting_index === 10) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['iclivecannotjoin'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 150, width: 150 }
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
                    fontSize: 16,
                    fontWeight: '400',
                    letterSpacing: 0.3,
                    lineHeight: 22,
                    marginBottom: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'live_can_not_join_meeting')}
              </Text>
            </View>
          )}
        </>
        {/* 会议视图 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Utils.CustomCodeErrorBoundary>{}</Utils.CustomCodeErrorBoundary>
        </View>
        {/* 显示文件 */}
        <>
          {is_show_file ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  bottom: 0,
                  justifyContent: 'flex-end',
                  paddingBottom: 46,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.Brand.appStyle_primary,
                    borderRadius: 16,
                    flexDirection: 'row',
                    height: 36,
                    justifyContent: 'center',
                    paddingBottom: 4,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 4,
                    width: 160,
                  },
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['iclivefile'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 18, width: 18 }
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
                      fontSize: 16,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                      paddingLeft: 4,
                      paddingRight: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_file_show')}
                </Text>
                {/* Icon 2 */}
                <Icon
                  color={palettes.App['Custom #ffffff']}
                  name={'AntDesign/right'}
                  size={18}
                />
              </View>
            </View>
          )}
        </>
        {/* 等待视图 11 */}
        <>
          {!(show_waiting_index === 11) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-start',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 8,
                    marginTop: 40,
                    padding: 16,
                    width: [
                      { minWidth: Breakpoints.Mobile, value: 200 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: dimensions.width - 48,
                      },
                    ],
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
                      fontSize: 20,
                      fontWeight: '600',
                      letterSpacing: 0.3,
                      lineHeight: 24,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_complete_info')}
                </Text>
                {/* 登录提示 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 12,
                    },
                    dimensions.width
                  )}
                >
                  <Link
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color 28'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                    title={`${t(Variables, 'login_in')}`}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_direct_participation')}
                  </Text>
                </View>
                {/* 参会密码录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 16,
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_info_password')}
                  </Text>
                  <TextField
                    activeBorderColor={theme.colors.branding.primary}
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newStyledTextFieldValue => {
                      const textFieldValue = newStyledTextFieldValue;
                      try {
                        setStyledTextFieldValue2(newStyledTextFieldValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    type={'solid'}
                    underlineColor={theme.colors.text.light}
                    webShowOutline={true}
                    placeholder={t(Variables, 'live_please_enter_password')}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom #ffffff'],
                        borderRadius: 4,
                        borderWidth: 0,
                        paddingBottom: 4,
                        paddingTop: 4,
                        width: '70%',
                      },
                      dimensions.width
                    )}
                    value={styledTextFieldValue2}
                  />
                </View>
                {/* 姓名录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_name')}
                  </Text>
                  <TextField
                    activeBorderColor={theme.colors.branding.primary}
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newStyledTextFieldValue => {
                      const textFieldValue = newStyledTextFieldValue;
                      try {
                        setStyledTextFieldValue2(newStyledTextFieldValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    type={'solid'}
                    underlineColor={theme.colors.text.light}
                    webShowOutline={true}
                    placeholder={t(Variables, 'register_enter_your_name')}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom #ffffff'],
                        borderRadius: 4,
                        borderWidth: 0,
                        paddingBottom: 4,
                        paddingTop: 4,
                        width: '70%',
                      },
                      dimensions.width
                    )}
                    value={styledTextFieldValue2}
                  />
                </View>
                {/* 职业录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
                      zIndex: 300,
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_info_occupation')}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      { width: '70%' },
                      dimensions.width
                    )}
                  >
                    <Utils.CustomCodeErrorBoundary>
                      <Picker
                        autoDismissKeyboard={true}
                        dropDownBorderColor={theme.colors.border.base}
                        dropDownTextColor={theme.colors.text.strong}
                        leftIconMode={'inset'}
                        onValueChange={newPickerValue => {
                          const pickerValue = newPickerValue;
                          try {
                            setPickerValue(newPickerValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        selectedIconColor={theme.colors.text.strong}
                        selectedIconName={'Feather/check'}
                        selectedIconSize={20}
                        type={'solid'}
                        dropDownBackgroundColor={palettes.App['Custom #ffffff']}
                        dropDownBorderRadius={0}
                        dropDownBorderWidth={0}
                        dropdownOverlayColor={palettes.App['Custom #ffffff']}
                        iconSize={16}
                        mode={'native'}
                        options={getDicArrayForPicker(
                          Constants['ace_dic']?.data.guest_positions
                        )}
                        placeholder={t(
                          Variables,
                          'live_please_select_occupation'
                        )}
                        rightIconName={'AntDesign/down'}
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom #ffffff'],
                            borderRadius: 4,
                            paddingBottom: 4,
                            paddingTop: 4,
                            width: '100%',
                            zIndex: 300,
                          },
                          dimensions.width
                        )}
                        value={pickerValue}
                      />
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                </View>
                {/* 工作邮箱录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'register_work_email')}
                  </Text>
                  <TextField
                    activeBorderColor={theme.colors.branding.primary}
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newStyledTextFieldValue => {
                      const textFieldValue = newStyledTextFieldValue;
                      try {
                        setStyledTextFieldValue2(newStyledTextFieldValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    type={'solid'}
                    underlineColor={theme.colors.text.light}
                    webShowOutline={true}
                    placeholder={t(Variables, 'register_enter_your_work_email')}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom #ffffff'],
                        borderRadius: 4,
                        borderWidth: 0,
                        paddingBottom: 4,
                        paddingTop: 4,
                        width: '70%',
                      },
                      dimensions.width
                    )}
                    value={styledTextFieldValue2}
                  />
                </View>
                {/* 公司名称录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'register_company_name')}
                  </Text>
                  <TextField
                    activeBorderColor={theme.colors.branding.primary}
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newStyledTextFieldValue => {
                      const textFieldValue = newStyledTextFieldValue;
                      try {
                        setStyledTextFieldValue2(newStyledTextFieldValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    type={'solid'}
                    underlineColor={theme.colors.text.light}
                    webShowOutline={true}
                    placeholder={t(
                      Variables,
                      'register_enter_your_company_name'
                    )}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom #ffffff'],
                        borderRadius: 4,
                        borderWidth: 0,
                        paddingBottom: 4,
                        paddingTop: 4,
                        width: '70%',
                      },
                      dimensions.width
                    )}
                    value={styledTextFieldValue2}
                  />
                </View>
                {/* 手机号录入 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: '100%',
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
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_phone')}
                  </Text>
                  <TextField
                    activeBorderColor={theme.colors.branding.primary}
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newStyledTextFieldValue => {
                      const textFieldValue = newStyledTextFieldValue;
                      try {
                        setStyledTextFieldValue2(newStyledTextFieldValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    type={'solid'}
                    underlineColor={theme.colors.text.light}
                    webShowOutline={true}
                    placeholder={t(Variables, 'login_enter_your_phone')}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom #ffffff'],
                        borderRadius: 4,
                        borderWidth: 0,
                        paddingBottom: 4,
                        paddingTop: 4,
                        width: '70%',
                      },
                      dimensions.width
                    )}
                    value={styledTextFieldValue2}
                  />
                </View>
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button (default)']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Primary,
                        borderRadius: 4,
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '400',
                        letterSpacing: 0.3,
                        marginTop: 12,
                        width: '100%',
                      }
                    ),
                    dimensions.width
                  )}
                  title={`${t(Variables, 'live_info_submit')}`}
                />
              </View>
            </View>
          )}
        </>
      </View>
      {/* 底部菜单 */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row', justifyContent: 'center' },
          dimensions.width
        )}
      >
        {/* 音频 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={
                is_mute
                  ? 'MaterialCommunityIcons/microphone-off'
                  : 'MaterialCommunityIcons/microphone-outline'
              }
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {is_mute ? t(Variables, 'live_unmute') : t(Variables, 'live_mute')}
          </Text>
        </View>
        {/* 视频 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={is_video_show ? 'Feather/video' : 'Feather/video-off'}
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {is_video_show
              ? t(Variables, 'live_stop_video')
              : t(Variables, 'live_open_video')}
          </Text>
        </View>
        {/* 预约1v1 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'Ionicons/people-outline'}
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'event_order_expert_one')}
          </Text>
        </View>
        {/* 成员 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'Feather/users'}
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'live_member')}
          </Text>
        </View>
        {/* 消息 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'MaterialCommunityIcons/message-text'}
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'live_chat')}
          </Text>
          {/* View 2 */}
          <>
            {!(msg_count > 0) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 59'],
                    borderRadius: 8,
                    paddingBottom: 2,
                    paddingLeft: 6,
                    paddingRight: 6,
                    paddingTop: 2,
                    position: 'absolute',
                    right: 8,
                    top: 0,
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
                      fontSize: 10,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 12,
                    },
                    dimensions.width
                  )}
                >
                  {msg_count}
                </Text>
              </View>
            )}
          </>
        </View>
        {/* 更多 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 8,
              width: 72,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(73, 73, 73, 0.4)',
                borderRadius: 20,
                height: 38,
                justifyContent: 'center',
                padding: 8,
                width: 38,
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'MaterialIcons/dehaze'}
              size={20}
            />
          </View>

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
                lineHeight: 19,
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'common_more')}
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(LiveScreen);
