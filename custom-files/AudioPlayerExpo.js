import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { IconButton } from '@draftbit/ui';
import Slider from '@react-native-community/slider';
import msToTime from '../global-functions/msToTime';
import timeToMs from '../global-functions/timeToMs';
import imageSource from '../utils/imageSource';
import Images from '../config/Images';
import useWindowDimensions from '../utils/useWindowDimensions';
import * as StyleSheet from '../utils/StyleSheet';
import DropDownPicker from 'react-native-dropdown-picker';
import palettes from '../themes/palettes';

export const AudioPlayer = ({ uri, subPosition, setSubPosition }) => {
  const dimensions = useWindowDimensions();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('1');
  const [items, setItems] = React.useState([
    { label: '0.6x', value: '0.6' },
    { label: '1x', value: '1' },
    { label: '1.2x', value: '1.2' },
    { label: '1.5x', value: '1.5' },
    { label: '2x', value: '2' },
    { label: '3x', value: '3' },
  ]);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    gotoPosition();
  }, [subPosition]);

  const gotoPosition = () => {
    if (sound) {
      setSliderValue(subPosition);
      sound.setPositionAsync(subPosition);
      sound.playAsync();
      setIsPlaying(true);
    }
  };
  const loadSound = async () => {
    try {
      const sound = new Audio.Sound();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
          setSubPosition(status.positionMillis);
        }
      });

      await sound.loadAsync(
        {
          uri: uri,
        },
        {
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          progressUpdateIntervalMillis: 500,
        },
        // {
        //   shouldPlay: false,
        //   progressUpdateIntervalMillis: 500,
        //   positionMillis: 1,
        // },
        true
      );

      setIsLoading(false);
      setIsError(false);
      setSound(sound);
    } catch (error) {
      console.error('Error loading sound:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekForward = async () => {
    if (sound) {
      let newPosition = position + 30000;
      if (newPosition > duration) newPosition = duration;
      await sound.setPositionAsync(newPosition);
    }
  };

  const seekBackward = async () => {
    if (sound) {
      let newPosition = position - 30000;
      if (newPosition < 0) newPosition = 0;
      await sound.setPositionAsync(newPosition);
    }
  };

  const seekTo = async value => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#F5F8F9',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            zIndex: 500,
            width: '100%',
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
      >
        <Slider
          onValueChange={newSliderValue => {
            const sliderValue = newSliderValue;
            try {
              setSliderValue(sliderValue);
            } catch (err) {
              console.error(err);
            }
          }}
          onSlidingComplete={newSliderValue => {
            sound.setPositionAsync(newSliderValue);
          }}
          step={1000}
          maximumValue={duration}
          minimumValue={0}
          minimumTrackTintColor="#2b33e6"
          maximumTrackTintColor="#C9C9C9"
          value={sliderValue}
          thumbSize={10}
          thumbTintColor="#2b33e6"
          style={{ width: '100%' }}
        />
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: -5,
              zIndex: 500,
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
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 16,
                color: '#c9c9c9',
              },
              dimensions.width
            )}
          >
            {isError ? '00:00:00' : msToTime(position)}
          </Text>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 16,
                color: '#c9c9c9',
              },
              dimensions.width
            )}
          >
            {isError ? '00:00:00' : msToTime(duration)}
          </Text>
        </View>
      </View>
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'start', flexDirection: 'row', zIndex: 900 },
          dimensions.width
        )}
      >
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderSize: 0,
            zIndex: 900,
            paddingLeft: 25,
            width: '100%',
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
            showTickIcon={false}
            onChangeValue={value => {
              sound.setRateAsync(value, false);
            }}
            disabled={isError}
            dropDownContainerStyle={{
              backgroundColor: '#fFFFFF',
              borderWidth: 0.2,
              borderColor: '#c9c9c9',
              width: 80,
              maxHeight: 300,
              zIndex: 900,
              alignItems: 'flex-end',
            }}
            arrowIconStyle={{
              width: 0,
              height: 0,
            }}
            tickIconContainerStyle={{
              marginLeft: 0,
            }}
            textStyle={{
              fontSize: 24,
              fontWeight: 700,
            }}
            listItemLabelStyle={{
              fontSize: 16,
              fontWeight: 400,
              zIndex: 900,
            }}
            style={{
              //alignItem8 s:'flex-end',
              backgroundColor: '#F5F8F9',
              borderWidth: 0,
              width: 80,
            }}
          />
        </View>
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              zIndex: 1000,
            },
            dimensions.width
          )}
        >
          <IconButton
            color={palettes.App['Custom Color 32']}
            icon={'MaterialIcons/replay-30'}
            size={30}
            onPress={seekBackward}
            disabled={isError}
          />
          {/* Icon Button 2 */}
          <IconButton
            color={palettes.Brand.appStyle_primary}
            icon={isPlaying ? 'AntDesign/pause' : 'AntDesign/play'}
            size={45}
            style={StyleSheet.applyWidth(
              { marginLeft: 20, marginRight: 20 },
              dimensions.width
            )}
            onPress={playPauseSound}
            disabled={isError}
          />
          {/* Icon Button 3 */}
          <IconButton
            color={palettes.App['Custom Color 32']}
            icon={'MaterialIcons/forward-30'}
            size={30}
            onPress={seekForward}
            disabled={isError}
          />
        </View>
      </View>
    </View>
  );
};
