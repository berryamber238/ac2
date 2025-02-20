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
import MyFollowCorporationBlock from '../components/MyFollowCorporationBlock';
import MyFollowOrganizationBlock from '../components/MyFollowOrganizationBlock';
import MyFollowTopicBlock from '../components/MyFollowTopicBlock';
import MyFollowUserSectionBlock from '../components/MyFollowUserSectionBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyFollowScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [follow_corporation, setFollow_corporation] = React.useState([]);
  const [follow_corporation_page, setFollow_corporation_page] =
    React.useState(2);
  const [follow_corporation_refresh, setFollow_corporation_refresh] =
    React.useState(false);
  const [follow_organization, setFollow_organization] = React.useState([]);
  const [follow_organization_page, setFollow_organization_page] =
    React.useState(2);
  const [follow_organization_refresh, setFollow_organization_refresh] =
    React.useState(false);
  const [follow_topic, setFollow_topic] = React.useState([]);
  const [follow_topic_page, setFollow_topic_page] = React.useState(2);
  const [follow_topic_refresh, setFollow_topic_refresh] = React.useState(false);
  const [follow_user, setFollow_user] = React.useState([]);
  const [follow_user_page, setFollow_user_page] = React.useState(2);
  const [is_loading, setIs_loading] = React.useState(false);
  const [refreshingTabViewFetchList, setRefreshingTabViewFetchList] =
    React.useState(false);
  const [refreshingTabViewFetch2List, setRefreshingTabViewFetch2List] =
    React.useState(false);
  const [refreshingTabViewFetch3List, setRefreshingTabViewFetch3List] =
    React.useState(false);
  const [refreshingTabViewFetch4List, setRefreshingTabViewFetch4List] =
    React.useState(false);
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
              {t(Variables, 'mine_my_followed')}
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
        onIndexChanged={newIndex => {
          try {
            if (newIndex === 1) {
              setFollow_organization_refresh(!follow_organization_refresh);
            } else {
              if (newIndex === 2) {
                setFollow_corporation_refresh(!follow_corporation_refresh);
              } else {
                setFollow_topic_refresh(!follow_topic_refresh);
              }
            }
          } catch (err) {
            console.error(err);
          }
        }}
        pressColor={theme.colors.branding.primary}
        scrollEnabled={false}
        swipeEnabled={true}
        tabBarPosition={'top'}
        tabsBackgroundColor={theme.colors.background.base}
        activeColor={palettes.Brand.appStyle_primary}
        style={StyleSheet.applyWidth(
          { fontFamily: 'System', fontSize: 12, fontWeight: '400' },
          dimensions.width
        )}
      >
        {/* 关注人 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'mine_follow_people')}
        >
          <AceCampTestApi.FetchSnsFollowingUsersGET
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
                  /* hidden 'Log to Console' action */
                  setFollow_user(fetchData?.data);
                  setFollow_user_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={20}
          >
            {({ loading, error, data, refetchSnsFollowingUsers }) => {
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
                    listKey={'Tab View->关注人->Fetch->List'}
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
                              await refetchSnsFollowingUsers();
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
                      return <MyFollowUserSectionBlock item={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
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
          </AceCampTestApi.FetchSnsFollowingUsersGET>
        </TabViewItem>
        {/* 关注主办方 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'mine_follow_sponsor')}
        >
          {/* Fetch 2 */}
          <AceCampTestApi.FetchSnsFollowingOrganizationsGET
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
            refresh={follow_organization_refresh}
          >
            {({ loading, error, data, refetchSnsFollowingOrganizations }) => {
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
                    listKey={'Tab View->关注主办方->Fetch 2->List'}
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
                              await refetchSnsFollowingOrganizations();
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
                      return <MyFollowOrganizationBlock item={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
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
          </AceCampTestApi.FetchSnsFollowingOrganizationsGET>
        </TabViewItem>
        {/* 关注公司 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'mine_follow_company')}
        >
          {/* Fetch 3 */}
          <AceCampTestApi.FetchSnsFollowingCorporationsGET
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
            refetchOnWindowFocus={true}
            refresh={follow_corporation_refresh}
          >
            {({ loading, error, data, refetchSnsFollowingCorporations }) => {
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
                    listKey={'Tab View->关注公司->Fetch 3->List'}
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
                      return <MyFollowCorporationBlock item={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
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
          </AceCampTestApi.FetchSnsFollowingCorporationsGET>
        </TabViewItem>
        {/* 关注讨论 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'mine_follow_topic')}
        >
          {/* Fetch 4 */}
          <AceCampTestApi.FetchSnsFollowingTopicsGET
            handlers={{
              on401: fetch4Data => {
                try {
                  console.log(fetch4Data?.statusText);
                } catch (err) {
                  console.error(err);
                }
              },
              on4xx: fetch4Data => {
                try {
                  console.log('error');
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetch4Data => {
                try {
                  /* hidden 'Log to Console' action */
                  setFollow_topic(fetch4Data?.data);
                  setFollow_topic_page(2);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            page={1}
            per_page={20}
            refresh={follow_topic_refresh}
          >
            {({ loading, error, data, refetchSnsFollowingTopics }) => {
              const fetch4Data = data?.json;
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
                    data={follow_topic}
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
                    listKey={'Tab View->关注讨论->Fetch 4->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (is_loading) {
                            return;
                          }
                          if (fetch4Data?.meta?.total <= follow_topic?.length) {
                            return;
                          }
                          setIs_loading(true);
                          const result = (
                            await AceCampTestApi.snsFollowingTopicsGET(
                              Constants,
                              { page: follow_topic_page, per_page: 20 }
                            )
                          )?.json;
                          setFollow_topic(follow_topic.concat(result?.data));
                          setFollow_topic_page(follow_topic_page + 1);
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
                        refreshing={refreshingTabViewFetch4List}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingTabViewFetch4List(true);
                              await refetchSnsFollowingTopics();
                              setRefreshingTabViewFetch4List(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshingTabViewFetch4List(false);
                            }
                          };
                          handler();
                        }}
                      />
                    }
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return <MyFollowTopicBlock item={listData} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                  />
                  <>
                    {!(
                      fetch4Data?.code !== 200 || fetch4Data?.data?.length === 0
                    ) ? null : (
                      <NoDataBlock />
                    )}
                  </>
                </>
              );
            }}
          </AceCampTestApi.FetchSnsFollowingTopicsGET>
        </TabViewItem>
      </TabView>
    </ScreenContainer>
  );
};

export default withTheme(MineMyFollowScreen);
