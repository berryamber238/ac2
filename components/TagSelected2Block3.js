import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const TagSelected2Block3 = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
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
  );
};

export default withTheme(TagSelected2Block3);
