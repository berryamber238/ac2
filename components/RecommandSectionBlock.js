import React from 'react';
import { Divider, Icon, IconButton, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image, Platform, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as HighlightText from '../custom-files/HighlightText';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import replace from '../global-functions/replace';
import t from '../global-functions/t';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem: {
    id: 2,
    title: '测试专题统计',
    followed: false,
    description:
      '测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计',
    event_count: 1,
    article_count: 3,
    background_image_url:
      'https://image.ca3test.com/spotlight/2/0.8503788390159612.png',
    last_item_updated_at: 1730103979,
  },
  gotoScreen: () => {},
  hideMenu: false,
  highlight: null,
  isLatest: false,
  showActionSheet: () => {},
};

const RecommandSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [pickerValue, setPickerValue] = React.useState('');
  const [showAction, setShowAction] = React.useState(false);
  const [type, setType] = React.useState('报名中');
  const goto = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    debugger;
    props.nav.navigate('BottomTabNavigator', {
      screen: 'Tickets',
      params: { screen: 'LoginScreen' },
    });
  };

  const setLines = a => {
    if (a.nativeEvent.layout) {
      const numberOfLines = Math.ceil((a.nativeEvent.layout.height * 1.2) / 24);
      setNumberOfLines(numberOfLines);
    } else {
      a.nativeEvent.target.measure((x, y, width, height, pageX, pageY) => {
        // 计算行数
        const numberOfLines = Math.ceil(height / 24);
        setNumberOfLines(numberOfLines);
      });
    }
  };

  const test = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    props.showActionSheet('sfasfd');
  };
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.White, paddingTop: 5 },
        dimensions.width
      )}
    >
      {/* 活动✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Event'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Event',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    alignSelf: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      justifyContent: 'space-between',
                      padding: !(props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? 5
                        : undefined,
                    },
                    dimensions.width
                  )}
                >
                  {/* 状态文本-报名中 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'planned'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgb(209, 243, 232)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: 'rgb(63, 202, 185)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'mine_events_register')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-结束 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'finished' &&
                      !(props.dataItem ?? defaultProps.dataItem)?.source
                        ?.playback
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgb(236, 236, 236)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: 'rgb(140, 140, 140)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'mine_events_pass')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-回放 */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.playback ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgba(43, 51, 230, 0.1)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.Brand.appStyle_primary,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'event_play_back')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-living */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'ongoing'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderRadius: 2,
                            justifyContent: 'center',
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Image
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          resizeMode={'center'}
                          source={imageSource(
                            'https://static.acecamptech.com/www/static/media/live.b5c525932c12445797a8.gif'
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              { height: 22, width: 45 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    )}
                  </>
                  {/* 活动主题 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        fontSize: 18,
                        fontFamily: 'System',
                        fontWeight: '700',
                        lineHeight: 24,
                        letterSpacing: 0.2,
                      }}
                      text={`${
                        Platform.OS === 'ios'
                          ? '               '
                          : '            '
                      }${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source?.name,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={2}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  {/* 日期 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: 'rgb(151, 151, 151)',
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginTop: 4,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fromUnixTimestamp(
                      Variables,
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.shown_time,
                      undefined
                    )}
                  </Text>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={20}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
                {/* 图片 */}
                <>
                  {!(type?.length < 10) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 4, marginLeft: 4, marginTop: 3 },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          `${
                            (props.dataItem ?? defaultProps.dataItem)?.source
                              ?.cover_image
                          }`
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { borderRadius: 4, height: 67, width: 100 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 6,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 14,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_events')}
                    </Text>
                  </View>
                  {/* VIP 2 */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.exists_need_pay_meeting ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 2,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '600',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>
                <>
                  {props.hideMenu ?? defaultProps.hideMenu ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { justifyContent: 'flex-end', paddingTop: 5 },
                        dimensions.width
                      )}
                    >
                      <IconButton
                        onPress={() => {
                          try {
                            props.showActionSheet?.(
                              (props.dataItem ?? defaultProps.dataItem)
                                ?.source_id
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.App['Custom Color 11']}
                        icon={'Feather/more-horizontal'}
                        size={18}
                        style={StyleSheet.applyWidth(
                          { marginLeft: 30 },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 专题 */}
      <>
        {!(
          (!(props.dataItem ?? defaultProps.dataItem)?.source_type ||
            (props.dataItem ?? defaultProps.dataItem)?.source_type ===
              'Spotlight') &&
          (props.dataItem ?? defaultProps.dataItem)?.title
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.('Spotlight', undefined);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* 主题 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          { lineHeight: 24 }
                        ),
                        dimensions.width
                      )}
                    >
                      {(props.dataItem ?? defaultProps.dataItem)?.title}
                    </Text>
                  </View>
                  <Utils.CustomCodeErrorBoundary>
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            color: 'rgb(151, 151, 151)',
                            fontFamily: 'System',
                            fontWeight: '700',
                            marginTop: 8,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {(props.dataItem ?? defaultProps.dataItem)?.description}
                    </Text>
                  </Utils.CustomCodeErrorBoundary>
                </View>
                {/* 图片 */}
                <>
                  {!(type?.length < 10) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          height: 67,
                          marginLeft: 4,
                          width: 100,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          `${
                            (props.dataItem ?? defaultProps.dataItem)
                              ?.background_image_url
                          }`
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { borderRadius: 6, height: 67, width: 100 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 4,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'home_special')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.exists_need_pay_meeting ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 4,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 6,
                            paddingRight: 6,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 18,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          alignSelf: 'flex-end',
                          color: palettes.App['Custom Color 11'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {timesAgo(
                      Variables,
                      (props.dataItem ?? defaultProps.dataItem)
                        ?.last_item_updated_at
                    )}
                  </Text>
                  <>
                    {props.hideMenu ?? defaultProps.hideMenu ? null : (
                      <IconButton
                        color={palettes.App['Custom Color 11']}
                        icon={'Feather/more-horizontal'}
                        size={18}
                        style={StyleSheet.applyWidth(
                          { marginLeft: 10 },
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* Divider 2 */}
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 纪要✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Minute'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  /* hidden 'Navigate' action */
                  props.gotoScreen?.(
                    (props.dataItem ?? defaultProps.dataItem)?.source_type,
                    (props.dataItem ?? defaultProps.dataItem)?.source_id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(props.dataItem ?? defaultProps.dataItem)?.source
                        ?.has_article_speech ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: palettes.App['Custom Color 13'],
                              borderRadius: 20,
                              height: 20,
                              justifyContent: 'center',
                              position: 'absolute',
                              top: 1,
                              width: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <Icon
                            color={palettes.Brand.appStyle_primary}
                            name={'Ionicons/volume-high-outline'}
                            size={16}
                          />
                        </View>
                      )}
                    </>
                    {/* 纪要主题 */}
                    <Utils.CustomCodeErrorBoundary>
                      <HighlightText.Component
                        style={{
                          fontSize: 18,
                          fontFamily: 'System',
                          fontWeight: '700',
                          lineHeight: 24,
                          letterSpacing: 0.2,
                          flex: 1,
                        }}
                        text={`${
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.has_article_speech
                            ? '      '
                            : ''
                        }${replace(
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.title,
                          '</?span[^>]*>'
                        )}`}
                        highlight={props.highlight}
                        numberOfLines={2}
                      />
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                  {/* 纪要简介 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        color: 'rgb(151, 151, 151)',
                        fontFamily: 'System',
                        fontWeight: '400',
                        fontSize: 12,
                        marginTop: 4,
                        flex: 1,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.summary,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={20}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 6,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'mine_note_collection')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.free ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 2,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      /* hidden 'Navigate' action */
                      props.showActionSheet?.(
                        (props.dataItem ?? defaultProps.dataItem)?.source_id
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 观点/文章✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Article'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Minute',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* 观点主题 */}
                    <Utils.CustomCodeErrorBoundary>
                      <HighlightText.Component
                        style={{
                          fontSize: 16,
                          fontFamily: 'System',
                          fontWeight: '700',
                          lineHeight: 24,
                          letterSpacing: 0.2,
                        }}
                        text={`${
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.badges?.[0] === 'hot'
                            ? '      '
                            : ''
                        }${replace(
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.title,
                          '</?span[^>]*>'
                        )}`}
                        highlight={props.highlight}
                        numberOfLines={2}
                      />
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                  {/* 观点简介 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        color: 'rgb(151, 151, 151)',
                        fontFamily: 'System',
                        fontWeight: '400',
                        marginTop: 4,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.summary,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={20}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 4,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_vote_point')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.free ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 4,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      goto();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 13,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setShowAction(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 本营观点 */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Opinion'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Opinion',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingBottom: 2,
                    paddingTop: 2,
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  {/* 观点文本-谨慎 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'bearish' &&
                      (props.dataItem ?? defaultProps.dataItem)?.visible
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 21'],
                            borderRadius: 3,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/trending-down'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_3')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 观点文本-正面 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'bullish' &&
                      (props.dataItem ?? defaultProps.dataItem)?.visible
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 12'],
                            borderRadius: 2,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/trending-up'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_1')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 观点文本-中性 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'none' &&
                      (props.dataItem ?? defaultProps.dataItem)?.visible
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 22'],
                            borderRadius: 2,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/activity'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_2')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 观点文本-隐藏 */}
                  <>
                    {!!(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 4'],
                            borderRadius: 2,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/activity'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_2')}
                        </Text>
                      </View>
                    )}
                  </>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={20}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>

                <View
                  onLayout={event => {
                    try {
                      setLines(event);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      paddingTop: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  {/* 本营观点主题 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        fontSize: 18,
                        fontFamily: 'System',
                        fontWeight: '700',
                        lineHeight: 24,
                        letterSpacing: 0.2,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.title,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={2}
                    />
                  </Utils.CustomCodeErrorBoundary>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            {
                              color: [
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value: palettes.App['Custom Color 22'],
                                },
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value:
                                    (props.dataItem ?? defaultProps.dataItem)
                                      ?.source?.expected_trend === 'bearish'
                                      ? palettes.App['Custom Color 21']
                                      : (
                                          props.dataItem ??
                                          defaultProps.dataItem
                                        )?.source?.expected_trend === 'bullish'
                                      ? palettes.App['Custom Color 12']
                                      : palettes.App['Custom Color 22'],
                                },
                              ],
                              fontFamily: 'System',
                              fontWeight: '400',
                              lineHeight: 24,
                              marginRight: null,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.stock_tracing?.expected_change
                        }
                        {'%'}
                      </Text>
                    )}
                  </>
                  {/* Text 2 */}
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            {
                              color: palettes.App.appStyle_black,
                              fontFamily: 'System',
                              fontWeight: '400',
                              lineHeight: 24,
                              marginRight: null,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'XX%'}
                      </Text>
                    )}
                  </>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={15}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 简介 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    padding: (props.dataItem ?? defaultProps.dataItem)?.visible
                      ? undefined
                      : 5,
                    paddingBottom: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* 本营观点简介 */}
                <Utils.CustomCodeErrorBoundary>
                  <HighlightText.Component
                    style={{
                      color: 'rgb(116, 133, 147)',
                      fontFamily: 'System',
                      fontWeight: '400',
                      fontSize: 12,
                    }}
                    text={`${replace(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.content,
                      '</?span[^>]*>'
                    )}`}
                    highlight={props.highlight}
                    numberOfLines={2}
                  />
                </Utils.CustomCodeErrorBoundary>
                <>
                  {(props.dataItem ?? defaultProps.dataItem)?.visible ? null : (
                    <BlurView
                      {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
                      experimentalBlurMethod={'dimezisBlurView'}
                      intensity={20}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                          {
                            bottom: 0,
                            left: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                          }
                        ),
                        dimensions.width
                      )}
                      tint={'light'}
                    />
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 14,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_vote_point')}
                    </Text>
                  </View>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source?.user
                        ?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      goto();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            lineHeight: 14,
                            textAlign: 'left',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setShowAction(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
            </Touchable>
            <>
              {props.isLatest ?? defaultProps.isLatest ? null : (
                <Divider
                  {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                  color={palettes.App['Custom Color 10']}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.DividerStyles(theme)['Divider'].style,
                    dimensions.width
                  )}
                />
              )}
            </>
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(RecommandSectionBlock);
