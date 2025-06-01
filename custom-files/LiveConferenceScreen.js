import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import {
  RtcEngine,
  AgoraView,
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  VideoViewSetupMode,
} from "react-native-agora";
import Orientation from "react-native-orientation-locker";
import { useNavigation } from "@react-navigation/native";

const LiveConferenceScreen = ({ route }) => {
  // Extract parameters from route，liveid
  const { liveUrl, from, flag, showImg, liveId } = route.params;
  const navigation = useNavigation();

  // State management
  const [liveInfo, setLiveInfo] = useState(null);
  const [uidList, setUidList] = useState([]);
  const [homeUid, setHomeUid] = useState("");
  const [isLandscape, setIsLandscape] = useState(false);
  const [localVideoEnabled, setLocalVideoEnabled] = useState(false);
  const [localAudioEnabled, setLocalAudioEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conferenceState, setConferenceState] = useState("unprepare"); // unprepared, preparing, streaming, stopped
  const [screenUid, setScreenUid] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [notice, setNotice] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const rtcEngineRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize Agora
  useEffect(() => {
    const initAgora = async () => {
      try {
        // Request permissions
        if (Platform.OS === "android") {
          await requestAndroidPermissions();
        }

        // Initialize RtcEngine
        const engine = createAgoraRtcEngine();
        engine.initialize({
          appId: "a9b90cd983ad4910b82aba3339cf8b23",
          // Should use ChannelProfileLiveBroadcasting on most of cases
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });

        const cookies = await AsyncStorage.getItem("cookies");

        // Get live token and join channel
        const response = await fetch(
          `https://api.ca3test.com/api/v1/agoras/lives/1118055/token`,
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
        console.log("Live token data:", data.data);
        // Enable video
        engine.enableVideo();
        engine.startPreview();
        // Set client role based on user type
        engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

        // Register event handlers
        engine.addListener("onJoinChannelSuccess", (channel, uid, elapsed) => {
          console.log("onJoinChannelSuccess", channel, uid, elapsed);
        });

        engine.addListener("onUserJoined", (uid, elapsed) => {
          console.log("onUserJoined", uid, elapsed);
        });

        engine.addListener("onUserOffline", (uid, reason) => {
          console.log("onUserOffline", uid, reason);
        });

        engine.addListener(
          "onRemoteVideoStateChanged",
          (uid, state, reason, elapsed) => {
            console.log(
              "onRemoteVideoStateChanged",
              uid,
              state,
              reason,
              elapsed
            );
          }
        );

        // Join channel
        engine.joinChannel(
          "006a9b90cd983ad4910b82aba3339cf8b23IACovtJ85DENqistfw/Q1bVPkiyIb21b9NjjaK2b6Ibyd9RibkQsdb78IgBIOcN1NB78ZwQAAQDlzvpnAgDlzvpnAwDlzvpnBADlzvpn",
          "ACE_361855012C_RTC_TESTING",
          0,
          {
            // Make myself as the broadcaster to send stream to remote
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          }
        );
        setLoading(false);
      } catch (error) {
        console.error("Agora initialization failed:", error);
        setError("Failed to initialize video conference");
      }
    };

    initAgora();

    return () => {
      // Cleanup
      if (rtcEngineRef.current) {
        rtcEngineRef.current.destroy();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const onJoinChannelSuccess = (connection, elapsed) => {
    console.log("onJoinChannelSuccess", connection, elapsed);
  };
  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      if (
        granted["android.permission.RECORD_AUDIO"] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted["android.permission.CAMERA"] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Required permissions not granted");
        throw new Error("Permissions not granted");
      }
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };

  const setupEventHandlers = (engine) => {
    console.log("Setting up event handlers");
    // User joined
    engine.addListener("UserJoined", (uid, elapsed) => {
      console.log("UserJoined", uid, elapsed);
      setUidList((prev) => [...prev, uid]);
    });

    engine.addListener("onJoinChannelSuccess", (channel, uid, elapsed) => {
      console.log("onJoinChannelSuccess", channel, uid, elapsed);
    });

    // User offline
    engine.addListener("UserOffline", (uid, reason) => {
      console.log("UserOffline", uid, reason);
      setUidList((prev) => prev.filter((id) => id !== uid));
    });

    // Remote video state changed
    engine.addListener(
      "RemoteVideoStateChanged",
      (uid, state, reason, elapsed) => {
        console.log("RemoteVideoStateChanged", uid, state, reason, elapsed);
        if (state === 1 || (state === 2 && reason === 6)) {
          // Video started or resumed
          setUidList((prev) => [...new Set([...prev, uid])]);
        } else if (state === 0 && (reason === 5 || reason === 7)) {
          // Video stopped
          setUidList((prev) => prev.filter((id) => id !== uid));
        }
      }
    );

    // Audio volume indication
    engine.addListener("AudioVolumeIndication", (speakers, totalVolume) => {
      // Handle volume updates for UI indicators
    });

    // Network quality
    engine.addListener("NetworkQuality", (uid, txQuality, rxQuality) => {
      // Update network quality indicator
      console.log("NetworkQuality", uid, txQuality, rxQuality);
    });

    // Token will expire
    engine.addListener("TokenPrivilegeWillExpire", (token) => {
      refreshToken();
    });

    //消息通知
    engine.addListener(
      "onStreamMessage",
      (connection, remoteUid, streamId, data, length, sentTs) => {
        console.log(
          "onStreamMessage",
          connection,
          remoteUid,
          streamId,
          data,
          length,
          sentTs
        );
        // Handle incoming messages
      }
    );
    console.log("Event handlers set up", engine);
  };

  // 获取直播间的token,暂时使用fetch,直连测试服务器
  // todo: 替换为Api.js文件实现。
  const fetchLiveToken = async () => {
    try {
      setLoading(true);
      // 设置cookie
      const cookies = await AsyncStorage.getItem("cookies");

      // const cookies = `aceid=1728914880.f2086a4ea71e; Hm_lvt_8b0b90b98a9a419fb90141d00647118e=1739973940,1740344530,1740923914,1741336604; user_token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDAwMDQxMiwicmVmcmVzaF9hdCI6MTc0MTk1NzU3NS4zMjY0MTY3LCJleHBpcmVzX2luIjozMTU1Njk1Mn0.vjgUQj70fmCNaRR4kJf2EEKMhtKS-5Hoscw1DEnHxs8; meeting_token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAwMDA0MTIsInVzZXJfdHlwZSI6InVzZXIiLCJsaXZlX2lkIjoxMTE4MDU0fQ.94O1nfv3JprrZ556WhQ6Sikg5e6ryYQHV_0JGGaENNk; _ace_camp_tech_testing_session=kuB2uz4Aa48TYShP%2F1wU6SSjkOoL6XNc5YWideZdUGljTj5t8LvVdUBlO%2FS880IPVpUCLMGc7fG72Rl7Uln0c9nVhVOpTZVWGue5w53NM4HTNj8EQQ2z5BNLXw5FTlnQPu87qPdxJSjh2P%2FIY0IvMH6oNCfO6ELYGORGKhyUl8T6KO3BbpZsOe2ria8xCC6xT58ltf7M--4WTpX4AaQjAoc0b4--RoeraTQYyaMgKZSCD%2FNtsA%3D%3D`;
      const response = await fetch(
        `https://api.ca3test.com/api/v1/agoras/lives/1118055/token`,
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

      setLiveInfo(data.data);

      // Join channels

      setLoading(false);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch live token:", error);
      setError("Failed to join conference");
      setLoading(false);
    }
  };

  const joinChannels = async (liveData) => {
    try {
      // Join RTC channel
      await rtcEngineRef.current.joinChannel(
        liveData.rtc.token,
        liveData.rtc.channel,
        liveData.user_id,
        { clientRoleType: ClientRoleType.ClientRoleBroadcaster }
      );

      // Set client role based on user role
      const clientRole =
        liveData.role === "broadcaster" || liveData.role === "expert"
          ? ClientRoleType.ClientRoleBroadcaster
          : ClientRoleType.ClientRoleAudience;

      await rtcEngineRef.current.setClientRole(clientRole);

      // Initialize UI based on role and state
      initConferenceUI(liveData);
      setupEventHandlers(rtcEngineRef.current);
    } catch (error) {
      console.error("Failed to join channels:", error);
      throw error;
    }
  };

  const initConferenceUI = (liveData) => {
    setConferenceState(liveData.state);

    if (liveData.state === "streaming") {
      startTimer();
    }

    // Setup local video if broadcaster/expert
    if (liveData.role === "broadcaster" || liveData.role === "expert") {
      setupLocalVideo();
    }

    // Update other UI states
    setNotice(liveData.announcement);
    setPreviewFiles(liveData.live_preview_files || []);
    setBackgroundUrl(liveData.background || "");
  };

  const startTimer = () => {
    const startTimestamp = Date.now();
    setStartTime(startTimestamp);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const date = new Date(elapsed);
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");
      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);
  };

  const setupLocalVideo = async () => {
    try {
      await rtcEngineRef.current.enableLocalVideo(true);
      setLocalVideoEnabled(true);
    } catch (error) {
      console.error("Failed to enable local video:", error);
    }
  };

  const toggleLocalVideo = async () => {
    try {
      const newState = !localVideoEnabled;
      await rtcEngineRef.current.enableLocalVideo(newState);
      setLocalVideoEnabled(newState);

      if (!newState && homeUid === liveInfo.user_id.toString()) {
        // If disabling video and was home screen, clear home screen
        setHomeUid("");
      }
    } catch (error) {
      console.error("Failed to toggle local video:", error);
    }
  };

  const toggleLocalAudio = async () => {
    try {
      const newState = !localAudioEnabled;
      await rtcEngineRef.current.enableLocalAudio(newState);
      setLocalAudioEnabled(newState);
      setIsMuted(!newState);
    } catch (error) {
      console.error("Failed to toggle local audio:", error);
    }
  };

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsLandscape(!isLandscape);
  };

  const refreshToken = async () => {
    // Implement token refresh logic
  };

  const leaveConference = async () => {
    try {
      if (rtcEngineRef.current) {
        await rtcEngineRef.current.leaveChannel();
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      navigation.goBack();
    } catch (error) {
      console.error("Failed to leave conference:", error);
    }
  };

  const setAsHomeScreen = (uid) => {
    setHomeUid(uid);
    // Send message to all participants about the new home screen
  };

  const renderVideoViews = () => {
    if (uidList.length === 0 && !localVideoEnabled) {
      return (
        <View style={styles.emptyVideoContainer}>
          <Text style={styles.emptyVideoText}>Waiting for participants...</Text>
        </View>
      );
    }

    const allUids = [...uidList];
    if (localVideoEnabled) {
      allUids.unshift(liveInfo.user_id);
    }

    if (isLandscape) {
      // Landscape layout - main view + small thumbnails
      return (
        <View style={styles.landscapeContainer}>
          {homeUid ? (
            <AgoraView
              style={styles.mainLandscapeView}
              zOrderMediaOverlay={true}
              showLocalVideo={homeUid === liveInfo.user_id.toString()}
              remoteUid={
                homeUid === liveInfo.user_id.toString()
                  ? undefined
                  : parseInt(homeUid)
              }
              mode={1} // VideoCanvas.RENDER_MODE_FIT
            />
          ) : (
            <View style={styles.mainLandscapeView}>
              <Text>No main screen selected</Text>
            </View>
          )}

          <ScrollView horizontal style={styles.thumbnailContainer}>
            {allUids.map((uid) => (
              <TouchableOpacity
                key={uid}
                onPress={() => setAsHomeScreen(uid.toString())}
                style={styles.thumbnailWrapper}
              >
                <RtcSurfaceView
                  zOrderMediaOverlay={user.uid !== 0}
                  canvas={{ ...uid, setupMode: 0 }}
                />
                {uid === liveInfo.user_id && (
                  <Text style={styles.thumbnailLabel}>You</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      // Portrait layout - grid view
      return (
        <FlatList
          data={allUids}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.portraitVideoContainer}>
              {/* <AgoraView
                style={styles.portraitVideoView}
                showLocalVideo={item === liveInfo.user_id}
                remoteUid={item === liveInfo.user_id ? undefined : item}
                mode={1}
              /> */}
              {item === liveInfo.user_id && (
                <Text style={styles.videoLabel}>You</Text>
              )}
              {homeUid === item.toString() && (
                <View style={styles.homeScreenIndicator}>
                  <Text style={styles.homeScreenText}>Main</Text>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={styles.portraitVideoList}
        />
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Joining conference...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchLiveToken}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => leaveConference()}>
          <Image
            source={require("../assets/mipmap/bold.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {liveInfo?.meeting?.event_name || "Conference"}
        </Text>
        <View style={styles.headerRight}>
          <Text style={styles.timerText}>{elapsedTime}</Text>
          <Image
            source={require("../assets/mipmap/ic_signal_level1.png")}
            style={styles.signalIcon}
          />
        </View>
      </View>

      {/* Video Area */}
      <View style={styles.videoContainer}>{renderVideoViews()}</View>

      {/* Notice Banner */}
      {notice && (
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>{notice.content}</Text>
          {liveInfo?.role === "broadcaster" ? (
            <TouchableOpacity onPress={() => deleteNotice()}>
              <Image
                source={require("../assets/mipmap/ic_delete_expert.png")}
                style={styles.noticeIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => dismissNotice()}>
              <Image
                source={require("../assets/mipmap/ic_close_info.png")}
                style={styles.noticeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleLocalAudio}
        >
          <Image
            source={
              isMuted
                ? require("../assets/mipmap/ic_voice_default.png")
                : require("../assets/mipmap/ic_voice_active.png")
            }
            style={styles.controlIcon}
          />
          <Text style={styles.controlText}>{isMuted ? "Unmute" : "Mute"}</Text>
        </TouchableOpacity>

        {(liveInfo?.role === "broadcaster" || liveInfo?.role === "expert") && (
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleLocalVideo}
          >
            <Image
              source={
                localVideoEnabled
                  ? require("../assets/mipmap/ic_video_active.png")
                  : require("../assets/mipmap/ic_video_default.png")
              }
              style={styles.controlIcon}
            />
            <Text style={styles.controlText}>
              {localVideoEnabled ? "Stop Video" : "Start Video"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate("MemberList", { liveInfo })}
        >
          <Image
            source={require("../assets/mipmap/ic_member_search.png")}
            style={styles.controlIcon}
          />
          <Text style={styles.controlText}>Members ({memberCount})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate("Chat", { liveInfo })}
        >
          <Image
            source={require("../assets/mipmap/ic_live_chat.png")}
            style={styles.controlIcon}
          />
          <Text style={styles.controlText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate("MoreOptions", { liveInfo })}
        >
          <Image
            source={require("../assets/mipmap/ic_live_more.png")}
            style={styles.controlIcon}
          />
          <Text style={styles.controlText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Orientation Toggle (only visible in portrait) */}
      {!isLandscape && (
        <TouchableOpacity
          style={styles.orientationButton}
          onPress={toggleOrientation}
        >
          <Image
            source={require("../assets/mipmap/ic_full_screen.png")}
            style={styles.orientationIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#2B33E6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    marginRight: 8,
  },
  signalIcon: {
    width: 24,
    height: 24,
    tintColor: "#4CAF50",
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  emptyVideoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyVideoText: {
    color: "#fff",
    fontSize: 18,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: "row",
  },
  mainLandscapeView: {
    flex: 1,
    backgroundColor: "#333",
  },
  thumbnailContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 120,
  },
  thumbnailWrapper: {
    width: 160,
    height: 120,
    marginRight: 8,
    position: "relative",
  },
  thumbnailView: {
    flex: 1,
    backgroundColor: "#555",
  },
  thumbnailLabel: {
    position: "absolute",
    bottom: 4,
    left: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: 2,
    fontSize: 12,
  },
  portraitVideoList: {
    padding: 8,
  },
  portraitVideoContainer: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: "50%",
    padding: 4,
    position: "relative",
  },
  portraitVideoView: {
    flex: 1,
    backgroundColor: "#555",
  },
  videoLabel: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: 4,
    fontSize: 12,
  },
  homeScreenIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(43,51,230,0.8)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  homeScreenText: {
    color: "#fff",
    fontSize: 12,
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(43,51,230,0.9)",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  noticeText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  noticeIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
    marginLeft: 8,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  controlButton: {
    alignItems: "center",
    minWidth: 60,
  },
  controlIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    marginBottom: 4,
  },
  controlText: {
    color: "#fff",
    fontSize: 12,
  },
  orientationButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  orientationIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});

export default LiveConferenceScreen;
