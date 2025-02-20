import React from 'react';
import {
  Divider,
  ExpoImage,
  Icon,
  SVG,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import MyCommentSectionBlock from '../components/MyCommentSectionBlock';
import MyOpinionSectionBlock from '../components/MyOpinionSectionBlock';
import MyTopicSectionBlock from '../components/MyTopicSectionBlock';
import TitleSectionBlackBlock from '../components/TitleSectionBlackBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as LoadingModal from '../custom-files/LoadingModal';
import * as Toast from '../custom-files/Toast';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyTopicScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [confirm_modal_visiable, setConfirm_modal_visiable] =
    React.useState(false);
  const [is_loading, setIs_loading] = React.useState(false);
  const [modal_callback, setModal_callback] = React.useState('');
  const [modal_cancel, setModal_cancel] = React.useState(
    t(Variables, 'common_cancel')
  );
  const [modal_confirm, setModal_confirm] = React.useState(
    t(Variables, 'common_yes')
  );
  const [modal_message, setModal_message] = React.useState('');
  const [modal_title, setModal_title] = React.useState('');
  const [my_comments, setMy_comments] = React.useState([]);
  const [my_comments_page, setMy_comments_page] = React.useState(2);
  const [not_passed_page, setNot_passed_page] = React.useState(2);
  const [not_passed_topic, setNot_passed_topic] = React.useState([]);
  const [passed_page, setPassed_page] = React.useState(2);
  const [passed_topic, setPassed_topic] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [stats, setStats] = React.useState({
    gift: 0,
    post_count: 0,
    view_count: 0,
    event_count: 0,
    topic_count: 0,
    opinion_count: 0,
    topic_comment_count: 0,
  });
  const [
    refreshingTabViewViewPassedFetchList,
    setRefreshingTabViewViewPassedFetchList,
  ] = React.useState(false);
  const [
    refreshingTabViewNotPassedFetchList,
    setRefreshingTabViewNotPassedFetchList,
  ] = React.useState(false);
  const [
    refreshingTabViewViewCommentsFetchList,
    setRefreshingTabViewViewCommentsFetchList,
  ] = React.useState(false);
  const [refreshingTabViewViewAttendList, setRefreshingTabViewViewAttendList] =
    React.useState(false);
  const onCommentDelete = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_delete'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestCommentsDeleteDELETE.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          await refetchMyTopicComments();
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onConfirm = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const onDelete = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_delete'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestTopicDeleteDELETE.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          setRefresh(!refresh);
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onRecall = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_recall_topic'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestTopicToDraftPUT.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          setRefresh(!refresh);
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };
  let confirmFunc;
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestTopicDeleteDELETE = AceCampTestApi.useTopicDeleteDELETE();
  const aceCampTestTopicToDraftPUT = AceCampTestApi.useTopicToDraftPUT();
  const aceCampTestCommentsDeleteDELETE =
    AceCampTestApi.useCommentsDeleteDELETE();
  React.useEffect(() => {
    try {
      setIs_loading(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <TitleSectionBlackBlock title={'tab_circle_new_dis'} />
      <TabView
        iconPosition={'top'}
        indicatorColor={theme.colors.branding.primary}
        initialTabIndex={0}
        keyboardDismissMode={'auto'}
        pressColor={theme.colors.branding.primary}
        swipeEnabled={true}
        tabBarPosition={'top'}
        tabsBackgroundColor={theme.colors.background.base}
        activeColor={palettes.Brand.appStyle_primary}
        scrollEnabled={false}
        style={StyleSheet.applyWidth(
          { paddingBottom: 0, paddingTop: 0 },
          dimensions.width
        )}
      >
        {/* 已发布 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              { paddingBottom: 0, paddingTop: 0 }
            ),
            dimensions.width
          )}
          title={t(Variables, 'common_released')}
        >
          <View>
            {/* 标题 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', padding: 16 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'my_point_data_stat')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: 'rgb(155, 169, 181)',
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'my_topic_data_stat_num')}
              </Text>
            </View>

            <AceCampTestApi.FetchTopicStateGET
              handlers={{
                onData: fetchData => {
                  try {
                    if (fetchData?.code !== 200) {
                      setStats({
                        gift: 0,
                        post_count: 0,
                        view_count: 0,
                        event_count: 0,
                        topic_count: 0,
                        opinion_count: 0,
                        topic_comment_count: 0,
                      });
                    } else {
                      setStats(fetchData?.data);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
            >
              {({ loading, error, data, refetchTopicState }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <View />;
                }

                return null;
              }}
            </AceCampTestApi.FetchTopicStateGET>
            {/* 统计 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.App['Custom Color 14'],
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: 16,
                  marginRight: 16,
                  paddingBottom: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
            >
              {/* 阅读 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
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
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_read')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.itemTextNomal,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {stats?.view_count}
                </Text>
              </View>
              {/* 相关讨论 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
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
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'my_topic_short_comment')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.itemTextNomal,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {stats?.topic_comment_count}
                </Text>
              </View>
              {/* 相关观点 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
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
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'my_topic_about_point')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.itemTextNomal,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {stats?.opinion_count}
                </Text>
              </View>
              {/* 相关活动 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
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
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'my_topic_about_event')}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.itemTextNomal,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {stats?.event_count}
                </Text>
              </View>
            </View>
            {/* Passed_Fetch */}
            <AceCampTestApi.FetchTopicListGET
              handlers={{
                onData: passedFetchData => {
                  try {
                    setPassed_topic(passedFetchData?.data);
                    setPassed_page(2);
                    setIs_loading(false);
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
              per_page={10}
              state={'passed'}
            >
              {({ loading, error, data, refetchTopicList }) => {
                const passedFetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {/* 列表 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* 无内容 */}
                      <>
                        {!(
                          passedFetchData?.data?.length === 0 ||
                          passedFetchData?.code !== 200
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                              },
                              dimensions.width
                            )}
                          >
                            {/* SVG */}
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(Constants['empty_svg'])}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand.itemTextNomal,
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                  letterSpacing: 0.2,
                                  lineHeight: 20,
                                  marginRight: null,
                                  marginTop: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'common_no_content')}
                            </Text>
                          </View>
                        )}
                      </>
                      <SimpleStyleFlatList
                        data={passed_topic}
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
                          'Tab View->已发布->View->Passed_Fetch->列表->List'
                        }
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReached={() => {
                          const handler = async () => {
                            try {
                              if (
                                passed_topic?.length >=
                                passedFetchData?.meta?.total
                              ) {
                                return;
                              }
                              if (is_loading) {
                                return;
                              }
                              setIs_loading(true);
                              const result = (
                                await AceCampTestApi.topicListGET(Constants, {
                                  page: passed_page,
                                  per_page: 20,
                                  state: 'passed',
                                })
                              )?.json;
                              setPassed_topic(
                                passed_topic.concat(result?.data)
                              );
                              setPassed_page(passed_page + 1);
                              setIs_loading(false);
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        onEndReachedThreshold={0.5}
                        pagingEnabled={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshingTabViewViewPassedFetchList}
                            onRefresh={() => {
                              const handler = async () => {
                                try {
                                  setRefreshingTabViewViewPassedFetchList(true);
                                  await refetchTopicList();
                                  setRefreshingTabViewViewPassedFetchList(
                                    false
                                  );
                                } catch (err) {
                                  console.error(err);
                                  setRefreshingTabViewViewPassedFetchList(
                                    false
                                  );
                                }
                              };
                              handler();
                            }}
                          />
                        }
                        renderItem={({ item, index }) => {
                          const listData = item;
                          return (
                            <View
                              style={StyleSheet.applyWidth(
                                { paddingTop: 10 },
                                dimensions.width
                              )}
                            >
                              <MyTopicSectionBlock item={listData} />
                            </View>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={'start'}
                        style={StyleSheet.applyWidth(
                          { marginTop: 16 },
                          dimensions.width
                        )}
                      />
                    </View>
                  </>
                );
              }}
            </AceCampTestApi.FetchTopicListGET>
          </View>
        </TabViewItem>
        {/* 待发布 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'my_point_to_be')}
        >
          {/* Not_Passed_Fetch */}
          <AceCampTestApi.FetchTopicListGET
            handlers={{
              onData: notPassedFetchData => {
                try {
                  setNot_passed_topic(notPassedFetchData?.data);
                  setNot_passed_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={10}
            state={'not_passed'}
          >
            {({ loading, error, data, refetchTopicList }) => {
              const notPassedFetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {/* 列表 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(
                        notPassedFetchData?.data?.length === 0 ||
                        notPassedFetchData?.code !== 200
                      ) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <SVG
                            {...GlobalStyles.SVGStyles(theme)['SVG'].props}
                            source={Constants['empty_svg']}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.SVGStyles(theme)['SVG'].style,
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand.itemTextNomal,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 20,
                                marginRight: null,
                                marginTop: 10,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'common_no_content')}
                          </Text>
                        </View>
                      )}
                    </>
                    <SimpleStyleFlatList
                      data={not_passed_topic}
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
                      listKey={'Tab View->待发布->Not_Passed_Fetch->列表->List'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshingTabViewNotPassedFetchList}
                          onRefresh={() => {
                            const handler = async () => {
                              try {
                                setRefreshingTabViewNotPassedFetchList(true);
                                await refetchTopicList();
                                setRefreshingTabViewNotPassedFetchList(false);
                              } catch (err) {
                                console.error(err);
                                setRefreshingTabViewNotPassedFetchList(false);
                              }
                            };
                            handler();
                          }}
                        />
                      }
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <View
                            style={StyleSheet.applyWidth(
                              { paddingTop: 10 },
                              dimensions.width
                            )}
                          >
                            <MyTopicSectionBlock
                              onDelete={id => {
                                const handler = async () => {
                                  try {
                                    await onDelete(id);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              onRecall={id => {
                                const handler = async () => {
                                  try {
                                    /* hidden 'API Request' action */
                                    /* hidden 'API Request' action */
                                    await onRecall(id);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              item={listData}
                            />
                          </View>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      snapToAlignment={'start'}
                    />
                  </View>
                </>
              );
            }}
          </AceCampTestApi.FetchTopicListGET>
        </TabViewItem>
        {/* 已参与 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              { paddingBottom: 0, paddingTop: 0 }
            ),
            dimensions.width
          )}
          title={t(Variables, 'my_topic_attend')}
        >
          <View>
            {/* Comments_Fetch */}
            <AceCampTestApi.FetchMyTopicCommentsGET
              handlers={{
                onData: commentsFetchData => {
                  try {
                    setMy_comments(commentsFetchData?.data);
                    setMy_comments_page(2);
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
            >
              {({ loading, error, data, refetchMyTopicComments }) => {
                const commentsFetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return (
                    <>
                      {!(
                        commentsFetchData?.data?.length === 0 ||
                        commentsFetchData?.code !== 200
                      ) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* SVG */}
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(Constants['empty_svg'])}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand.itemTextNomal,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 20,
                                marginRight: null,
                                marginTop: 10,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'common_no_content')}
                          </Text>
                        </View>
                      )}
                    </>
                  );
                }

                return (
                  <>
                    {/* 列表 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <>
                        {!(
                          commentsFetchData?.data?.length === 0 ||
                          commentsFetchData?.code !== 200
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                              },
                              dimensions.width
                            )}
                          >
                            {/* SVG */}
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(Constants['empty_svg'])}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand.itemTextNomal,
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                  letterSpacing: 0.2,
                                  lineHeight: 20,
                                  marginRight: null,
                                  marginTop: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'common_no_content')}
                            </Text>
                          </View>
                        )}
                      </>
                      <SimpleStyleFlatList
                        data={my_comments}
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
                          'Tab View->已参与->View->Comments_Fetch->列表->List'
                        }
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        pagingEnabled={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshingTabViewViewCommentsFetchList}
                            onRefresh={() => {
                              const handler = async () => {
                                try {
                                  setRefreshingTabViewViewCommentsFetchList(
                                    true
                                  );
                                  await refetchMyTopicComments();
                                  setRefreshingTabViewViewCommentsFetchList(
                                    false
                                  );
                                } catch (err) {
                                  console.error(err);
                                  setRefreshingTabViewViewCommentsFetchList(
                                    false
                                  );
                                }
                              };
                              handler();
                            }}
                          />
                        }
                        renderItem={({ item, index }) => {
                          const listData = item;
                          return (
                            <View
                              style={StyleSheet.applyWidth(
                                { paddingTop: 10 },
                                dimensions.width
                              )}
                            >
                              <MyCommentSectionBlock
                                onDelete={id => {
                                  const handler = async () => {
                                    try {
                                      await refetchMyTopicComments();
                                      await onCommentDelete(id);
                                      /* hidden 'API Request' action */
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                item={listData}
                              />
                            </View>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={'start'}
                        style={StyleSheet.applyWidth(
                          { marginTop: 16 },
                          dimensions.width
                        )}
                      />
                    </View>
                  </>
                );
              }}
            </AceCampTestApi.FetchMyTopicCommentsGET>
          </View>
        </TabViewItem>
      </TabView>
      {/* TipsModal */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={modal_title}
          message={modal_message}
          confirmBtn={modal_confirm}
          cancelBtn={modal_cancel}
          onCancel={() => {
            setConfirm_modal_visiable(false);
          }}
          onConfirm={modal_callback}
          visible={confirm_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
      {/* Toast */}
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
      <Utils.CustomCodeErrorBoundary>
        <LoadingModal.LoadingModal visible={is_loading} />
      </Utils.CustomCodeErrorBoundary>
      {/* 新建按钮 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            bottom: safeAreaInsets.bottom,
            padding: 20,
            position: 'absolute',
            width: [
              { minWidth: Breakpoints.Mobile, value: 1 },
              { minWidth: Breakpoints.Mobile, value: dimensions.width },
            ],
          },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              navigation.push('CreateTopicScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
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
            distance={5}
            startColor={palettes.App['Custom Color 66']}
            style={StyleSheet.applyWidth({ opacity: 1 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.Brand.appStyle_primary,
                  borderRadius: 20,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 10,
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
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 19,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'tab_circle_new_point')}
              </Text>
            </View>
          </Shadow>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(MineMyTopicScreen);
