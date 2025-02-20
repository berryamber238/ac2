import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
// import { createAgoraRtcEngine } from 'react-native-agora';

export const AgoraComponent = ({
  appId,
  channelName,
  token,
  uid,
  onUserJoined,
  onUserOffline,
}) => {
  const [engine, setEngine] = useState(null);
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('aaa111');
        // const rtcEngine = createAgoraRtcEngine();
        console.log('aaa222.00000');
        // rtcEngine.initialize({ appId: 'a9b90cd983ad4910b82aba3339cf8b23' });
        const appId = 'a9b90cd983ad4910b82aba3339cf8b23';
        this.engine = createAgoraRtcEngine();
        this.engine.initialize({
          appId,
          logConfig: { filePath: this.logFilePath },
          // Should use ChannelProfileLiveBroadcasting on most of cases
          channelProfile: 1,
        });
        console.log('aaa222');
        await askMediaAccess([
          'android.permission.RECORD_AUDIO',
          'android.permission.CAMERA',
        ]);
        console.log('333333');
        // Need to enable video on this case
        // If you only call `enableAudio`, only relay the audio stream to the target channel
        this.engine.enableVideo();
        console.log('4444444');
        // Start preview before joinChannel
        this.engine.startPreview();
        console.log('555555');
      } catch (e) {
        console.log(e);
      }
    };

    init();

    return () => {
      engine?.destroy();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {joined && (
        <RtcLocalView.SurfaceView
          style={{ flex: 1 }}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
      )}
      {remoteUid && (
        <RtcRemoteView.SurfaceView
          style={{ flex: 1 }}
          uid={remoteUid}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
      )}
      <Button title={isMuted ? 'Unmute' : 'Mute'} onPress={toggleMute} />
      <Button
        title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        onPress={toggleCamera}
      />
    </View>
  );
};
