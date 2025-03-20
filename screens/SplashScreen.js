import React from 'react';
import { LottieAnimation, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import Animations from '../config/Animations';
import * as GlobalVariables from '../config/GlobalVariableContext';
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
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasBottomSafeArea={true}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.Brand.appStyle_primary,
          height: 5000,
          justifyContent: 'space-between',
          paddingBottom: 32,
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View
        onLayout={event => {
          const handler = async () => {
            try {
              await waitUtil({ milliseconds: 3000 });
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
            justifyContent: 'flex-start',
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
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: safeAreaInsets.bottom && 32,
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text Title'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text Title'].style,
              {
                color: 'rgba(255, 255, 255, 0.74)',
                fontSize: Constants['current_lang'] === 'CN' ? 18 : 15,
                lineHeight: 24,
                marginRight: null,
              }
            ),
            dimensions.width
          )}
        >
          {Constants['current_lang'] === 'CN'
            ? '您的资本市场灵感大本营！'
            : 'AceCamp For Your Capital Market Inspiration!'}
        </Text>
        {/* Text 2 */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['12 Regular'].style,
              {
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: 0.4,
                marginTop: 16,
              }
            ),
            dimensions.width
          )}
        >
          {'Copyright © 2020-2022 AceCamp本营'}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
