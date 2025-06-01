import { Text } from "@rneui/base";
import React, { ReactElement } from "react";
import { Platform, TouchableHighlightBase, View } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { showToast } from "./Toast";
import t from "../global-functions/t";
import { UrlUtil, getLivePagers } from "./utils/UrlUtil";
import { ConfirmDialog } from "./ConfirmDialog";
import { DeviceEventEmitter } from "react-native";
import EventTypeEnum from "./EventTypeEnum";
import Orientation from "react-native-orientation-locker";

import * as GlobalVariables from "../config/GlobalVariableContext";
import {
  AudioVolumeInfo,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalAudioStats,
  LocalVideoStats,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  QualityType,
  RemoteAudioStats,
  RemoteVideoState,
  RemoteVideoStateReason,
  RemoteVideoStats,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
  createAgoraRtcEngine,
} from "react-native-agora";

import { ParamListBase } from "@react-navigation/native";

import {
  BaseComponent,
  BaseVideoComponentState,
  LiveToken,
} from "./BaseComponent";
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
} from "./UiIndex";
import { enumToItems } from "./utils";
import { askMediaAccess } from "./utils/permissions";
import { StackScreenProps } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LiveInfo,
  LiveAttribute,
  ChatMessageBean,
  ChatMessage,
  FileInfo,
  CallOut,
} from "./LiveInfo";
import { LivePager } from "./utils/LivePager";

import RtmClient, {
  RtmChannelAttribute,
  ChannelAttributeOptions,
  RtmMessage,
  SendMessageOptions,
  PeersOnlineStatus,
  RtmAttribute,
  RtmChannelMember,
} from "agora-react-native-rtm";

interface State extends BaseVideoComponentState {
  switchCamera: boolean;
  renderByTextureView: boolean;
  setupMode: VideoViewSetupMode;
  lastmileDelay?: number;
  videoSentBitrate?: number;
  encodedFrameWidth?: number;
  encodedFrameHeight?: number;
  encoderOutputFrameRate?: number;
  audioSentBitrate?: number;
  cpuAppUsage?: number;
  cpuTotalUsage?: number;
  txPacketLossRate?: number;
  remoteUserStatsList: Map<
    number,
    { remoteVideoStats: RemoteVideoStats; remoteAudioStats: RemoteAudioStats }
  >;
  channelId?: string;
  appId?: string;
  token?: string;
  uid?: number;
  tip_modal_visiable?: boolean;
  tip_modal_contet?: string;
  tip_modal_title?: string;
  tip_modal_confirm_btn?: string;
  tip_modal_cancel_btn?: string;
  liveInfo: LiveInfo;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default class JoinChannelVideo
  extends BaseComponent<State>
  implements IRtcEngineEventHandler
{
  private liveUrl: string;
  private liveToken: LiveToken;
  private liveId: string;
  private meetingId: string;
  private eventId: string;
  private logFilePath: string;
  private from: number;
  private flag: boolean;
  private showImg: boolean;
  private data: any;
  private customers: any;
  private liveInfo: LiveInfo;
  private isAgoraLife: boolean;
  private meetingPrice: number;
  private uidList: Array<number>;
  private livePagers: Array<LivePager>;
  private homeUid: string;
  private opLocalVideo: boolean;
  private Variables: any;
  private setGlobalVariableValue: any;
  private isOnlinePlayer = false;
  private eventInfo: any;
  private shareScreenId: any;
  private isLand = 1; //默认竖屏
  private startTime: any;

  private isPlayMusic = false;

  constructor(props: BaseVideoComponentState) {
    super(props);
    console.log(props);

    this.logFilePath = "";
    this.liveUrl = props.liveUrl;
    this.isAgoraLife = false;
    this.opLocalVideo = false;
    this.Variables = GlobalVariables.useValues();
    this.setGlobalVariableValue = GlobalVariables.useSetValue();
    this.isOnlinePlayer = false;
    this.shareScreenId = "";
    this.setState({
      tip_modal_contet: t(this.Variables, "live_set_home_screen"),
      tip_modal_visiable: false,
      tip_modal_cancel_btn: t(this.Variables, "common_cancel"),
    });
  }
  protected createState(props: BaseVideoComponentState): State {
    console.log("createState");
    return {
      enableVideo: true,
      joinChannelSuccess: false,
      remoteUsers: [],
      remoteUserStatsList: new Map(),
      encodedFrameWidth: 0,
      encodedFrameHeight: 0,
      encoderOutputFrameRate: 0,
      lastmileDelay: 0,
      videoSentBitrate: 0,
      audioSentBitrate: 0,
      cpuAppUsage: 0,
      cpuTotalUsage: 0,
      txPacketLossRate: 0,
      startPreview: false,
      switchCamera: false,
      renderByTextureView: false,
      setupMode: VideoViewSetupMode.VideoViewSetupReplace,
      liveUrl: props.liveUrl,
      showImg: false,
      from: 1,
      flag: false,
      initLiveUI: props.initLiveUI,
      setLiveToken: props.setLiveToken,
      setLiveInfo: props.setLiveInfo,
      tip_modal_visiable: false,
      liveInfo: null,
      onCancel() {
        this.setState({ tip_modal_visiable: false });
      },
    };
  }

  protected initRtmEventListener() {
    this.rtmEngine.addListener(
      "ConnectionStateChanged",
      this.onRtmConnectionStateChanged
    );
    this.rtmEngine.addListener("MessageReceived", this.onRtmMessageReceived);
    this.rtmEngine.addListener(
      "MemberCountUpdated",
      this.onRtmMemberCountUpdated
    );
    this.rtmEngine.addListener(
      "ChannelAttributesUpdated",
      this.onRtmChannelAttributesUpdated
    );
    this.rtmEngine.addListener(
      "ChannelMessageReceived",
      this.onRtmChannelMessageReceived
    );
    this.rtmEngine.addListener(
      "ChannelMemberLeft",
      this.onRtmChannelMemberLeft
    );
  }
  onRtmConnectionStateChanged(state: number, reason: number) {
    console.log("rtm-connectionStateChanged", state, reason);
    if (state === 5 && reason === 8) {
      this.leaveAgora();
      this.setState({
        tip_modal_visiable: true,
        tip_modal_title: t(this.Variables, "common_tips"),
        tip_modal_contet: t(this.Variables, "live_other_account"),
        tip_modal_confirm_btn: t(this.Variables, "live_login_again"),
        onConfirm: () => {
          this.setState({ tip_modal_visiable: false });
          this.getLiveToken(this.liveId, this.liveToken);
        },
      });
    }
  }
  onRtmMessageReceived(message: RtmMessage, peerId: string) {
    console.log("rtm-messageReceived", message, peerId);
    const messageData = JSON.parse(message.text);
    switch (messageData.action) {
      case "recallBroadcaster": //被收回主持人
        this.liveInfo.role = "audience";
        this.liveInfo.settings.mute = true;
        this.liveInfo.settings.view_attendee = false;
        this.liveInfo.settings.view_member_count = false;
        this.liveInfo.settings.view_message = false;
        this.initLive();
        if (this.opLocalVideo) {
          this.setupLocalVideo();
        }
        this.initMute();
        this.setMemberInfoLocal();
        this.setState({
          tip_modal_visiable: true,
          tip_modal_title: t(this.Variables, "common_tips"),
          tip_modal_contet: t(this.Variables, "live_host_call_back"),
          tip_modal_confirm_btn: t(this.Variables, "common_got_it"),
          onConfirm: () => {
            this.setState({ tip_modal_visiable: false });
          },
          onCancel: () => {
            this.setState({ tip_modal_visiable: false });
          },
        });
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        break;
      case "toBroadcaster": //设置为主持人
        this.liveInfo.role = "broadcaster";
        this.liveInfo.settings.mute = false;
        this.liveInfo.settings.view_attendee = true;
        this.liveInfo.settings.view_member_count = true;
        this.liveInfo.settings.view_message = true;
        this.liveInfo.settings.hands_up = "null";

        this.initLive();
        this.initMute();
        this.setMemberInfoLocal();
        this.monitor(this.liveId); //查询监控链接
        showToast(t(this.Variables, "toast_you_have_been_set_host"));

        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        break;
      case "toExpert": //设置为发言嘉宾
        this.liveInfo.role = "expert";
        this.liveInfo.settings.mute = false;
        this.liveInfo.settings.view_attendee = false;
        this.liveInfo.settings.view_member_count = false;
        this.liveInfo.settings.view_message = false;
        this.liveInfo.settings.hands_up = "null";
        this.initLive();
        this.initMute();
        this.setMemberInfoLocal();
        showToast(t(this.Variables, "toast_you_have_been_set_expert"));
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        break;
      case "toAudience": //设置为普通观众
        this.liveInfo.role = "audience";
        this.liveInfo.settings.mute = true;
        this.liveInfo.settings.view_attendee = false;
        this.liveInfo.settings.view_member_count = false;
        this.liveInfo.settings.view_message = false;
        this.liveInfo.settings.hands_up = "null";

        this.initLive();
        if (this.opLocalVideo) {
          this.setupLocalVideo();
        }
        this.initMute();
        this.setMemberInfoLocal();
        showToast(t(this.Variables, "toast_you_have_been_set_audience"));

        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        break;
      case "stopUserVideo": //停止视频
        if (this.opLocalVideo) {
          this.setupLocalVideo();
          this.setState({
            tip_modal_visiable: true,
            tip_modal_title: t(this.Variables, "common_tips"),
            tip_modal_contet: t(this.Variables, "live_video_has_stop"),
            tip_modal_confirm_btn: t(this.Variables, "common_got_it"),
            onConfirm: () => {
              this.setState({ tip_modal_visiable: false });
            },
            onCancel: () => {
              this.setState({ tip_modal_visiable: false });
            },
          });
        }
        break;
      case "allowViewCount": //允许查看人数
        this.liveInfo.settings.view_member_count = true;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.initMemberCount();
        this.setMemberInfoLocal();

        break;
      case "stopViewCount": //停止查看人数
        this.liveInfo.settings.view_member_count = false;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.initMemberCount();
        this.setMemberInfoLocal();
        break;
      case "allowViewAllList": //允许查看参会人名单
        this.liveInfo.settings.view_attendee = true;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.setMemberInfoLocal();

        break;
      case "stopViewAllList": //停止查看参会人名单
        this.liveInfo.settings.view_attendee = false;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.setMemberInfoLocal();
        break;
      case "allowViewMessage": //允许查看参会人提问
        this.liveInfo.settings.view_message = true;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.setMemberInfoLocal();
        break;
      case "stopViewMessage": //停止查看参会人提问
        this.liveInfo.settings.view_message = false;
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        this.setMemberInfoLocal();
        break;
      case "muteVolume": //静音
        this.liveInfo.settings.mute = true;
        this.liveInfo.settings.hands_up = "null";

        this.initMute();
        this.setMemberInfoLocal();
        this.Variables["sp_live_name_space" + this.liveId][
          "live_" + this.liveInfo.user_id
        ]["volume"] = -1;
        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: { ...this.Variables["sp_live_name_space" + this.liveId] },
        });
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        showToast(t(this.Variables, "toast_you_have_been_muted"));

        break;
      case "unmuteVolume": //解除静音
        this.liveInfo.settings.mute = false;
        this.liveInfo.settings.hands_up = "null";
        this.initMute();
        this.setMemberInfoLocal();
        showToast(t(this.Variables, "toast_you_have_been_unmuted"));
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });

        break;
      case "handsDown":
        if (this.liveInfo.role === "audience") {
          this.liveInfo.settings.hands_up = "null";

          this.initMute();
          this.setMemberInfoLocal();
          showToast(t(this.Variables, "toast_you_have_been_hands_down"));
          this.setGlobalVariableValue({
            key: "liveInfo",
            value: { ...this.liveInfo },
          });
        }
        break;
      case "allowManageMute": //允许自由发言
        this.liveInfo.settings.manage_mute = true;
        this.liveInfo.settings.hands_up = "null";
        this.initMute();
        this.setMemberInfoLocal();
        this.setGlobalVariableValue({
          key: "liveInfo",
          value: { ...this.liveInfo },
        });
        break;
      case "stopManageMute": //停止自由发言
        this.liveInfo.settings.manage_mute = false;
        this.liveInfo.settings.hands_up = "null";

        this.initMute();
        this.setMemberInfoLocal();
        showToast(t(this.Variables, "live_stop_manage_mute_has"));
        break;
    }
  }
  onRtmMemberCountUpdated(count: number) {
    console.log("rtm-memberCountUpdated", count);
    if (this.liveInfo.role != "broadcaster") {
      this.checkHostStatus();
    }
    this.checkRealNum(count);
  }
  onRtmChannelAttributesUpdated(attributeList: RtmChannelAttribute[]) {
    console.log("rtm-channelAttributesUpdated", attributeList);
    for (const attribute of attributeList) {
      switch (attribute.key) {
        case "action":
          if (attribute.value === "prepare") {
            this.liveInfo.state = "preparing";

            if (this.liveInfo.role === "broadcaster") {
              DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 2);
            } else if (this.liveInfo.role === "expert") {
              DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 1);
              // initLiveUI(1);
            }
          } else if (attribute.value === "start") {
            //
            this.liveInfo.state = "streaming";
            DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 0);
            // initLiveUI(0);
            this.setupHomeVideo();
          } else if (attribute.value === "preStop") {
            if (
              this.liveInfo.role === "broadcaster" ||
              this.liveInfo.role === "expert"
            ) {
              this.liveInfo.state = "streaming";
              DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 0);
              // initLiveUI(0);
              this.setupHomeVideo();
            } else {
              this.liveInfo.state = "stopped";

              if (this.isLand == 0) {
                Orientation.lockToPortrait();
                // setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
              }
              DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 3);
              // initLiveUI(3);
            }
          } else if ((attribute.value = "unpublish")) {
            this.liveInfo.state = "stopped";

            if (this.isLand == 0) {
              Orientation.lockToPortrait();
              // setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            }
            DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 3);
            // initLiveUI(3);
            // initLiveUI(3);
          }
          break;
        case "setHomeUid":
          let home: string;
          if (
            !attribute.value ||
            attribute.value === "null" ||
            attribute.value === ""
          ) {
            //主屏消失
            home = "";
          } else {
            //设置主屏
            home = attribute.value;
          }
          if (home != this.homeUid) {
            this.homeUid = home;

            if (this.homeUid === "" && this.isLand === 0) {
              Orientation.lockToPortrait();
              // setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            } else {
              this.setupHomeVideo();
            }
          }
          break;
        case "shareScreenId":
          if (
            !attribute.value ||
            attribute.value === "null" ||
            attribute.value == ""
          ) {
            this.shareScreenId = "";
          } else {
            this.shareScreenId = attribute.value;
            const newAttribute: LiveAttribute = this.Variables[
              UrlUtil.SP_LIVE_NAME_SPACE + this.liveId
            ]["live_" + attribute.lastUpdateUserId] as LiveAttribute;
            if (newAttribute != null) {
              newAttribute.share_screen_id = attribute.value;
              this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
                "live_" + attribute.value
              ] = newAttribute;
            }
          }
          DeviceEventEmitter.emit(
            EventTypeEnum.LIVE_SHARE_SCREEN_CHANGE,
            this.shareScreenId
          );
          break;
        case "startTime":
          if (this.startTime === "") {
            this.startTime = attribute.value;
            //TODO: 设置计时器
            // llt_timer.setVisibility(View.VISIBLE);
            // timer.setOnChronometerTickListener(chronometer -> {
            //     long time = System.currentTimeMillis()-chronometer.getBase();
            //     Date d = new Date(time);
            //     SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss", Locale.US);
            //     sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            //     timer.setText(sdf.format(d));
            // });
            // timer.setBase(Long.valueOf(startTime));
            // timer.start();
          }
          break;
        case "backgroundUrl":
          this.liveInfo.background = attribute.value;
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "setBackgroundUrl"
          ] = attribute.value;
          // LiveEventBus.get("refresh_background").post(attribute.getValue());

          break;
        case "previewFiles": //预览文件
          const fileInfoList: FileInfo[] = JSON.parse(attribute.value);
          this.liveInfo.live_preview_files = fileInfoList;
          this.initShowFile();
          // LiveEventBus.get("UPDATE_FILE_HOST").post(fileInfoList);

          break;
      }
    }
    this.setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
    });
    this.setGlobalVariableValue({
      key: "liveInfo",
      value: { ...this.liveInfo },
    });
  }
  onRtmChannelMessageReceived(
    message: RtmMessage,
    fromMember: RtmChannelMember
  ) {
    console.log("rtm-channelMessageReceived", message, fromMember);
    const rtmMagBean = JSON.parse(message.text);
    switch (rtmMagBean.action) {
      case "imm_state_change": //
        if (this.liveInfo.role === "broadcaster") {
          this.getPreviewFile(this.liveId);
        }
        break;
      case "pstn_state_change":
        if (rtmMagBean.role_type && rtmMagBean.role_type === "Customize") {
          if (
            rtmMagBean.online_state === "hanged_up" ||
            rtmMagBean.online_state === "connected"
          ) {
            this.callHistory(this.liveId, "online");
            if (rtmMagBean.online_state === "hanged_up") {
              DeviceEventEmitter.emit(
                EventTypeEnum.UPDATE_CALL_OUT_HANG_UP,
                rtmMagBean.agora_user_id
              );
            }
          }
        } else if (
          rtmMagBean.role_type &&
          rtmMagBean.role_type === "Connector"
        ) {
          this.liveInfo.connector.online_state = rtmMagBean.online_state;
          this.setGlobalVariableValue({
            key: "liveInfo",
            value: { ...this.liveInfo },
          });
          // LiveEventBus.get("REFRESH_CONNECT_STATUS").post(liveInfo);
        }
        break;
      case "refresh": //刷新
        this.liveInfo.primary_users.staff = rtmMagBean.staff;
        this.liveInfo.allow_public_channel = rtmMagBean.allow_public_channel;
        this.liveInfo.announcement = rtmMagBean.announcement;
        this.initNotice();
        this.initUnReadNum();
        this.refreshAction(rtmMagBean, true);

        break;
      case "kick_reminder":
        if (
          rtmMagBean.affect_users.includes(this.liveInfo.user_id.toString())
        ) {
          this.setState({
            tip_modal_visiable: true,
            tip_modal_title: t(this.Variables, "live_free_finish"),
            tip_modal_contet: t(this.Variables, "live_pay_for_continue"),
            tip_modal_cancel_btn: this.Variables.user_info.has_vip
              ? t(this.Variables, "mine_upgrade_vip")
              : t(this.Variables, "live_try_vip"),
            tip_modal_confirm_btn:
              t(this.Variables, "live_user_pay") +
              this.meetingPrice +
              t(this.Variables, "live_user_a_currency"),
            onConfirm: () => {
              this.setState({ tip_modal_visiable: false });
              if (this.Variables.user_info.has_vip) {
                // UpgradeVipDialog.newInstance("upgrade_vip").show(this);
                DeviceEventEmitter.emit(EventTypeEnum.SHOW_TRY_VIP_DIALOG, 2);
              } else {
                DeviceEventEmitter.emit(EventTypeEnum.SHOW_TRY_VIP_DIALOG, 3);
                // TryVipDialog.newInstance(mPresenter,meetingId).show(this);
              }
            },
            onCancel: () => {
              DeviceEventEmitter.emit(EventTypeEnum.SHOW_TRY_VIP_DIALOG, 4);
              this.setState({ tip_modal_visiable: false });
            },
          });
        }
        break;
      case "chat":
        if (rtmMagBean.public) {
          const num: number =
            this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
              "public_un_read_num" + this.liveInfo.user_id
            ] || 0;
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "public_un_read_num" + this.liveInfo.user_id
          ] = num + 1;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: {
              ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
            },
          });
          this.savePublicMsg(
            rtmMagBean.groupId,
            fromMember.userId,
            rtmMagBean.msg,
            rtmMagBean.time
          );
        } else {
          if (
            this.liveInfo.settings.view_message ||
            rtmMagBean.groupId === this.liveInfo.user_id.toString()
          ) {
            this.saveMessage(
              rtmMagBean.groupId,
              fromMember.userId,
              rtmMagBean.msg,
              rtmMagBean.time
            );
          } else {
            const hostListStr: string[] =
              this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
                "HOST_LIST"
              ];

            if (
              hostListStr &&
              hostListStr.length > 0 &&
              rtmMagBean.groupId === hostListStr[0]
            ) {
              this.saveMessage(
                rtmMagBean.groupId,
                fromMember.userId,
                rtmMagBean.msg,
                rtmMagBean.time
              );
            }
          }
        }
        break;
    }
  }
  onRtmChannelMemberLeft(rtmChannelMember: RtmChannelMember) {
    console.log("rtm-channelMemberLeft", rtmChannelMember);
    if (this.liveInfo.role === "broadcaster") {
      const hostListStr: string[] =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["HOST_LIST"];
      const expertListStr: string[] =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["EXPERT_LIST"];
      const audiencesStr: string[] =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "UNMUTE_AUDIENCE_LIST"
        ];
      if (hostListStr && hostListStr.length > 0) {
        //从list中删除指定id
        const index = hostListStr.indexOf(rtmChannelMember.userId);
        if (index > -1) {
          hostListStr.splice(index, 1);
        }
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["HOST_LIST"] =
          hostListStr;
      }
      if (expertListStr && expertListStr.length > 0) {
        const index = expertListStr.indexOf(rtmChannelMember.userId);
        if (index > -1) {
          expertListStr.splice(index, 1);
        }
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "EXPERT_LIST"
        ] = expertListStr;
      }
      if (audiencesStr && audiencesStr.length > 0) {
        const index = audiencesStr.indexOf(rtmChannelMember.userId);
        if (index > -1) {
          audiencesStr.splice(index, 1);
        }
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "UNMUTE_AUDIENCE_LIST"
        ] = audiencesStr;
      }
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
        value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
      });
    }
  }
  async callHistory(liveId: string, type: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const params = {
      live_id: liveId,
      online_type: type,
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/con_calls/history?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      const liveAttributes: LiveAttribute[] = [];
      const callOuts: CallOut[] = JSON.parse(data.data);
      if (callOuts && callOuts.length > 0) {
        for (const callOut of callOuts) {
          const liveAttribute: LiveAttribute = {};
          liveAttribute.user_id = callOut.agora_user_id;
          liveAttribute.name = callOut.title;
          liveAttribute.role = "call";
          liveAttribute.phone_number = callOut.phone_number;
          liveAttribute.mute = false;
          liveAttributes.push(liveAttribute);
        }
      }
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + liveId]["CALL_ONLINE_LIST"] =
        liveAttributes;
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + liveId,
        value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + liveId] },
      });
      this.initMemberCount();
    }
  }
  checkHostStatus() {
    const hostListStr: string[] =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["HOST_LIST"];

    if (hostListStr && hostListStr.length > 0) {
      //查询主持人在线状态
      //查询在线状态
      this.rtmEngine
        .queryPeersOnlineStatusV2(hostListStr)
        .then((result: PeersOnlineStatus) => {
          const newHost: string[] = [];
          for (const id of hostListStr) {
            if (result[id]) {
              newHost.push(id);
            }
          }
          if (newHost.length > 0) {
          } else {
            this.checkMemberStatus();
          }
        });
    } else {
      this.checkMemberStatus();
    }
  }
  async getPreviewFile(liveId: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/preview_files`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      this.liveInfo.live_preview_files = JSON.parse(data.data);
      this.setChannelAttribute("setPreviewFiles", null);
      this.setGlobalVariableValue({
        key: "liveInfo",
        value: { ...this.liveInfo },
      });
    }
  }
  checkMemberStatus() {
    const expertListStr: string[] =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["EXPERT_LIST"];
    this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["HOST_LIST"] = [];

    if (expertListStr && expertListStr.length > 0) {
      this.rtmEngine
        .queryPeersOnlineStatusV2(expertListStr)
        .then((result: PeersOnlineStatus) => {
          const newExpert: string[] = [];
          for (const id of expertListStr) {
            if (result[id]) {
              newExpert.push(id);
            }
          }
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "EXPERT_LIST"
          ] = newExpert;
        });
    } else {
    }
    this.setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
    });
  }

  checkRealNum(memberCount: number) {
    if (
      memberCount > 0 &&
      this.liveInfo &&
      this.liveInfo.primary_users &&
      this.liveInfo.primary_users.staff &&
      this.liveInfo.primary_users.staff.length > 0
    ) {
      this.rtmEngine
        .queryPeersOnlineStatusV2(this.liveInfo.primary_users.staff)
        .then((result: PeersOnlineStatus) => {
          const newStaff: string[] = [];
          for (const id of this.liveInfo.primary_users.staff) {
            if (result[id]) {
              newStaff.push(id);
            }
          }
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "member_count" + this.liveId
          ] = memberCount - newStaff.length;

          if (this.liveInfo.role === "broadcaster") {
            this.refreshMemberList(this.liveId);
          }
          this.initMemberCount();
        });
    } else {
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "member_count" + this.liveId
      ] = memberCount;

      if (this.liveInfo.role === "broadcaster") {
        this.refreshMemberList(this.liveId);
      }
      this.initMemberCount();
    }
    this.setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
    });
  }

  async refreshMemberList(liveId: string) {
    const cookies = await AsyncStorage.getItem("cookies");

    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/attendee`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      this.refreshAction(data.data, true);
    }
  }
  async getLiveToken(liveId: string, liveToken: LiveToken): Promise<LiveInfo> {
    const params = {};
    params["user_type"] = liveToken.user_type;
    if (liveToken.meeting_id != "tutorial") {
      params["meeting_id"] = liveToken.meeting_id;
    }
    params["demo"] = liveToken.demo;
    params["get_canceled"] = true;
    if (liveToken.expert_id) {
      params["expert_id"] = liveToken.expert_id;
      params["expert_code"] = liveToken.expert_code;
    }
    const cookies = await AsyncStorage.getItem("cookies");

    // Get live token and join channel
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
        body: JSON.stringify(params),
      }
    );
    // {"user_type":"user","demo":true,"get_canceled":true,"re_registration":false}

    const data = await response.json();
    if (data.code === 200) {
      this.tokenSuccess(data.data);
    } else {
      this.tokenFail(data.code);
    }
    return data.data;
  }
  tokenFail(code: number) {
    switch (code) {
      case 10005: //直播未开始
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 7);

        break;
      case 10006: //未报名
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 6);
        break;
      case 10007: //未登陆
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 5);
        break;
      case 10008: //直播结束
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 3);
        break;
      case 10009: //密码错误
        showToast(t(this.Variables, "live_wrong_psd"));
        break;
      case 10018: //被踢掉
        this.getMeetingPrice(this.meetingId);
        break;
      case 10029: //完善信息
        this.getEventInfo(this.eventId);
        break;
      case 10031: //活动取消
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 12);

        break;
    }
  }

  async refreshToken(liveId: string, token: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const params = {
      token: token,
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
        body: JSON.stringify(params),
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      this.engine?.renewToken(data.data.rtc);
      //TODO: 设置RTMclient的token
    } else {
    }
  }

  async tokenSuccess(live: LiveInfo) {
    UrlUtil.saveLiveId(this.liveId);
    this.liveInfo = live;
    this.setGlobalVariableValue({
      key: "liveInfo",
      value: { ...this.liveInfo },
    });
    DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_TOKEN_UPDATED, live);
    if (this.liveInfo.vendor === "rtmp") {
      // Intent intent = new Intent(this, RelayActivity.class);
      // intent.putExtra("from", from);
      // intent.putExtra("url", liveUrl);
      // startActivity(intent);
      // finish();
    } else {
      if (!this.isAgoraLife) {
        this.initRtcEngine();
      }
      if (this.liveInfo.meeting) {
        this.showImg = this.liveInfo.meeting.self_employed;
      }
      if (this.liveInfo.meeting.current_price) {
        this.meetingPrice = parseInt(this.liveInfo.meeting.current_price);
      }
      if (
        this.liveInfo.remindered_at &&
        this.liveInfo.role === "audience" &&
        this.liveInfo.meeting?.has_paid
      ) {
        DeviceEventEmitter.emit(EventTypeEnum.SHOW_TRY_VIP_DIALOG, true);
      }
      if (this.liveInfo.role === "broadcaster") {
        this.monitor(this.liveId);
      }
      this.initViewPager();
      this.initLive();
      this.initUnReadNum();
    }
  }

  setChannelAttribute(action: string, uid: number) {
    const rtmChannelAttributes: RtmChannelAttribute[] = [];
    rtmChannelAttributes.push(new RtmChannelAttribute("action", action));
    if (action === "start") {
      rtmChannelAttributes.push(
        new RtmChannelAttribute("startTime", new Date().getTime().toString())
      );
    }
    if (action === "setHomeScreen") {
      rtmChannelAttributes.push(
        new RtmChannelAttribute("setHomeUid", uid.toString())
      );
    }
    if (action === "setBackground") {
      rtmChannelAttributes.push(
        new RtmChannelAttribute("backgroundUrl", this.liveInfo.background)
      );
    }
    if (action === "setPreviewFiles") {
      rtmChannelAttributes.push(
        new RtmChannelAttribute(
          "previewFiles",
          JSON.stringify(this.liveInfo.live_preview_files)
        )
      );
    }

    this.rtmEngine?.addOrUpdateChannelAttributes(
      this.liveInfo.rtm.channel,
      rtmChannelAttributes,
      { enableNotificationToChannelMembers: true }
    );
  }

  sendNoticeSuccess(data: any) {
    this.liveInfo.allow_public_channel = data.allow_public_channel;
    this.liveInfo.announcement = data.announcement;
    this.setState((prevState) => ({
      liveInfo: {
        ...prevState.liveInfo,
        allow_public_channel: data.allow_public_channel,
        announcement: data.announcement,
      },
    }));
    DeviceEventEmitter.emit(
      EventTypeEnum.REFRESH_LiveMemberDialog,
      this.liveInfo
    );
  }

  sendPeerMessage(dst: string, content: string) {
    const message = new RtmMessage(
      '{"action":"' +
        content +
        '","channel":"' +
        this.liveInfo.rtm.channel +
        '"}'
    );

    const option: SendMessageOptions = {};
    option.enableOfflineMessaging = true;
    option.enableHistoricalMessaging = true;
    this.rtmEngine.sendMessageToPeerV2(dst, message, option);
  }

  async setMemberInfo(liveId: string, user_id: string, action: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const params = {
      action: action,
      user_id: user_id,
    };
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/attendee`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies,
        },
        body: urlParams,
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      this.refreshAction(data.data, true);
    }
  }

  refreshAction(rtmMagBean: any, isRefresh: boolean) {
    if (rtmMagBean.broadcasters) {
      this.initOnlinePlayer(rtmMagBean.online_player);
      const audience: Array<string> = new Array<string>();
      audience.push(rtmMagBean.unmute_audiences);
      if (rtmMagBean.hands_up_audiences)
        audience.push(rtmMagBean.hands_up_audiences);
      this.initMemberOnline(
        rtmMagBean.broadcasters,
        rtmMagBean.experts,
        audience
      ); //获取所有用户信息
      if (isRefresh) {
        this.reFreshMemberList(
          rtmMagBean.broadcasters,
          rtmMagBean.experts,
          audience
        ); //获取所有用户信息
      } else {
        this.initMemberList(
          rtmMagBean.broadcasters,
          rtmMagBean.experts,
          audience
        ); //获取所有用户信息
      }
    }
    if (rtmMagBean.affect_users && rtmMagBean.affect_users.length > 0) {
      if (
        rtmMagBean.affect_user_infos &&
        rtmMagBean.affect_user_infos.length > 0
      ) {
        for (const liveAttribute of rtmMagBean.affect_user_infos) {
          this.Variables["sp_live_name_space" + this.liveId][
            "live_" + liveAttribute.user_id
          ]["volume"] = liveAttribute.mute ? -1 : 0;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: { ...this.Variables["sp_live_name_space" + this.liveId] },
          });
          // LiveEventBus.get("live_voice_" + liveAttribute.getUser_id()).post(liveAttribute.isMute() ? -1 : 0);
          // SPUtils.getInstance(SP_LIVE_NAME_SPACE + liveId).put("live_" + liveAttribute.getUser_id(), liveAttribute);
        }
        DeviceEventEmitter.emit(EventTypeEnum.HOST_LIST_REFRESH, 1);
        DeviceEventEmitter.emit(EventTypeEnum.REFRESH_VIDEO_VOICE, 1);
      } else {
        for (var i = 0; i < rtmMagBean.affect_users.length; i++) {
          this.getHostAttribute(
            rtmMagBean.affect_users[i],
            i == rtmMagBean.affect_users.length - 1
          );
        }
      }
    }
    this.getMemberList(this.liveId, 1);
  }

  initOnlinePlayer(onlinePlayer: any) {
    if (onlinePlayer) {
      this.isOnlinePlayer = true;
      const liveAttribute: LiveAttribute = {};
      liveAttribute.user_id = onlinePlayer.id;
      liveAttribute.name = onlinePlayer.online_player_name;
      liveAttribute.role = "online_player";
      liveAttribute.mute = false;
      const liveInfo = this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId];
      if (!liveInfo) {
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] = {};
      }
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "ONLINE_PLAYER"
      ] = liveAttribute;
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "live_" + onlinePlayer.id
      ] = liveAttribute;
    } else {
      this.isOnlinePlayer = false;
      const liveInfo = this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId];
      if (!liveInfo) {
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] = {};
      }
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "ONLINE_PLAYER"
      ] = null;
    }
    this.initMemberCount();
  }

  initMemberOnline(
    broadcaster: Array<string>,
    expert: Array<string>,
    unmute_audience: Array<string>
  ) {
    const allData = new Array<string>();
    allData.push(...broadcaster, ...expert, ...unmute_audience);

    this.rtmEngine
      .queryPeersOnlineStatusV2(allData)
      .then((result: PeersOnlineStatus) => {
        const newHost = new Array<string>();
        const newExpert = new Array<string>();
        const newAudience = new Array<string>();
        for (const id of broadcaster) {
          if (result[id]) {
            newHost.push(id);
          }
        }
        for (const id of expert) {
          if (result[id]) {
            newExpert.push(id);
          }
        }
        for (const id of unmute_audience) {
          if (result[id]) {
            newAudience.push(id);
          }
        }
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["HOST_LIST"] =
          newHost;
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "EXPERT_LIST"
        ] = newExpert;
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "UNMUTE_AUDIENCE_LIST"
        ] = newAudience;
        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: {
            ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
          },
        });
      });
  }

  reFreshMemberList(
    broadcaster: Array<string>,
    expert: Array<string>,
    unmute_audience: Array<string>
  ) {
    const allList = new Array<string>();
    allList.push(...broadcaster, ...expert, ...unmute_audience);
    if (allList.length > 0) {
      for (var i = 0; i < allList.length; i++) {
        if (
          !this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "live_" + allList[i]
          ]
        ) {
          this.getHostAttribute(allList[i], i == allList.length - 1);
        }
      }
    }
  }
  initMemberList(
    broadcaster: Array<string>,
    expert: Array<string>,
    unmute_audience: Array<string>
  ) {
    const allList = new Array<string>();
    allList.push(...broadcaster, ...expert, ...unmute_audience);
    if (allList.length > 0) {
      for (var i = 0; i < allList.length; i++) {
        this.getHostAttribute(allList[i], i == allList.length - 1);
      }
    }
  }

  getHostAttribute(uid: string, end: boolean) {
    this.rtmEngine
      .getUserAttributes(uid)
      .then((result: RtmChannelAttribute[]) => {
        const liveAttribute: LiveAttribute = {};
        for (const rtmAttribute of result) {
          switch (rtmAttribute.key) {
            case "allow_view_count":
              liveAttribute.view_member_count = rtmAttribute.value === "true";
              break;
            case "allow_view_list":
              liveAttribute.view_attendee = rtmAttribute.value === "true";
              break;
            case "allow_view_message":
              liveAttribute.view_message = rtmAttribute.value === "true";
              break;
            case "allow_manage_mute":
              liveAttribute.manage_mute = rtmAttribute.value === "true";
              break;
            case "super_moderator":
              liveAttribute.super_moderator = rtmAttribute.value === "true";
              break;
            case "has_paid":
              liveAttribute.has_paid = rtmAttribute.value === "true";
              break;
            case "sc_organization_name":
              liveAttribute.sc_organization_name = rtmAttribute.value;
              break;
            case "en_organization_name":
              liveAttribute.en_organization_name = rtmAttribute.value;
              break;
            case "logo":
              liveAttribute.logo = rtmAttribute.value;
              break;
            case "position_name":
              liveAttribute.position_name = rtmAttribute.value;
              break;
            case "full_name":
              liveAttribute.full_name = rtmAttribute.value;
              break;
            case "nick_name":
              liveAttribute.nick_name = rtmAttribute.value;
              break;
            case "organization_type_id":
              liveAttribute.organization_type_id = rtmAttribute.value;
              break;
            case "name":
              liveAttribute.name = rtmAttribute.value;
              break;
            case "mute":
              liveAttribute.mute = rtmAttribute.value === "true";
              break;
            case "id":
              liveAttribute.user_id = rtmAttribute.value;
              break;
            case "role":
              liveAttribute.role = rtmAttribute.value;
              break;
            case "user_score":
              liveAttribute.user_score = rtmAttribute.value;
              break;
            case "share_screen_id":
              liveAttribute.share_screen_id = rtmAttribute.value;
              break;
            case "card_type":
              liveAttribute.card_type = rtmAttribute.value;
              break;
            case "hands_up":
              liveAttribute.hands_up = rtmAttribute.value;
              break;
          }
        }

        // LiveEventBus.get("live_voice_" + uid).post(liveAttribute.isMute() ? -1 : 0);
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["live_" + uid][
          "volume"
        ] = liveAttribute.mute ? -1 : 0;
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "live_" + uid
        ] = liveAttribute;
        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: {
            ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
          },
        });
        if (end) {
          DeviceEventEmitter.emit(EventTypeEnum.HOST_LIST_REFRESH, 1);
          DeviceEventEmitter.emit(EventTypeEnum.REFRESH_VIDEO_VOICE, 1);
        }
      });
  }

  async getMemberList(liveId: string, page: number) {
    const cookies = await AsyncStorage.getItem("cookies");
    const params = {
      page: page.toString(),
      per_page: "9999",
      role: "audience",
    };
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/attendees?${urlParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      const liveAttributes = data.data as Array<LiveAttribute>;
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + liveId][
        "MUTE_AUDIENCE_LIST"
      ] = liveAttributes;
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + liveId,
        value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + liveId] },
      });
      DeviceEventEmitter.emit(EventTypeEnum.MUTE_AUDIENCE_LIST_REFRESH, 1);
    }
  }

  setMemberInfoLocal() {
    const attributes: RtmAttribute[] = [];

    attributes.push(new RtmAttribute("role", this.liveInfo.role));
    attributes.push(new RtmAttribute("id", this.liveInfo.user_id.toString()));
    attributes.push(
      new RtmAttribute("mute", this.liveInfo.settings.mute.toString())
    );
    if (this.liveInfo.name) {
      attributes.push(new RtmAttribute("name", this.liveInfo.name));
    }
    if (this.liveInfo.user_full_name) {
      attributes.push(
        new RtmAttribute("full_name", this.liveInfo.user_full_name)
      );
    }
    if (this.liveInfo.user_nickname != null) {
      attributes.push(
        new RtmAttribute("nick_name", this.liveInfo.user_nickname)
      );
    }
    attributes.push(
      new RtmAttribute(
        "allow_view_count",
        this.liveInfo.settings.view_member_count.toString()
      )
    );
    attributes.push(
      new RtmAttribute(
        "allow_view_list",
        this.liveInfo.settings.view_attendee.toString()
      )
    );
    attributes.push(
      new RtmAttribute(
        "allow_view_message",
        this.liveInfo.settings.view_message.toString()
      )
    );
    attributes.push(
      new RtmAttribute(
        "allow_manage_mute",
        this.liveInfo.settings.manage_mute.toString()
      )
    );
    attributes.push(
      new RtmAttribute(
        "super_moderator",
        this.liveInfo.super_moderator.toString()
      )
    );
    attributes.push(
      new RtmAttribute(
        "user_score",
        this.liveInfo.user_score != null ? this.liveInfo.user_score : "null"
      )
    );
    attributes.push(
      new RtmAttribute(
        "hands_up",
        this.liveInfo.settings.hands_up != null
          ? this.liveInfo.settings.hands_up
          : "null"
      )
    );
    if (this.liveInfo.meeting != null && this.liveInfo.meeting.id != null)
      attributes.push(
        new RtmAttribute("has_paid", this.liveInfo.meeting.has_paid.toString())
      );
    if (
      this.liveInfo.meeting != null &&
      this.liveInfo.meeting.paid_info != null &&
      this.liveInfo.meeting.paid_info.card_type != null
    )
      attributes.push(
        new RtmAttribute("card_type", this.liveInfo.meeting.paid_info.card_type)
      );
    if (this.liveInfo.position_name != null)
      attributes.push(
        new RtmAttribute("position_name", this.liveInfo.position_name)
      );
    if (this.liveInfo.logo != null)
      attributes.push(new RtmAttribute("logo", this.liveInfo.logo));
    if (this.liveInfo.sc_organization_name != null)
      attributes.push(
        new RtmAttribute(
          "sc_organization_name",
          this.liveInfo.sc_organization_name
        )
      );
    if (this.liveInfo.en_organization_name != null)
      attributes.push(
        new RtmAttribute(
          "en_organization_name",
          this.liveInfo.en_organization_name
        )
      );
    if (this.liveInfo.organization_type_id != null)
      attributes.push(
        new RtmAttribute(
          "organization_type_id",
          this.liveInfo.organization_type_id
        )
      );
    //        KLog.json("更新自己频道属性---",new Gson().toJson(attributes));
    this.rtmEngine.addOrUpdateLocalUserAttributes(attributes).then(() => {
      this.getHostAttribute(this.liveInfo.user_id.toString(), true);
    });
  }
  setupLocalVideo() {
    this.opLocalVideo = !this.opLocalVideo;
    if (this.opLocalVideo) {
      // img_video.setImageResource(R.mipmap.ic_video_active);
      // tv_video.setText(getResources().getString(R.string.live_stop_video));
      //TODO: 这里需要设置本地视频的属性
      this.engine.enableLocalVideo(true);
      // 创建 SurfaceView 对象。
      //            if (mLocalView == null) {
      //                mLocalView = RtcEngine.CreateRendererView(getBaseContext());
      //                mLocalView.setZOrderMediaOverlay(true);
      //                VideoCanvas localVideoCanvas = new VideoCanvas(mLocalView, VideoCanvas.RENDER_MODE_FIT, liveInfo.getUser_id());
      //                rtcEngine().setupLocalVideo(localVideoCanvas);
      //                rtcEngine().switchCamera();
      //                rtcEngine().switchCamera();
      //            }
    } else {
      // TODO: 这里需要设置本地视频的属性
      // img_video.setImageResource(R.mipmap.ic_video_default);
      // tv_video.setText(getResources().getString(R.string.live_open_video));
      this.engine.enableLocalVideo(false);
      if (this.homeUid === this.liveInfo.user_id.toString()) {
        this.setChannelAttribute("setHomeScreen", undefined);
      }
    }
    this.setupHomeVideo();
  }

  async initMute() {
    const perms =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const result = await check(perms);
    if (
      this.liveInfo &&
      this.liveInfo.role === "audience" &&
      this.liveInfo.settings.mute
    ) {
      this.engine.setClientRole(ClientRoleType.ClientRoleAudience);
    } else {
      this.engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    }
    if (
      this.liveInfo.state === "preparing" ||
      this.liveInfo.state === "streaming"
    ) {
      if (
        this.liveInfo.state === "preparing" &&
        this.liveInfo.role === "audience"
      ) {
        if (!this.isPlayMusic) {
          this.isPlayMusic = true;
          this.engine.startAudioMixing(
            "https://static.acecamptech.com/system/live/waitingroom.mp3",
            true,
            -1,
            0
          );
        }
        this.engine.muteAllRemoteAudioStreams(true);
        this.engine.muteLocalVideoStream(true);
        this.engine.muteAllRemoteVideoStreams(true);
        this.engine.muteLocalAudioStream(true); //不推本地音频流
      } else {
        this.isPlayMusic = false;
        this.engine.stopAudioMixing();
        this.engine.muteAllRemoteAudioStreams(false);
        this.engine.muteLocalVideoStream(false);
        this.engine.muteAllRemoteVideoStreams(false);
        if (this.liveInfo.settings.mute) {
          this.engine.muteLocalAudioStream(true);
          if (
            this.liveInfo.role === "audience" &&
            !this.liveInfo.settings.manage_mute
          ) {
            if (
              this.liveInfo.settings.hands_up != null &&
              this.liveInfo.settings.hands_up != "null"
            ) {
              //TODO: 这里需要设置本地视频的属性
              // img_voice.setImageResource(R.mipmap.ic_hand_up_ing);
              //   tv_voice.setText(getResources().getString(R.string.live_hand_up));
            } else {
              //TODO: 这里需要设置本地视频的属性
              // img_voice.setImageResource(R.mipmap.ic_can_hand);
              // tv_voice.setText(getResources().getString(R.string.live_can_hand));
            }
          } else {
            //TODO: 这里需要设置本地视频的属性
            // img_voice.setImageResource(R.mipmap.ic_voice_default);
            // tv_voice.setText(getResources().getString(R.string.live_unmute));
          }
        } else {
          if (result === RESULTS.GRANTED) {
            //有权限
            this.engine.muteLocalAudioStream(false);
            //TODO: 这里需要设置本地视频的属性
            // img_voice.setImageResource(R.mipmap.ic_voice_active);
            // tv_voice.setText(getResources().getString(R.string.live_mute));
          } else {
            //无权限
            const rationale = {
              title: t(this.Variables, "common_tips"),
              message: t(this.Variables, "dialog_permission_need_mic"),
              buttonPositive: t(this.Variables, "common_ok_more"),
              buttonNegative: t(this.Variables, "common_cancel"),
            };
            const requestResult = await request(perms, rationale);
            // EasyPermissions.requestPermissions(this, getResources().getString(R.string.dialog_permission_need_mic), REQUEST_VOICE, perms);
          }
        }
      }
    } else {
      if (!this.isPlayMusic && this.liveInfo.role !== "broadcaster") {
        this.isPlayMusic = true;
        this.engine.startAudioMixing(
          "https://static.acecamptech.com/system/live/waitingroom.mp3",
          true,
          -1,
          0
        );
      }
      this.engine.muteAllRemoteAudioStreams(true);
      this.engine.muteLocalVideoStream(true);
      this.engine.muteAllRemoteVideoStreams(true);
      this.engine.muteLocalAudioStream(true);
      if (this.liveInfo.settings.mute) {
        if (
          this.liveInfo.role === "audience" &&
          this.liveInfo.settings.manage_mute
        ) {
          if (
            this.liveInfo.settings.hands_up &&
            this.liveInfo.settings.hands_up !== "null"
          ) {
            //TODO: 这里需要设置本地视频的属性
            // img_voice.setImageResource(R.mipmap.ic_hand_up_ing);
            // tv_voice.setText(getResources().getString(R.string.live_hand_up));
          } else {
            //TODO: 这里需要设置本地视频的属性
            // img_voice.setImageResource(R.mipmap.ic_can_hand);
            // tv_voice.setText(getResources().getString(R.string.live_can_hand));
          }
        } else {
          //TODO: 这里需要设置本地视频的属性
          // img_voice.setImageResource(R.mipmap.ic_voice_default);
          // tv_voice.setText(getResources().getString(R.string.live_unmute));
        }
      } else {
        if (result === RESULTS.GRANTED) {
          //有权限
          //TODO: 这里需要设置本地视频的属性
          // img_voice.setImageResource(R.mipmap.ic_voice_active);
          // tv_voice.setText(getResources().getString(R.string.live_mute));
        } else {
          //无权限
          const rationale = {
            title: t(this.Variables, "common_tips"),
            message: t(this.Variables, "dialog_permission_need_mic"),
            buttonPositive: t(this.Variables, "common_ok_more"),
            buttonNegative: t(this.Variables, "common_cancel"),
          };
          const requestResult = await request(perms, rationale);
          // EasyPermissions.requestPermissions(this, getResources().getString(R.string.dialog_permission_need_mic), REQUEST_VOICE, perms);
        }
      }
    }
  }
  async monitor(liveId: string) {
    //角色为主持人的时候查询监控链接
    // https://api.ca3test.com/api/v1/agoras/con_calls/monitor 使用fetch查询监控链接
    const cookies = await AsyncStorage.getItem("cookies");
    const params = {
      live_id: this.liveId,
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/con_calls/monitor?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      const monitorUrl = data.data;
      this.liveInfo.monitor = monitorUrl;
      DeviceEventEmitter.emit(
        EventTypeEnum.REFRESH_LiveMemberDialog,
        this.liveInfo
      );
    }
  }

  sendChannelMessage(groupId: string, msg: string, isPublic: boolean) {
    const msgStr = JSON.stringify({
      action: "chat",
      channel: this.liveInfo.rtm.channel,
      content: msg,
      groupId: groupId,
      isPublic: isPublic,
    });
    const rtmMsg: RtmMessage = new RtmMessage(msg);
    this.rtmEngine
      .sendMessage(this.liveInfo.rtm.channel, rtmMsg, {
        enableOfflineMessaging: true,
        enableHistoricalMessaging: true,
      })
      .then(() => {
        if (isPublic) {
          this.savePublicMsg(
            groupId,
            this.liveInfo.user_id.toString(),
            msg,
            new Date().getTime()
          );
        } else {
          this.saveMessage(
            groupId,
            this.liveInfo.user_id.toString(),
            msg,
            new Date().getTime()
          );
        }
      });
  }

  savePublicMsg(groupId: string, sendUid: string, msg: string, time: number) {
    let chatMessages: Object[] =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "public_chat_message_list" + this.liveInfo.user_id
      ];

    if (chatMessages) {
      chatMessages.push({
        groupId: groupId,
        sendUid: sendUid,
        msg: msg,
        time: time,
      });
    } else {
      chatMessages = [];
      chatMessages.push({
        groupId: groupId,
        sendUid: sendUid,
        msg: msg,
        time: time,
      });
    }
    const attribute: LiveAttribute = this.Variables[
      UrlUtil.SP_LIVE_NAME_SPACE + this.liveId
    ]["live_" + sendUid] as LiveAttribute;
    if (!attribute) {
      this.getPublicAttribute(sendUid);
    }
  }
  //保存消息
  saveMessage(groupId: string, sendUid: string, msg: string, time: number) {
    let chatMessageBeans: ChatMessageBean[] = this.Variables[
      UrlUtil.SP_LIVE_NAME_SPACE + this.liveId
    ]["chat_member_list" + this.liveInfo.user_id] as ChatMessageBean[];
    if (chatMessageBeans) {
      let has: boolean = false;
      for (var i = 0; i < chatMessageBeans.length; i++) {
        if (chatMessageBeans[i].groupId === groupId) {
          chatMessageBeans[i].lastMsg = msg;
          chatMessageBeans[i].readNum = chatMessageBeans[i].readNum + 1;
          chatMessageBeans[i].chatMessages.push({
            groupId: groupId,
            sendUid: sendUid,
            msg: msg,
            time: time,
          });
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "chat_member_list" + this.liveInfo.user_id
          ] = chatMessageBeans;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: {
              ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
            },
          });
          // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
          // LiveEventBus.get("REFRESH_MSG_DETAIL" + groupId).post(chatMessageBeans.get(i));
          has = true;
        }
      }
      if (!has) {
        const chatMessageBean: ChatMessageBean = {};
        chatMessageBean.groupId = groupId;
        chatMessageBean.lastMsg = msg;
        chatMessageBean.readNum = 1;
        const chatMessages: ChatMessage[] = [];
        chatMessages.push({
          groupId: groupId,
          sendUid: sendUid,
          msg: msg,
          time: time,
        });
        chatMessageBean.chatMessages = chatMessages;
        if (groupId === this.liveInfo.user_id.toString()) {
          chatMessageBean.groupName = t(this.Variables, "live_host_team");
          chatMessageBeans.push(chatMessageBean);
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "chat_member_list" + this.liveInfo.user_id
          ] = chatMessageBeans;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: {
              ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
            },
          });
          // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
          // LiveEventBus.get("REFRESH_MSG_DETAIL" + groupId).post(chatMessageBean);
        } else {
          const attribute: LiveAttribute = this.Variables[
            UrlUtil.SP_LIVE_NAME_SPACE + this.liveId
          ]["live_" + groupId] as LiveAttribute;
          if (attribute && attribute.name) {
            chatMessageBean.groupName = attribute.name;
            chatMessageBean.user_score = attribute.user_score;
            chatMessageBean.logo = attribute.logo;
            chatMessageBeans.push(chatMessageBean);
            this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
              "chat_member_list" + this.liveInfo.user_id
            ] = chatMessageBeans;
            this.setGlobalVariableValue({
              key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
              value: {
                ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
              },
            });
            // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
            // LiveEventBus.get("REFRESH_MSG_DETAIL" + groupId).post(chatMessageBean);
          } else {
            this.getUserAttribute(chatMessageBeans, chatMessageBean);
          }
        }
      }
    } else {
      chatMessageBeans = [];
      const chatMessageBean: ChatMessageBean = {};
      chatMessageBean.groupId = groupId;
      chatMessageBean.lastMsg = msg;
      chatMessageBean.readNum = 1;
      const chatMessages: ChatMessage[] = [];
      chatMessages.push({
        groupId: groupId,
        sendUid: sendUid,
        msg: msg,
        time: time,
      });
      chatMessageBean.chatMessages = chatMessages;
      if (groupId === this.liveInfo.user_id.toString()) {
        chatMessageBean.groupName = t(this.Variables, "live_host_team");
        chatMessageBeans.push(chatMessageBean);
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "chat_member_list" + this.liveInfo.user_id
        ] = chatMessageBeans;
        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: {
            ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
          },
        });
        // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
        // LiveEventBus.get("REFRESH_MSG_DETAIL" + groupId).post(chatMessageBean);
      } else {
        const attribute: LiveAttribute = this.Variables[
          UrlUtil.SP_LIVE_NAME_SPACE + this.liveId
        ]["live_" + groupId] as LiveAttribute;
        if (attribute && attribute.name) {
          chatMessageBean.groupName = attribute.name;
          chatMessageBean.user_score = attribute.user_score;
          chatMessageBean.logo = attribute.logo;
          chatMessageBeans.push(chatMessageBean);
          this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
            "chat_member_list" + this.liveInfo.user_id
          ] = chatMessageBeans;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: {
              ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
            },
          });
          // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
          // LiveEventBus.get("REFRESH_MSG_DETAIL" + groupId).post(chatMessageBean);
        } else {
          this.getUserAttribute(chatMessageBeans, chatMessageBean);
        }
      }
    }
    this.getReadNum(chatMessageBeans);
  }

  getReadNum(chatMessageBeans: ChatMessageBean[]) {
    let num = 0;
    for (const chatMessageBean of chatMessageBeans) {
      num += chatMessageBean.readNum;
    }
    this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
      "un_read_num" + this.liveInfo.user_id
    ] = num;
    this.setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
    });
    // LiveEventBus.get("REFRESH_read_num").post(num);
  }

  getUserAttribute(
    chatMessageBeans: ChatMessageBean[],
    chatMessageBean: ChatMessageBean
  ) {
    this.rtmEngine
      .getUserAttributes(chatMessageBean.groupId)
      .then((rtmAttributes: RtmAttribute[]) => {
        const liveAttribute: LiveAttribute = {};
        for (const rtmAttribute of rtmAttributes) {
          switch (rtmAttribute.key) {
            case "allow_view_count":
              liveAttribute.view_member_count = rtmAttribute.value === "true";
              break;
            case "allow_view_list":
              liveAttribute.view_attendee = rtmAttribute.value === "true";
              break;
            case "allow_view_message":
              liveAttribute.view_message = rtmAttribute.value === "true";
              break;
            case "allow_manage_mute":
              liveAttribute.manage_mute = rtmAttribute.value === "true";
              break;
            case "super_moderator":
              liveAttribute.super_moderator = rtmAttribute.value === "true";
              break;
            case "has_paid":
              liveAttribute.has_paid = rtmAttribute.value === "true";
              break;
            case "sc_organization_name":
              liveAttribute.sc_organization_name = rtmAttribute.value;
              break;
            case "en_organization_name":
              liveAttribute.en_organization_name = rtmAttribute.value;
              break;
            case "logo":
              liveAttribute.logo = rtmAttribute.value;
              chatMessageBean.logo = rtmAttribute.value;
              break;
            case "position_name":
              liveAttribute.position_name = rtmAttribute.value;
              break;
            case "full_name":
              liveAttribute.full_name = rtmAttribute.value;
              break;
            case "nick_name":
              liveAttribute.nick_name = rtmAttribute.value;
              break;
            case "organization_type_id":
              liveAttribute.organization_type_id = rtmAttribute.value;
              break;
            case "name":
              liveAttribute.name = rtmAttribute.value;
              chatMessageBean.groupName = rtmAttribute.value;
              break;
            case "mute":
              liveAttribute.mute = rtmAttribute.value === "true";
              break;
            case "id":
              liveAttribute.user_id = rtmAttribute.value;
              break;
            case "role":
              liveAttribute.role = rtmAttribute.value;
              break;
            case "user_score":
              liveAttribute.user_score = rtmAttribute.value;
              chatMessageBean.user_score = rtmAttribute.value;
              break;
            case "share_screen_id":
              liveAttribute.share_screen_id = rtmAttribute.value;
              break;
            case "card_type":
              liveAttribute.card_type = rtmAttribute.value;
              break;
            case "hands_up":
              liveAttribute.hands_up = rtmAttribute.value;
              break;
          }
        }
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "live_" + chatMessageBean.groupId
        ] = liveAttribute;

        chatMessageBeans.push(chatMessageBean);
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "chat_member_list" + this.liveInfo.user_id
        ] = chatMessageBeans;
        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: {
            ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId],
          },
        });
        // LiveEventBus.get("REFRESH_MSG_LIST").post(1);
        // LiveEventBus.get("REFRESH_MSG_DETAIL" + chatMessageBean.getGroupId()).post(chatMessageBean);
      });
  }

  getPublicAttribute(uid: string) {
    this.rtmEngine.getUserAttributes(uid).then((result: RtmAttribute[]) => {
      const liveAttribute: LiveAttribute = {};
      for (const rtmAttribute of result) {
        switch (rtmAttribute.key) {
          case "allow_view_count":
            liveAttribute.view_member_count = rtmAttribute.value === "true";
            break;
          case "allow_view_list":
            liveAttribute.view_attendee = rtmAttribute.value === "true";
            break;
          case "allow_view_message":
            liveAttribute.view_message = rtmAttribute.value === "true";
            break;
          case "allow_manage_mute":
            liveAttribute.manage_mute = rtmAttribute.value === "true";
            break;
          case "super_moderator":
            liveAttribute.super_moderator = rtmAttribute.value === "true";
            break;
          case "has_paid":
            liveAttribute.has_paid = rtmAttribute.value === "true";
            break;
          case "sc_organization_name":
            liveAttribute.sc_organization_name = rtmAttribute.value;
            break;
          case "en_organization_name":
            liveAttribute.en_organization_name = rtmAttribute.value;
            break;
          case "logo":
            liveAttribute.logo = rtmAttribute.value;
            break;
          case "position_name":
            liveAttribute.position_name = rtmAttribute.value;
            break;
          case "full_name":
            liveAttribute.full_name = rtmAttribute.value;
            break;
          case "nick_name":
            liveAttribute.nick_name = rtmAttribute.value;
            break;
          case "organization_type_id":
            liveAttribute.organization_type_id = rtmAttribute.value;
            break;
          case "name":
            liveAttribute.name = rtmAttribute.value;
            break;
          case "mute":
            liveAttribute.mute = rtmAttribute.value === "true";
            break;
          case "id":
            liveAttribute.user_id = rtmAttribute.value;
            break;
          case "role":
            liveAttribute.role = rtmAttribute.value;
            break;
          case "user_score":
            liveAttribute.user_score = rtmAttribute.value;
            break;
          case "share_screen_id":
            liveAttribute.share_screen_id = rtmAttribute.value;
            break;
          case "card_type":
            liveAttribute.card_type = rtmAttribute.value;
            break;
          case "hands_up":
            liveAttribute.hands_up = rtmAttribute.value;
            break;
        }
      }
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId]["live_" + uid] =
        liveAttribute;
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
        value: { ...this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId] },
      });
    });
  }

  initView() {
    //切换横竖屏
    DeviceEventEmitter.addListener(
      EventTypeEnum.LIVE_SWITCH_SCREEN,
      (data: any) => {
        Orientation.lockToLandscape();
      }
    );
    //切换前后摄像头
    DeviceEventEmitter.addListener(
      EventTypeEnum.LIVE_SWITCH_CAMERA,
      (data: any) => {
        this.engine?.switchCamera();
      }
    );

    //设置主屏
    DeviceEventEmitter.addListener(EventTypeEnum.SET_HOME_SCREEN, (it: any) => {
      this.setState({
        tip_modal_contet: t(this.Variables, "live_set_home_screen"),
        tip_modal_visiable: true,
      });
      this.setChannelAttribute("setHomeScreen", it);
    });

    //主持人发布公告
    DeviceEventEmitter.addListener(
      EventTypeEnum.HOST_TO_SEND_NOTICE,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          announcement: it,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.comapi/v1/agoras/lives/${this.liveId}/announcement`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        this.sendNoticeSuccess(data.data);
      }
    );

    DeviceEventEmitter.addListener(
      EventTypeEnum.HOST_CHANGE_PUBLIC_CHAT,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        let path;
        if (it) {
          path = `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/allow_public_channel`;
        } else {
          path = `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/disallow_public_channel`;
        }
        const response = await fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: cookies,
          },
        });
        const data = await response.json();
        if (data.code === 200) {
          this.sendNoticeSuccess(data.data);
        }
      }
    );

    //创建专家链接
    DeviceEventEmitter.addListener(
      EventTypeEnum.CREATE_EXPERT_LINK,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          name: it,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/experts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
          DeviceEventEmitter.emit(EventTypeEnum.ADD_EXPERT_LINK, data.data);
        }
      }
    );

    //修改专家链接
    DeviceEventEmitter.addListener(
      EventTypeEnum.UPDATE_EXPERT_LINK,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          name: it.name,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/experts/${it.id}`,

          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
          DeviceEventEmitter.emit(EventTypeEnum.ADD_EXPERT_LINK, data.data);
        }
      }
    );

    //删除专家链接
    DeviceEventEmitter.addListener(
      EventTypeEnum.DELETE_EXPERT_LINK,
      async (it: any) => {
        this.setState({
          tip_modal_contet: t(this.Variables, "live_delete_invite_link"),
          tip_modal_visiable: true,
          onConfirm: async () => {
            const cookies = await AsyncStorage.getItem("cookies");
            const response = await fetch(
              `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/experts/${it}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Cookie: cookies,
                },
              }
            );
            const data = await response.json();
            if (data.code === 200) {
              DeviceEventEmitter.emit(EventTypeEnum.ADD_EXPERT_LINK, data.data);
            }
          },
        });
      }
    );

    //呼出全时电话
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_CONNECT_ALL,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          live_id: this.liveId,
          custom: "false",
          title: "",
          phone_number: "",
        };

        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/con_calls/connect`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
          DeviceEventEmitter.emit(EventTypeEnum.CALL_OUT_ALL_CONNECT, 1);
        }
      }
    );

    //挂断全时电话
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_HANG_UP_ALL,
      (it: any) => {
        this.setState({
          tip_modal_title: t(this.Variables, "live_hang_up"),
          tip_modal_confirm_btn: t(this.Variables, "live_hang_up"),
          tip_modal_contet: t(this.Variables, "live_warning_hang_up_after"),
          tip_modal_visiable: true,
          onConfirm: async () => {
            const cookies = await AsyncStorage.getItem("cookies");
            const params = {
              live_id: this.liveId,
              custom: "false",
              phone_number: "",
            };
            const urlParams = new URLSearchParams(params).toString();
            const response = await fetch(
              `https://api.ca3test.com/api/v1/agoras/con_calls/hang_up`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Cookie: cookies,
                },
                body: urlParams,
              }
            );
            const data = await response.json();
            if (data.code === 200) {
              DeviceEventEmitter.emit(EventTypeEnum.CALL_OUT_ALL_HANG_UP, 1);
            }
          },
        });
      }
    );

    //全时电话获取密码
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_ALL_GET_REMIND,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          live_id: this.liveId,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1//agoras/con_calls/password?${urlParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
          }
        );
        const data = await response.json();
        if (data.code === 200 && data.data.description) {
          DeviceEventEmitter.emit(
            EventTypeEnum.CALL_ALL_REMIND,
            data.data.description
          );
        }
      }
    );

    //全时电话输入密码
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_INPUT_CODE_ALL,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          live_id: this.liveId,
          custom: "false",
          phone_number: "",
          code: it,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/con_calls/dtmf`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
        }
      }
    );

    //呼出个人全时电话
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_CONNECT,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          live_id: this.liveId,
          custom: "true",
          title: it.title,
          phone_number: it.phone_number,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/con_calls/connect`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
          DeviceEventEmitter.emit(
            EventTypeEnum.UPDATE_CALL_OUT_LINK,
            data.data
          );
        }
      }
    );
    //挂断个人全时电话
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_HANG_UP,
      (it: any) => {
        this.setState({
          tip_modal_title: t(this.Variables, "live_hang_up"),
          tip_modal_confirm_btn: t(this.Variables, "live_hang_up"),
          tip_modal_contet:
            t(this.Variables, "live_are_you_sure_hang_up") +
            it.title +
            t(this.Variables, "live_are_you_sure_hang_up_call"),
          tip_modal_visiable: true,
          onConfirm: async () => {
            const cookies = await AsyncStorage.getItem("cookies");
            const params = {
              live_id: this.liveId,
              custom: "true",
              phone_number: it.phone_number,
            };
            const urlParams = new URLSearchParams(params).toString();
            const response = await fetch(
              `https://api.ca3test.com/api/v1/agoras/con_calls/hang_up`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Cookie: cookies,
                },
                body: urlParams,
              }
            );
            const data = await response.json();
            if (data.code === 200) {
              DeviceEventEmitter.emit(
                EventTypeEnum.UPDATE_CALL_OUT_HANG_UP,
                data.data.agora_user_id
              );
            }
          },
        });
      }
    );

    //个人全时电话输入密码
    DeviceEventEmitter.addListener(
      EventTypeEnum.CALL_OUT_INPUT_CODE,
      async (it: any) => {
        const cookies = await AsyncStorage.getItem("cookies");
        const params = {
          live_id: this.liveId,
          custom: "true",
          phone_number: it.phone_number,
          code: it.code,
        };
        const urlParams = new URLSearchParams(params).toString();
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/con_calls/dtmf`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookies,
            },
            body: urlParams,
          }
        );
        const data = await response.json();
        if (data.code === 200) {
        }
      }
    );

    //删除文件
    DeviceEventEmitter.addListener(
      EventTypeEnum.DELETE_FILE_HOST,
      (it: any) => {
        this.setState({
          tip_modal_title: t(this.Variables, "common_tips"),
          tip_modal_confirm_btn: t(this.Variables, "common_delete"),
          tip_modal_contet: t(this.Variables, "live_file_delete_sure"),
          tip_modal_visiable: true,
          onConfirm: async () => {
            const cookies = await AsyncStorage.getItem("cookies");
            const response = await fetch(
              `https://api.ca3test.com/api/v1/agoras/lives/${this.liveId}/preview_files/${it}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Cookie: cookies,
                },
              }
            );
            const data = await response.json();
            if (data.code === 200) {
              this.liveInfo.live_preview_files = data.data;
              this.setState((prevState) => ({
                liveInfo: {
                  ...prevState.liveInfo,
                  live_preview_files: data.data,
                },
              }));
              this.setChannelAttribute("setPreviewFiles", it);
            }
          },
        });
      }
    );

    //未读消息数
    DeviceEventEmitter.addListener(
      EventTypeEnum.REFRESH_read_num,
      (it: any) => {
        this.initUnReadNum();
      }
    );

    //支付成功
    DeviceEventEmitter.addListener(
      EventTypeEnum.buyMeetingResult,
      (it: any) => {
        this.data.has_transaction_password = true;
        this.setGlobalVariableValue({
          key: "user_info",
          value: { ...this.data },
        });
        this.getLiveToken(this.liveId, this.liveToken);
      }
    );

    DeviceEventEmitter.addListener(
      EventTypeEnum.HOST_TO_MEMBER_CHANGE,
      (it: any) => {
        switch (it.type) {
          case "1": //查看详细资料
            // TODO: 开发MemberInfoDialog
            // MemberInfoDialog.newInstance(it.getLogo(), it.getName(),
            //         it.getCompanyName(), DictUtil.getNameById(DictUtil.DICT_ORGANIZATION_TYPES, it.getIdentity()), it.getPosition()).show(this);
            break;
          case "2": //静音or解除静音
            if (it.status) {
              this.sendPeerMessage(it.uid, "muteVolume");
              this.setMemberInfo(this.liveId, it.uid, "mute");
            } else {
              this.sendPeerMessage(it.uid, "unmuteVolume");
              this.setMemberInfo(this.liveId, it.uid, "unmute");
            }
            break;
          case "3": //停止嘉宾共享
            this.setState({
              tip_modal_title: t(this.Variables, "common_tips"),
              tip_modal_confirm_btn: t(this.Variables, "common_ok_more"),
              tip_modal_contet: t(this.Variables, "live_sure_stop_share"),
              tip_modal_visiable: true,
              onConfirm: () => {
                this.sendPeerMessage(it.uid, "stopUserShareScreen");
              },
            });

            break;
          case "4": //停止嘉宾视频
            this.setState({
              tip_modal_title: t(this.Variables, "common_tips"),
              tip_modal_confirm_btn: t(this.Variables, "common_ok_more"),
              tip_modal_contet: t(this.Variables, "live_sure_stop_video"),
              tip_modal_visiable: true,
              onConfirm: () => {
                this.sendPeerMessage(it.uid, "stopUserVideo");
              },
            });
            break;
          case "5": //转为嘉宾or撤销嘉宾
            if (it.status) {
              this.sendPeerMessage(it.uid, "toExpert");
              this.setMemberInfo(this.liveId, it.uid, "to_expert");
            } else {
              this.setState({
                tip_modal_title: t(this.Variables, "common_tips"),
                tip_modal_confirm_btn: t(this.Variables, "common_ok_more"),
                tip_modal_contet: t(
                  this.Variables,
                  "live_sure_expert_to_audience"
                ),
                tip_modal_visiable: true,
                onConfirm: () => {
                  this.sendPeerMessage(it.uid, "toAudience");
                  this.setMemberInfo(this.liveId, it.uid, "to_audience");
                },
              });
            }
            break;
          case "6": //转为主持人
            this.setState({
              tip_modal_title: t(this.Variables, "common_tips"),
              tip_modal_confirm_btn: t(this.Variables, "common_ok_more"),
              tip_modal_contet:
                t(this.Variables, "live_are_you_sure_trans_host") +
                it.name +
                t(this.Variables, "live_are_you_sure_tras_host_right"),
              tip_modal_visiable: true,
              onConfirm: () => {
                this.sendPeerMessage(it.uid, "toBroadcaster");
                this.setMemberInfo(this.liveId, it.uid, "transfer_broadcaster");
                this.liveInfo.role = "audience";
                this.liveInfo.settings.mute = true;
                this.liveInfo.settings.view_attendee = false;
                this.liveInfo.settings.view_member_count = false;
                this.liveInfo.settings.view_message = false;
                this.liveInfo.settings.hands_up = "null";
                DeviceEventEmitter.emit(
                  EventTypeEnum.REFRESH_LiveMemberDialog,
                  this.liveInfo
                );
                this.initLive();
                if (this.opLocalVideo) {
                  this.setupLocalVideo();
                }
                this.initMute();
                this.setMemberInfoLocal();
              },
            });
            break;
          case "7": //允许or停止查看观众名单
            this.sendPeerMessage(
              it.uid,
              it.status ? "allowViewAllList" : "stopViewAllList"
            );
            this.setMemberInfo(
              this.liveId,
              it.uid,
              it.status ? "view_attendee" : "unview_attendee"
            );
            break;
          case "8": //允许or停止查看观众提问
            this.sendPeerMessage(
              it.uid,
              it.status ? "allowViewMessage" : "stopViewMessage"
            );
            this.setMemberInfo(
              this.liveId,
              it.uid,
              it.status ? "view_message" : "unview_message"
            );
            break;
          case "9": //允许or停止查看观众数量
            this.sendPeerMessage(
              it.uid,
              it.status ? "allowViewCount" : "stopViewCount"
            );
            this.setMemberInfo(
              this.liveId,
              it.uid,
              it.status ? "view_member_count" : "unview_member_count"
            );
            break;
          case "10": //收回主持人
            this.setState({
              tip_modal_title: t(this.Variables, "common_tips"),
              tip_modal_confirm_btn: t(this.Variables, "common_ok_more"),
              tip_modal_contet: t(this.Variables, "live_sure_back_broadcaster"),
              tip_modal_visiable: true,
              onConfirm: () => {
                const hostListStr: string[] =
                  this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
                    "HOST_LIST"
                  ];
                if (hostListStr && hostListStr.length > 0) {
                  this.sendPeerMessage(hostListStr[0], "recallBroadcaster");
                }
                this.setMemberInfo(this.liveId, it.uid, "recycle_broadcaster");
                this.liveInfo.role = "broadcaster";
                this.liveInfo.settings.mute = false;
                this.liveInfo.settings.view_attendee = true;
                this.liveInfo.settings.view_member_count = true;
                this.liveInfo.settings.view_message = true;
                this.liveInfo.settings.hands_up = "null";
                DeviceEventEmitter.emit(
                  EventTypeEnum.REFRESH_LiveMemberDialog,
                  this.liveInfo
                );

                this.initLive();
                this.initMute();
                this.setMemberInfoLocal();
                this.monitor(this.liveId); //查询监控链接
              },
            });
            break;
          case "11": //发起提问
            //TODO: 开发MemberChatDialog
            // MemberChatDialog.newInstance(it.getChatMessageBean(), this.liveInfo).show(this);
            break;
          case "12": //发送消息
            this.sendChannelMessage(it.uid, it.name, it.status);
            break;
          case "13": //一键移除
            this.setState({
              tip_modal_title: t(this.Variables, "live_sure_remove_no_pay"),
              tip_modal_confirm_btn: t(this.Variables, "live_sure_remove"),
              tip_modal_contet: t(this.Variables, "live_remove_no_join"),
              tip_modal_visiable: true,
              onConfirm: () => {
                this.removeAll(this.liveId);
              },
            });
            break;
          case "14": //发送付费提醒
            this.setState({
              tip_modal_title: t(this.Variables, "common_tips"),
              tip_modal_confirm_btn: t(this.Variables, "common_yes"),
              tip_modal_contet: t(this.Variables, "live_sure_show_remind"),
              tip_modal_visiable: true,
              onConfirm: () => {
                this.payForReminder(this.liveId);
              },
            });

            break;
          case "15": //手放下
            this.sendPeerMessage(it.uid, "handsDown");
            this.setMemberInfo(this.liveId, it.uid, "hands_down");
            break;
          case "16": //停止or允许自由发言
            this.sendPeerMessage(
              it.uid,
              it.status ? "allowManageMute" : "stopManageMute"
            );
            this.setMemberInfo(
              this.liveId,
              it.uid,
              it.status ? "manage_mute" : "unmanage_mute"
            );
            break;
        }
      }
    );
  }
  async payForReminder(liveId: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/kick_reminder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      showToast(t(this.Variables, "operation_success"));
    }
  }
  async removeAll(liveId: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/${liveId}/kicking_all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies,
        },
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      showToast(t(this.Variables, "operation_success"));
    }
  }

  initViewPager() {
    const Variables = GlobalVariables.useValues();
    const setGlobalVariableValue = GlobalVariables.useSetValue();
    let sp_live_data = Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId];
    if (!sp_live_data) {
      sp_live_data = {};
    }
    sp_live_data.setBackgroundUrl =
      this.liveInfo.background != null ? this.liveInfo.background : "";
    setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: sp_live_data,
    });
  }

  initLive() {
    if (!this.liveInfo) return;

    if (this.liveInfo.state === "unprepare") {
      //会议未开始
      if (this.liveInfo.role === "broadcaster") {
        //9.主持人准备会议
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 9);
      } else {
        //1.待主持人开始
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 1);
      }
      this.setupHomeVideo();
    } else if (this.liveInfo.state === "preparing") {
      if (this.liveInfo.role === "broadcaster") {
        //2.主持人开始会议
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 2);
      } else {
        //1.待主持人开始
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 1);
      }
      this.setupHomeVideo();
    } else if (this.liveInfo.state === "streaming") {
      DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 0);
      this.setupHomeVideo();
    } else if (this.liveInfo.state === "pre_stopped") {
      if (
        this.liveInfo.role === "broadcaster" ||
        this.liveInfo.role === "expert"
      ) {
        this.liveInfo.state = "streaming";
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 0);
        this.setupHomeVideo();
      } else {
        this.liveInfo.state = "stopped";
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 3);
      }
    } else if (this.liveInfo.state === "stopped") {
      DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 3);
    }
    this.initMemberCount();
    this.initShowFile();
    this.initNotice();
  }
  initUnReadNum() {
    let num =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
        "un_read_num" + this.liveInfo.user_id
      ];
    if (!num) {
      num = 0;
    }
    let publicNum;
    if (this.liveInfo.allow_public_channel) {
      publicNum =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "public_un_read_num" + this.liveInfo.user_id
        ];
      if (!publicNum) {
        publicNum = 0;
      }
    } else {
      publicNum = 0;
    }
    let allNum = num + publicNum;
    if (allNum > 0) {
      allNum = allNum > 99 ? "99+" : allNum;
    }
    DeviceEventEmitter.emit(EventTypeEnum.ON_READ_NUM_UPDATED, allNum);
  }

  initMemberCount() {
    // ON_MEMBER_NUM_UPDATED
    if (this.liveInfo.settings.view_member_count) {
      // int memberCount = SPUtils.getInstance(SP_LIVE_NAME_SPACE + liveId).getInt("member_count" + liveId, 0);
      let memberCount =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "member_count" + this.liveId
        ];
      if (!memberCount) {
        memberCount = 0;
      }
      if (this.isOnlinePlayer) {
        memberCount = memberCount + 1;
      }
      const call_onlines: LiveAttribute[] =
        this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId][
          "CALL_ONLINE_LIST"
        ];
      if (call_onlines && call_onlines.length > 0) {
        DeviceEventEmitter.emit(
          EventTypeEnum.ON_MEMBER_NUM_UPDATED,
          memberCount + call_onlines.length
        );
      } else {
        DeviceEventEmitter.emit(
          EventTypeEnum.ON_MEMBER_NUM_UPDATED,
          memberCount
        );
      }
    } else {
      DeviceEventEmitter.emit(EventTypeEnum.ON_MEMBER_NUM_UPDATED, 0);
    }
  }

  initShowFile() {}

  initNotice() {}

  async getMeetingPrice(goods_id: string) {
    const cookies = await AsyncStorage.getItem("cookies");

    // Get live token and join channel
    const response = await fetch(
      `https://api.ca3test.com/api/v1/orders?goods_type=Meeting&goods_id=${goods_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );

    const data = await response.json();
    if (data.code === 200) {
      if (data.data.has_paid) {
        //捣乱被踢出
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 10);
        // initLiveUI(10);
      } else {
        //未付费被踢出
        if (data.data && data.data.goods_info) {
          this.meetingPrice = data.data.goods_info.current_price;
        } else {
          this.meetingPrice = 0;
        }
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 8);
      }
    }
  }

  async getEventInfo(eventId: string) {
    const cookies = await AsyncStorage.getItem("cookies");
    const response = await fetch(
      `https://api.ca3test.com/api/v1/events/event_info?id=${eventId}&get_canceled=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );

    const data = await response.json();
    if (data.code === 200) {
      this.eventInfo = data.data;
      DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 11);
    }
  }

  // 设置主屏视图。
  setupHomeVideo() {
    console.log("设置主屏视图---" + this.uidList);
    //这里不知道为啥加
    if (
      this.liveInfo.state === "preparing" &&
      this.liveInfo.role === "audience"
    ) {
      this.livePagers = getLivePagers(
        this.uidList,
        "",
        this.opLocalVideo,
        this.liveInfo.user_id,
        this.liveId
      );
    } else {
      this.livePagers = getLivePagers(
        this.uidList,
        this.homeUid,
        this.opLocalVideo,
        this.liveInfo.user_id,
        this.liveId
      );
    }
  }

  protected setData() {
    const Constants = GlobalVariables.useValues();
    const Variables = Constants;
    if (!this.liveUrl) {
      showToast("直播地址不能为空");
      return;
    }
    this.liveId = UrlUtil.getLiveId(this.liveUrl);
    this.meetingId = UrlUtil.getMeetingId(this.liveUrl);
    this.eventId = UrlUtil.getValueByName(this.liveUrl, "event_id");
    const expert_id = UrlUtil.getValueByName(this.liveUrl, "expert_id");
    const expert_code = UrlUtil.getValueByName(this.liveUrl, "expert_code");

    this.data = Constants["user_info"];
    this.customers = Constants["customer_info"];
    this.liveToken.meeting_id = this.meetingId;
    this.liveToken.user_type = !expert_id ? "user" : "expert";
    this.liveToken.expert_id = !expert_id ? null : expert_id;
    this.liveToken.expert_code = !expert_code ? null : expert_code;
    this.liveToken.demo = this.meetingId === "tutorial";
    if (!expert_id) {
      this.getLiveToken(this.liveId, this.liveToken);
      this.getPrepay();
    } else {
      //专家身份进入
      if (this.flag) {
        this.getLiveToken(this.liveId, this.liveToken);
      } else {
        DeviceEventEmitter.emit(EventTypeEnum.ON_LIVE_UI_UPDATED, 4);
      }
    }
  }

  async getPrepay() {
    const cookies = await AsyncStorage.getItem("cookies");

    // Get live token and join channel
    const response = await fetch(
      `https://api.ca3test.com/api/v1/users/cards?card_type=prepay`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      }
    );

    const data = await response.json();
    if (data.code === 200) {
      DeviceEventEmitter.emit(EventTypeEnum.ON_USER_PREPAYS, data.data);
    }
  }

  leaveAgora() {
    this.leaveChannel();
  }

  setupRemoteVideo(uid: number) {
    if (!this.uidList.includes(uid)) {
      this.uidList.push(uid);
    }
    this.livePagers = getLivePagers(
      this.uidList,
      this.homeUid,
      this.opLocalVideo,
      this.liveInfo.user_id,
      this.liveId
    );
  }

  remoteVideo(uid: number) {
    if (
      this.uidList.includes(uid) &&
      (this.liveInfo.state === "preparing" ||
        this.liveInfo.state === "streaming")
    ) {
      const index = this.uidList.indexOf(uid);
      if (index > -1) {
        this.uidList.splice(index, 1);
      }
      this.livePagers = getLivePagers(
        this.uidList,
        this.homeUid,
        this.opLocalVideo,
        this.liveInfo.user_id,
        this.liveId
      );
    }
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const cookies = await AsyncStorage.getItem("cookies");

    // Get live token and join channel
    const response = await fetch(
      `https://api.ca3test.com/api/v1/agoras/lives/1118057/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
        body: JSON.stringify({
          user_type: "user",
          demo: true,
          get_canceled: true,
          re_registration: false,
          // other required params
        }),
      }
    );
    // {"user_type":"user","demo":true,"get_canceled":true,"re_registration":false}

    const data = await response.json();

    this.setState({
      appId: data.data.app_id,
      channelId: data.data.rtc.channel,
      token: data.data.rtc.token,
      uid: data.data.user_id,
    });
    const { appId } = this.state;
    if (!appId) {
      this.error(`appId is invalid1`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      logConfig: { filePath: this.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone and camera permission
    await askMediaAccess([
      "android.permission.RECORD_AUDIO",
      "android.permission.CAMERA",
    ]);

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // Start preview before joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
    this.joinChannel();
  }

  /**
   * Step 2: joinChannel
   */
  protected async joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      this.error("channelId is invalid");
      return;
    }
    if (uid < 0) {
      this.error("uid is invalid");
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }
  /**
   * 链接状态改变
   * @param connection
   * @param state
   * @param reason
   */
  onConnectionStateChanged(
    connection: RtcConnection,
    state: number,
    reason: number
  ) {
    console.log("onConnectionStateChanged", state, reason);
    if (state == 5 && reason == 3) {
      //被服务器踢出
      this.leaveAgora();
      this.getLiveToken(this.liveId, this.liveToken);
    }
  }

  /**
   * 成功加入频道
   * @param connection
   * @param elapsed
   */
  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    console.log("onJoinChannelSuccess", connection, elapsed);
    const setGlobalVariableValue = GlobalVariables.useSetValue();
    setGlobalVariableValue({
      key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
      value: { living_id: "" },
    });
  }

  /**
   *
   * @param connection 第一帧视频
   * @param remoteUid
   * @param width
   * @param height
   * @param elapsed
   */
  onFirstRemoteVideoFrame(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ) {
    console.log(
      "onFirstRemoteVideoFrame",
      connection,
      remoteUid,
      width,
      height,
      elapsed
    );
  }

  /**
   * 远端视频状态改变
   * @param connection
   * @param remoteUid
   * @param state
   * @param reason
   * @param elapsed
   */
  onRemoteVideoStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ) {
    console.log(
      "onRemoteVideoStateChanged",
      connection,
      remoteUid,
      state,
      reason,
      elapsed
    );
    if (state == 1 || (state == 2 && reason == 6)) {
      //远端视频加入or恢复

      this.setupRemoteVideo(remoteUid);
    }
    if (state == 0 && (reason == 5 || reason == 7)) {
      //远端用户停止发送视频流或远端用户禁用视频模块 OR 远端用户离开频道
      this.remoteVideo(remoteUid);
    }
  }
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ) {
    if (speakers == null || speakers.length < 1) return;
    const oldLiveAttr =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId];

    for (const speaker of speakers) {
      if (speaker.uid == 0) {
        const oldUserInfo = oldLiveAttr["live_" + this.liveInfo.user_id];
        const newUserInfo = {
          ...oldUserInfo,
          volume: speaker.volume,
        };
        oldLiveAttr["live_" + this.liveInfo.user_id] = newUserInfo;

        this.setGlobalVariableValue({
          key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
          value: { ...oldLiveAttr },
        });
      } else {
        if (this.shareScreenId === "") {
          const oldUserInfo = oldLiveAttr["live_" + speaker.uid];
          const newUserInfo = {
            ...oldUserInfo,
            volume: speaker.volume,
          };
          oldLiveAttr["live_" + speaker.uid] = newUserInfo;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: { ...oldLiveAttr },
          });
        } else {
          const oldUserInfo = oldLiveAttr["live_" + speaker.uid];
          // LiveAttribute newAttribute = (LiveAttribute) SPUtils.getInstance(SP_LIVE_NAME_SPACE + liveId).get("live_" + speaker.uid, LiveAttribute.class);
          if (
            oldUserInfo &&
            oldUserInfo.share_screen_id &&
            this.shareScreenId === oldUserInfo.share_screen_id
          ) {
            const shareScreenUserInfo =
              oldLiveAttr["live_" + this.shareScreenId];
            const newUserInfo = {
              ...shareScreenUserInfo,
              volume: speaker.volume,
            };
            oldLiveAttr["live_" + this.shareScreenId] = newUserInfo;
            this.setGlobalVariableValue({
              key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
              value: { ...oldLiveAttr },
            });
          }
          const newUserInfo = {
            ...oldUserInfo,
            volume: speaker.volume,
          };
          oldLiveAttr["live_" + speaker.uid] = newUserInfo;
          this.setGlobalVariableValue({
            key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
            value: { ...oldLiveAttr },
          });
        }
      }
    }
  }

  onNetworkQuality?(
    connection: RtcConnection,
    remoteUid: number,
    txQuality: QualityType,
    rxQuality: QualityType
  ) {
    console.log(
      "onNetworkQuality",
      connection,
      remoteUid,
      txQuality,
      rxQuality
    );
    const oldLiveAttr =
      this.Variables[UrlUtil.SP_LIVE_NAME_SPACE + this.liveId];
    if (remoteUid == 0) {
      const oldUserInfo = oldLiveAttr["live_" + this.liveInfo.user_id];
      const newUserInfo = {
        ...oldUserInfo,
        txQuality: txQuality,
      };
      oldLiveAttr["live_" + this.liveInfo.user_id] = newUserInfo;
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
        value: { ...oldLiveAttr },
      });
    } else {
      const oldUserInfo = oldLiveAttr["live_" + remoteUid];
      const newUserInfo = {
        ...oldUserInfo,
        txQuality: txQuality,
      };
      oldLiveAttr["live_" + remoteUid] = newUserInfo;
      this.setGlobalVariableValue({
        key: UrlUtil.SP_LIVE_NAME_SPACE + this.liveId,
        value: { ...oldLiveAttr },
      });
    }
  }
  onTokenPrivilegeWillExpire?(connection: RtcConnection, token: string) {
    console.log("onTokenPrivilegeWillExpire", connection, token);
    this.refreshToken(this.liveId, token);
  }

  onError(err: ErrorCodeType, msg: string) {
    console.log("onError", err, msg);
    super.onError(err, msg);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    console.log("onUserJoined", remoteUid);

    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
  }

  onVideoDeviceStateChanged(
    deviceId: string,
    deviceType: number,
    deviceState: number
  ) {
    this.info(
      "onVideoDeviceStateChanged",
      "deviceId",
      deviceId,
      "deviceType",
      deviceType,
      "deviceState",
      deviceState
    );
  }

  onLocalVideoStateChanged(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamReason
  ) {
    this.info(
      "onLocalVideoStateChanged",
      "source",
      source,
      "state",
      state,
      "error",
      error
    );
  }

  onRtcStats(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      lastmileDelay: stats.lastmileDelay,
      cpuAppUsage: stats.cpuAppUsage,
      cpuTotalUsage: stats.cpuTotalUsage,
      txPacketLossRate: stats.txPacketLossRate,
    });
  }

  onLocalVideoStats(connection: RtcConnection, stats: LocalVideoStats): void {
    this.setState({
      videoSentBitrate: stats.sentBitrate,
      encodedFrameWidth: stats.encodedFrameWidth,
      encodedFrameHeight: stats.encodedFrameHeight,
      encoderOutputFrameRate: stats.encoderOutputFrameRate,
    });
  }

  onLocalAudioStats(connection: RtcConnection, stats: LocalAudioStats): void {
    this.setState({
      audioSentBitrate: stats.sentBitrate,
    });
  }

  onRemoteVideoStats(connection: RtcConnection, stats: RemoteVideoStats): void {
    const { remoteUserStatsList } = this.state;
    if (stats.uid) {
      remoteUserStatsList.set(stats.uid, {
        remoteVideoStats: stats,
        remoteAudioStats:
          remoteUserStatsList.get(stats.uid)?.remoteAudioStats || {},
      });
    }
  }

  onRemoteAudioStats(connection: RtcConnection, stats: RemoteAudioStats): void {
    const { remoteUserStatsList } = this.state;
    if (stats.uid) {
      remoteUserStatsList.set(stats.uid, {
        remoteVideoStats:
          remoteUserStatsList.get(stats.uid)?.remoteVideoStats || {},
        remoteAudioStats: stats,
      });
    }
  }

  protected renderUsers(): ReactElement | undefined {
    return super.renderUsers();
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    const {
      renderByTextureView,
      setupMode,
      joinChannelSuccess,
      encodedFrameWidth,
      encodedFrameHeight,
      encoderOutputFrameRate,
      remoteUserStatsList,
      lastmileDelay,
      videoSentBitrate,
      audioSentBitrate,
      cpuAppUsage,
      cpuTotalUsage,
      txPacketLossRate,
    } = this.state;
    return (
      <>
        {renderByTextureView ? (
          <RtcTextureView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            canvas={{ ...user, setupMode }}
          />
        ) : (
          <RtcSurfaceView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            zOrderMediaOverlay={user.uid !== 0}
            canvas={{ ...user, setupMode }}
          />
        )}
        {joinChannelSuccess && user.sourceType === 0 && (
          <View style={AgoraStyle.statusBar}>
            <Text style={AgoraStyle.statusBarText}>
              {encodedFrameWidth}x{encodedFrameHeight},{encoderOutputFrameRate}
              fps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              LM Delay: {lastmileDelay}ms
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              VSend: {videoSentBitrate}kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ASend: {audioSentBitrate}kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              CPU: {cpuAppUsage}%/{cpuTotalUsage}%
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              Send Loss: {txPacketLossRate}%
            </Text>
          </View>
        )}
        {joinChannelSuccess && user.sourceType !== 0 && user.uid && (
          <View style={AgoraStyle.statusBar}>
            <Text style={AgoraStyle.statusBarText}>
              VRecv:{" "}
              {
                remoteUserStatsList.get(user.uid)?.remoteVideoStats
                  .receivedBitrate
              }
              kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ARecv:{" "}
              {
                remoteUserStatsList.get(user.uid)?.remoteAudioStats
                  .receivedBitrate
              }
              kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              VLoss:{" "}
              {
                remoteUserStatsList.get(user.uid)?.remoteVideoStats
                  .packetLossRate
              }
              %
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ALoss:{" "}
              {
                remoteUserStatsList.get(user.uid)?.remoteAudioStats
                  .audioLossRate
              }
              %
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              AQuality:{" "}
              {
                QualityType[
                  remoteUserStatsList.get(user.uid)?.remoteAudioStats.quality!
                ]
              }
            </Text>
          </View>
        )}

        <ConfirmDialog
          title={t(this.Variables, "common_tips")}
          message={this.state.tip_modal_contet}
          cancelBtn={this.state.tip_modal_cancel_btn}
          confirmBtn={t(this.Variables, "common_yes")}
          onConfirm={this.state.onConfirm}
          onCancel={this.state.onCancel}
          visible={this.state.tip_modal_visiable}
          negativeBtn={undefined}
          onNegative={undefined}
          type={undefined}
          id={undefined}
          txtAlign={"center"}
        />
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess, renderByTextureView, setupMode } =
      this.state;
    return (
      <>
        {Platform.OS === "android" && (
          <AgoraSwitch
            disabled={!startPreview && !joinChannelSuccess}
            title={`renderByTextureView`}
            value={renderByTextureView}
            onValueChange={(value) => {
              this.setState({ renderByTextureView: value });
            }}
          />
        )}
        <AgoraDivider />
        <AgoraDropdown
          title={"setupMode"}
          items={enumToItems(VideoViewSetupMode)}
          value={setupMode}
          onValueChange={(value) => {
            this.setState({ setupMode: value });
          }}
        />
        {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
          <>
            <AgoraDivider />
            {renderByTextureView ? (
              <RtcTextureView
                style={AgoraStyle.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            ) : (
              <RtcSurfaceView
                style={AgoraStyle.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            )}
          </>
        ) : undefined}
        <AgoraDivider />
      </>
    );
  }
}
