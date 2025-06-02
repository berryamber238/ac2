import React from 'react';
import {
  Button,
  Divider,
  ExpoImage,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  Image,
  Modal,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import EventContactActionSheetBlock from '../components/EventContactActionSheetBlock';
import PayForLiveDialogBlock from '../components/PayForLiveDialogBlock';
import TryVipDialogBlock from '../components/TryVipDialogBlock';
import UpgradeVipDialogBlock from '../components/UpgradeVipDialogBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as CoverView from '../custom-files/CoverView';
import * as HighlightTextWithAction from '../custom-files/HighlightTextWithAction';
import * as Toast from '../custom-files/Toast';
import * as gf from '../custom-files/gf';
import JumpToPageByType from '../global-functions/JumpToPageByType';
import LabelPickerCancelBtnPress from '../global-functions/LabelPickerCancelBtnPress';
import LabelPickerConfirmBtnPress from '../global-functions/LabelPickerConfirmBtnPress';
import ShowToast from '../global-functions/ShowToast';
import StringFormat from '../global-functions/StringFormat';
import arrayIdToString from '../global-functions/arrayIdToString';
import eventUserStatus from '../global-functions/eventUserStatus';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getArticleType from '../global-functions/getArticleType';
import getMonthStr from '../global-functions/getMonthStr';
import getNameById from '../global-functions/getNameById';
import splitList from '../global-functions/splitList';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { event_id: 10001081 };

const EventDetailScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const safeAreaInsets = useSafeAreaInsets();
  const [bottomSheetTitle, setBottomSheetTitle] = React.useState('');
  const [btnColor, setBtnColor] = React.useState('');
  const [btnText, setBtnText] = React.useState('');
  const [confirm_modal_visiable, setConfirm_modal_visiable] =
    React.useState(false);
  const [content, setContent] = React.useState('');
  const [dialog_type, setDialog_type] = React.useState(1);
  const [event_id, setEvent_id] = React.useState('');
  const [has_vip, setHas_vip] = React.useState(false);
  const [id, setId] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [lines, setLines] = React.useState(0);
  const [meeting, setMeeting] = React.useState({
    id: 10001470,
    free: true,
    state: 'finished',
    living: false,
    capacity: 10,
    con_call: 'unlimited',
    end_time: 1740731400,
    event_id: 10001081,
    has_paid: false,
    playback: false,
    paid_info: null,
    region_id: null,
    co_host_id: 20001164,
    region_ids: [],
    start_time: 1740728700,
    time_state: 'finished',
    interactive: true,
    meeting_way: 'default_online',
    online_type: null,
    co_host_info: { id: 20001164, name: '个人崔bil' },
    language_ids: [1],
    meeting_type: 'public',
    time_zone_id: 1,
    current_price: 0,
    hide_con_call: false,
    meeting_notes: [],
    broadcaster_id: 20001156,
    has_registered: false,
    original_price: 0,
    broadcaster_info: { id: 20001156, name: '崔-分析师' },
    registration_info: null,
    region_with_parents: {},
  });
  const [meeting_id, setMeeting_id] = React.useState(0);
  const [meetings, setMeetings] = React.useState([
    {
      id: 10001470,
      free: true,
      state: 'finished',
      living: false,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
    {
      id: 10001472,
      free: true,
      state: 'finished',
      living: true,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
    {
      id: 10001473,
      free: true,
      state: 'finished',
      living: true,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
    {
      id: 10001474,
      free: true,
      state: 'finished',
      living: true,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
    {
      id: 10001475,
      free: true,
      state: 'finished',
      living: true,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
    {
      id: 10001476,
      free: true,
      state: 'finished',
      living: true,
      capacity: 10,
      con_call: 'unlimited',
      end_time: 1740731400,
      event_id: 10001081,
      has_paid: false,
      playback: false,
      paid_info: null,
      region_id: null,
      co_host_id: 20001164,
      region_ids: [],
      start_time: 1740728700,
      time_state: 'finished',
      interactive: true,
      meeting_way: 'default_online',
      online_type: null,
      co_host_info: { id: 20001164, name: '个人崔bil' },
      language_ids: [1],
      meeting_type: 'public',
      time_zone_id: 1,
      current_price: 0,
      hide_con_call: false,
      meeting_notes: [],
      broadcaster_id: 20001156,
      has_registered: false,
      original_price: 0,
      broadcaster_info: { id: 20001156, name: '崔-分析师' },
      registration_info: null,
      region_with_parents: {},
    },
  ]);
  const [prepay, setPrepay] = React.useState(0);
  const [price, setPrice] = React.useState('');
  const [priceColor, setPriceColor] = React.useState('');
  const [recommand_data_list, setRecommand_data_list] = React.useState([]);
  const [showBtn, setShowBtn] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [tipList, setTipList] = React.useState([]);
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [tips, setTips] = React.useState('');
  const getConfirmBtnData = eventInfo => {
    const subText01 = Variables.user_info.has_vip
      ? t(Variables, 'mine_upgrade_vip')
      : t(Variables, 'live_try_vip');
    const subText02 =
      t(Variables, 'live_user_pay') +
      meeting.current_price +
      t(Variables, 'live_user_a_currency');
    let text01;

    text01 =
      t(Variables, 'event_detail_sure_after') +
      subText01 +
      t(Variables, 'live_or') +
      subText02;

    setTips(text01);
    setTipList([
      {
        word: subText01,
        style: {
          color: '#E1AC6F',
          fontFamily: 'System',
          fontSize: 12,
          fontWeight: '400',
          letterSpacing: 0.2,
          lineHeight: 14,
        },
        onPress: () => {
          if (Variables.user_info.has_vip) {
            setDialog_type(2);
          } else {
            setDialog_type(3);
          }
          actionSheetRef.current?.show();
        },
      },
      {
        word: subText02,
        style: {
          color: '#2B33E6',
          fontFamily: 'System',
          fontSize: 12,
          fontWeight: '400',
          letterSpacing: 0.2,
          lineHeight: 14,
        },
        onPress: () => {
          setDialog_type(4);
          actionSheetRef.current?.show();
        },
      },
    ]);

    if (eventInfo.allow_guest) {
      if (meeting.time_state === 'finished') {
        if (meeting.live) {
          //有回放
          setBtnText(t(Variables, 'event_detail_playback'));
          setBtnColor('#2B33E6');
        } else {
          setBtnText(t(Variables, 'mine_events_pass'));
          setBtnColor('#C6D0D9');
        }
      } else {
        setBtnText(t(Variables, 'event_detail_join_meeting'));
        setBtnColor('#2B33E6');
        // tv_bottom_right.setOnClickListener(view -> jumpMeeting(meeting));
      }
    } else {
      switch (eventUserStatus(Variables)) {
        case 0: //已认证
        case 2: //未认证
        case 3: //审核中
          if (eventInfo.can_register) {
            switch (meeting.state) {
              case 'registered': //已报名
                if (meeting.time_state === 'finished') {
                  if (meeting.live) {
                    //有回放

                    setBtnText(t(Variables, 'event_detail_playback'));
                    setBtnColor('#2B33E6');
                  } else {
                    setBtnText(t(Variables, 'mine_events_pass'));
                    setBtnColor('#C6D0D9');
                  }
                } else {
                  if (meeting.meeting_way === 'offline') {
                    //线下报名
                    setBtnText(t(Variables, 'common_registered'));
                    setBtnColor('#C6D0D9');
                    if (!meeting.free && !meeting.has_paid)
                      initTips(6, meeting);
                  } else {
                    //线上报名
                    if (meeting.online_password) {
                      //参会方式
                      setBtnText(t(Variables, 'event_detail_join_style'));
                      setBtnColor('#2B33E6');
                    } else {
                      //进入会议
                      setBtnText(t(Variables, 'event_detail_join_meeting'));
                      setBtnColor('#2B33E6');
                    }
                    if (!meeting.free && !meeting.has_paid)
                      initTips(5, meeting);
                  }
                }
                break;
              case 'pending': //审核中
                setBtnText(t(Variables, 'event_detail_pending'));
                setBtnColor('#C6D0D9');

                if (!meeting.free && !meeting.has_paid && !eventInfo.has_vip) {
                  if (meeting.meeting_way === 'offline') {
                    //线下
                    initTips(4, meeting);
                  } else {
                    //线上
                    initTips(3, meeting);
                  }
                }
                break;
              case 'finished': //已结束
                if (meeting.live) {
                  //有回放
                  setBtnText(t(Variables, 'event_detail_playback'));
                  setBtnColor('#2b33e6');
                } else {
                  setBtnText(t(Variables, 'mine_events_pass'));
                  setBtnColor('#C6D0D9');
                }
                break;
              case 'full': //已报满
                setBtnText(t(Variables, 'dialog_sign_up_now'));
                setBtnColor('#C6D0D9');

                break;
              case 'normal': //可以报名
                setBtnText(t(Variables, 'dialog_sign_up_now'));
                setBtnColor('#2B33E6');

                break;
            }
          } else {
            //event不能报名
            if (eventUserStatus(Variables) == 2) {
              //未认证且不在范围
              setBtnText(t(Variables, 'dialog_sign_up_now'));
              setBtnColor('#2B33E6');
            } else {
              if (eventInfo.can_registration_online) {
                //开放线上报名，不能报名
                switch (meeting.state) {
                  case 'registered': //已报名
                    if (meeting.time_state === 'finished') {
                      if (meeting.live) {
                        //有回放
                        setBtnText(t(Variables, 'event_detail_playback'));
                        setBtnColor('#2B33E6');
                      } else {
                        setBtnText(t(Variables, 'mine_events_pass'));
                        setBtnColor('#C6D0D9');
                      }
                    } else {
                      if (meeting.meeting_way === 'offline') {
                        //线下报名
                        setBtnText(t(Variables, 'common_registered'));
                        setBtnColor('#C6D0D9');

                        if (!meeting.free && !meeting.has_paid)
                          initTips(6, meeting);
                      } else {
                        if (meeting.online_password) {
                          //参会方式
                          setBtnText(t(Variables, 'event_detail_join_style'));
                          setBtnColor('#2B33E6');
                        } else {
                          //进入会议
                          setBtnText(t(Variables, 'event_detail_join_meeting'));
                          setBtnColor('#2B33E6');
                          // tv_bottom_right.setOnClickListener(view -> jumpMeeting(meeting));
                        }
                        if (!meeting.free && !meeting.has_paid)
                          initTips(5, meeting);
                      }
                    }
                    break;
                  case 'pending': //审核中
                    setBtnText(t(Variables, 'event_detail_pending'));
                    setBtnColor('#C6D0D9');

                    if (
                      !meeting.free &&
                      !meeting.has_paid &&
                      !eventInfo.has_vip
                    ) {
                      if (meeting.meeting_way === 'offline') {
                        //线下
                        initTips(4, meeting);
                      } else {
                        //线上
                        initTips(3, meeting);
                      }
                    }
                    break;
                  case 'finished': //已结束
                    if (meeting.live) {
                      //有回放
                      setBtnText(t(Variables, 'event_detail_playback'));
                      setBtnColor('#2B33E6');
                    } else {
                      console.log('=========');
                      setBtnText(t(Variables, 'mine_events_pass'));
                      setBtnColor('#C6D0D9');
                    }
                    break;
                  case 'full': //已报满
                    setBtnText(t(Variables, 'dialog_sign_up_now'));
                    setBtnColor('#C6D0D9');
                    break;
                  default: //
                    if (eventInfo.has_registered) {
                      //允许报一场
                      setBtnText(t(Variables, 'dialog_sign_up_now'));
                      setBtnColor('#C6D0D9');
                      initTips(1, meeting);
                    } else {
                      //定向邀请
                      setBtnText(t(Variables, 'event_detail_only_limit'));
                      setBtnColor('#C6D0D9');
                    }
                    break;
                }
              } else {
                //活动不开放线上报名
                setBtnText(t(Variables, 'dialog_sign_up_now'));
                setBtnColor('#C6D0D9');
                initTips(2, meeting);
              }
            }
          }
          break;
        case 1: //未登录
          setBtnText(t(Variables, 'dialog_sign_up_now'));
          setBtnColor('#2B33E6');
          break;
      }
    }
  };

  const getFiletypeImg = fileName => {
    // imageSource(Images['icdoc'])
    if (fileName.endsWith('.pdf')) {
      return imageSource(Images['icpdf']);
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return imageSource(Images['icdoc']);
    } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
      return imageSource(Images['icxls']);
    } else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
      return imageSource(Images['icppt']);
    } else {
      return imageSource(Images['icotherlink']);
    }
  };

  const getPriceTxt = has_vip => {
    if (meeting.free) {
      //免费
      setPrice(t(Variables, 'mine_vip_free'));
      setPriceColor('#ff4b4b');
    } else {
      //付费
      if (meeting.has_paid) {
        //已付费
        if (
          meeting.paid_info.card_type === 'vip' ||
          meeting.paid_info.card_type === 'camp_vip'
        ) {
          //vip支付
          setPrice(t(Variables, 'live_vip_free'));
          setPriceColor('#ffd6a6');
        } else {
          //A币支付
          setPrice(
            t(Variables, 'live_has_paid') +
              meeting.paid_info.actual_paid +
              t(Variables, 'mine_a_currency')
          );
          setPriceColor('#ff4b4b');
        }
      } else {
        //未付费
        if (meeting.state === 'pending' && has_vip) {
          setPrice(t(Variables, 'live_vip_free'));
          setPriceColor('#ffda6a');
        } else {
          setPrice(meeting.current_price + t(Variables, 'mine_a_currency'));
          setPriceColor('#ff4b4b');
        }
      }
    }
  };

  const initTips = type => {
    // tv_tips.setVisibility(View.VISIBLE);
    switch (type) {
      case 1: //活动仅可报名一个场次
        setTips(t(Variables, 'event_detail_only_one'));
        break;
      case 2: //未开放线上报名
        setTips(
          t(Variables, 'event_detail_interest') +
            t(Variables, 'event_detail_contact_host')
        );
        // String text1 = getString(R.string.event_detail_interest) + getString(R.string.event_detail_contact_host);
        const subText1 = t(Variables, 'event_detail_contact_host');

        setTipList([
          {
            word: subText1,
            style: {
              color: '#2B33E6',
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 14,
            },
            onPress: () => {
              setDialog_type(1);
              actionSheetRef.current?.show();
            },
          },
        ]);

        // String text1 = getString(R.string.event_detail_interest) + getString(R.string.event_detail_contact_host);
        // String subText1 = getString(R.string.event_detail_contact_host);
        // ClickableSpan clickableSpan1 = new ClickableSpan() {
        //     @Override
        //     public void onClick(@NonNull View view) {
        //         EventContactDialog.newInstance(eventInfo.getContacts()).show(EventDetailActivity.this);
        //     }
        // };
        // List<SpanInfo> list = new ArrayList<SpanInfo>();
        // list.add(
        //         new SpanInfo(
        //                 subText1,
        //                 -1,
        //                 Color.parseColor("#2B33E6"),
        //                 clickableSpan1, false, true
        //         )
        // );
        // tv_tips.setText(TextColorSizeHelper.getTextSpan(this, text1, list));
        // tv_tips.setMovementMethod(LinkMovementMethod.getInstance());
        break;
      case 3: //待确认-未付费-线上
      case 4: //待确认-未付费-线下
      case 5: //已报名-未付费-线上
      case 6: //已报名-未付费-线下
        const subText01 = Variables.user_info.has_vip
          ? t(Variables, 'mine_upgrade_vip')
          : t(Variables, 'live_try_vip');
        const subText02 =
          t(Variables, 'live_user_pay') +
          meeting.current_price +
          t(Variables, 'live_user_a_currency');
        let text01;
        if (type == 3) {
          text01 =
            t(Variables, 'event_detail_sure_after') +
            subText01 +
            t(Variables, 'live_or') +
            subText02;
        } else if (type == 5) {
          text01 =
            t(Variables, 'live_for_free_five_min') +
            subText01 +
            t(Variables, 'live_or') +
            subText02;
        } else {
          text01 =
            t(Variables, 'event_detail_need_pay') +
            subText01 +
            t(Variables, 'live_or') +
            subText02;
        }
        setTips(text01);
        setTipList([
          {
            word: subText01,
            style: {
              color: '#E1AC6F',
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 14,
            },
            onPress: () => {
              if (Variables.user_info.has_vip) {
                setDialog_type(2);
              } else {
                setDialog_type(3);
              }
              actionSheetRef.current?.show();
            },
          },
          {
            word: subText02,
            style: {
              color: '#2B33E6',
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 14,
            },
            onPress: () => {
              setDialog_type(4);
              actionSheetRef.current?.show();
            },
          },
        ]);
        // ClickableSpan clickableSpan01 = new ClickableSpan() {
        //     @Override
        //     public void onClick(@NonNull View view) {
        //         if(AppUtil.isVip()){
        //             UpgradeVipDialog.newInstance("upgrade_vip").show(EventDetailActivity.this);
        //         }else {
        //             TryVipDialog.newInstance(mPresenter,meetingId).show(EventDetailActivity.this);
        //         }

        //     }
        // };
        // ClickableSpan clickableSpan02 = new ClickableSpan() {
        //     @Override
        //     public void onClick(@NonNull View view) {
        //         payForACurrency(meeting);
        //     }
        // };
        // List<SpanInfo> list01 = new ArrayList<SpanInfo>();
        // list01.add(
        //         new SpanInfo(
        //                 subText01,
        //                 -1,
        //                 Color.parseColor("#E1AC6F"),
        //                 clickableSpan01, false, true
        //         )
        // );
        // list01.add(
        //         new SpanInfo(
        //                 subText02,
        //                 -1,
        //                 Color.parseColor("#2B33E6"),
        //                 clickableSpan02, false, true
        //         )
        // );
        // tv_tips.setText(TextColorSizeHelper.getTextSpan(this, text01, list01));
        // tv_tips.setMovementMethod(LinkMovementMethod.getInstance());
        break;
    }
  };

  const isDocFileType = filename => {
    return (
      filename.endsWith('.pdf') ||
      filename.endsWith('.doc') ||
      filename.endsWith('.docx') ||
      filename.endsWith('.xls') ||
      filename.endsWith('.xlsx') ||
      filename.endsWith('.ppt') ||
      filename.endsWith('.pptx')
    );
  };

  const payForLiveCallback = async (position, snCode) => {
    actionSheetRef.current?.hide();
    if (position === 1) {
      navigation.push('WebViewScreen', {
        url: Constants['base_url'] + '/recharge?platform=android',
      });
    } else {
      const result = (
        await aceCampTestBuyMeetingPOST.mutateAsync({
          goods_id: meeting?.id,
          user_card_sncode: snCode,
        })
      )?.json;
      console.log(result);
    }
  };

  const show = () => {
    gf.SheetManager.show('pay-for-live', {
      payload: {
        paynum: meeting.current_price,
        prepay: prepay,
      },
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const txtLayout = e => {
    if (e.nativeEvent.lines.length > 3) {
      setShowBtn(true);
    }
  };
  React.useEffect(() => {
    if (!meeting) {
      return;
    }
    if (meeting.free) {
      //免费
      setPrice(t(Variables, 'mine_vip_free'));
      setPriceColor('#ff4b4b');
    } else {
      //付费
      if (meeting.has_paid) {
        //已付费
        if (
          meeting.paid_info.card_type === 'vip' ||
          meeting.paid_info.card_type === 'camp_vip'
        ) {
          //vip支付
          setPrice(t(Variables, 'live_vip_free'));
          setPriceColor('#ffd6a6');
        } else {
          //A币支付
          setPrice(
            t(Variables, 'live_has_paid') +
              meeting.paid_info.actual_paid +
              t(Variables, 'mine_a_currency')
          );
          setPriceColor('#ff4b4b');
        }
      } else {
        //未付费
        if (meeting.state === 'pending' && has_vip) {
          setPrice(t(Variables, 'live_vip_free'));
          setPriceColor('#ffda6a');
        } else {
          setPrice(meeting.current_price + t(Variables, 'mine_a_currency'));
          setPriceColor('#ff4b4b');
        }
      }
    }
  }, [meeting, has_vip]);
  const actionSheetRef = React.useRef();
  const aceCampTestUnfollowOrganizationPOST =
    AceCampTestApi.useUnfollowOrganizationPOST();
  const aceCampTestFollowOrganizationPOST =
    AceCampTestApi.useFollowOrganizationPOST();
  const aceCampTestEventsRegisterPOST = AceCampTestApi.useEventsRegisterPOST();
  const aceCampTestBuyMeetingPOST = AceCampTestApi.useBuyMeetingPOST();
  React.useEffect(() => {
    const handler = async () => {
      try {
        const result = (await AceCampTestApi.getPrepayGET(Constants))?.json;
        setPrepay(result?.data);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <AceCampTestApi.FetchEventInfoGET
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              setIsFollowed(fetchData?.data?.organization?.followed);
              setEvent_id(fetchData?.data?.id);
              setId(fetchData?.data?.meetings?.[0]?.id);
              setMeeting_id(fetchData?.data?.meetings?.[0]?.id);
              setMeeting(fetchData?.data?.meetings?.[0]);
              setHas_vip(fetchData?.data?.has_vip);
              getConfirmBtnData(fetchData?.data);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={params?.event_id ?? defaultProps.event_id}
      >
        {({ loading, error, data, refetchEventInfo }) => {
          const fetchData = data?.json;
          if (loading) {
            return <View />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              <SimpleStyleScrollView
                bounces={true}
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  { height: '100%' },
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
                  color1={palettes.App['Custom Color 38']}
                  color2={palettes.App['Custom Color 40']}
                  color3={palettes.App['Custom Color 39']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinearGradientStyles(theme)[
                        'Linear Gradient'
                      ].style,
                      { position: 'absolute', top: 0, width: dimensions.width }
                    ),
                    dimensions.width
                  )}
                />
                <View>
                  {/* 标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.App['Custom #ffffff'],
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: safeAreaInsets.top,
                        paddingBottom: 15,
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 5,
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
                      size={24}
                    />
                    {/* Title */}
                    <Text
                      accessible={true}
                      selectable={false}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'auto',
                          flex: 1,
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '600',
                          letterSpacing: 0.2,
                          lineHeight: 32,
                          marginLeft: 10,
                          marginRight: 10,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {null}
                    </Text>
                    {/* 分享Btn */}
                    <IconButton
                      color={palettes.App['Custom #ffffff']}
                      icon={'AntDesign/export'}
                      size={28}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { paddingLeft: 16, paddingRight: 16, paddingTop: 10 },
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
                          fontSize: 18,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {fetchData?.data?.name}
                    </Text>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginBottom: 5,
                          marginTop: 5,
                          paddingBottom: 10,
                          paddingTop: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {/* VIP 2 */}
                      <>
                        {null?.source?.exists_need_pay_meeting ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                backgroundColor: 'rgb(254, 249, 239)',
                                borderColor: 'rgb(184, 148, 108)',
                                borderRadius: 4,
                                borderWidth: 1,
                                justifyContent: 'center',
                                marginRight: 8,
                                paddingLeft: 6,
                                paddingRight: 6,
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].style,
                                  {
                                    alignSelf: 'center',
                                    color: 'rgb(184, 148, 106)',
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'VIP'}
                            </Text>
                          </View>
                        )}
                      </>
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
                        {arrayIdToString(
                          Variables,
                          13,
                          fetchData?.data?.custom_sector_ids,
                          '、'
                        )}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgb(44, 51, 138)',
                          borderRadius: 8,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          opacity: 1,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.push('BottomTabNavigator', {
                              screen: 'Home',
                              params: {
                                screen: 'OrganizerScreen',
                                params: {
                                  organization_id:
                                    fetchData?.data?.organization?.id,
                                },
                              },
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          <Image
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            source={imageSource(
                              `${fetchData?.data?.organization?.logo}`
                            )}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                {
                                  borderRadius: 2225,
                                  height: 40,
                                  marginRight: 10,
                                  width: 40,
                                }
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
                                lineHeight: 19,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.contacts?.[0]?.name}
                          </Text>
                        </View>
                      </Touchable>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        {/* Touchable 2 */}
                        <Touchable
                          onPress={() => {
                            try {
                              Linking.openURL(
                                `mailto:${fetchData?.data?.contacts?.[0]?.phone}`
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
                                backgroundColor: palettes.App['Custom #ffffff'],
                                borderRadius: 15,
                                height: 25,
                                justifyContent: 'center',
                                width: 25,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon
                              name={'Entypo/mail'}
                              size={15}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                        </Touchable>

                        <Touchable
                          onPress={() => {
                            const handler = async () => {
                              try {
                                if (isFollowed) {
                                  const unfollowResult = (
                                    await aceCampTestUnfollowOrganizationPOST.mutateAsync(
                                      {
                                        organization_id:
                                          fetchData?.data?.organization?.id,
                                      }
                                    )
                                  )?.json;
                                  setIsFollowed(
                                    unfollowResult?.code === 200 ? false : true
                                  );
                                } else {
                                  const followResult = (
                                    await aceCampTestFollowOrganizationPOST.mutateAsync(
                                      {
                                        organization_id:
                                          fetchData?.data?.organization?.id,
                                      }
                                    )
                                  )?.json;
                                  setIsFollowed(
                                    followResult?.code === 200 ? true : false
                                  );
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                        >
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'rgb(200, 208, 216)',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: isFollowed
                                      ? '#C8D0D8'
                                      : palettes.Brand.appStyle_primary,
                                  },
                                ],
                                borderRadius: 14,
                                marginLeft: 10,
                                paddingBottom: 5,
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingTop: 5,
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
                                  fontSize: 13,
                                  fontWeight: '400',
                                  letterSpacing: 0.2,
                                  lineHeight: 17,
                                },
                                dimensions.width
                              )}
                            >
                              {isFollowed
                                ? t(Variables, 'common_followed')
                                : t(Variables, 'common_follow')}
                            </Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      height: '100%',
                      marginTop: 20,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* List 2 */}
                  <SimpleStyleFlatList
                    data={fetchData?.data?.meetings}
                    decelerationRate={'normal'}
                    inverted={false}
                    keyExtractor={(list2Data, index) =>
                      list2Data?.id ??
                      list2Data?.uuid ??
                      index?.toString() ??
                      JSON.stringify(list2Data)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'Fetch->Scroll View->View->List 2'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const list2Data = item;
                      return (
                        <Touchable
                          onPress={() => {
                            try {
                              setMeeting_id(list2Data?.id);
                              setMeeting(list2Data);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          {/* 时间选择 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes.App['Custom Color 14'],
                                borderColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Brand.appStyle_primary,
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value:
                                      meeting_id === list2Data?.id
                                        ? palettes.Brand.appStyle_primary
                                        : palettes.App['Custom Color 14'],
                                  },
                                ],
                                borderRadius: 6,
                                borderWidth: 1,
                                flexDirection: 'row',
                                height: 70,
                                justifyContent: 'center',
                                marginLeft: 16,
                                marginTop: 16,
                                overflow: 'hidden',
                                width: 120,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: 'rgb(227, 234, 253)',
                                  borderBottomRightRadius: 3,
                                  left: 0,
                                  padding: 4,
                                  position: 'absolute',
                                  top: 0,
                                  zIndex: 100,
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
                                    fontSize: 10,
                                    fontWeight: '400',
                                  },
                                  dimensions.width
                                )}
                              >
                                {fetchData?.data?.meetings?.[0]?.meeting_way ===
                                'default_online'
                                  ? t(Variables, 'event_detail_online')
                                  : t(Variables, 'event_detail_offline')}
                              </Text>
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                  borderRadius: 4,
                                  padding: 4,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(165, 175, 185)',
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 14,
                                  },
                                  dimensions.width
                                )}
                              >
                                {getMonthStr(
                                  Variables,
                                  fromUnixTimestamp(
                                    Variables,
                                    fetchData?.data?.meetings?.[0]?.start_time,
                                    'MM'
                                  )
                                )}
                              </Text>
                              {/* Text 2 */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {fromUnixTimestamp(
                                  Variables,
                                  fetchData?.data?.meetings?.[0]?.start_time,
                                  'DD'
                                )}
                              </Text>
                            </View>
                            {/* View 3 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { marginLeft: 8 },
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
                                    lineHeight: 19,
                                  },
                                  dimensions.width
                                )}
                              >
                                {fromUnixTimestamp(
                                  Variables,
                                  fetchData?.data?.meetings?.[0]?.start_time,
                                  'HH:mm'
                                )}
                              </Text>
                            </View>
                          </View>
                        </Touchable>
                      );
                    }}
                    snapToAlignment={'start'}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      { paddingRight: 16 },
                      dimensions.width
                    )}
                  />
                  {/* 会议时间 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'MaterialCommunityIcons/clock-time-three'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_time')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {fromUnixTimestamp(
                          Variables,
                          meeting?.start_time,
                          'YYYY/MM/DD HH:mm'
                        )}
                        {'-'}
                        {fromUnixTimestamp(
                          Variables,
                          meeting?.end_time,
                          'HH:mm'
                        )}
                        {'\n'}
                        {getNameById(Variables, 1, meeting?.time_zone_id)}
                      </Text>
                    </View>
                  </View>
                  {/* 会议类型 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'MaterialIcons/dashboard'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_type')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.meetings?.[0]?.meeting_way ===
                        'default_online'
                          ? t(Variables, 'event_detail_online_group')
                          : t(Variables, 'event_detail_offline_group')}
                      </Text>
                    </View>
                  </View>
                  {/* 参会方式 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'Entypo/hair-cross'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_style')}
                      </Text>
                    </View>
                    {/* 参会方式-线上 */}
                    <>
                      {meeting?.meeting_way === 'offline' ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { justifyContent: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* 报名 */}
                          <>
                            {!meeting?.has_registered ? null : (
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Event Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Event Text']
                                      .style,
                                    { color: palettes.App['Custom Color 4'] }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {meeting?.state === 'pending'
                                  ? t(Variables, 'event_detail_after_look')
                                  : undefined}
                              </Text>
                            )}
                          </>
                          {/* 未报名 */}
                          <>
                            {meeting?.has_registered ? null : (
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Event Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Event Text']
                                      .style,
                                    { color: palettes.App['Custom Color 4'] }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'event_detail_after_look')}
                              </Text>
                            )}
                          </>
                          <>
                            {!meeting?.has_registered ? null : (
                              <View>
                                <>
                                  {!(
                                    meeting?.state !== 'pending' &&
                                    meeting?.online_password
                                  ) ? null : (
                                    <Touchable>
                                      {/* 查看详情 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            borderColor:
                                              palettes.Brand.appStyle_primary,
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            paddingBottom: 1,
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            paddingTop: 1,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          {...GlobalStyles.TextStyles(theme)[
                                            '12 Regular'
                                          ].props}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.TextStyles(theme)[
                                                '12 Regular'
                                              ].style,
                                              {
                                                color:
                                                  palettes.Brand
                                                    .appStyle_primary,
                                                fontFamily: 'System',
                                                fontSize: 13,
                                                fontWeight: '700',
                                                lineHeight: 15,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {t(
                                            Variables,
                                            'event_detail_look_info'
                                          )}
                                        </Text>
                                      </View>
                                    </Touchable>
                                  )}
                                </>
                                {/* Touchable 2 */}
                                <>
                                  {!(
                                    meeting?.state !== 'pending' &&
                                    !meeting?.online_password
                                  ) ? null : (
                                    <Touchable>
                                      {/* 进入会议 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            borderColor:
                                              palettes.Brand.appStyle_primary,
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            paddingBottom: 1,
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            paddingTop: 1,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          {...GlobalStyles.TextStyles(theme)[
                                            '12 Regular'
                                          ].props}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.TextStyles(theme)[
                                                '12 Regular'
                                              ].style,
                                              {
                                                color:
                                                  palettes.Brand
                                                    .appStyle_primary,
                                                fontFamily: 'System',
                                                fontSize: 13,
                                                fontWeight: '700',
                                                lineHeight: 15,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {t(
                                            Variables,
                                            'event_detail_join_meeting'
                                          )}
                                        </Text>
                                      </View>
                                    </Touchable>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* 参会方式-线下 */}
                    <>
                      {!(meeting?.meeting_way === 'offline') ? null : (
                        <View>
                          {/* 报名 */}
                          <>
                            {!meeting?.has_registered ? null : (
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Event Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Event Text']
                                      .style,
                                    { color: palettes.App['Custom Color 4'] }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {meeting?.state === 'pending'
                                  ? 'event_detail_after_look_info'?.t
                                  : meeting?.offline_address}
                              </Text>
                            )}
                          </>
                          {/* 未报名 */}
                          <>
                            {meeting?.has_registered ? null : (
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Event Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Event Text']
                                      .style,
                                    { color: palettes.App['Custom Color 4'] }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'event_detail_after_look_info')}
                              </Text>
                            )}
                          </>
                        </View>
                      )}
                    </>
                  </View>
                  {/* 语言 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'Ionicons/earth'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_language')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {arrayIdToString(
                          Variables,
                          2,
                          fetchData?.data?.meetings?.[0]?.language_ids,
                          '、'
                        )}
                      </Text>
                    </View>
                  </View>
                  {/* 不可以提问 */}
                  <>
                    {meeting?.interactive ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            marginTop: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View>
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Event Text']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Event Text']
                                  .style,
                                { color: palettes.App['Custom Color_11'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'event_detail_not_request')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                  {/* View 2 */}
                  <>
                    {!(
                      fetchData?.data?.exists_need_pay_meeting &&
                      !Constants['user_info']?.has_vip
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 16, paddingLeft: 16, paddingRight: 16 },
                          dimensions.width
                        )}
                      >
                        <ExpoImage
                          allowDownscaling={true}
                          cachePolicy={'disk'}
                          contentPosition={'center'}
                          transitionDuration={300}
                          transitionEffect={'cross-dissolve'}
                          transitionTiming={'ease-in-out'}
                          {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                            .props}
                          resizeMode={'contain'}
                          source={imageSource(
                            `${
                              Constants['current_lang'] === 'CN'
                                ? 'https://static.acecamptech.com/system/vip/sc_vip-trial_h5.png'
                                : 'https://static.acecamptech.com/system/vip/en_vip-trial_h5.png'
                            }`
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              { height: 80, width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    )}
                  </>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.Slate[100],
                        height: 4,
                        marginTop: 16,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  />
                  {/* 活动介绍标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.Slate[100],
                        flexDirection: 'row',
                        paddingBottom: 8,
                        paddingTop: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.Brand.appStyle_primary,
                          borderBottomRightRadius: 3,
                          borderTopRightRadius: 3,
                          height: 22,
                          marginRight: 10,
                          width: 3,
                        },
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
                          { fontSize: 16, lineHeight: 24 }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_description')}
                    </Text>
                  </View>
                  {/* 活动介绍 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { padding: 16 },
                      dimensions.width
                    )}
                  >
                    <Utils.CustomCodeErrorBoundary>
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(60, 60, 60)',
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 24,
                          },
                          dimensions.width
                        )}
                        numberOfLines={isExpanded ? null : 3}
                        onTextLayout={txtLayout}
                      >
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                        {fetchData?.data?.description}
                      </Text>
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                  <>
                    {!(
                      (showBtn ||
                        fetchData?.data?.attachments?.length > 0 ||
                        fetchData?.data?.links?.length > 0) &&
                      !isExpanded
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            height: 75,
                            justifyContent: 'flex-end',
                          },
                          dimensions.width
                        )}
                      >
                        <LinearGradient
                          endY={100}
                          startY={0}
                          {...GlobalStyles.LinearGradientStyles(theme)[
                            'Linear Gradient'
                          ].props}
                          color1={palettes.App['Custom Color 92']}
                          color2={palettes.App['Custom #ffffff']}
                          endX={50}
                          startX={50}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.LinearGradientStyles(theme)[
                                'Linear Gradient'
                              ].style,
                              {
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                toggleExpand();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    palettes.App['Custom Color 14'],
                                  borderRadius: 4,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  paddingBottom: 6,
                                  paddingLeft: 24,
                                  paddingRight: 16,
                                  paddingTop: 6,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['14 Regular']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['14 Regular']
                                      .style,
                                    theme.typography.body1,
                                    {
                                      color: palettes.Brand.itemTextNomal,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'event_detail_open')}
                              </Text>
                              <ExpoImage
                                allowDownscaling={true}
                                cachePolicy={'disk'}
                                contentPosition={'center'}
                                resizeMode={'cover'}
                                transitionDuration={300}
                                transitionEffect={'cross-dissolve'}
                                transitionTiming={'ease-in-out'}
                                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .props}
                                source={imageSource(Images['icopeninfo'])}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                      .style,
                                    { height: 18, marginLeft: 6, width: 18 }
                                  ),
                                  dimensions.width
                                )}
                              />
                            </View>
                          </Touchable>
                        </LinearGradient>
                      </View>
                    )}
                  </>
                  {/* 文档 */}
                  <>
                    {!(
                      isExpanded && fetchData?.data?.attachments?.length > 0
                    ) ? null : (
                      <View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: palettes.App['Custom Color 14'],
                              height: 5,
                            },
                            dimensions.width
                          )}
                        />
                        {/* 文档标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: palettes.Slate[100],
                              flexDirection: 'row',
                              paddingBottom: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.Brand.appStyle_primary,
                                borderBottomRightRadius: 3,
                                borderTopRightRadius: 3,
                                height: 22,
                                marginRight: 10,
                                width: 3,
                              },
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text Title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text Title']
                                  .style,
                                { fontSize: 16, lineHeight: 24 }
                              ),
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'live_menu_file')}
                          </Text>
                        </View>
                        <SimpleStyleFlatList
                          data={fetchData?.data?.attachments}
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
                          listKey={'Fetch->Scroll View->View->文档->List'}
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      if (fetchData?.data?.has_registered) {
                                        if (isDocFileType(listData?.name)) {
                                          const result = (
                                            await AceCampTestApi.ossDownloadUrlGET(
                                              Constants,
                                              {
                                                event_id: fetchData?.data?.id,
                                                file_url: listData?.url,
                                              }
                                            )
                                          )?.json;
                                          await WebBrowser.openBrowserAsync(
                                            `${result?.download_url}`
                                          );
                                        } else {
                                          navigation.push('WebViewScreen', {
                                            url: listData?.url,
                                          });
                                        }
                                      } else {
                                        ShowToast(
                                          t(
                                            Variables,
                                            'event_detail_after_look'
                                          ),
                                          undefined,
                                          undefined
                                        );
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
                                      alignItems: 'center',
                                      backgroundColor:
                                        palettes.App['Custom Color 14'],
                                      flexDirection: 'row',
                                      height: 51,
                                      marginTop: 8,
                                      padding: 8,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* pdf */}
                                  <ExpoImage
                                    allowDownscaling={true}
                                    cachePolicy={'disk'}
                                    contentPosition={'center'}
                                    resizeMode={'cover'}
                                    transitionDuration={300}
                                    transitionEffect={'cross-dissolve'}
                                    transitionTiming={'ease-in-out'}
                                    {...GlobalStyles.ExpoImageStyles(theme)[
                                      'SVG 2'
                                    ].props}
                                    source={imageSource(
                                      getFiletypeImg(listData?.name)
                                    )}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ExpoImageStyles(theme)[
                                          'SVG 2'
                                        ].style,
                                        { height: 18, width: 18 }
                                      ),
                                      dimensions.width
                                    )}
                                  />
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)[
                                      '14 Regular'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          '14 Regular'
                                        ].style,
                                        theme.typography.body1,
                                        {
                                          fontFamily: 'System',
                                          fontWeight: '700',
                                          marginLeft: 8,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.name}
                                  </Text>
                                </View>
                              </Touchable>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                        />
                      </View>
                    )}
                  </>
                  {/* 相关链接 */}
                  <>
                    {!(
                      isExpanded && fetchData?.data?.links?.length > 0
                    ) ? null : (
                      <View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: palettes.App['Custom Color 14'],
                              height: 5,
                            },
                            dimensions.width
                          )}
                        />
                        {/* 文档标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: palettes.Slate[100],
                              flexDirection: 'row',
                              paddingBottom: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.Brand.appStyle_primary,
                                borderBottomRightRadius: 3,
                                borderTopRightRadius: 3,
                                height: 22,
                                marginRight: 10,
                                width: 3,
                              },
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text Title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text Title']
                                  .style,
                                { fontSize: 16, lineHeight: 24 }
                              ),
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'event_detail_about_link')}
                          </Text>
                        </View>
                        <SimpleStyleFlatList
                          data={fetchData?.data?.links}
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
                          listKey={'Fetch->Scroll View->View->相关链接->List'}
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      if (fetchData?.data?.has_registered) {
                                        if (isDocFileType(listData?.name)) {
                                          const result = (
                                            await AceCampTestApi.ossDownloadUrlGET(
                                              Constants,
                                              {
                                                event_id: fetchData?.data?.id,
                                                file_url: listData?.url,
                                              }
                                            )
                                          )?.json;
                                          await WebBrowser.openBrowserAsync(
                                            `${result?.download_url}`
                                          );
                                        } else {
                                          navigation.push('WebViewScreen', {
                                            url: listData?.url,
                                          });
                                        }
                                      } else {
                                        ShowToast(
                                          t(
                                            Variables,
                                            'event_detail_after_look'
                                          ),
                                          undefined,
                                          undefined
                                        );
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
                                      alignItems: 'center',
                                      backgroundColor:
                                        palettes.App['Custom Color 14'],
                                      flexDirection: 'row',
                                      height: 51,
                                      marginTop: 8,
                                      padding: 8,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* pdf */}
                                  <ExpoImage
                                    allowDownscaling={true}
                                    cachePolicy={'disk'}
                                    contentPosition={'center'}
                                    resizeMode={'cover'}
                                    transitionDuration={300}
                                    transitionEffect={'cross-dissolve'}
                                    transitionTiming={'ease-in-out'}
                                    {...GlobalStyles.ExpoImageStyles(theme)[
                                      'SVG 2'
                                    ].props}
                                    source={imageSource(
                                      getFiletypeImg(listData?.name)
                                    )}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ExpoImageStyles(theme)[
                                          'SVG 2'
                                        ].style,
                                        { height: 18, width: 18 }
                                      ),
                                      dimensions.width
                                    )}
                                  />
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)[
                                      '14 Regular'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          '14 Regular'
                                        ].style,
                                        theme.typography.body1,
                                        {
                                          fontFamily: 'System',
                                          fontWeight: '700',
                                          marginLeft: 8,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.name}
                                  </Text>
                                </View>
                              </Touchable>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                        />
                      </View>
                    )}
                  </>
                  <>
                    {!isExpanded ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            height: 75,
                            justifyContent: 'flex-end',
                          },
                          dimensions.width
                        )}
                      >
                        <LinearGradient
                          endY={100}
                          startY={0}
                          {...GlobalStyles.LinearGradientStyles(theme)[
                            'Linear Gradient'
                          ].props}
                          color1={palettes.App['Custom Color 92']}
                          color2={palettes.App['Custom #ffffff']}
                          endX={50}
                          startX={50}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.LinearGradientStyles(theme)[
                                'Linear Gradient'
                              ].style,
                              {
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                toggleExpand();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    palettes.App['Custom Color 14'],
                                  borderRadius: 4,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  paddingBottom: 6,
                                  paddingLeft: 24,
                                  paddingRight: 16,
                                  paddingTop: 6,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['14 Regular']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['14 Regular']
                                      .style,
                                    theme.typography.body1,
                                    {
                                      color: palettes.Brand.itemTextNomal,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'event_detail_close')}
                              </Text>
                              <ExpoImage
                                allowDownscaling={true}
                                cachePolicy={'disk'}
                                contentPosition={'center'}
                                resizeMode={'cover'}
                                transitionDuration={300}
                                transitionEffect={'cross-dissolve'}
                                transitionTiming={'ease-in-out'}
                                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .props}
                                source={imageSource(Images['iccloseinfo'])}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                      .style,
                                    { height: 18, marginLeft: 6, width: 18 }
                                  ),
                                  dimensions.width
                                )}
                              />
                            </View>
                          </Touchable>
                        </LinearGradient>
                      </View>
                    )}
                  </>
                  {/* 本营专家一对一 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        height: 75,
                        marginBottom: 10,
                        marginTop: 20,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.push('BottomTabNavigator', {
                            screen: 'Home',
                            params: {
                              screen: 'OrganizerScreen',
                              params: { organization_id: 20505781 },
                            },
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Image
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        resizeMode={'contain'}
                        source={imageSource(
                          'https://static.acecamptech.com/system/posters/sc_event_poster.png'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 75, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </Touchable>
                  </View>
                  {/* 相关推荐-标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                        marginTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={0}
                      endY={5}
                      startX={200}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(95, 136, 247)',
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '600',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                          marginLeft: 20,
                          marginRight: 20,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'article_detail_recommand')}
                    </Text>
                    {/* Linear Gradient 3 */}
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={100}
                      endY={5}
                      startX={0}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* 相关推荐 2 */}
                  <View>
                    <AceCampTestApi.FetchArticleInfoSimilarGET
                      handlers={{
                        onData: fetchData => {
                          try {
                            const result = splitList(fetchData?.data, 5);
                            setRecommand_data_list(result);
                            console.log(result);
                          } catch (err) {
                            console.error(err);
                          }
                        },
                      }}
                      source_id={fetchData?.data?.id}
                      source_type={'Event'}
                    >
                      {({
                        loading,
                        error,
                        data,
                        refetchArticleInfoSimilar,
                      }) => {
                        const fetchData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <ActivityIndicator />;
                        }

                        return (
                          <Swiper
                            data={recommand_data_list}
                            dotActiveColor={theme.colors.branding.primary}
                            dotColor={theme.colors.text.light}
                            dotsTouchable={true}
                            hideDots={false}
                            keyExtractor={(swiperData, index) =>
                              swiperData?.id ??
                              swiperData?.uuid ??
                              index?.toString() ??
                              JSON.stringify(swiperData)
                            }
                            listKey={
                              'Fetch->Scroll View->View->相关推荐 2->Fetch->Swiper'
                            }
                            minDistanceForAction={0.2}
                            minDistanceToCapture={5}
                            renderItem={({ item, index }) => {
                              const swiperData = item;
                              return (
                                <SwiperItem>
                                  <SimpleStyleFlashList
                                    data={swiperData}
                                    estimatedItemSize={50}
                                    horizontal={false}
                                    inverted={false}
                                    keyExtractor={(flashListData, index) =>
                                      flashListData?.id ??
                                      flashListData?.uuid ??
                                      index?.toString() ??
                                      JSON.stringify(flashListData)
                                    }
                                    listKey={JSON.stringify(swiperData)}
                                    numColumns={1}
                                    onEndReachedThreshold={0.5}
                                    renderItem={({ item, index }) => {
                                      const flashListData = item;
                                      return (
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              JumpToPageByType(
                                                navigation,
                                                flashListData?.source_type,
                                                flashListData?.source_id,
                                                Constants['base_url']
                                              );
                                              /* hidden 'If/Else' action */
                                              /* hidden 'Navigate' action */
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.App[
                                                    'Custom Color 31'
                                                  ],
                                                borderRadius: 4,
                                                marginBottom: 5,
                                                marginTop: 5,
                                                paddingBottom: 5,
                                                paddingLeft: 16,
                                                paddingRight: 16,
                                                paddingTop: 5,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  paddingBottom: 3,
                                                  paddingTop: 3,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                ellipsizeMode={'tail'}
                                                numberOfLines={1}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 24,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {flashListData?.source_type ===
                                                'Event'
                                                  ? flashListData?.source.name
                                                  : flashListData?.source.title}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderColor:
                                                      palettes.App
                                                        .Peoplebit_Light_Stone_Gray,
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    paddingBottom: 2,
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    paddingTop: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  accessible={true}
                                                  selectable={false}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        palettes.App[
                                                          'Custom Color 34'
                                                        ],
                                                      fontFamily: 'System',
                                                      fontSize: 13,
                                                      fontWeight: '400',
                                                      letterSpacing: 0.2,
                                                      lineHeight: 17,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {getArticleType(
                                                    Variables,
                                                    flashListData?.source_type
                                                  )}
                                                </Text>
                                              </View>

                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      palettes.App[
                                                        'Custom Color 34'
                                                      ],
                                                    fontFamily: 'System',
                                                    fontSize: 13,
                                                    fontWeight: '400',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 17,
                                                    marginLeft: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {fromUnixTimestamp(
                                                  Variables,
                                                  flashListData?.source
                                                    .release_time,
                                                  'YYYY/MM/DD HH:mm'
                                                )}
                                              </Text>
                                            </View>
                                          </View>
                                        </Touchable>
                                      );
                                    }}
                                    showsHorizontalScrollIndicator={true}
                                    showsVerticalScrollIndicator={true}
                                    scrollEnabled={false}
                                  />
                                </SwiperItem>
                              );
                            }}
                            vertical={false}
                            {...GlobalStyles.SwiperStyles(theme)['Swiper']
                              .props}
                            loop={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwiperStyles(theme)['Swiper']
                                  .style,
                                { height: 400 }
                              ),
                              dimensions.width
                            )}
                            timeout={5000}
                          />
                        );
                      }}
                    </AceCampTestApi.FetchArticleInfoSimilarGET>
                  </View>
                </View>
              </SimpleStyleScrollView>
              {/* Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App['Custom #ffffff'],
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    marginBottom: safeAreaInsets.bottom,
                    paddingBottom: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 93'],
                      justifyContent: 'center',
                      padding: 8,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightTextWithAction.action
                      text={tips}
                      highlights={tipList}
                      textstyle={{
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      }}
                    />
                  </Utils.CustomCodeErrorBoundary>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                  >
                    <>
                      {!fetchData?.data?.allow_guest ? null : (
                        <Button
                          accessible={true}
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              if (fetchData?.data?.allow_guest) {
                                if (meeting?.time_state === 'finished') {
                                  if (meeting?.live) {
                                    navigation.push('WebViewScreen', {
                                      url:
                                        Constants['base_url'] +
                                        '/playback/' +
                                        meeting?.live.id,
                                    });
                                  } else {
                                  }
                                } else {
                                  navigation.push('LiveScreen', {
                                    url: meeting,
                                  });
                                }
                              } else {
                              }

                              /* hidden 'Set Variable' action */
                              /* hidden 'Run a Custom Function' action */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          {...GlobalStyles.ButtonStyles(theme)[
                            'Button (default)'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)[
                                'Button (default)'
                              ].style,
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Brand.appStyle_primary,
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: btnColor,
                                  },
                                ],
                                borderRadius: null,
                                color: palettes.App['Custom #ffffff'],
                                fontSize: 18,
                                letterSpacing: 0.5,
                                lineHeight: 26,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }
                            ),
                            dimensions.width
                          )}
                          title={`${btnText}`}
                        />
                      )}
                    </>
                    {/* Button 2 */}
                    <>
                      {!(
                        !fetchData?.data?.allow_guest &&
                        [0, 2, 3].includes(eventUserStatus(Variables)) &&
                        fetchData?.data?.can_register
                      ) ? null : (
                        <Button
                          accessible={true}
                          iconPosition={'left'}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                if (meeting?.state === 'registered') {
                                  if (meeting?.time_state === 'finished') {
                                    if (meeting?.live) {
                                      navigation.push('WebViewScreen', {
                                        url:
                                          Constants['base_url'] +
                                          '/playback/' +
                                          meeting?.live.id,
                                      });
                                    } else {
                                    }
                                  } else {
                                    if (meeting?.meeting_way === 'offline') {
                                    } else {
                                      if (meeting?.online_password) {
                                        console.log(
                                          'show event join style dialog'
                                        );
                                      } else {
                                        navigation.push('LiveScreen', {
                                          url: meeting?.online_address,
                                        });
                                      }
                                    }

                                    /* hidden 'Navigate' action */
                                  }
                                } else {
                                }

                                if (meeting?.state === 'finished') {
                                  navigation.push('WebViewScreen', {
                                    url:
                                      Constants['base_url'] +
                                      '/playback/' +
                                      meeting?.live?.id,
                                  });
                                } else {
                                }

                                if (meeting?.state === 'normal') {
                                  if (
                                    !meeting?.free &&
                                    Constants['user_info']?.organization_user
                                      ?.organization?.belongs_organization_id
                                  ) {
                                    if (
                                      Constants['user_info']?.organization_user
                                        ?.organization
                                        ?.belongs_organization_contact
                                    ) {
                                      setContent(
                                        StringFormat(
                                          t(
                                            Variables,
                                            'event_detail_other_buy'
                                          ),
                                          [].concat([
                                            Constants['user_info']
                                              ?.organization_user?.organization
                                              ?.belongs_organization_name,
                                          ])
                                        ) +
                                          Constants['user_info']
                                            ?.organization_user?.organization
                                            ?.belongs_organization_contact
                                      );
                                    } else {
                                      setContent(
                                        StringFormat(
                                          t(
                                            Variables,
                                            'event_detail_other_buy'
                                          ),
                                          [].concat([
                                            Constants['user_info']
                                              ?.organization_user?.organization
                                              ?.belongs_organization_name,
                                          ])
                                        )
                                      );
                                    }

                                    setTip_modal_visiable(true);
                                  } else {
                                    if (meeting?.meeting_type === 'private') {
                                      setConfirm_modal_visiable(true);
                                    } else {
                                      (
                                        await aceCampTestEventsRegisterPOST.mutateAsync(
                                          {
                                            event_id: fetchData?.data?.id,
                                            id: meeting?.id,
                                          }
                                        )
                                      )?.json;
                                    }
                                  }
                                } else {
                                }

                                /* hidden 'Set Variable' action */
                                /* hidden 'Run a Custom Function' action */
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          {...GlobalStyles.ButtonStyles(theme)[
                            'Button (default)'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)[
                                'Button (default)'
                              ].style,
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Brand.appStyle_primary,
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: btnColor,
                                  },
                                ],
                                borderRadius: null,
                                color: palettes.App['Custom #ffffff'],
                                fontSize: 18,
                                letterSpacing: 0.5,
                                lineHeight: 26,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }
                            ),
                            dimensions.width
                          )}
                          title={`${btnText}`}
                        />
                      )}
                    </>
                    {/* Button 3 */}
                    <>
                      {!(
                        !fetchData?.data?.allow_guest &&
                        [0, 2, 3].includes(eventUserStatus(Variables)) &&
                        !fetchData?.data?.can_register
                      ) ? null : (
                        <Button
                          accessible={true}
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              if (eventUserStatus(Variables) === 2) {
                                navigation.push('MineAuthScreen');
                              } else {
                                if (fetchData?.data?.can_registration_online) {
                                  if (meeting?.state === 'registered') {
                                    if (meeting?.time_state === 'finished') {
                                      if (meeting?.live) {
                                        navigation.push('WebViewScreen', {
                                          url:
                                            Constants['base_url'] +
                                            '/playback/' +
                                            meeting?.live.id,
                                        });
                                      } else {
                                      }
                                    } else {
                                      if (meeting?.meeting_way === 'offline') {
                                      } else {
                                        if (meeting?.online_password) {
                                          console.log('password');
                                        } else {
                                          navigation.push('LiveScreen', {
                                            url: meeting?.online_address,
                                          });
                                        }
                                      }
                                    }
                                  } else {
                                  }

                                  if (
                                    meeting?.state === 'finished' &&
                                    meeting?.live
                                  ) {
                                    navigation.push('WebViewScreen', {
                                      url:
                                        Constants['base_url'] +
                                        '/playback/' +
                                        meeting?.live?.id,
                                    });
                                  } else {
                                  }
                                } else {
                                  navigation.push('LiveScreen');
                                }
                              }

                              /* hidden 'Set Variable' action */
                              /* hidden 'Run a Custom Function' action */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          {...GlobalStyles.ButtonStyles(theme)[
                            'Button (default)'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)[
                                'Button (default)'
                              ].style,
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Brand.appStyle_primary,
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: btnColor,
                                  },
                                ],
                                borderRadius: null,
                                color: palettes.App['Custom #ffffff'],
                                fontSize: 18,
                                letterSpacing: 0.5,
                                lineHeight: 26,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }
                            ),
                            dimensions.width
                          )}
                          title={`${btnText}`}
                        />
                      )}
                    </>
                    {/* Button 4 */}
                    <>
                      {!(
                        !fetchData?.data?.allow_guest &&
                        eventUserStatus(Variables) === 1
                      ) ? null : (
                        <Button
                          accessible={true}
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              navigation.push('LoginScreen');
                              /* hidden 'Set Variable' action */
                              /* hidden 'Run a Custom Function' action */
                              /* hidden 'API Request' action */
                              /* hidden 'Navigate' action */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          {...GlobalStyles.ButtonStyles(theme)[
                            'Button (default)'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)[
                                'Button (default)'
                              ].style,
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Brand.appStyle_primary,
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: btnColor,
                                  },
                                ],
                                borderRadius: null,
                                color: palettes.App['Custom #ffffff'],
                                fontSize: 18,
                                letterSpacing: 0.5,
                                lineHeight: 26,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }
                            ),
                            dimensions.width
                          )}
                          title={`${btnText}`}
                        />
                      )}
                    </>
                  </View>

                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: [
                          {
                            minWidth: Breakpoints.Mobile,
                            value: palettes.App['Custom Color_11'],
                          },
                          { minWidth: Breakpoints.Mobile, value: priceColor },
                        ],
                        fontFamily: 'System',
                        fontSize: 16,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 24,
                        marginLeft: 32,
                        marginRight: 32,
                      },
                      dimensions.width
                    )}
                  >
                    {price}
                  </Text>
                </View>
              </View>
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
                  <>
                    {!(dialog_type === 1) ? null : (
                      <EventContactActionSheetBlock
                        contacts={fetchData?.data?.contacts}
                      />
                    )}
                  </>
                  <>
                    {!(dialog_type === 3) ? null : (
                      <TryVipDialogBlock
                        resource_id={meeting?.id}
                        resource_type={'Meeting'}
                      />
                    )}
                  </>
                  <>
                    {!(dialog_type === 2) ? null : (
                      <UpgradeVipDialogBlock type={'upgrade_vip'} />
                    )}
                  </>
                  <>
                    {!(dialog_type === 4) ? null : (
                      <PayForLiveDialogBlock
                        callback={(position, sncode) => {
                          const handler = async () => {
                            try {
                              await payForLiveCallback(position, sncode);
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        payNum={meeting?.current_price}
                        prepay={prepay}
                      />
                    )}
                  </>
                </gf.ActionSheet>
              </Utils.CustomCodeErrorBoundary>
            </>
          );
        }}
      </AceCampTestApi.FetchEventInfoGET>
      {/* 背景图层 */}
      <>
        {!showConfirmModal ? null : (
          <CoverView.AnimatedView isVisible={showConfirmModal} />
        )}
      </>
      {/* Label Picker Modal */}
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
        visible={Boolean(showConfirmModal)}
      >
        <Touchable
          onPress={() => {
            try {
              /* hidden 'Run a Custom Function' action */
              setShowConfirmModal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '40%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 4'],
                height: '100%',
                opacity: 0,
                width: '100%',
              },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: 'column',
              height: '60%',
              paddingBottom: safeAreaInsets.bottom + 60,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                  {
                    alignSelf: 'auto',
                    flex: null,
                    fontFamily: 'System',
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'event_detail_confirm_title')}
            </Text>
            <IconButton
              onPress={() => {
                try {
                  setShowConfirmModal(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              color={palettes.App['Custom Color 4']}
              icon={'AntDesign/close'}
              size={24}
            />
          </View>
          {/* Select All Checkbox view */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginLeft: 16,
                marginRight: 16,
                marginTop: 20,
              },
              dimensions.width
            )}
          >
            {/* message */}
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
                  lineHeight: 22,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'event_detail_confirm_message')}
            </Text>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_name')}
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.real_name}{' '}
            </Text>
            {/* Text 3 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_organization')}
            </Text>
            {/* Text 4 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.organization.name}{' '}
            </Text>
            {/* Text 5 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_title')}
            </Text>
            {/* Text 6 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.position_name}{' '}
            </Text>
            {/* Text 7 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_work_email')}
            </Text>
            {/* Text 8 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.email}
            </Text>
          </View>
          <View />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              bottom: [
                { minWidth: Breakpoints.Mobile, value: 0 },
                { minWidth: Breakpoints.Mobile, value: safeAreaInsets.bottom },
              ],
              flexWrap: 'wrap',
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Button
            accessible={true}
            onPress={() => {
              const handler = async () => {
                try {
                  /* hidden 'Run a Custom Function' action */
                  const result = (
                    await aceCampTestEventsRegisterPOST.mutateAsync({
                      event_id: params?.event_id ?? defaultProps.event_id,
                      id: id,
                    })
                  )?.json;
                  if (result?.code === 200) {
                    ShowToast(
                      t(Variables, 'event_detail_register_success'),
                      undefined,
                      undefined
                    );
                    setShowConfirmModal(false);
                  } else {
                    ShowToast(result?.msg, undefined, undefined);
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            iconPosition={'left'}
            iconSize={14}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                { width: '90%' }
              ),
              dimensions.width
            )}
            title={`${t(Variables, 'event_detail_confirm_button')}`}
          />
        </View>
      </Modal>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
      {/* 提示 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'common_tips')}
          message={content}
          cancelBtn={t(Variables, 'common_cancel')}
          confirmBtn={t(Variables, 'common_yes')}
          onConfirm={() => {
            setTip_modal_visiable(false);
          }}
          onCancel={() => {
            setTip_modal_visiable(false);
          }}
          visible={tip_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
      {/* 确认 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'event_detail_sure_warning_title')}
          message={t(Variables, 'event_detail_sure_warning_content')}
          cancelBtn={t(Variables, 'event_detail_give_up')}
          confirmBtn={t(Variables, 'common_ok_more')}
          onConfirm={async () => {
            (
              await aceCampTestEventsRegisterPOST.mutateAsync({
                event_id: fetchData?.data?.id,
                id: meeting?.id,
              })
            )?.json;
          }}
          onCancel={() => {
            setConfirm_modal_visiable(false);
          }}
          visible={confirm_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailScreen);
