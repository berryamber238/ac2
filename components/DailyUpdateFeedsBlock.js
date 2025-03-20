import React from 'react';
import {
  Icon,
  LoadingIndicator,
  SVG,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { date_type: 'recently_week', section: 'Event' };

const DailyUpdateFeedsBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [cursor, setCursor] = React.useState('');
  const [feedsData, setFeedsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const changeIndex = index => {
    props.setIndex(index);
  };

  const getOid = () => {
    if (props.headers) {
      const oid = props.headers[0].params.organization_id;
      return oid;
    }
    return 0;
  };

  const handleScroll = async () => {
    try {
      console.log('handleScroll = totalRecord ' + totalRecord);
      console.log('handleScroll = feedsData?.length ' + feedsData?.length);
      if (!feedsData) {
        return;
      }
      if (isLoading) {
        return;
      }
      if (feedsData?.length >= totalRecord) {
        return;
      }
      console.log('handleScroll = ' + 1);
      setIsLoading(true);
      const result = (
        await AceCampTestApi.dailyupdateFeedsGET(Constants, {
          collection: props.date_type ?? defaultProps.date_type,
          cursor: cursor,
          page_size: 20,
          source_type: props.section ?? defaultProps.section,
        })
      )?.json;

      console.log('handleScroll = ' + 2);
      setCursor(
        (() => {
          const e = result?.data?.feeds;
          return e[e.length - 1];
        })()?.cursor
      );
      setFeedsData(feedsData.concat(result?.data?.feeds));
      setIsLoading(false);

      console.log('handleScroll = ' + 3);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPage = event => {
    // console.log(event.nativeEvent)
    // layoutMeasurement:{height:812,width:375}
    // ►contentSize:{height:2752.666748046875,width:375}
    // zoomScale:1
    // ►contentOffset:{y:1940.6666666666667,x:0}

    const offsetY = event.nativeEvent.contentOffset.y;
    const contentSize =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height -
      50;

    if (offsetY > contentSize) {
      return false;
    }

    return true;
  };

  const updateCount = (type, count) => {
    debugger;

    props.setDataCount(props.headers[type].key, count);
  };
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom Color 19'], height: '100%' },
        dimensions.width
      )}
    >
      {/* 读取窗口 */}
      <>
        {!isLoading ? null : (
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
      {/* event */}
      <>
        {(props.section ?? defaultProps.section) === 'Spotlight' ? null : (
          <AceCampTestApi.FetchDailyupdateFeedsGET
            collection={props.date_type ?? defaultProps.date_type}
            handlers={{
              onData: eventData => {
                const handler = async () => {
                  try {
                    /* hidden 'Log to Console' action */
                    setIsLoading(true);
                    setFeedsData(eventData?.data?.feeds);
                    setCursor(
                      (() => {
                        const e = eventData?.data?.feeds;
                        return e[e.length - 1];
                      })()?.cursor
                    );
                    setTotalRecord(eventData?.meta?.total);
                    await waitUtil({ milliseconds: 1000 });
                    setIsLoading(false);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              },
            }}
            page_size={20}
            source_type={props.section ?? defaultProps.section}
          >
            {({ loading, error, data, refetchDailyupdateFeeds }) => {
              const eventData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {/* Scroll View 2 */}
                  <SimpleStyleScrollView
                    bounces={true}
                    horizontal={false}
                    keyboardShouldPersistTaps={'never'}
                    nestedScrollEnabled={false}
                    onScroll={event => {
                      const handler = async () => {
                        try {
                          /* hidden 'Run a Custom Function' action */
                          if (loadPage(event)) {
                            return;
                          }
                          if (isLoading) {
                            return;
                          }
                          if (feedsData?.length >= totalRecord) {
                            return;
                          }
                          setIsLoading(true);
                          const result = (
                            await AceCampTestApi.dailyupdateFeedsGET(
                              Constants,
                              {
                                collection:
                                  props.date_type ?? defaultProps.date_type,
                                cursor: cursor,
                                page_size: 20,
                                source_type:
                                  props.section ?? defaultProps.section,
                              }
                            )
                          )?.json;
                          setCursor(
                            (() => {
                              const e = result?.data?.feeds;
                              return e[e.length - 1];
                            })()?.cursor
                          );
                          setFeedsData(feedsData.concat(result?.data?.feeds));
                          await waitUtil({ milliseconds: 1000 });
                          setIsLoading(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    style={StyleSheet.applyWidth(
                      {
                        paddingBottom:
                          100 + safeAreaInsets.top + safeAreaInsets.bottom,
                      },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(eventData?.data?.feeds?.length > 0) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: palettes.App['Custom Color 19'],
                              paddingBottom: 5,
                              paddingTop: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <Shadow
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
                            distance={10}
                            offsetX={14}
                            startColor={palettes.App.appStyle_cardShadow_2}
                          >
                            {/* 系列活动-列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
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
                                  'event->Scroll View 2->View->Shadow->系列活动-列表->List'
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReached={() => {
                                  try {
                                    /* hidden 'Conditional Stop' action */
                                    /* hidden 'Conditional Stop' action */
                                    /* hidden 'Conditional Stop' action */
                                    /* hidden 'Set Variable' action */
                                    /* hidden 'API Request' action */
                                    /* hidden 'Set Variable' action */
                                    /* hidden 'Set Variable' action */
                                    /* hidden 'Set Variable' action */
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <RecommandSectionBlock
                                      dataItem={listData}
                                      hideMenu={true}
                                      isLatest={feedsData?.length - 1 === index}
                                    />
                                  );
                                }}
                                snapToAlignment={'start'}
                                extraData={feedsData?.length}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={StyleSheet.applyWidth(
                                  { paddingLeft: 8, paddingRight: 8 },
                                  dimensions.width
                                )}
                              />
                              {/* View 3 */}
                              <>
                                {!(eventData?.meta?.total === 0) ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor: palettes.App.White,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        paddingBottom: 5,
                                        paddingTop: 5,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'Text Title'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text Title'
                                          ].style,
                                          {
                                            color:
                                              palettes.App['Custom Color 4'],
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '400',
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, 'common_no_content')}
                                    </Text>
                                  </View>
                                )}
                              </>
                            </View>
                          </Shadow>
                        </View>
                      )}
                    </>
                    {/* View 3 */}
                    <>
                      {!(eventData?.meta?.total === 0) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              marginTop: 200,
                              paddingBottom: 5,
                              paddingTop: 5,
                            },
                            dimensions.width
                          )}
                        >
                          <SVG
                            {...GlobalStyles.SVGStyles(theme)['SVG'].props}
                            source={
                              'https://static.acecamptech.com/system/empty.svg'
                            }
                            style={StyleSheet.applyWidth(
                              GlobalStyles.SVGStyles(theme)['SVG'].style,
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text Title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text Title']
                                  .style,
                                {
                                  color: palettes.App['Custom Color 4'],
                                  fontFamily: 'System',
                                  fontSize: 14,
                                  fontWeight: '400',
                                  marginRight: null,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'common_no_content')}
                          </Text>
                        </View>
                      )}
                    </>
                  </SimpleStyleScrollView>
                </>
              );
            }}
          </AceCampTestApi.FetchDailyupdateFeedsGET>
        )}
      </>
    </View>
  );
};

export default withTheme(DailyUpdateFeedsBlock);
