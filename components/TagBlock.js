import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const TagBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View style={StyleSheet.applyWidth({ marginRight: 12 }, dimensions.width)}>
      {/* Selected Touchable */}
      <Touchable>
        {/* Tag Selected View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: theme.colors.branding.primary,
              borderColor: theme.colors.branding.primary,
              borderRadius: 19,
              borderWidth: 2,
              height: 38,
              justifyContent: 'center',
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
    </View>
  );
};

export default withTheme(TagBlock);
