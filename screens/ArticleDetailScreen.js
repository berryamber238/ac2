import React from 'react';
import {
  AudioPlayer,
  Button,
  Divider,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  Slider,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as AudioPlayerExpo from '../custom-files/AudioPlayerExpo';
import * as gf from '../custom-files/gf';
import arrayIdToString from '../global-functions/arrayIdToString';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getArticleType from '../global-functions/getArticleType';
import msToTime from '../global-functions/msToTime';
import splitList from '../global-functions/splitList';
import t from '../global-functions/t';
import timeToMs from '../global-functions/timeToMs';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { article_info_id: 70548038 };

const ArticleDetailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [audioUri, setAudioUri] = React.useState('');
  const [current_tab, setCurrent_tab] = React.useState(1);
  const [height, setHeight] = React.useState(0);
  const [hot_data_list, setHot_data_list] = React.useState([]);
  const [isFollowLoading, setIsFollowLoading] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [keypoint, setKeypoint] = React.useState('');
  const [lastKey, setLastKey] = React.useState('0-0');
  const [pickerValue, setPickerValue] = React.useState('');
  const [position, setPosition] = React.useState(0);
  const [recommand_data_list, setRecommand_data_list] = React.useState([]);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [subData, setSubData] = React.useState([]);
  const gotoPosition = startms => {
    setPosition(parseFloat(startms) * 1000);
  };
  const textRefs = React.useRef({});
  const handlePress = (outerIndex, innerIndex) => {
    const key = `${outerIndex}-${innerIndex}`;
    if (textRefs.current[key]) {
      textRefs.current[key].setNativeProps({
        style: { color: 'red' },
      });
    }
  };

  const updatePosition = async newPosition => {
    const p = newPosition / 1000;
    const outerIndex = subData.findIndex(item => parseFloat(item.end_ms) > p);
    const innerIndex = subData[outerIndex].contents.findIndex(
      item => parseFloat(item.end_ms) > p
    );
    const key = `${outerIndex}-${innerIndex}`;
    let lastkey = '';

    await setLastKey(key.toString());

    textRefs.current[key].measure((x, y, width, height, pageX, pageY) => {
      //      console.log('x:', x);
      // console.log('y:', y);
      // console.log('width:', width);
      // console.log('height:', height);
      // console.log('pageX:', pageX);
      // console.log('pageY:', pageY);
    });
    // textRefs.current[key].setNativeProps({
    //   style: { color: 'red' },
    // });
  };
  const aceCampTestFollowOrganizationPOST =
    AceCampTestApi.useFollowOrganizationPOST();
  const aceCampTestUnfollowOrganizationPOST =
    AceCampTestApi.useUnfollowOrganizationPOST();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom #ffffff'] },
        dimensions.width
      )}
    >
      {/* Container */}
      <View
        style={StyleSheet.applyWidth({ minHeight: '100%' }, dimensions.width)}
      >
        <AceCampTestApi.FetchArticleInfoGET
          handlers={{
            onData: fetchData => {
              try {
                console.log(fetchData);
                if (fetchData?.code === 200) {
                  setAudioUri(fetchData?.data?.transcribe?.source_url);
                  setSubData(fetchData?.data?.transcribe?.asr);
                  setIsFollowed(fetchData?.data?.organization?.followed);
                  if (fetchData?.data?.transcribe) {
                  } else {
                    setCurrent_tab(0);
                  }
                } else {
                  navigation.push('BottomTabNavigator', {
                    screen: 'Tickets',
                    params: { screen: 'LoginScreen' },
                  });
                }
              } catch (err) {
                console.error(err);
              }
            },
          }}
          id={
            props.route?.params?.article_info_id ?? defaultProps.article_info_id
          }
          locale={'zh-CN'}
        >
          {({ loading, error, data, refetchArticleInfo }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App.appStyle_white,
                      borderBottomWidth: 1,
                      borderColor: palettes.App['Custom #d8d8d8'],
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 5,
                      paddingLeft: 14,
                      paddingRight: 14,
                      paddingTop: 5,
                      position: 'absolute',
                      width: '100%',
                      zIndex: 1000,
                    },
                    dimensions.width
                  )}
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
                    color={palettes.Brand.appStyle_primary}
                    icon={'AntDesign/left'}
                    size={22}
                  />
                  {/* Title */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      {
                        alignSelf: 'flex-start',
                        flexShrink: 1,
                        fontFamily: 'System',
                        fontSize: 18,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 32,
                        marginLeft: 10,
                        marginRight: 10,
                        textAlign: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    {fetchData?.data?.title}
                  </Text>
                  {/* 分享Btn */}
                  <IconButton
                    color={palettes.Brand.appStyle_primary}
                    icon={'AntDesign/sharealt'}
                    size={22}
                  />
                </View>
                <>
                  {!(fetchData?.code === 200) ? null : (
                    <SimpleStyleScrollView
                      bounces={true}
                      horizontal={false}
                      keyboardShouldPersistTaps={'never'}
                      nestedScrollEnabled={false}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      style={StyleSheet.applyWidth(
                        { flex: 1 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 50, paddingLeft: 14, paddingRight: 14 },
                          dimensions.width
                        )}
                      >
                        <View>
                          {/* 主题 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '700',
                                letterSpacing: 0.2,
                                lineHeight: 28,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.title}
                          </Text>
                        </View>
                        {/* 原创转载信息 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginBottom: 8,
                              marginTop: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {/* 原创 */}
                          <>
                            {fetchData?.data?.repost ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderColor:
                                      palettes.App['Custom Color 21'],
                                    borderRadius: 3,
                                    borderWidth: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App['Custom Color 21'],
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '400',
                                      letterSpacing: 0.2,
                                      lineHeight: 22,
                                      paddingLeft: 5,
                                      paddingRight: 5,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {t(Variables, 'article_detail_repost_self')}
                                </Text>
                              </View>
                            )}
                          </>
                          {/* 转载 */}
                          <>
                            {!fetchData?.data?.repost ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderColor:
                                      palettes.App['Custom Color 28'],
                                    borderRadius: 3,
                                    borderWidth: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App['Custom Color 28'],
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '400',
                                      letterSpacing: 0.2,
                                      lineHeight: 22,
                                      paddingLeft: 5,
                                      paddingRight: 5,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {t(Variables, 'article_detail_repost')}
                                </Text>
                              </View>
                            )}
                          </>
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(88, 101, 115)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 22,
                                marginLeft: 8,
                              },
                              dimensions.width
                            )}
                          >
                            {arrayIdToString(
                              Variables,
                              13,
                              fetchData?.data?.custom_sector_ids,
                              ','
                            )}
                          </Text>
                        </View>
                        {/* 时间 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 25'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 22,
                              },
                              dimensions.width
                            )}
                          >
                            {fromUnixTimestamp(
                              Variables,
                              fetchData?.data?.release_time,
                              'YYYY/MM/DD HH:mm'
                            )}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 25'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 22,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'common_read')}
                            {fetchData?.data?.views}
                            {'  '}
                            {t(Variables, 'common_likes')}
                            {fetchData?.data?.likes}
                          </Text>
                        </View>
                        {/* 作者信息 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: palettes.App['Custom Color 26'],
                              borderRadius: 10,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 14,
                              paddingRight: 14,
                              paddingTop: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                          >
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.push('BottomTabNavigator', {
                                    screen: 'Home',
                                    params: {
                                      screen: 'OrganizerScreen',
                                      params: {
                                        organization_id:
                                          fetchData?.data?.author?.id,
                                      },
                                    },
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={StyleSheet.applyWidth(
                                { width: '100%' },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    flexDirection: 'row',
                                    flexGrow: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Image
                                  resizeMode={'cover'}
                                  {...GlobalStyles.ImageStyles(theme)['Image']
                                    .props}
                                  source={imageSource(
                                    `${fetchData?.data?.author?.avatar}`
                                  )}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image']
                                        .style,
                                      {
                                        borderRadius: 20,
                                        height: 40,
                                        width: 40,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                />
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      flex: 1,
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '700',
                                      letterSpacing: 0.2,
                                      lineHeight: 24,
                                      marginLeft: 10,
                                      marginRight: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.data?.organization?.name}
                                </Text>
                              </View>
                            </Touchable>
                          </View>
                          {/* 关注 */}
                          <Button
                            accessible={true}
                            iconPosition={'left'}
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  setIsFollowLoading(true);
                                  if (isFollowed) {
                                    const apiresult = (
                                      await aceCampTestUnfollowOrganizationPOST.mutateAsync(
                                        {
                                          organization_id:
                                            fetchData?.data?.organization?.id,
                                        }
                                      )
                                    )?.json;
                                    if (apiresult?.code === 200) {
                                      setIsFollowed(false);
                                    } else {
                                    }
                                  } else {
                                    const result = (
                                      await aceCampTestFollowOrganizationPOST.mutateAsync(
                                        { organization_id: 20504540 }
                                      )
                                    )?.json;
                                    console.log(result);
                                    if (result?.code === 200) {
                                      setIsFollowed(true);
                                    } else {
                                    }
                                  }

                                  setIsFollowLoading(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            icon={isFollowed ? undefined : 'Ionicons/add'}
                            iconSize={16}
                            loading={isFollowLoading}
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.App['Custom Color 27'],
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: isFollowed
                                      ? palettes.App['Custom Color 27']
                                      : palettes.Brand.appStyle_primary,
                                  },
                                ],
                                borderRadius: 20,
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.8,
                                lineHeight: 22,
                                paddingBottom: 1,
                                paddingTop: 1,
                                width: 100,
                              },
                              dimensions.width
                            )}
                            title={`${
                              isFollowed
                                ? t(Variables, 'common_followed')
                                : t(Variables, 'common_follow')
                            }`}
                          />
                        </View>
                      </View>
                      {/* Divider 2 */}
                      <Divider
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        color={palettes.App['Custom Color 29']}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { height: 1, marginBottom: 10, marginTop: 14 }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* 内容 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center' },
                          dimensions.width
                        )}
                      >
                        {/* 内容类别选项 */}
                        <>
                          {current_tab === 0 ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor:
                                    palettes.App['Custom Color 30'],
                                  borderRadius: 4,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  paddingBottom: 5,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    setCurrent_tab(1);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            palettes.App['Custom Color 30'],
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            current_tab === 1
                                              ? palettes.App['Custom #ffffff']
                                              : palettes.App['Custom Color 30'],
                                        },
                                      ],
                                      borderRadius: 3,
                                      marginRight: 6,
                                      padding: 4,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          current_tab === 1
                                            ? palettes.Brand.appStyle_primary
                                            : palettes.App.appStyle_black,
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 20,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'article_detail_ai_minute')}
                                  </Text>
                                </View>
                              </Touchable>
                              {/* Touchable 3 */}
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      /* 'Set Variable' action requires configuration: choose a variable */
                                      setCurrent_tab(2);
                                      const result = (
                                        await AceCampTestApi.articleInfoKeypointGET(
                                          Constants,
                                          {
                                            article_id:
                                              props.route?.params
                                                ?.article_info_id ??
                                              defaultProps.article_info_id,
                                            transcribe_id:
                                              fetchData?.data?.transcribe?.id,
                                          }
                                        )
                                      )?.json;
                                      setKeypoint(
                                        result?.data?.results?.keypoints
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            palettes.App['Custom Color 30'],
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            current_tab === 2
                                              ? palettes.App['Custom #ffffff']
                                              : palettes.App['Custom Color 30'],
                                        },
                                      ],
                                      borderRadius: 3,
                                      marginRight: 6,
                                      padding: 4,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          current_tab === 2
                                            ? palettes.Brand.appStyle_primary
                                            : palettes.App.appStyle_black,
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 20,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'article_detail_core_point')}
                                  </Text>
                                </View>
                              </Touchable>
                              {/* Touchable 2 */}
                              <Touchable
                                onPress={() => {
                                  try {
                                    setCurrent_tab(3);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            palettes.App['Custom Color 30'],
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value:
                                            current_tab === 3
                                              ? palettes.App['Custom #ffffff']
                                              : palettes.App['Custom Color 30'],
                                        },
                                      ],
                                      borderRadius: 3,
                                      padding: 4,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          current_tab === 3
                                            ? palettes.Brand.appStyle_primary
                                            : palettes.App.appStyle_black,
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 20,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(
                                      Variables,
                                      'article_detail_orginal_minutes'
                                    )}
                                  </Text>
                                </View>
                              </Touchable>
                            </View>
                          )}
                        </>
                        {/* 内容 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              paddingLeft: 16,
                              paddingRight: 16,
                              width: dimensions.width,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Ai纪要 */}
                          <>
                            {!(current_tab === 1) ? null : (
                              <Utils.CustomCodeErrorBoundary>
                                <gf.RenderHtml
                                  source={{
                                    html: `${fetchData?.data?.transcribe?.qa}`,
                                  }}
                                />
                              </Utils.CustomCodeErrorBoundary>
                            )}
                          </>
                          {/* 核心要点 */}
                          <>
                            {!(current_tab === 2) ? null : (
                              <Utils.CustomCodeErrorBoundary>
                                <gf.Markdown
                                  style={{
                                    heading1: {
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '700',
                                      letterSpacing: 0.2,
                                      lineHeight: 24,
                                      color: 'black',
                                      marginTop: 18,
                                      marginBottom: 18,
                                    },
                                    heading3: {
                                      fontFamily: 'System',
                                      fontSize: 15,
                                      fontWeight: '700',
                                      letterSpacing: 0.2,
                                      lineHeight: 24,
                                      color: '#2b33e6',
                                      marginTop: 18,
                                      marginBottom: 18,
                                    },

                                    text: {
                                      lineHeight: 24,
                                    },
                                  }}
                                >
                                  {keypoint}
                                </gf.Markdown>
                              </Utils.CustomCodeErrorBoundary>
                            )}
                          </>
                          {/* 原始纪要 */}
                          <>
                            {!(current_tab === 3) ? null : (
                              <View>
                                <SimpleStyleFlashList
                                  data={fetchData?.data?.transcribe?.asr}
                                  estimatedItemSize={50}
                                  horizontal={false}
                                  inverted={false}
                                  keyExtractor={(flashListData, index) =>
                                    flashListData?.id ??
                                    flashListData?.uuid ??
                                    index?.toString() ??
                                    JSON.stringify(flashListData)
                                  }
                                  listKey={'dW83Ui4X'}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  renderItem={({ item, index }) => {
                                    const flashListData = item;
                                    return (
                                      <>
                                        {/* View 2 */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { alignSelf: 'flex-start' },
                                            dimensions.width
                                          )}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                backgroundColor:
                                                  palettes.App[
                                                    'Custom Color 13'
                                                  ],
                                                borderRadius: 15,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                marginBottom: 5,
                                                marginTop: 5,
                                                paddingBottom: 4,
                                                paddingLeft: 7,
                                                paddingRight: 7,
                                                paddingTop: 4,
                                                width: 110,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <Icon
                                              color={
                                                palettes.Brand.appStyle_primary
                                              }
                                              name={'AntDesign/caretright'}
                                              size={14}
                                              style={StyleSheet.applyWidth(
                                                { marginRight: 5 },
                                                dimensions.width
                                              )}
                                            />
                                            <Touchable
                                              onPress={() => {
                                                try {
                                                  gotoPosition(
                                                    flashListData?.start_ms
                                                  );
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                            >
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      palettes.Brand
                                                        .appStyle_primary,
                                                    fontSize: 14,
                                                    letterSpacing: 0.2,
                                                    lineHeight: 18,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {flashListData?.start}
                                              </Text>
                                            </Touchable>
                                          </View>
                                          <Utils.CustomCodeErrorBoundary>
                                            <Text
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 400,
                                                lineHeight: 24,
                                                letterSpacing: 0.2,
                                              }}
                                            >
                                              {flashListData?.contents.map(
                                                (item, innerIndex) => {
                                                  const key =
                                                    index + '-' + innerIndex;

                                                  return (
                                                    <Text
                                                      style={{
                                                        backgroundColor:
                                                          key === lastKey
                                                            ? '#f6dd1a'
                                                            : null,
                                                      }}
                                                      ref={ref =>
                                                        (textRefs.current[key] =
                                                          ref)
                                                      }
                                                      key={key}
                                                      onPress={() => {
                                                        try {
                                                          console.log(
                                                            item.start_ms
                                                          );
                                                          gotoPosition(
                                                            item.start_ms
                                                          );
                                                        } catch (err) {
                                                          console.error(err);
                                                        }
                                                      }}
                                                    >
                                                      {item.context}
                                                    </Text>
                                                  );
                                                }
                                              )}
                                            </Text>
                                          </Utils.CustomCodeErrorBoundary>
                                        </View>
                                      </>
                                    );
                                  }}
                                  showsHorizontalScrollIndicator={true}
                                  showsVerticalScrollIndicator={true}
                                  extraData={lastKey}
                                  scrollEnabled={false}
                                />
                              </View>
                            )}
                          </>
                          {/* 要点 */}
                          <>
                            {!(current_tab === 0) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignItems: 'center' },
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor:
                                        palettes.App['Custom Color 35'],
                                      borderRadius: 8,
                                      paddingBottom: 16,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      paddingTop: 16,
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.App['Custom Color 36'],
                                        fontFamily: 'System',
                                        fontSize: 18,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'article_detail_important')}
                                  </Text>
                                  {/* Text 2 */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        letterSpacing: 0.2,
                                        lineHeight: 22,
                                        marginTop: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {fetchData?.data?.summary}
                                  </Text>
                                </View>
                                {/* Text 2 */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App['Custom Color 4'],
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '400',
                                      letterSpacing: 0.2,
                                      lineHeight: 18,
                                      marginBottom: 10,
                                      marginTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {t(Variables, 'article_detail_pre')}
                                  {fetchData?.data?.word_stats?.word_count}
                                  {t(Variables, 'article_detaiil_word')}
                                  {', '}
                                  {t(Variables, 'article_detail_pre2')}
                                  {fetchData?.data?.word_stats?.read_time}
                                  {t(Variables, 'article_detail_minute')}
                                </Text>
                                {/* View 2 */}
                                <>
                                  {!(
                                    fetchData?.data?.content &&
                                    !fetchData?.data?.free
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          width: '80%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Divider
                                        {...GlobalStyles.DividerStyles(theme)[
                                          'Divider'
                                        ].props}
                                        color={palettes.App['Custom Color 37']}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.DividerStyles(theme)[
                                              'Divider'
                                            ].style,
                                            { height: 1, width: '30%' }
                                          ),
                                          dimensions.width
                                        )}
                                      />
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color 37'],
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '400',
                                            letterSpacing: 0.2,
                                            lineHeight: 18,
                                            marginLeft: 16,
                                            marginRight: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {t(Variables, 'live_vip_free')}
                                      </Text>
                                      {/* Divider 2 */}
                                      <Divider
                                        {...GlobalStyles.DividerStyles(theme)[
                                          'Divider'
                                        ].props}
                                        color={palettes.App['Custom Color 37']}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.DividerStyles(theme)[
                                              'Divider'
                                            ].style,
                                            { height: 1, width: '30%' }
                                          ),
                                          dimensions.width
                                        )}
                                      />
                                    </View>
                                  )}
                                </>
                                {/* View 3 */}
                                <>
                                  {!fetchData?.data?.content ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { paddingLeft: 5, paddingRight: 5 },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Ai纪要 2 */}
                                      <Utils.CustomCodeErrorBoundary>
                                        <gf.RenderHtml
                                          source={{
                                            html: `${fetchData?.data?.content}`,
                                          }}
                                        />
                                      </Utils.CustomCodeErrorBoundary>
                                    </View>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                          {/* 免责声明 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.App['Custom Color 31'],
                                borderRadius: 4,
                                marginTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 20,
                                zIndex: 500,
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: 'rgb(158, 165, 167)',
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                  lineHeight: 24,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'article_detail_copyright')}
                            </Text>
                          </View>

                          <Touchable
                            onPress={() => {
                              try {
                                navigation.push('BottomTabNavigator', {
                                  screen: 'Home',
                                  params: {
                                    screen: 'OrganizerScreen',
                                    params: { organization_id: 20505781 },
                                  },
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Image
                              {...GlobalStyles.ImageStyles(theme)['Image']
                                .props}
                              resizeMode={'contain'}
                              source={imageSource(
                                'https://static.acecamptech.com/system/posters/sc_article_poster.png'
                              )}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image']
                                    .style,
                                  { height: 100, width: '100%' }
                                ),
                                dimensions.width
                              )}
                            />
                          </Touchable>
                          {/* 相关推荐-标题 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginBottom: 10,
                                marginTop: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <LinearGradient
                              color1={palettes.App['Custom Color 33']}
                              color2={palettes.App['Custom Color 33']}
                              color3={'rgba(0, 0, 0, 0)'}
                              endX={0}
                              endY={5}
                              startX={200}
                              startY={5}
                              style={StyleSheet.applyWidth(
                                { flex: 1, height: 2 },
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: 'rgb(95, 136, 247)',
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '600',
                                  letterSpacing: 0.2,
                                  lineHeight: 24,
                                  marginLeft: 20,
                                  marginRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'article_detail_recommand')}
                            </Text>
                            {/* Linear Gradient 3 */}
                            <LinearGradient
                              color1={palettes.App['Custom Color 33']}
                              color2={palettes.App['Custom Color 33']}
                              color3={'rgba(0, 0, 0, 0)'}
                              endX={100}
                              endY={5}
                              startX={0}
                              startY={5}
                              style={StyleSheet.applyWidth(
                                { flex: 1, height: 2 },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* 相关推荐 */}
                          <View>
                            <AceCampTestApi.FetchArticleInfoSimilarGET
                              handlers={{
                                onData: fetchData => {
                                  try {
                                    const valueCwg3JNfw = splitList(
                                      fetchData?.data,
                                      5
                                    );
                                    const result = valueCwg3JNfw;
                                    setRecommand_data_list(valueCwg3JNfw);
                                    console.log(result);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                },
                              }}
                              source_id={
                                props.route?.params?.article_info_id ??
                                defaultProps.article_info_id
                              }
                              source_type={'Article'}
                            >
                              {({
                                loading,
                                error,
                                data,
                                refetchArticleInfoSimilar,
                              }) => {
                                const fetchData = data?.json;
                                if (loading) {
                                  return <ActivityIndicator />;
                                }

                                if (
                                  error ||
                                  data?.status < 200 ||
                                  data?.status >= 300
                                ) {
                                  return <ActivityIndicator />;
                                }

                                return (
                                  <Swiper
                                    data={recommand_data_list}
                                    dotActiveColor={
                                      theme.colors.branding.primary
                                    }
                                    dotColor={theme.colors.text.light}
                                    dotsTouchable={true}
                                    hideDots={false}
                                    keyExtractor={(swiperData, index) =>
                                      swiperData?.id ??
                                      swiperData?.uuid ??
                                      index?.toString() ??
                                      JSON.stringify(swiperData)
                                    }
                                    listKey={'jgd1P0LX'}
                                    minDistanceForAction={0.2}
                                    minDistanceToCapture={5}
                                    renderItem={({ item, index }) => {
                                      const swiperData = item;
                                      return (
                                        <SwiperItem>
                                          <SimpleStyleFlashList
                                            data={swiperData}
                                            estimatedItemSize={50}
                                            horizontal={false}
                                            inverted={false}
                                            keyExtractor={(
                                              flashListData,
                                              index
                                            ) =>
                                              flashListData?.id ??
                                              flashListData?.uuid ??
                                              index?.toString() ??
                                              JSON.stringify(flashListData)
                                            }
                                            listKey={JSON.stringify(swiperData)}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            renderItem={({ item, index }) => {
                                              const flashListData = item;
                                              return (
                                                <Touchable
                                                  onPress={() => {
                                                    try {
                                                      navigation.push(
                                                        'ArticleDetailScreen',
                                                        {
                                                          article_info_id:
                                                            flashListData?.source_id,
                                                        }
                                                      );
                                                    } catch (err) {
                                                      console.error(err);
                                                    }
                                                  }}
                                                >
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        backgroundColor:
                                                          palettes.App[
                                                            'Custom Color 31'
                                                          ],
                                                        borderRadius: 4,
                                                        marginBottom: 5,
                                                        marginTop: 5,
                                                        paddingBottom: 5,
                                                        paddingLeft: 16,
                                                        paddingRight: 16,
                                                        paddingTop: 5,
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          paddingBottom: 3,
                                                          paddingTop: 3,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <Text
                                                        accessible={true}
                                                        selectable={false}
                                                        ellipsizeMode={'tail'}
                                                        numberOfLines={1}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 14,
                                                            fontWeight: '600',
                                                            letterSpacing: 0.2,
                                                            lineHeight: 24,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {flashListData?.source_type ===
                                                        'Event'
                                                          ? flashListData
                                                              ?.source.name
                                                          : flashListData
                                                              ?.source.title}
                                                      </Text>
                                                    </View>
                                                    {/* View 2 */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: 'center',
                                                          flexDirection: 'row',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            borderColor:
                                                              palettes.App
                                                                .Peoplebit_Light_Stone_Gray,
                                                            borderRadius: 4,
                                                            borderWidth: 1,
                                                            paddingBottom: 2,
                                                            paddingLeft: 4,
                                                            paddingRight: 4,
                                                            paddingTop: 2,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <Text
                                                          accessible={true}
                                                          selectable={false}
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              color:
                                                                palettes.App[
                                                                  'Custom Color 34'
                                                                ],
                                                              fontFamily:
                                                                'System',
                                                              fontSize: 13,
                                                              fontWeight: '400',
                                                              letterSpacing: 0.2,
                                                              lineHeight: 17,
                                                            },
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {getArticleType(
                                                            Variables,
                                                            flashListData?.source_type
                                                          )}
                                                        </Text>
                                                      </View>

                                                      <Text
                                                        accessible={true}
                                                        selectable={false}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              palettes.App[
                                                                'Custom Color 34'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 13,
                                                            fontWeight: '400',
                                                            letterSpacing: 0.2,
                                                            lineHeight: 17,
                                                            marginLeft: 10,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {fromUnixTimestamp(
                                                          Variables,
                                                          flashListData?.source
                                                            .release_time,
                                                          'YYYY/MM/DD HH:mm'
                                                        )}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </Touchable>
                                              );
                                            }}
                                            showsHorizontalScrollIndicator={
                                              true
                                            }
                                            showsVerticalScrollIndicator={true}
                                          />
                                        </SwiperItem>
                                      );
                                    }}
                                    vertical={false}
                                    {...GlobalStyles.SwiperStyles(theme)[
                                      'Swiper'
                                    ].props}
                                    loop={true}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.SwiperStyles(theme)[
                                          'Swiper'
                                        ].style,
                                        { height: 400 }
                                      ),
                                      dimensions.width
                                    )}
                                    timeout={5000}
                                  />
                                );
                              }}
                            </AceCampTestApi.FetchArticleInfoSimilarGET>
                          </View>
                          {/* 热门内容-标题 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginBottom: 10,
                                marginTop: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <LinearGradient
                              color1={palettes.App['Custom Color 33']}
                              color2={palettes.App['Custom Color 33']}
                              color3={'rgba(0, 0, 0, 0)'}
                              endX={0}
                              endY={5}
                              startX={200}
                              startY={5}
                              style={StyleSheet.applyWidth(
                                { flex: 1, height: 2 },
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: 'rgb(95, 136, 247)',
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '600',
                                  letterSpacing: 0.2,
                                  lineHeight: 24,
                                  marginLeft: 20,
                                  marginRight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'article_detail_hot')}
                            </Text>
                            {/* Linear Gradient 3 */}
                            <LinearGradient
                              color1={palettes.App['Custom Color 33']}
                              color2={palettes.App['Custom Color 33']}
                              color3={'rgba(0, 0, 0, 0)'}
                              endX={100}
                              endY={5}
                              startX={0}
                              startY={5}
                              style={StyleSheet.applyWidth(
                                { flex: 1, height: 2 },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* 热门内容 */}
                          <View>
                            <AceCampTestApi.FetchArticleInfoHotGET
                              handlers={{
                                onData: fetchData => {
                                  try {
                                    const valueNvAxlC6F = splitList(
                                      fetchData?.data?.feeds,
                                      5
                                    );
                                    const result = valueNvAxlC6F;
                                    setHot_data_list(valueNvAxlC6F);
                                    /* hidden 'Log to Console' action */
                                  } catch (err) {
                                    console.error(err);
                                  }
                                },
                              }}
                              page_size={20}
                            >
                              {({
                                loading,
                                error,
                                data,
                                refetchArticleInfoHot,
                              }) => {
                                const fetchData = data?.json;
                                if (loading) {
                                  return <ActivityIndicator />;
                                }

                                if (
                                  error ||
                                  data?.status < 200 ||
                                  data?.status >= 300
                                ) {
                                  return <ActivityIndicator />;
                                }

                                return (
                                  <Swiper
                                    data={hot_data_list}
                                    dotActiveColor={
                                      theme.colors.branding.primary
                                    }
                                    dotColor={theme.colors.text.light}
                                    dotsTouchable={true}
                                    hideDots={false}
                                    keyExtractor={(swiperData, index) =>
                                      swiperData?.id ??
                                      swiperData?.uuid ??
                                      index?.toString() ??
                                      JSON.stringify(swiperData)
                                    }
                                    listKey={'CjYt6pc3'}
                                    minDistanceForAction={0.2}
                                    minDistanceToCapture={5}
                                    renderItem={({ item, index }) => {
                                      const swiperData = item;
                                      return (
                                        <SwiperItem>
                                          <SimpleStyleFlashList
                                            data={swiperData}
                                            estimatedItemSize={50}
                                            horizontal={false}
                                            inverted={false}
                                            keyExtractor={(
                                              flashListData,
                                              index
                                            ) =>
                                              flashListData?.id ??
                                              flashListData?.uuid ??
                                              index?.toString() ??
                                              JSON.stringify(flashListData)
                                            }
                                            listKey={JSON.stringify(swiperData)}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            renderItem={({ item, index }) => {
                                              const flashListData = item;
                                              return (
                                                <Touchable
                                                  onPress={() => {
                                                    try {
                                                      console.log(
                                                        flashListData?.source_id
                                                      );
                                                      navigation.push(
                                                        'ArticleDetailScreen',
                                                        {
                                                          article_info_id:
                                                            flashListData?.source_id,
                                                        }
                                                      );
                                                    } catch (err) {
                                                      console.error(err);
                                                    }
                                                  }}
                                                >
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        backgroundColor:
                                                          palettes.App[
                                                            'Custom Color 31'
                                                          ],
                                                        borderRadius: 4,
                                                        marginBottom: 5,
                                                        marginTop: 5,
                                                        paddingBottom: 5,
                                                        paddingLeft: 16,
                                                        paddingRight: 16,
                                                        paddingTop: 5,
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          paddingBottom: 3,
                                                          paddingTop: 3,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <Text
                                                        accessible={true}
                                                        selectable={false}
                                                        ellipsizeMode={'tail'}
                                                        numberOfLines={1}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 14,
                                                            fontWeight: '600',
                                                            letterSpacing: 0.2,
                                                            lineHeight: 24,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {flashListData?.source_type ===
                                                        'Event'
                                                          ? flashListData
                                                              ?.source.name
                                                          : flashListData
                                                              ?.source.title}
                                                      </Text>
                                                    </View>
                                                    {/* View 2 */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: 'center',
                                                          flexDirection: 'row',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            borderColor:
                                                              palettes.App
                                                                .Peoplebit_Light_Stone_Gray,
                                                            borderRadius: 4,
                                                            borderWidth: 1,
                                                            paddingBottom: 2,
                                                            paddingLeft: 4,
                                                            paddingRight: 4,
                                                            paddingTop: 2,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <Text
                                                          accessible={true}
                                                          selectable={false}
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              color:
                                                                palettes.App[
                                                                  'Custom Color 34'
                                                                ],
                                                              fontFamily:
                                                                'System',
                                                              fontSize: 13,
                                                              fontWeight: '400',
                                                              letterSpacing: 0.2,
                                                              lineHeight: 17,
                                                            },
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {getArticleType(
                                                            Variables,
                                                            flashListData?.source_type
                                                          )}
                                                        </Text>
                                                      </View>

                                                      <Text
                                                        accessible={true}
                                                        selectable={false}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              palettes.App[
                                                                'Custom Color 34'
                                                              ],
                                                            fontFamily:
                                                              'System',
                                                            fontSize: 13,
                                                            fontWeight: '400',
                                                            letterSpacing: 0.2,
                                                            lineHeight: 17,
                                                            marginLeft: 10,
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {fromUnixTimestamp(
                                                          Variables,
                                                          flashListData?.source
                                                            .release_time,
                                                          'YYYY/MM/DD HH:mm'
                                                        )}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </Touchable>
                                              );
                                            }}
                                            showsHorizontalScrollIndicator={
                                              true
                                            }
                                            showsVerticalScrollIndicator={true}
                                          />
                                        </SwiperItem>
                                      );
                                    }}
                                    vertical={false}
                                    {...GlobalStyles.SwiperStyles(theme)[
                                      'Swiper'
                                    ].props}
                                    loop={true}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.SwiperStyles(theme)[
                                          'Swiper'
                                        ].style,
                                        { height: 400 }
                                      ),
                                      dimensions.width
                                    )}
                                    timeout={5000}
                                  />
                                );
                              }}
                            </AceCampTestApi.FetchArticleInfoHotGET>
                          </View>
                        </View>
                      </View>
                    </SimpleStyleScrollView>
                  )}
                </>
              </>
            );
          }}
        </AceCampTestApi.FetchArticleInfoGET>
        <>
          {!(current_tab === 3) ? null : (
            <View
              style={StyleSheet.applyWidth({ zIndex: 1000 }, dimensions.width)}
            >
              <Utils.CustomCodeErrorBoundary>
                <AudioPlayerExpo.AudioPlayer
                  uri={audioUri}
                  subPosition={position}
                  setSubPosition={updatePosition}
                />
              </Utils.CustomCodeErrorBoundary>
            </View>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ArticleDetailScreen);
