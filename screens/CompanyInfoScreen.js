import React from 'react';
import {
  Icon,
  IconButton,
  LinearGradient,
  LoadingIndicator,
  SVG,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import scrollCanLoadPage from '../global-functions/scrollCanLoadPage';
import setUndefined from '../global-functions/setUndefined';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = {
  following: false,
  id: 13581,
  logo: 'https://image.acecamptech.com/logos/13581/d109bcc5-bf5b-494d-9507-220e9cd82884.jpg',
  name: '拼多多',
  ticker: 'US.PDD',
};

const CompanyInfoScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [cursor, setCursor] = React.useState(setUndefined());
  const [feedsData, setFeedsData] = React.useState([]);
  const [is_following, setIs_following] = React.useState(false);
  const [is_loading, setIs_loading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [source_type, setSource_type] = React.useState(setUndefined());
  const [spotlight, setSpotlight] = React.useState(false);
  const [total_record, setTotal_record] = React.useState(0);
  const gotoScreen = (screen, id) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    ///sdfsdf
    switch (screen) {
      case 'LoginScreen':
        navigation.navigate('BottomTabNavigator', {
          screen: 'Tickets',
          params: { screen: 'LoginScreen' },
        });
        break;
      case 'Article':
      case 'Minute':
        navigation.push('ArticleDetailScreen', { article_info_id: id });
        break;
      case 'Event':
        navigation.push('EventDetailScreen', { event_id: id });
        break;
      case 'Spotlight':
        navigation.push('SpotlightDetailScreen', { spotlightId: id });

        break;
      case 'Opinion':
        navigation.push('OpinionInfoScreen', { id: id });
        break;
    }
  };
  const aceCampTestSnsActionsDoPOST = AceCampTestApi.useSnsActionsDoPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setIs_following(props.route?.params?.following ?? defaultProps.following);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderColor: palettes.App['Custom #ffffff'],
        },
        dimensions.width
      )}
    >
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: palettes.App.appStyle_white,
              borderColor: palettes.App['Custom #d8d8d8'],
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
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
            color={palettes.App['Custom Color 5']}
            icon={'AntDesign/left'}
            size={22}
          />
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            <>
              {!(props.route?.params?.logo ?? defaultProps.logo) ? null : (
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(
                    `${props.route?.params?.logo ?? defaultProps.logo}`
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              )}
            </>
            <>
              {props.route?.params?.logo ?? defaultProps.logo ? null : (
                <SVG
                  {...GlobalStyles.SVGStyles(theme)['SVG'].props}
                  source={
                    'https://static.acecamptech.com/www/static/media/relation-company.179798304f24764e14e2a7584e0facaa.svg'
                  }
                  style={StyleSheet.applyWidth(
                    GlobalStyles.SVGStyles(theme)['SVG'].style,
                    dimensions.width
                  )}
                />
              )}
            </>
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
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 18,
                  marginLeft: 10,
                  marginRight: 10,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {props.route?.params?.name ?? defaultProps.name}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: palettes.App['Custom Color 27'],
                      fontSize: 16,
                      lineHeight: 18,
                    }
                  ),
                  dimensions.width
                )}
              >
                {props.route?.params?.ticker ?? defaultProps.ticker}
              </Text>
            </Text>
          </View>
          {/* 关注按钮 */}
          <View
            style={StyleSheet.applyWidth(
              { position: 'absolute', right: 16 },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const result = (
                      await aceCampTestSnsActionsDoPOST.mutateAsync({
                        action: is_following ? 'unfollow' : 'follow',
                        target_id: props.route?.params?.id ?? defaultProps.id,
                        target_type: 'Corporation',
                      })
                    )?.json;
                    console.log(result);
                    if (result?.code === 200) {
                      setIs_following(!is_following);
                    } else {
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* View 2 */}
              <>
                {is_following ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      color={palettes.Brand.appStyle_primary}
                      name={'AntDesign/pluscircleo'}
                      size={18}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          {
                            color: palettes.Brand.appStyle_primary,
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 20,
                            marginLeft: 4,
                            marginRight: null,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_circle_follow')}
                    </Text>
                  </View>
                )}
              </>
              <>
                {!is_following ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom Color 27'],
                        borderRadius: 8,
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
                            color: palettes.App['Custom #ffffff'],
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 20,
                            marginLeft: 4,
                            marginRight: 4,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_followed')}
                    </Text>
                  </View>
                )}
              </>
            </Touchable>
          </View>
        </View>
        {/* 分组标题 */}
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
                setCursor(setUndefined());
                setSource_type(setUndefined());
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Daily Update Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: !source_type
                          ? palettes.Brand.appStyle_primary
                          : '#7a7a7a',
                      },
                    ],
                    marginLeft: null,
                    marginRight: null,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'company_info_recently')}
            </Text>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setSource_type('Event');
                setCursor(setUndefined());
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Daily Update Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                  {
                    color:
                      source_type === 'Event'
                        ? palettes.Brand.appStyle_primary
                        : '#7a7a7a',
                    marginLeft: null,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'tab_events')}
            </Text>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setSource_type('Minute');
                setCursor(setUndefined());
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            {/* Text 3 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Daily Update Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          source_type === 'Minute'
                            ? palettes.Brand.appStyle_primary
                            : '#7A7A7A',
                      },
                    ],
                    marginLeft: null,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_note_collection')}
            </Text>
          </Touchable>
          {/* Touchable 4 */}
          <Touchable
            onPress={() => {
              try {
                setSource_type('Article');
                setCursor(setUndefined());
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            {/* Text 4 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Daily Update Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          source_type === 'Article'
                            ? palettes.Brand.appStyle_primary
                            : '#7a7a7a',
                      },
                    ],
                    marginLeft: null,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'tab_vote_point')}
            </Text>
          </Touchable>
          {/* Touchable 5 */}
          <Touchable
            onPress={() => {
              try {
                setSource_type('Model');
                setFeedsData([]);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginLeft: 16, marginRight: 16 },
              dimensions.width
            )}
          >
            {/* Text 5 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Daily Update Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Daily Update Title'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          source_type === 'Spotlight'
                            ? palettes.Brand.appStyle_primary
                            : '#7a7a7a',
                      },
                    ],
                    marginLeft: null,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'company_info_model')}
            </Text>
          </Touchable>
        </View>
        {/* feeds列表 */}
        <View>
          {/* Fetch 2 */}
          <AceCampTestApi.FetchCompanyFeedsGET
            corporation_ids={[].concat([
              props.route?.params?.id ?? defaultProps.id,
            ])}
            handlers={{
              onData: fetch2Data => {
                try {
                  console.log(fetch2Data);
                  if (source_type === 'Model') {
                    return;
                  }
                  setFeedsData(fetch2Data?.data?.feeds);
                  setTotal_record(fetch2Data?.meta?.total);
                  setCursor(
                    (() => {
                      const e = fetch2Data?.data?.feeds;
                      return e[e.length - 1];
                    })()?.cursor
                  );
                  setIs_loading(false);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page_size={20}
            source_type={source_type}
          >
            {({ loading, error, data, refetchCompanyFeeds }) => {
              const fetch2Data = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  <LinearGradient
                    endY={100}
                    startX={0}
                    startY={0}
                    {...GlobalStyles.LinearGradientStyles(theme)[
                      'Linear Gradient'
                    ].props}
                    color1={palettes.App['Custom Color 13']}
                    color2={palettes.App.White}
                    endX={0}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.LinearGradientStyles(theme)[
                          'Linear Gradient'
                        ].style,
                        { position: 'absolute' }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* View 2 */}
                  <View>
                    <SimpleStyleScrollView
                      bounces={true}
                      horizontal={false}
                      keyboardShouldPersistTaps={'never'}
                      nestedScrollEnabled={false}
                      onScroll={event => {
                        const handler = async () => {
                          try {
                            if (true) {
                              return;
                            }
                            if (scrollCanLoadPage(event)) {
                              return;
                            }
                            if (is_loading) {
                              return;
                            }
                            if (feedsData?.length >= total_record) {
                              return;
                            }
                            setIs_loading(true);
                            const result = (
                              await AceCampTestApi.companyFeedsGET(Constants, {
                                corporation_ids: [].concat([
                                  props.route?.params?.id ?? defaultProps.id,
                                ]),
                                cursor: cursor,
                                page_size: 20,
                                source_type: source_type,
                              })
                            )?.json;
                            setFeedsData(feedsData.concat(result?.data?.feeds));
                            setCursor(
                              (() => {
                                const e = result?.data?.feeds;
                                return e[e.length - 1];
                              })()?.cursor
                            );
                            await waitUtil({ milliseconds: 1000 });
                            setIs_loading(false);
                            console.log('load next page');
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      style={StyleSheet.applyWidth(
                        { paddingBottom: 200 },
                        dimensions.width
                      )}
                    >
                      <>
                        {!(fetch2Data?.data?.feeds?.length > 0) ? null : (
                          <Shadow
                            offsetX={0}
                            offsetY={0}
                            paintInside={true}
                            showShadowCornerBottomEnd={true}
                            showShadowCornerBottomStart={true}
                            showShadowCornerTopEnd={true}
                            showShadowCornerTopStart={true}
                            showShadowSideBottom={true}
                            showShadowSideEnd={true}
                            showShadowSideStart={true}
                            showShadowSideTop={true}
                            distance={6}
                            startColor={palettes.App['Custom Color 48']}
                            stretch={true}
                            style={StyleSheet.applyWidth(
                              {
                                borderRadius: 6,
                                marginLeft: 16,
                                marginRight: 16,
                                marginTop: 16,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <SimpleStyleFlatList
                              data={feedsData}
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
                                'View->feeds列表->Fetch 2->View 2->Scroll View->Shadow->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <RecommandSectionBlock
                                    gotoScreen={(screen, id) => {
                                      try {
                                        gotoScreen(screen, id);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    dataItem={listData}
                                    hideMenu={true}
                                    isLatest={feedsData?.length === index + 1}
                                  />
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                  borderRadius: 6,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 8,
                                },
                                dimensions.width
                              )}
                            />
                          </Shadow>
                        )}
                      </>
                      <>
                        {!(feedsData?.length === 0) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'column',
                                marginTop: 100,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <SVG
                              source={
                                'https://static.acecamptech.com/system/empty.svg'
                              }
                              style={StyleSheet.applyWidth(
                                { height: 50, width: 50 },
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.App['Custom Color 4'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                  letterSpacing: 0.3,
                                  lineHeight: 20,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'common_no_content')}
                            </Text>
                          </View>
                        )}
                      </>
                    </SimpleStyleScrollView>
                  </View>
                </>
              );
            }}
          </AceCampTestApi.FetchCompanyFeedsGET>
        </View>
      </View>
      {/* 读取窗口 */}
      <>
        {!is_loading ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Mobile, value: dimensions.height },
                ],
                justifyContent: 'center',
                left: 0,
                opacity: 1,
                position: 'absolute',
                top: 0,
                width: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Mobile, value: dimensions.width },
                ],
                zIndex: 99,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.App['Custom Color 5'],
                  borderRadius: 8,
                  height: 70,
                  justifyContent: 'center',
                  opacity: 0.6,
                  width: 70,
                  zIndex: 200,
                },
                dimensions.width
              )}
            >
              <LoadingIndicator
                size={30}
                color={palettes.Brand.appStyle_primary}
                type={'wave'}
              />
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 5'],
                  height: '100%',
                  left: 0,
                  opacity: 0.43,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(CompanyInfoScreen);
