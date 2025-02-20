import React from 'react';
import {
  Divider,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import DailyUpdateFeedsBlock from '../components/DailyUpdateFeedsBlock';
import DailyUpdateOverallBlock from '../components/DailyUpdateOverallBlock';
import DailyUpdateSpotlightBlock from '../components/DailyUpdateSpotlightBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const DailyUpdateScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [Article, setArticle] = React.useState(0);
  const [Count, setCount] = React.useState(0);
  const [Event, setEvent] = React.useState(0);
  const [Minute, setMinute] = React.useState(0);
  const [Opinion, setOpinion] = React.useState(0);
  const [date_type, setDate_type] = React.useState('recently');
  const [section_type, setSection_type] = React.useState('All');
  const [switchValue, setSwitchValue] = React.useState(false);
  const getCount = data => {
    const allCount =
      (data.Event ? data.Event : 0) +
      (data.Article ? data.Article : 0) +
      (data.Opinion ? data.Opinion : 0) +
      (data.Minute ? data.Minute : 0);
    setCount(allCount);
    setEvent(data.Event ? data.Event : 0);
    setArticle(data.Article ? data.Article : 0);
    setOpinion(data.Opinion ? data.Opinion : 0);
    setMinute(data.Minute ? data.Minute : 0);
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Image
        {...GlobalStyles.ImageStyles(theme)['Image'].props}
        resizeMode={'stretch'}
        source={imageSource(Images['bg'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
            height: [
              { minWidth: Breakpoints.Mobile, value: 100 },
              { minWidth: Breakpoints.Mobile, value: safeAreaInsets.top + 100 },
            ],
            position: 'absolute',
            top: 0,
            width: '100%',
          }),
          dimensions.width
        )}
      />
      {/* 标题 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: palettes.App['Custom #ffffff'],
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            marginTop: safeAreaInsets.top,
            paddingLeft: 14,
            paddingRight: 14,
            zIndex: 1000,
          },
          dimensions.width
        )}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { left: 8, position: 'absolute' },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
          >
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
              size={24}
              style={StyleSheet.applyWidth({ left: 16 }, dimensions.width)}
            />
          </Touchable>
        </View>
        {/* Title */}
        <Text
          accessible={true}
          selectable={false}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'auto',
              color: palettes.App['Custom #ffffff'],
              flex: 1,
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 0.2,
              lineHeight: 24,
              marginLeft: 10,
              marginRight: 10,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {t(Variables, 'common_dailyupdate')}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              borderRadius: 14,
              flexDirection: 'row',
              height: 24,
              overflow: 'hidden',
              position: 'absolute',
              right: 16,
              width: 90,
            },
            dimensions.width
          )}
        >
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                if (date_type === 'recently') {
                  setDate_type('recently_week');
                } else {
                  setDate_type('recently');
                }
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.Brand.appStyle_primary,
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value:
                        date_type === 'recently'
                          ? palettes.Brand.appStyle_primary
                          : palettes.App['Custom #ffffff'],
                    },
                  ],
                  height: 24,
                  justifyContent: 'center',
                  width: 45,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom #ffffff'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          date_type === 'recently'
                            ? palettes.App['Custom #ffffff']
                            : palettes.App['Custom Color 45'],
                      },
                    ],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 19.6,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'common_dailyupdate_today')}
              </Text>
            </View>
          </Touchable>

          <Touchable
            onPress={() => {
              try {
                if (date_type === 'recently') {
                  setDate_type('recently_week');
                } else {
                  setDate_type('recently');
                }
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.Brand.appStyle_primary,
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value:
                        date_type === 'recently_week'
                          ? palettes.Brand.appStyle_primary
                          : palettes.App['Custom #ffffff'],
                    },
                  ],
                  height: 24,
                  justifyContent: 'center',
                  width: 45,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom #ffffff'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          date_type === 'recently_week'
                            ? palettes.App['Custom #ffffff']
                            : palettes.App['Custom Color 45'],
                      },
                    ],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 19.6,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'common_dailyupdate_week')}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>

      <AceCampTestApi.FetchFeedsStatisticsGET
        date_type={date_type === 'recently' ? 'day' : 'week'}
        handlers={{
          onData: fetchData => {
            try {
              getCount(fetchData?.data);
            } catch (err) {
              console.error(err);
            }
          },
        }}
      >
        {({ loading, error, data, refetchFeedsStatistics }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 14,
                  paddingTop: 14,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setSection_type('All');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                    .props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_overall')}
                  {'+'}
                  {Count}
                </Text>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  try {
                    setSection_type('Event');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                    .props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'tab_events')}
                  {'+'}
                  {Event}
                </Text>
              </Touchable>
              {/* Touchable 3 */}
              <Touchable
                onPress={() => {
                  try {
                    setSection_type('Minute');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Text 3 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                    .props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_note_collection')}
                  {'+'}
                  {Minute}
                </Text>
              </Touchable>
              {/* Touchable 4 */}
              <Touchable
                onPress={() => {
                  try {
                    setSection_type('Article');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Text 4 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                    .props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'tab_vote_point')}
                  {'+'}
                  {Article}
                </Text>
              </Touchable>
              {/* Touchable 5 */}
              <Touchable
                onPress={() => {
                  try {
                    setSection_type('Spotlight');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { marginRight: 16 },
                  dimensions.width
                )}
              >
                {/* Text 5 */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                    .props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'home_special')}
                  {'+'}
                  {Opinion}
                </Text>
              </Touchable>
            </View>
          );
        }}
      </AceCampTestApi.FetchFeedsStatisticsGET>
      <>
        {section_type === 'All' ? null : (
          <DailyUpdateFeedsBlock date_type={date_type} section={section_type} />
        )}
      </>
      <>
        {!(section_type === 'All') ? null : (
          <DailyUpdateOverallBlock
            date_type={date_type}
            section={section_type}
          />
        )}
      </>
      <>
        {!(section_type === 'Spotlight') ? null : (
          <DailyUpdateSpotlightBlock date_type={date_type} />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(DailyUpdateScreen);
