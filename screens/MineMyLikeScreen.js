import React from 'react';
import {
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  TabView,
  TabViewItem,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import MyLikeMinute2Block from '../components/MyLikeMinute2Block';
import NoDataBlock from '../components/NoDataBlock';
import OpinionSectionBlock from '../components/OpinionSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyLikeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [follow_corporation, setFollow_corporation] = React.useState([]);
  const [follow_corporation_page, setFollow_corporation_page] =
    React.useState(2);
  const [follow_organization, setFollow_organization] = React.useState([]);
  const [follow_organization_page, setFollow_organization_page] =
    React.useState(2);
  const [follow_topic, setFollow_topic] = React.useState([]);
  const [follow_topic_page, setFollow_topic_page] = React.useState(2);
  const [follow_user, setFollow_user] = React.useState([]);
  const [follow_user_page, setFollow_user_page] = React.useState(2);
  const [is_loading, setIs_loading] = React.useState(false);
  const [refreshingTabViewFetchList, setRefreshingTabViewFetchList] =
    React.useState(false);
  const [refreshingTabViewFetch2List, setRefreshingTabViewFetch2List] =
    React.useState(false);
  const [refreshingTabViewFetch3List, setRefreshingTabViewFetch3List] =
    React.useState(false);
  const getOpinionData = item => {
    const newItem = {};
    newItem.data = item;
    return newItem;
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 5,
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
            color={palettes.App.appStyle_black}
            icon={'AntDesign/left'}
            size={22}
          />
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              adjustsFontSizeToFit={true}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App.appStyle_black,
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 28,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_likes_article')}
            </Text>
          </View>
        </View>
      </View>
      {/* View 2 */}
      <View />
      <TabView
        iconPosition={'top'}
        indicatorColor={theme.colors.branding.primary}
        initialTabIndex={0}
        keyboardDismissMode={'auto'}
        pressColor={theme.colors.branding.primary}
        scrollEnabled={false}
        swipeEnabled={true}
        tabBarPosition={'top'}
        tabsBackgroundColor={theme.colors.background.base}
        activeColor={palettes.Brand.appStyle_primary}
        style={StyleSheet.applyWidth(
          { fontFamily: 'System', fontSize: 13, fontWeight: '400' },
          dimensions.width
        )}
      >
        {/* 观点 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'tab_vote_point')}
        >
          <AceCampTestApi.FetchSnsLikeOpinionsGET
            handlers={{
              on401: fetchData => {
                try {
                  console.log(fetchData?.statusText);
                } catch (err) {
                  console.error(err);
                }
              },
              on4xx: fetchData => {
                try {
                  console.log('error');
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetchData => {
                try {
                  console.log(fetchData);
                  setFollow_user(fetchData?.data);
                  setFollow_user_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={20}
            retry={1}
          >
            {({ loading, error, data, refetchSnsLikeOpinions }) => {
              const fetchData = data?.json;
              if (loading) {
                return <FetchLoadingBlock />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return (
                  <>
                    {/* No-Data 2 */}
                    <NoDataBlock />
                  </>
                );
              }

              return (
                <>
                  <SimpleStyleFlatList
                    data={follow_user}
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
                    listKey={'Tab View->观点->Fetch->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (is_loading) {
                            return;
                          }
                          if (fetchData?.meta?.total <= follow_user?.length) {
                            return;
                          }
                          setIs_loading(true);
                          const result = (
                            await AceCampTestApi.snsFollowingUsersGET(
                              Constants,
                              { page: follow_user_page, per_page: 20 }
                            )
                          )?.json;
                          setFollow_user(follow_user.concat(result?.data));
                          setFollow_user_page(follow_user_page + 1);
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
                        refreshing={refreshingTabViewFetchList}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingTabViewFetchList(true);
                              await refetchSnsLikeOpinions();
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
                        <OpinionSectionBlock
                          gotoScreen={(screen, id) => {
                            try {
                              if (listData?.parent_id) {
                                navigation.push('WebViewScreen', {
                                  url:
                                    Constants['base_url'] +
                                    '/viewpoint/detail/' +
                                    listData?.parent_id,
                                });
                              } else {
                                navigation.push('WebViewScreen', {
                                  url:
                                    Constants['base_url'] +
                                    '/viewpoint/detail/' +
                                    listData?.id,
                                });
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          dataItem={getOpinionData(listData)}
                        />
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                  />
                  <>
                    {!(
                      fetchData?.code !== 200 || fetchData?.data?.length === 0
                    ) ? null : (
                      <NoDataBlock />
                    )}
                  </>
                </>
              );
            }}
          </AceCampTestApi.FetchSnsLikeOpinionsGET>
        </TabViewItem>
        {/* 纪要 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'mine_note_collection')}
        >
          {/* Fetch 2 */}
          <AceCampTestApi.FetchSnsLikeArticlesGET
            handlers={{
              on401: fetch2Data => {
                try {
                  console.log(fetch2Data?.statusText);
                } catch (err) {
                  console.error(err);
                }
              },
              on4xx: fetch2Data => {
                try {
                  console.log('error');
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetch2Data => {
                try {
                  console.log(fetch2Data);
                  setFollow_organization(fetch2Data?.data);
                  setFollow_organization_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={20}
            type={'minute'}
          >
            {({ loading, error, data, refetchSnsLikeArticles }) => {
              const fetch2Data = data?.json;
              if (loading) {
                return <FetchLoadingBlock />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return (
                  <>
                    {/* No-Data 2 */}
                    <NoDataBlock />
                  </>
                );
              }

              return (
                <>
                  <SimpleStyleFlatList
                    data={follow_organization}
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
                    listKey={'Tab View->纪要->Fetch 2->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (is_loading) {
                            return;
                          }
                          if (
                            fetch2Data?.meta?.total <=
                            follow_organization?.length
                          ) {
                            return;
                          }
                          setIs_loading(true);
                          const result = (
                            await AceCampTestApi.snsFollowingOrganizationsGET(
                              Constants,
                              { page: follow_organization_page, per_page: 20 }
                            )
                          )?.json;
                          setFollow_organization(
                            follow_organization.concat(result?.data)
                          );
                          setFollow_organization_page(
                            follow_organization_page + 1
                          );
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
                        refreshing={refreshingTabViewFetch2List}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingTabViewFetch2List(true);
                              await refetchSnsLikeArticles();
                              setRefreshingTabViewFetch2List(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshingTabViewFetch2List(false);
                            }
                          };
                          handler();
                        }}
                      />
                    }
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return <MyLikeMinute2Block dataItem={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth(
                      { marginTop: 16 },
                      dimensions.width
                    )}
                  />
                  <>
                    {!(
                      fetch2Data?.code !== 200 || fetch2Data?.data?.length === 0
                    ) ? null : (
                      <NoDataBlock />
                    )}
                  </>
                </>
              );
            }}
          </AceCampTestApi.FetchSnsLikeArticlesGET>
        </TabViewItem>
        {/* 文章 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'tab_articles')}
        >
          {/* Fetch 3 */}
          <AceCampTestApi.FetchSnsLikeArticlesGET
            handlers={{
              on401: fetch3Data => {
                try {
                  console.log(fetch3Data?.statusText);
                } catch (err) {
                  console.error(err);
                }
              },
              on4xx: fetch3Data => {
                try {
                  console.log('error');
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetch3Data => {
                try {
                  /* hidden 'Log to Console' action */
                  setFollow_corporation(fetch3Data?.data);
                  setFollow_corporation_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={20}
            type={'original'}
          >
            {({ loading, error, data, refetchSnsLikeArticles }) => {
              const fetch3Data = data?.json;
              if (loading) {
                return <FetchLoadingBlock />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return (
                  <>
                    {/* No-Data 2 */}
                    <NoDataBlock />
                  </>
                );
              }

              return (
                <>
                  <SimpleStyleFlatList
                    data={follow_corporation}
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
                    listKey={'Tab View->文章->Fetch 3->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (is_loading) {
                            return;
                          }
                          if (
                            fetch3Data?.meta?.total <=
                            follow_corporation?.length
                          ) {
                            return;
                          }
                          setIs_loading(true);
                          const result = (
                            await AceCampTestApi.snsFollowingCorporationsGET(
                              Constants,
                              { page: follow_corporation_page, per_page: 20 }
                            )
                          )?.json;
                          setFollow_corporation(
                            follow_corporation.concat(result?.data)
                          );
                          setFollow_corporation_page(
                            follow_corporation_page + 1
                          );
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
                        refreshing={refreshingTabViewFetch3List}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingTabViewFetch3List(true);
                              await refetchSnsFollowingCorporations();
                              setRefreshingTabViewFetch3List(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshingTabViewFetch3List(false);
                            }
                          };
                          handler();
                        }}
                      />
                    }
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return <MyLikeMinute2Block dataItem={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                  />
                  <>
                    {!(
                      fetch3Data?.code !== 200 || fetch3Data?.data?.length === 0
                    ) ? null : (
                      <NoDataBlock />
                    )}
                  </>
                </>
              );
            }}
          </AceCampTestApi.FetchSnsLikeArticlesGET>
        </TabViewItem>
      </TabView>
    </ScreenContainer>
  );
};

export default withTheme(MineMyLikeScreen);
