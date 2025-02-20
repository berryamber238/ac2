import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const Tags2Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        { flexDirection: 'row', height: 38, marginBottom: 24 },
        dimensions.width
      )}
    >
      {/* Tag Selected Touchable */}
      <Touchable>
        {/* Tag Selected View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: theme.colors.branding.primary,
              borderRadius: 19,
              height: 38,
              justifyContent: 'center',
              marginRight: 12,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 8,
            },
            dimensions.width
          )}
        >
          {/* Tag Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                { color: 'theme.colors["White"]' }
              ),
              dimensions.width
            )}
          >
            {'✅ All'}
          </Text>
        </View>
      </Touchable>
      {/* Tag Unselected Touchable */}
      <Touchable>
        {/* Tag Unselected View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'flex-start',
              borderColor: theme.colors.branding.primary,
              borderRadius: 19,
              borderWidth: 2,
              height: 38,
              justifyContent: 'center',
              marginRight: 12,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 8,
            },
            dimensions.width
          )}
        >
          {/* Tag Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
              dimensions.width
            )}
          >
            {'🎵 Music'}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(Tags2Block);
