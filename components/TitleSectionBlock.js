import React from 'react';
import { IconButton, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { title: null };

const TitleSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const safeAreaInsets = useSafeAreaInsets();

  return (
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
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 10,
            paddingLeft: 4,
            paddingRight: 4,
            position: 'absolute',
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
              color: palettes.App['Custom #ffffff'],
              flexShrink: 1,
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 0.2,
              lineHeight: 28,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {t(Variables, props.title ?? defaultProps.title)}
        </Text>
      </View>
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
    </View>
  );
};

export default withTheme(TitleSectionBlock);
