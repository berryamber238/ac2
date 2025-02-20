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
import MyOpinionSectionBlock from '../components/MyOpinionSectionBlock';
import TitleSectionBlackBlock from '../components/TitleSectionBlackBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as LoadingModal from '../custom-files/LoadingModal';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyPointScreen = props => {
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
  const [refresh, setRefresh] = React.useState(false);
  const [stats, setStats] = React.useState({
    gift: 0,
    like_count: 0,
    view_count: 0,
    share_count: 0,
    comment_count: 0,
    dislike_count: 0,
    opinion_count: 0,
    favorite_count: 0,
  });
  const [refreshingTabViewViewFetchList, setRefreshingTabViewViewFetchList] =
    React.useState(false);
  const [refreshingTabViewFetchList, setRefreshingTabViewFetchList] =
    React.useState(false);
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
    // confirmFunc = doDelete;
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestDeleteOpinionDELETE.mutateAsync({
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
    setModal_message(t(Variables, 'are_you_sure_recall'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestOpinionToDraftPUT.mutateAsync({
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
  const aceCampTestOpinionToDraftPUT = AceCampTestApi.useOpinionToDraftPUT();
  const aceCampTestDeleteOpinionDELETE =
    AceCampTestApi.useDeleteOpinionDELETE();
  React.useEffect(() => {
    try {
      setIs_loading(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <TitleSectionBlackBlock title={'my_point_of_view'} />
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
                {t(Variables, 'my_point_data_stat_num')}
              </Text>
            </View>

            <AceCampTestApi.FetchOpinionStatsGET
              handlers={{
                onData: fetchData => {
                  try {
                    if (fetchData?.code !== 200) {
                      setStats({
                        gift: 0,
                        like_count: 0,
                        view_count: 0,
                        share_count: 0,
                        comment_count: 0,
                        dislike_count: 0,
                        opinion_count: 0,
                        favorite_count: 0,
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
              {({ loading, error, data, refetchOpinionStats }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <View />;
                }

                return null;
              }}
            </AceCampTestApi.FetchOpinionStatsGET>
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
              {/* View 6 */}
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
                  {t(Variables, 'my_point_agree_num')}
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
                  {stats?.like_count}
                </Text>
              </View>
              {/* View 5 */}
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
                  {t(Variables, 'my_point_disagree_num')}
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
                  {stats?.dislike_count}
                </Text>
              </View>
              {/* View 4 */}
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
                  {t(Variables, 'my_point_comment_num')}
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
                  {stats?.comment_count}
                </Text>
              </View>
              {/* View 3 */}
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
                  {t(Variables, 'mine_collection')}
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
                  {stats?.favorite_count}
                </Text>
              </View>
              {/* View 2 */}
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
                  {t(Variables, 'my_point_reward_num')}
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
                  {stats?.gift}
                </Text>
              </View>
            </View>

            <AceCampTestApi.FetchOpinionListGET
              handlers={{
                onData: fetchData => {
                  try {
                    setIs_loading(false);
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
              per_page={10}
              refresh={refresh}
              state={'passed'}
            >
              {({ loading, error, data, refetchOpinionList }) => {
                const fetchData = data?.json;
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
                          fetchData?.data?.length === 0 ||
                          fetchData?.code !== 200
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
                        data={fetchData?.data}
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
                        listKey={'Tab View->已发布->View->Fetch->列表->List'}
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        pagingEnabled={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshingTabViewViewFetchList}
                            onRefresh={() => {
                              const handler = async () => {
                                try {
                                  setRefreshingTabViewViewFetchList(true);
                                  await refetchOpinionList();
                                  setRefreshingTabViewViewFetchList(false);
                                } catch (err) {
                                  console.error(err);
                                  setRefreshingTabViewViewFetchList(false);
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
                              <MyOpinionSectionBlock
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
            </AceCampTestApi.FetchOpinionListGET>
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
          <AceCampTestApi.FetchOpinionListGET
            page={1}
            per_page={10}
            refresh={refresh}
            state={'not_passed'}
          >
            {({ loading, error, data, refetchOpinionList }) => {
              const fetchData = data?.json;
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
                        fetchData?.data?.length === 0 || fetchData?.code !== 200
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
                      data={fetchData?.data}
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
                      listKey={'Tab View->待发布->Fetch->列表->List'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshingTabViewFetchList}
                          onRefresh={() => {
                            const handler = async () => {
                              try {
                                setRefreshingTabViewFetchList(true);
                                await refetchOpinionList();
                                setRefreshingTabViewFetchList(false);
                              } catch (err) {
                                console.error(err);
                                setRefreshingTabViewFetchList(false);
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
                            <MyOpinionSectionBlock
                              onDelete={id => {
                                const handler = async () => {
                                  try {
                                    await onDelete(id);
                                    /* hidden 'Run a Custom Function' action */
                                    /* hidden 'API Request' action */
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              onRecall={id => {
                                const handler = async () => {
                                  try {
                                    (
                                      await aceCampTestOpinionToDraftPUT.mutateAsync(
                                        { id: 70548038 }
                                      )
                                    )?.json;
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
          </AceCampTestApi.FetchOpinionListGET>
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
      {/* View 2 */}
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
              navigation.push('CreatePointScreen');
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

export default withTheme(MineMyPointScreen);
