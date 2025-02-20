import React from 'react';
import { ExpoImage, withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const FetchLoadingBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        { alignItems: 'center', height: '100%', width: '100%' },
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
        source={imageSource(Images['acecampgif95f7bf80'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
            { height: 40, marginTop: 100, width: 40 }
          ),
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(FetchLoadingBlock);
