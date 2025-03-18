import React from 'react';
import {
  Icon,
  IconButton,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Shadow from '../custom-files/Shadow';
import * as gf from '../custom-files/gf';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { spotlightId: 8608 };

const SpotlightDetailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [expandTxt, setExpandTxt] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [firstLayout, setFirstLayout] = React.useState(true);
  const [fullHeight, setFullHeight] = React.useState(20);
  const [height, setHeight] = React.useState(500);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const [lines, setLines] = React.useState(100);
  const newTest = e => {
    if (!firstLayout) {
      return;
    }
    setFirstLayout(false);
    // e.nativeEvent.layout.height
    // const fullHeight = e.nativeEvent.target.scrollHeight;
    // console.log(fullHeight)
    const lineLength = e.nativeEvent.lines.length;
    let f = 0;
    let h = 0;
    f = lineLength * 28 + 30;
    if (lineLength > 3) {
      h = 28 * 3 + 30;
      setIsTruncated(true);
      setFullHeight(f);
      setHeight(h);
      setExpandTxt(gf.t(Variables, 'event_detail_open'));
      setLines(3);
      //需要显示扩展
    } else {
      h = f;
      setHeight(f);
      setFullHeight(f);
      setIsTruncated(false);
      setLines(lineLength);
    }
    console.log(lineLength);
    console.log(f);
    console.log(h);

    gf.Animated.timing(heightAnim, {
      toValue: h, // 切换高度，展开时为300，收起时为100
      duration: 100, // 动画持续时间
      useNativeDriver: false, // 因为我们在动画中改变的是高度，所以不能使用原生驱动
    }).start();

    //     onTextLayout={eve => {
    //       try {
    //         test(Variables, eve);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }}
  };

  const toggleExpand = () => {
    toggleHeight();
    if (lines === 3) {
      setExpandTxt(gf.t(Variables, 'event_detail_close'));
    } else {
      setExpandTxt(gf.t(Variables, 'event_detail_open'));
      setLines(3);
    }
  };
  const destContainer = React.useRef(null);
  const destContent = React.useRef(null);
  const heightAnim = React.useRef(new gf.Animated.Value(1000)).current;

  const toggleHeight = () => {
    if (!expanded) {
      setExpandTxt(gf.t(Variables, 'event_detail_close'));
      setLines(10000);
    }
    gf.Animated.timing(heightAnim, {
      toValue: expanded ? height : fullHeight, // 切换高度，展开时为300，收起时为100
      duration: 500, // 动画持续时间
      useNativeDriver: false, // 因为我们在动画中改变的是高度，所以不能使用原生驱动
    }).start(() => {
      if (lines === 100) {
        setExpandTxt(gf.t(Variables, 'event_detail_open'));
        // setLines(3)
      }
    });
    setExpanded(!expanded);
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom Color 19'] },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        bounces={true}
        nestedScrollEnabled={true}
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 19'],
            height: dimensions.height,
            paddingBottom: 16,
          },
          dimensions.width
        )}
      >
        <AceCampTestApi.FetchSpotlightGET
          id={props.route?.params?.spotlightId ?? defaultProps.spotlightId}
        >
          {({ loading, error, data, refetchSpotlight }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* 头部 */}
                <View
                  style={StyleSheet.applyWidth(
                    { width: '100%' },
                    dimensions.width
                  )}
                >
                  <ImageBackground
                    {...GlobalStyles.ImageBackgroundStyles(theme)[
                      'Image Background'
                    ].props}
                    resizeMode={'repeat'}
                    source={imageSource(
                      `${fetchData?.data?.background_image_url}`
                    )}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageBackgroundStyles(theme)[
                          'Image Background'
                        ].style,
                        {
                          flex: null,
                          height: safeAreaInsets.top + fullHeight + 55,
                          opacity: 0.69,
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                        }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: safeAreaInsets.top + 5,
                        paddingLeft: 16,
                        paddingRight: 16,
                        zIndex: 10,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexDirection: 'row' },
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
                        {/* 返回按钮 */}
                        <IconButton
                          color={palettes.App.White}
                          icon={'AntDesign/left'}
                          size={24}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10, marginRight: 10 },
                            dimensions.width
                          )}
                        />
                      </Touchable>
                      {/* 标题 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={StyleSheet.applyWidth(
                          {
                            fontFamily: 'System',
                            fontSize: 18,
                            fontWeight: '700',
                            letterSpacing: 0.2,
                            lineHeight: 24,
                          },
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.title}
                      </Text>
                    </View>
                    {/* 分享按钮 */}
                    <IconButton
                      color={palettes.Brand.appStyle_primary}
                      icon={'AntDesign/sharealt'}
                      size={24}
                    />
                  </View>
                  {/* 简介 */}
                  <View
                    onLayout={event => {
                      try {
                        /* hidden 'Run a Custom Function' action */
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        overflow: 'hidden',
                        paddingBottom: 10,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 10,
                        zIndex: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {/* 简介Blur View */}
                    <Utils.CustomCodeErrorBoundary>
                      <gf.Animated.View
                        style={{
                          height: heightAnim,
                        }}
                      >
                        <BlurView
                          {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                            .props}
                          intensity={30}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.BlurViewStyles(theme)['Blur View']
                                .style,
                              {
                                alignItems: 'center',
                                borderRadius: 4,
                                paddingBottom: 5,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 5,
                                width: '100%',
                                overflow: 'hidden',
                              }
                            ),
                            dimensions.width
                          )}
                          tint={'light'}
                        >
                          <Text
                            ref={destContent}
                            accessible={true}
                            selectable={false}
                            numberOfLines={lines}
                            onTextLayout={eve => {
                              newTest(eve);
                            }}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 5'],
                                fontFamily: 'System',
                                fontSize: 16,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 28,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.description}
                          </Text>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                              },
                              dimensions.width
                            )}
                          ></View>
                          <Touchable
                            onPress={() => {
                              try {
                                toggleExpand();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: palettes.Brand.appStyle_primary,
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 20,
                                  },
                                  dimensions.width
                                )}
                              >
                                {expandTxt}
                              </Text>
                              <Icon
                                color={palettes.Brand.appStyle_primary}
                                name={'AntDesign/down'}
                                size={16}
                              />
                            </View>
                          </Touchable>
                        </BlurView>
                      </gf.Animated.View>
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                </View>
                {/* 相关公司 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color 19'],
                      paddingTop: 16,
                      zIndex: 100,
                    },
                    dimensions.width
                  )}
                >
                  {/* 相关公司-标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        paddingLeft: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* 标题 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 30,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'spotlight_related_company')}
                    </Text>

                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color 23'],
                          fontFamily: 'System',
                          fontSize: 15,
                          fontWeight: '400',
                          letterSpacing: 0.2,
                          lineHeight: 26,
                          marginLeft: 14,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'spotlight_related_company_total')}
                      {fetchData?.data?.corporations?.length}
                      {t(Variables, 'spotlight_related_company_total_tip')}
                    </Text>
                  </View>
                  <Touchable
                    onPress={() => {
                      try {
                        console.log('touch on company');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                  <SimpleStyleFlashList
                    data={fetchData?.data?.corporations}
                    estimatedItemSize={50}
                    inverted={false}
                    keyExtractor={(flashListData, index) =>
                      flashListData?.id ??
                      flashListData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(flashListData)
                    }
                    listKey={'Scroll View->Fetch->相关公司->FlashList'}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const flashListData = item;
                      return (
                        <Utils.CustomCodeErrorBoundary>
                          <Shadow.ShadowComponent
                            startColor={'#0002'}
                            endColor={'#0000'}
                            offset={[5, 0]}
                            distance={5}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                  borderRadius: 4,
                                  height: 70,
                                  justifyContent: 'space-between',
                                  marginLeft: 5,
                                  marginRight: 7,
                                  width: 150,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingLeft: 12,
                                    paddingTop: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Image
                                  resizeMode={'cover'}
                                  {...GlobalStyles.ImageStyles(theme)['Image']
                                    .props}
                                  source={imageSource(`${flashListData?.logo}`)}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image']
                                        .style,
                                      { height: 25, marginRight: 10, width: 25 }
                                    ),
                                    dimensions.width
                                  )}
                                />
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'System',
                                      fontSize: 16,
                                      fontWeight: '700',
                                      letterSpacing: 0.2,
                                      lineHeight: 25,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.name}
                                </Text>
                              </View>
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingBottom: 5,
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App['Custom Color 24'],
                                      fontFamily: 'System',
                                      fontSize: 13,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.ticker}
                                </Text>
                                {/* Text 2 */}
                                <>
                                  {!(
                                    flashListData?.current_change_percent !==
                                    null
                                  ) ? null : (
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            flashListData?.current_change_percent <
                                            0
                                              ? '#088232'
                                              : '#ff5656',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 20,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {flashListData?.current_change_percent < 0
                                        ? undefined
                                        : '+'}
                                      {flashListData?.current_change_percent}
                                      {'%'}
                                    </Text>
                                  )}
                                </>
                              </View>
                            </View>
                          </Shadow.ShadowComponent>
                        </Utils.CustomCodeErrorBoundary>
                      );
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      { paddingBottom: 10, paddingLeft: 11, paddingTop: 10 },
                      dimensions.width
                    )}
                  />
                </View>
              </>
            );
          }}
        </AceCampTestApi.FetchSpotlightGET>
        <View
          style={StyleSheet.applyWidth(
            { backgroundColor: palettes.App['Custom Color 19'] },
            dimensions.width
          )}
        >
          {/* company list fetch */}
          <AceCampTestApi.FetchSpotlightEventGET
            source_type={'Event'}
            spotlight_id={
              props.route?.params?.spotlightId ?? defaultProps.spotlightId
            }
          >
            {({ loading, error, data, refetchSpotlightEvent }) => {
              const companyListFetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {!(companyListFetchData?.data?.feeds > 0) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App['Custom Color 19'],
                          paddingTop: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {/* 系列活动-标题 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            marginBottom: 10,
                            paddingLeft: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 标题 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              fontFamily: 'System',
                              fontSize: 18,
                              fontWeight: '700',
                              letterSpacing: 0.2,
                              lineHeight: 30,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'spotlight_related_event')}
                        </Text>

                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.App['Custom Color 23'],
                              fontFamily: 'System',
                              fontSize: 15,
                              fontWeight: '400',
                              letterSpacing: 0.2,
                              lineHeight: 26,
                              marginLeft: 14,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'spotlight_related_company_total')}
                          {companyListFetchData?.data?.feeds?.length}
                          {t(Variables, 'spotlight_related_event_total_tip')}
                        </Text>
                      </View>
                      {/* Custom Code 2 */}
                      <Utils.CustomCodeErrorBoundary>
                        <Shadow.ShadowComponent
                          startColor={'#0002'}
                          endColor={'#0000'}
                          offset={[14, 0]}
                          distance={5}
                        >
                          {/* 系列活动-列表 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: palettes.App['Custom #ffffff'],
                                borderRadius: 4,
                                marginLeft: 14,
                                marginRight: 14,
                                overflow: 'hidden',
                                width: dimensions.width - 28,
                              },
                              dimensions.width
                            )}
                          >
                            <SimpleStyleFlatList
                              data={companyListFetchData?.data?.feeds}
                              decelerationRate={'normal'}
                              horizontal={false}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index?.toString() ??
                                JSON.stringify(listData)
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={
                                'Scroll View->View->company list fetch->View->Custom Code 2->系列活动-列表->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <RecommandSectionBlock
                                    dataItem={listData}
                                    hideMenu={true}
                                    isLatest={
                                      index ===
                                      companyListFetchData?.data?.feeds
                                        ?.length -
                                        1
                                    }
                                  />
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                { paddingLeft: 8, paddingRight: 8 },
                                dimensions.width
                              )}
                            />
                          </View>
                        </Shadow.ShadowComponent>
                      </Utils.CustomCodeErrorBoundary>
                    </View>
                  )}
                </>
              );
            }}
          </AceCampTestApi.FetchSpotlightEventGET>
          {/* minute */}
          <AceCampTestApi.FetchSpotlightEventGET
            source_type={'MinuteAndArticle'}
            spotlight_id={
              props.route?.params?.spotlightId ?? defaultProps.spotlightId
            }
          >
            {({ loading, error, data, refetchSpotlightEvent }) => {
              const minuteData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {!(minuteData?.data?.feeds?.length > 0) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App['Custom Color 19'],
                          marginTop: 20,
                        },
                        dimensions.width
                      )}
                    >
                      {/* 系列活动-标题 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            marginBottom: 10,
                            paddingLeft: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 标题 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              fontFamily: 'System',
                              fontSize: 18,
                              fontWeight: '700',
                              letterSpacing: 0.2,
                              lineHeight: 30,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'spotlight_article_minute')}
                        </Text>

                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.App['Custom Color 23'],
                              fontFamily: 'System',
                              fontSize: 15,
                              fontWeight: '400',
                              letterSpacing: 0.2,
                              lineHeight: 26,
                              marginLeft: 14,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'spotlight_related_company_total')}
                          {minuteData?.data?.feeds?.length}
                          {t(Variables, 'spotlight_related_event_total_tip')}
                        </Text>
                      </View>
                      {/* Custom Code 2 */}
                      <Utils.CustomCodeErrorBoundary>
                        <Shadow.ShadowComponent
                          startColor={'#0002'}
                          endColor={'#0000'}
                          offset={[14, 0]}
                          distance={5}
                        >
                          {/* 系列活动-列表 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: palettes.App['Custom #ffffff'],
                                borderRadius: 4,
                                marginLeft: 14,
                                marginRight: 14,
                                overflow: 'hidden',
                                width: dimensions.width - 28,
                              },
                              dimensions.width
                            )}
                          >
                            <SimpleStyleFlatList
                              data={minuteData?.data?.feeds}
                              decelerationRate={'normal'}
                              horizontal={false}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index?.toString() ??
                                JSON.stringify(listData)
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={
                                'Scroll View->View->minute->View->Custom Code 2->系列活动-列表->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <RecommandSectionBlock
                                    dataItem={listData}
                                    hideMenu={true}
                                    isLatest={
                                      index ===
                                      minuteData?.data?.feeds?.length - 1
                                    }
                                  />
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                { paddingLeft: 8, paddingRight: 8 },
                                dimensions.width
                              )}
                            />
                          </View>
                        </Shadow.ShadowComponent>
                      </Utils.CustomCodeErrorBoundary>
                    </View>
                  )}
                </>
              );
            }}
          </AceCampTestApi.FetchSpotlightEventGET>
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(SpotlightDetailScreen);
