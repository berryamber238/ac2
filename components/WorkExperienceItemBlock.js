import React from 'react';
import { ExpoImage, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { item: {} };

const WorkExperienceItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth({ flexDirection: 'row' }, dimensions.width)}
    >
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', width: 13 },
          dimensions.width
        )}
      >
        <ExpoImage
          allowDownscaling={true}
          cachePolicy={'disk'}
          contentPosition={'center'}
          resizeMode={'cover'}
          transitionDuration={300}
          transitionEffect={'cross-dissolve'}
          transitionTiming={'ease-in-out'}
          {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
          source={imageSource(Images['icringblue'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
              { height: 13, width: 13 }
            ),
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 7'],
              bottom: 0,
              left: 6,
              position: 'absolute',
              right: 6,
              top: 13,
              width: 1,
            },
            dimensions.width
          )}
        />
      </View>
      {/* View 2 */}
      <View style={StyleSheet.applyWidth({ marginLeft: 10 }, dimensions.width)}>
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.Brand.itemTextNomal,
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 14,
            },
            dimensions.width
          )}
        >
          {(props.item ?? defaultProps.item)?.started_at}
          {' - '}
          {(props.item ?? defaultProps.item)?.ended_at}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row', marginTop: 2 },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 13,
                fontWeight: '400',
                letterSpacing: 0.6,
                lineHeight: 15,
              },
              dimensions.width
            )}
          >
            {(props.item ?? defaultProps.item)?.company_name}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.itemTextNomal,
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 14,
                marginLeft: 16,
              },
              dimensions.width
            )}
          >
            {(props.item ?? defaultProps.item)?.position_name}
          </Text>
        </View>
        {/* Text 2 */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.Brand.itemTextNomal,
              fontFamily: 'System',
              fontSize: 12,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 14,
              marginBottom: 16,
              marginTop: 6,
            },
            dimensions.width
          )}
        >
          {(props.item ?? defaultProps.item)?.content}
        </Text>
      </View>
    </View>
  );
};

export default withTheme(WorkExperienceItemBlock);
