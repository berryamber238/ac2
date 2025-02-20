import React from 'react';
import { LottieAnimation, ScreenContainer, withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Animations from '../config/Animations';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const SplashScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.Brand.appStyle_primary,
          height: 5000,
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View
        onLayout={event => {
          const handler = async () => {
            try {
              await waitUtil({ milliseconds: 5000 });
              if (navigation.canGoBack()) {
                navigation.popToTop();
              }
              navigation.replace('BottomTabNavigator', {
                screen: 'Home',
                params: { screen: 'DrawerNavScreen' },
              });
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.Brand.appStyle_primary,
            height: dimensions.height,
            justifyContent: 'flex-start',
            position: 'absolute',
            width: dimensions.width,
          },
          dimensions.width
        )}
      >
        <LottieAnimation
          autoPlay={true}
          speed={1}
          {...GlobalStyles.LottieAnimationStyles(theme)['Lottie Animation']
            .props}
          loop={false}
          source={imageSource(Animations['data'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.LottieAnimationStyles(theme)['Lottie Animation']
                .style,
              { height: 300, marginTop: 156, width: 300 }
            ),
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
