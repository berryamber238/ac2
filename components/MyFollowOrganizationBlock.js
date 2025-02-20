import React from 'react';
import { ExpoImage, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  item: {
    id: 467,
    logo: 'https://image.ca3test.com/organization/2/0.1129343377138663.jpg?x-oss-process=style/avatar',
    name: 'FengCe',
    stats: { follower_count: 10 },
    description: '万咖壹联',
    industry_ids: [],
    sns_action_flag: { followed: false, following: true },
  },
};

const MyFollowOrganizationBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [following, setFollowing] = React.useState(
    (props.item ?? defaultProps.item)?.sns_action_flag?.following
  );
  const aceCampTestUnfollowOrganizationPOST =
    AceCampTestApi.useUnfollowOrganizationPOST();
  const aceCampTestFollowOrganizationPOST =
    AceCampTestApi.useFollowOrganizationPOST();

  return (
    <View>
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row', padding: 16 },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth({ marginRight: 10 }, dimensions.width)}
        >
          <>
            {!(props.item ?? defaultProps.item)?.logo ? null : (
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(
                  `${(props.item ?? defaultProps.item)?.logo}`
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 40, width: 40 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Image 2 */}
          <>
            {(props.item ?? defaultProps.item)?.logo ? null : (
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(Images['icheadercompany'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 40, width: 40 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
        </View>
        {/* View 2 */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '700',
                letterSpacing: 0.2,
                lineHeight: 20,
              },
              dimensions.width
            )}
          >
            {(props.item ?? defaultProps.item)?.name}
          </Text>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 4'],
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 16,
              },
              dimensions.width
            )}
          >
            {(props.item ?? defaultProps.item)?.stats?.follower_count}{' '}
            {t(Variables, 'mine_follower')}
          </Text>
        </View>
        {/* 关注按钮 */}
        <View style={StyleSheet.applyWidth({ marginTop: 4 }, dimensions.width)}>
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  if (following) {
                    const unfollow_result = (
                      await aceCampTestUnfollowOrganizationPOST.mutateAsync({
                        organization_id: (props.item ?? defaultProps.item)?.id,
                      })
                    )?.json;
                    if (unfollow_result?.code !== 200) {
                      return;
                    }
                  } else {
                    const follow_result = (
                      await aceCampTestFollowOrganizationPOST.mutateAsync({
                        organization_id: (props.item ?? defaultProps.item)?.id,
                      })
                    )?.json;
                    if (follow_result?.code !== 200) {
                      return;
                    }
                  }

                  setFollowing(!following);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            {/* 互相关注 */}
            <>
              {!(
                following &&
                (props.item ?? defaultProps.item)?.sns_action_flag?.followed
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 4'],
                      borderRadius: 4,
                      height: 24,
                      justifyContent: 'center',
                      width: 70,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_each_follow')}
                  </Text>
                </View>
              )}
            </>
            {/* 已关注 */}
            <>
              {!(
                !(props.item ?? defaultProps.item)?.sns_action_flag?.followed &&
                following
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 4'],
                      borderRadius: 4,
                      height: 24,
                      justifyContent: 'center',
                      width: 70,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_followed')}
                  </Text>
                </View>
              )}
            </>
            {/* 关注 */}
            <>
              {!(
                (props.item ?? defaultProps.item)?.sns_action_flag?.followed &&
                !following
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      height: 24,
                      justifyContent: 'center',
                      width: 70,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_follow')}
                  </Text>
                </View>
              )}
            </>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default withTheme(MyFollowOrganizationBlock);
