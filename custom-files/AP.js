import React, { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

export const AudioPlayer = () => {
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: 'https://static.draftbit.com/audio/intro-to-draftbit-audio.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
      });

      TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });

      await TrackPlayer.play();
    })();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return null;
};
