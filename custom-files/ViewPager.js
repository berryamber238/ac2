import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RtcEngine, AgoraView } from "react-native-agora";
import FastImage from "react-native-fast-image";

const ViewPager = ({
  channelName,
  uid,
  isBroadcaster,
  remoteUsers,
  localVideoEnabled,
  onSwitchCamera,
  onSetHomeScreen,
  backgroundImageUrl,
}) => {
  const [isLocalVideoMuted, setIsLocalVideoMuted] = useState(false);
  const [isLocalAudioMuted, setIsLocalAudioMuted] = useState(false);
  const [activeSpeakers, setActiveSpeakers] = useState({});
  const [userAttributes, setUserAttributes] = useState({});

  const rtcEngineRef = useRef(null);

  // 初始化 Agora SDK
  useEffect(() => {
    const initRtcEngine = async () => {
      try {
        const engine = await RtcEngine.create("YOUR_APP_ID");
        await engine.enableVideo();
        await engine.setChannelProfile(1); // LIVE_BROADCASTING
        await engine.setClientRole(isBroadcaster ? 1 : 2); // 1=BROADCASTER, 2=AUDIENCE

        // 设置事件监听
        engine.addListener("UserJoined", (uid, elapsed) => {
          console.log("UserJoined", uid);
        });

        engine.addListener("UserOffline", (uid, reason) => {
          console.log("UserOffline", uid);
        });

        engine.addListener("ActiveSpeaker", (uid) => {
          setActiveSpeakers((prev) => ({ ...prev, [uid]: true }));
        });

        rtcEngineRef.current = engine;

        // 加入频道
        await engine.joinChannel(null, channelName, null, uid);

        if (isBroadcaster && localVideoEnabled) {
          await engine.startPreview();
        }
      } catch (e) {
        console.error("初始化 Agora SDK 失败:", e);
      }
    };

    initRtcEngine();

    return () => {
      if (rtcEngineRef.current) {
        rtcEngineRef.current.leaveChannel();
        RtcEngine.destroy();
      }
    };
  }, [channelName, uid, isBroadcaster, localVideoEnabled]);

  // 切换摄像头
  const handleSwitchCamera = () => {
    if (rtcEngineRef.current) {
      rtcEngineRef.current.switchCamera();
      onSwitchCamera && onSwitchCamera();
    }
  };

  // 设置主屏幕
  const handleSetHomeScreen = (targetUid) => {
    onSetHomeScreen && onSetHomeScreen(targetUid);
  };

  // 根据参会者数量渲染不同布局
  const renderLayout = () => {
    const participants = [...remoteUsers];
    const showLocal = localVideoEnabled && isBroadcaster;

    // 如果只有本地用户
    if (participants.length === 0 && showLocal) {
      return renderSingleLayout(uid, true);
    }

    // 1个远程用户
    if (participants.length === 1) {
      return renderSingleLayout(participants[0], false);
    }

    // 2个远程用户
    if (participants.length === 2) {
      return renderDualLayout(participants);
    }

    // 3个远程用户
    if (participants.length === 3) {
      return renderTripleLayout(participants);
    }

    // 4个远程用户
    if (participants.length === 4) {
      return renderQuadLayout(participants);
    }

    // 默认显示背景图
    return (
      <View style={styles.fullContainer}>
        <FastImage
          source={{ uri: backgroundImageUrl }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  // 单用户全屏布局
  const renderSingleLayout = (userId, isLocal) => {
    return (
      <View style={styles.fullContainer}>
        {isLocal ? (
          <AgoraView
            style={styles.fullVideo}
            zOrderMediaOverlay={true}
            showLocalVideo={true}
            mode={1} // VideoCanvas.RENDER_MODE_FIT
          />
        ) : (
          <AgoraView
            style={styles.fullVideo}
            zOrderMediaOverlay={true}
            remoteUid={userId}
            mode={1} // VideoCanvas.RENDER_MODE_FIT
          />
        )}

        {isBroadcaster && (
          <TouchableOpacity
            style={styles.switchCameraButton}
            onPress={handleSwitchCamera}
          >
            <Image
              source={require("./assets/ic_change_camera.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {userAttributes[userId]?.name || "未设置名称"}
          </Text>
          <Image source={getVoiceIcon(userId)} style={styles.voiceIcon} />
        </View>

        {isBroadcaster && isLocal && (
          <TouchableOpacity
            style={styles.fullScreenButton}
            onPress={() => handleSetHomeScreen(userId)}
          >
            <Image
              source={require("./assets/ic_full_screen.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // 双用户布局 (1和3号位置)
  const renderDualLayout = (users) => {
    return (
      <View style={styles.dualContainer}>
        {/* 1号位置 */}
        <View style={styles.dualTop}>
          <AgoraView style={styles.dualVideo} remoteUid={users[0]} mode={1} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {userAttributes[users[0]]?.name || "未设置名称"}
            </Text>
            <Image source={getVoiceIcon(users[0])} style={styles.voiceIcon} />
          </View>
          {isBroadcaster && (
            <TouchableOpacity
              style={styles.setHomeButton}
              onPress={() => handleSetHomeScreen(users[0])}
            >
              <Text style={styles.setHomeText}>设为主屏</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 3号位置 */}
        <View style={styles.dualBottom}>
          <AgoraView style={styles.dualVideo} remoteUid={users[1]} mode={1} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {userAttributes[users[1]]?.name || "未设置名称"}
            </Text>
            <Image source={getVoiceIcon(users[1])} style={styles.voiceIcon} />
          </View>
          {isBroadcaster && (
            <TouchableOpacity
              style={styles.setHomeButton}
              onPress={() => handleSetHomeScreen(users[1])}
            >
              <Text style={styles.setHomeText}>设为主屏</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 本地视频小窗口 */}
        {localVideoEnabled && isBroadcaster && (
          <View style={styles.localVideoContainer}>
            <AgoraView
              style={styles.localVideo}
              showLocalVideo={true}
              mode={1}
            />
            <TouchableOpacity
              style={styles.switchCameraButtonSmall}
              onPress={handleSwitchCamera}
            >
              <Image
                source={require("./assets/ic_change_camera.png")}
                style={styles.smallIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // 三用户布局
  const renderTripleLayout = (users) => {
    // 类似实现，省略...
  };

  // 四用户布局
  const renderQuadLayout = (users) => {
    // 类似实现，省略...
  };

  // 获取音量图标
  const getVoiceIcon = (userId) => {
    const user = userAttributes[userId];
    if (!user || user.isMute) {
      return require("./assets/ic_voice_mute.png");
    }

    const volume = activeSpeakers[userId] || 0;
    if (volume === 0) {
      return require("./assets/ic_voice_volume_no.png");
    } else if (volume < 50) {
      return require("./assets/ic_voice_volume_1.png");
    } else if (volume < 150) {
      return require("./assets/ic_voice_volume_2.png");
    } else {
      return require("./assets/ic_voice_volume_3.png");
    }
  };

  return <View style={styles.container}>{renderLayout()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  fullContainer: {
    flex: 1,
    position: "relative",
  },
  fullVideo: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  dualContainer: {
    flex: 1,
  },
  dualTop: {
    flex: 1,
    position: "relative",
    marginBottom: 4,
  },
  dualBottom: {
    flex: 1,
    position: "relative",
    marginTop: 4,
  },
  dualVideo: {
    flex: 1,
  },
  localVideoContainer: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 90,
    height: 160,
    zIndex: 10,
  },
  localVideo: {
    flex: 1,
  },
  userInfoContainer: {
    position: "absolute",
    left: 8,
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 13,
    width: 88,
  },
  userName: {
    color: "white",
    fontSize: 12,
    flex: 1,
    marginLeft: 4,
  },
  voiceIcon: {
    width: 18,
    height: 18,
  },
  switchCameraButton: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 10,
  },
  switchCameraButtonSmall: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 10,
  },
  fullScreenButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    zIndex: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  smallIcon: {
    width: 18,
    height: 18,
  },
  setHomeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  setHomeText: {
    color: "white",
    fontSize: 12,
  },
});

export default ViewPager;
