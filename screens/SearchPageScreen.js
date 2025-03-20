import React from 'react';
import {
  Icon,
  IconButton,
  Link,
  LoadingIndicator,
  SVG,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleMasonryFlashList,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as HighlightText from '../custom-files/HighlightText';
import getNameById from '../global-functions/getNameById';
import getType from '../global-functions/getType';
import setUndefined from '../global-functions/setUndefined';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SearchPageScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [corporationsAndOrganizations, setCorporationsAndOrganizations] =
    React.useState([]);
  const [custom_sector_ids, setCustom_sector_ids] = React.useState([]);
  const [date_type, setDate_type] = React.useState('');
  const [feedsData, setFeedsData] = React.useState([]);
  const [industry_ids, setIndustry_ids] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [is_loading, setIs_loading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search_key, setSearch_key] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);
  const [source_type, setSource_type] = React.useState(setUndefined());
  const [spotlight, setSpotlight] = React.useState(true);
  const [suggestion, setSuggestion] = React.useState({});
  const [textInputValue, setTextInputValue] = React.useState('');
  const [total_record, setTotal_record] = React.useState(0);
  const doSearch = (
    Variables,
    setGlobalVariableValue,
    in_ids,
    cus_ids,
    key
  ) => {
    try {
      setShowResult(true);
      setSearch_key('');
      setSearch_key(key);
      setSource_type(setUndefined());
      setSpotlight(true);
      setIndustry_ids(in_ids);
      setCustom_sector_ids(cus_ids);
      // Variables.search_history.reverse().push(key)
      const filteredArray = Variables.search_history.filter(
        item => item !== key
      );
      setGlobalVariableValue({
        key: 'search_history',
        value: [key].concat(filteredArray),
      });
      //
    } catch (err) {
      console.error(err);
    }
  };

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

  const removeHistory = (Variables, setGlobalVariableValue) => {
    setGlobalVariableValue({ key: 'search_history', value: [] });
  };
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  const scrollViewContainerViewTextInputRef = React.useRef();

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
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        onScroll={event => {
          const handler = async () => {
            try {
              if (!showResult) {
                return;
              }
              if (loadPage(event)) {
                return;
              }
              if (is_loading) {
                return;
              }
              if (feedsData?.length >= total_record) {
                return;
              }
              setIs_loading(true);
              const apiresult = (
                await AceCampTestApi.searchGET(Constants, {
                  custom_sector_ids: custom_sector_ids,
                  industry_ids: industry_ids,
                  keyword: search_key,
                  page: page,
                  per_page: 15,
                  source_type: source_type,
                  spotlight: spotlight,
                })
              )?.json;
              console.log(apiresult);
              setFeedsData(feedsData.concat(apiresult?.data?.feeds));
              setPage(page + 1);
              setIs_loading(false);
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {/* Container */}
        <View>
          {/* 搜索框 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* 返回按钮 */}
            <IconButton
              color={palettes.App['Custom Color 5']}
              icon={'AntDesign/left'}
              size={28}
            />
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: 'rgb(247, 247, 247)',
                  borderRadius: 4,
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 8,
                  marginRight: 8,
                  paddingBottom: 2,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 2,
                },
                dimensions.width
              )}
            >
              <Icon
                color={palettes.App['Custom Color 46']}
                name={'EvilIcons/search'}
                size={20}
              />
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  const textInputValue = newTextInputValue;
                  try {
                    setTextInputValue(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onChangeTextDelayed={newTextInputValue => {
                  const handler = async () => {
                    const textInputValue = newTextInputValue;
                    try {
                      const suggest_result = (
                        await AceCampTestApi.searchSuggestGET(Constants, {
                          keyword: newTextInputValue,
                        })
                      )?.json;
                      setSuggestion(suggest_result?.data);
                      setShowResult(false);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                allowFontScaling={false}
                numberOfLines={1}
                placeholder={`${t(
                  Variables,
                  'events_search_default'
                )}`.toString()}
                ref={scrollViewContainerViewTextInputRef}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                    {
                      borderColor: null,
                      fontFamily: 'System',
                      fontWeight: '400',
                      lineHeight: 18,
                      paddingRight: 8,
                      width: null,
                    }
                  ),
                  dimensions.width
                )}
                value={textInputValue}
              />
              <Touchable
                onPress={() => {
                  try {
                    setTextInputValue('');
                    scrollViewContainerViewTextInputRef.current.focus();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Icon 2 */}
                <>
                  {!(textInputValue?.length > 0) ? null : (
                    <Icon
                      color={palettes.App['Custom Color 46']}
                      name={'AntDesign/closecircleo'}
                      size={18}
                    />
                  )}
                </>
              </Touchable>
            </View>
            <Link
              accessible={true}
              onPress={() => {
                try {
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  doSearch(
                    Variables,
                    setGlobalVariableValue,
                    [],
                    [],
                    textInputValue
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Brand.appStyle_primary,
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '600',
                  letterSpacing: 0.3,
                  lineHeight: 20,
                },
                dimensions.width
              )}
              title={`${t(Variables, 'home_search')}`}
            />
          </View>
          {/* View 2 */}
          <>
            {!(textInputValue?.length <= 0) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
                {/* 历史记录 */}
                <View>
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
                    <>
                      {!Constants['search_history'] ? null : (
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              { fontSize: 16 }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'home_search_history')}
                        </Text>
                      )}
                    </>
                    <IconButton
                      onPress={() => {
                        try {
                          removeHistory(Variables, setGlobalVariableValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={palettes.App['Custom Color 4']}
                      icon={'Feather/trash-2'}
                      size={20}
                    />
                  </View>
                  {/* View 2 */}
                  <View>
                    <SimpleStyleFlatList
                      data={Constants['search_history']}
                      decelerationRate={'normal'}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        'Scroll View->Container->View 2->历史记录->View 2->List'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <Touchable
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  const apiresult = (
                                    await AceCampTestApi.searchSuggestGET(
                                      Constants,
                                      { keyword: listData }
                                    )
                                  )?.json;
                                  setSuggestion(apiresult);
                                  setCorporationsAndOrganizations(
                                    (apiresult?.data?.corporations).concat(
                                      apiresult?.data?.organizations
                                    )
                                  );
                                  setTextInputValue(listData);
                                  doSearch(
                                    Variables,
                                    setGlobalVariableValue,
                                    [],
                                    [],
                                    listData
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
                                  backgroundColor: 'rgb(246, 246, 246)',
                                  borderRadius: 4,
                                  marginBottom: 8,
                                  marginRight: 12,
                                  paddingBottom: 4,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingTop: 4,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(100, 114, 130)',
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    letterSpacing: 0.3,
                                    lineHeight: 20,
                                  },
                                  dimensions.width
                                )}
                              >
                                {listData}
                              </Text>
                            </View>
                          </Touchable>
                        );
                      }}
                      snapToAlignment={'start'}
                      extraData={Constants['search_history']}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', flexWrap: 'wrap' },
                        dimensions.width
                      )}
                    />
                    <>
                      {!(Constants['search_history']?.length === 0) ? null : (
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
                                color: palettes.Gray[300],
                                fontSize: 12,
                                lineHeight: 24,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'search_history_none')}
                        </Text>
                      )}
                    </>
                  </View>
                </View>
                {/* 热搜榜 */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 16 },
                    dimensions.width
                  )}
                >
                  <AceCampTestApi.FetchSearchTrendsGET>
                    {({ loading, error, data, refetchSearchTrends }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <>
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
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text Title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text Title']
                                    .style,
                                  { fontSize: 16 }
                                ),
                                dimensions.width
                              )}
                            >
                              {t(Variables, 'home_search_hot')}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View>
                            <SimpleStyleMasonryFlashList
                              data={fetchData?.data}
                              estimatedItemSize={50}
                              keyExtractor={(masonryListData, index) =>
                                masonryListData?.id ??
                                masonryListData?.uuid ??
                                index?.toString() ??
                                JSON.stringify(masonryListData)
                              }
                              listKey={
                                'Scroll View->Container->View 2->热搜榜->Fetch->View 2->Masonry List'
                              }
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const masonryListData = item;
                                return (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        marginBottom: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { width: 24 },
                                        dimensions.width
                                      )}
                                    >
                                      <>
                                        {!masonryListData?.topping ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Search Hot Top'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              GlobalStyles.TextStyles(theme)[
                                                'Search Hot Top'
                                              ].style,
                                              dimensions.width
                                            )}
                                          >
                                            {index + 1}
                                          </Text>
                                        )}
                                      </>
                                      {/* Text 2 */}
                                      <>
                                        {masonryListData?.topping ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Search Hot Normal'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              GlobalStyles.TextStyles(theme)[
                                                'Search Hot Normal'
                                              ].style,
                                              dimensions.width
                                            )}
                                          >
                                            {index + 1}
                                          </Text>
                                        )}
                                      </>
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
                                      <>
                                        {!masonryListData?.topping ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Search Hot Top'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Search Hot Top'
                                                ].style,
                                                { color: null }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {masonryListData?.keyword}
                                          </Text>
                                        )}
                                      </>
                                      {/* Text 2 */}
                                      <>
                                        {masonryListData?.topping ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Search Hot Normal'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              GlobalStyles.TextStyles(theme)[
                                                'Search Hot Normal'
                                              ].style,
                                              dimensions.width
                                            )}
                                          >
                                            {masonryListData?.keyword}
                                          </Text>
                                        )}
                                      </>
                                      <>
                                        {!masonryListData?.topping ? null : (
                                          <Icon
                                            color={
                                              palettes.App['Custom Color 12']
                                            }
                                            name={'MaterialCommunityIcons/fire'}
                                            size={20}
                                          />
                                        )}
                                      </>
                                      {/* Text 3 */}
                                      <>
                                        {!masonryListData?.topping ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Search Hot Top'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              GlobalStyles.TextStyles(theme)[
                                                'Search Hot Top'
                                              ].style,
                                              dimensions.width
                                            )}
                                          >
                                            {'HOT'}
                                          </Text>
                                        )}
                                      </>
                                    </View>
                                  </View>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              numColumns={2}
                            />
                            {/* 无数据 */}
                            <>
                              {!(fetchData?.data?.length === 0) ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'column',
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
                          </View>
                        </>
                      );
                    }}
                  </AceCampTestApi.FetchSearchTrendsGET>
                </View>
                {/* 近期热门 */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 16 },
                    dimensions.width
                  )}
                >
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
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          { fontSize: 16 }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'search_hot_recent')}
                    </Text>
                  </View>

                  <AceCampTestApi.FetchHotGET>
                    {({ loading, error, data, refetchHot }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <>
                          {/* View 2 */}
                          <View>
                            <SimpleStyleFlatList
                              data={fetchData?.data?.feeds}
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
                                'Scroll View->Container->View 2->近期热门->Fetch->View 2->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.push('ArticleDetailScreen', {
                                          article_info_id: listData?.source?.id,
                                        });
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          borderRadius: 4,
                                          flexDirection: 'row',
                                          marginBottom: 8,
                                          paddingBottom: 4,
                                          paddingTop: 4,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { width: 17 },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: index
                                                ? undefined
                                                : undefined,
                                              fontFamily: 'System',
                                              fontSize: 15,
                                              fontWeight: '400',
                                              letterSpacing: 0.3,
                                              lineHeight: 20,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {index + 1}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        {/* Text 2 */}
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: 'rgb(122, 122, 122)',
                                              flex: 1,
                                              fontFamily: 'System',
                                              fontSize: 15,
                                              fontWeight: '400',
                                              letterSpacing: 0.3,
                                              lineHeight: 20,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {getType(
                                            Variables,
                                            listData?.source_type
                                          )}
                                          {' | '}
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { flex: 1 },
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
                                              fontFamily: 'System',
                                              fontSize: 15,
                                              fontWeight: '600',
                                              letterSpacing: 0.3,
                                              lineHeight: 20,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.source?.title}
                                        </Text>
                                      </View>
                                    </View>
                                  </Touchable>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'column' },
                                dimensions.width
                              )}
                            />
                          </View>
                        </>
                      );
                    }}
                  </AceCampTestApi.FetchHotGET>
                </View>
              </View>
            )}
          </>
          {/* 搜索结果页面 */}
          <>
            {!showResult ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
              >
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
                        setSpotlight(true);
                        setSource_type(setUndefined());
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginLeft: 16 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Daily Update Title']
                            .style,
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
                      {t(Variables, 'common_overall')}
                    </Text>
                    <>
                      {!!source_type ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              borderColor: palettes.Brand.appStyle_primary,
                              borderRadius: 10,
                              borderWidth: 2,
                              width: '70%',
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </Touchable>
                  {/* Touchable 2 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setSource_type('Event');
                        setSpotlight(setUndefined());
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginLeft: 16 },
                      dimensions.width
                    )}
                  >
                    {/* Text 2 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Daily Update Title']
                            .style,
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
                    {/* View 2 */}
                    <>
                      {!(source_type === 'Event') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              borderColor: palettes.Brand.appStyle_primary,
                              borderRadius: 10,
                              borderWidth: 2,
                              width: '70%',
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </Touchable>
                  {/* Touchable 3 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setSource_type('Minute');
                        setSpotlight(setUndefined());
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginLeft: 16 },
                      dimensions.width
                    )}
                  >
                    {/* Text 3 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Daily Update Title']
                            .style,
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
                    {/* View 2 */}
                    <>
                      {!(source_type === 'Minute') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              borderColor: palettes.Brand.appStyle_primary,
                              borderRadius: 10,
                              borderWidth: 2,
                              width: '70%',
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </Touchable>
                  {/* Touchable 4 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setSource_type('Article');
                        setSpotlight(setUndefined());
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginLeft: 16 },
                      dimensions.width
                    )}
                  >
                    {/* Text 4 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Daily Update Title']
                            .style,
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
                    {/* View 2 */}
                    <>
                      {!(source_type === 'Article') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              borderColor: palettes.Brand.appStyle_primary,
                              borderRadius: 10,
                              borderWidth: 2,
                              width: '70%',
                            },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </Touchable>
                  {/* Touchable 5 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setSource_type('Spotlight');
                        setSpotlight(setUndefined());
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
                      {...GlobalStyles.TextStyles(theme)['Daily Update Title']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Daily Update Title']
                            .style,
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
                      {t(Variables, 'home_special')}
                    </Text>
                  </Touchable>
                </View>

                <AceCampTestApi.FetchSearchGET
                  custom_sector_ids={custom_sector_ids}
                  handlers={{
                    onData: fetchData => {
                      try {
                        console.log(fetchData);
                        setFeedsData(
                          fetchData?.data?.feeds
                            ? fetchData?.data?.feeds
                            : fetchData?.data
                        );
                        setTotal_record(fetchData?.meta?.total);
                        setPage(2);
                        setCorporationsAndOrganizations(
                          (fetchData?.data?.spotlights?.corporations).concat(
                            fetchData?.data?.spotlights?.organizations
                          )
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    },
                  }}
                  industry_ids={industry_ids}
                  keyword={search_key}
                  page={1}
                  per_page={15}
                  source_type={source_type}
                  spotlight={spotlight}
                >
                  {({ loading, error, data, refetchSearch }) => {
                    const fetchData = data?.json;
                    if (loading) {
                      return <ActivityIndicator />;
                    }

                    if (error || data?.status < 200 || data?.status >= 300) {
                      return <ActivityIndicator />;
                    }

                    return (
                      <>
                        {/* View 2 */}
                        <View>
                          {/* 相关公司 */}
                          <>
                            {!(
                              !source_type &&
                              corporationsAndOrganizations?.length > 0
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexWrap: 'nowrap', paddingTop: 16 },
                                  dimensions.width
                                )}
                              >
                                {/* 相关公司-标题 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-end',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
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
                                        fontSize: 16,
                                        fontWeight: '700',
                                        letterSpacing: 0.2,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'spotlight_related_company')}
                                    {'/'}
                                    {t(Variables, 'search_tab_org')}
                                  </Text>

                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.App['Custom Color 23'],
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '400',
                                        letterSpacing: 0.2,
                                        lineHeight: 24,
                                        marginLeft: 14,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'search_company_tip')}
                                  </Text>
                                </View>
                                <SimpleStyleFlatList
                                  data={corporationsAndOrganizations}
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
                                    'Scroll View->Container->搜索结果页面->Fetch->View 2->相关公司->List'
                                  }
                                  nestedScrollEnabled={false}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  pagingEnabled={false}
                                  renderItem={({ item, index }) => {
                                    const listData = item;
                                    return (
                                      <Shadow
                                        offsetY={0}
                                        showShadowCornerBottomEnd={true}
                                        showShadowCornerBottomStart={true}
                                        showShadowCornerTopEnd={true}
                                        showShadowCornerTopStart={true}
                                        showShadowSideBottom={true}
                                        showShadowSideEnd={true}
                                        showShadowSideStart={true}
                                        showShadowSideTop={true}
                                        distance={10}
                                        offsetX={0}
                                        paintInside={false}
                                        startColor={palettes.Gray[100]}
                                        style={StyleSheet.applyWidth(
                                          {
                                            marginTop: 10,
                                            width: (dimensions.width - 60) / 2,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              backgroundColor:
                                                palettes.App['Custom #ffffff'],
                                              borderColor: palettes.Gray[200],
                                              borderRadius: 4,
                                              borderWidth: 1,
                                              justifyContent: 'space-between',
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
                                            <>
                                              {listData?.logo ? null : (
                                                <SVG
                                                  source={
                                                    listData?.logo
                                                      ? undefined
                                                      : 'https://static.acecamptech.com/www/static/media/relation-company.179798304f24764e14e2a7584e0facaa.svg'
                                                  }
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      height: 25,
                                                      marginRight: 10,
                                                      width: 25,
                                                    },
                                                    dimensions.width
                                                  )}
                                                />
                                              )}
                                            </>
                                            <>
                                              {!listData?.logo ? null : (
                                                <Image
                                                  resizeMode={'cover'}
                                                  {...GlobalStyles.ImageStyles(
                                                    theme
                                                  )['Image'].props}
                                                  source={imageSource(
                                                    `${listData?.logo}`
                                                  )}
                                                  style={StyleSheet.applyWidth(
                                                    StyleSheet.compose(
                                                      GlobalStyles.ImageStyles(
                                                        theme
                                                      )['Image'].style,
                                                      {
                                                        height: 25,
                                                        marginRight: 10,
                                                        width: 25,
                                                      }
                                                    ),
                                                    dimensions.width
                                                  )}
                                                />
                                              )}
                                            </>
                                            <Text
                                              accessible={true}
                                              selectable={false}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  fontFamily: 'System',
                                                  fontSize: 14,
                                                  fontWeight: '700',
                                                  letterSpacing: 0.2,
                                                  lineHeight: 22,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {listData?.name}
                                            </Text>
                                          </View>
                                          {/* View 2 */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 10,
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
                                                  color:
                                                    palettes.App[
                                                      'Custom Color 24'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 13,
                                                  fontWeight: '600',
                                                  letterSpacing: 0.2,
                                                  lineHeight: 20,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {listData?.ticker
                                                ? listData?.ticker
                                                : getNameById(
                                                    Variables,
                                                    9,
                                                    listData?.organization_type_id
                                                  )}
                                            </Text>
                                          </View>
                                        </View>
                                      </Shadow>
                                    );
                                  }}
                                  snapToAlignment={'start'}
                                  showsHorizontalScrollIndicator={false}
                                  showsVerticalScrollIndicator={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
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
                              'Scroll View->Container->搜索结果页面->Fetch->View 2->List'
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
                                  highlight={search_key}
                                  isLatest={feedsData?.length === index + 1}
                                />
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                            snapToAlignment={'start'}
                          />
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
                        </View>
                      </>
                    );
                  }}
                </AceCampTestApi.FetchSearchGET>
              </View>
            )}
          </>
          {/* 提示页面 */}
          <>
            {!(textInputValue?.length > 0 && !showResult) ? null : (
              <View>
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      doSearch(
                        Variables,
                        setGlobalVariableValue,
                        [],
                        [],
                        textInputValue
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: 0.3,
                      lineHeight: 22,
                      marginBottom: 10,
                      marginRight: 16,
                      marginTop: 10,
                      paddingLeft: 16,
                    },
                    dimensions.width
                  )}
                  title={`${textInputValue} - ${t(
                    Variables,
                    'search_all_result'
                  )}`}
                />
                {/* 板块细分行业 */}
                <>
                  {!(
                    suggestion?.custom_sectors?.length > 0 ||
                    suggestion?.industries?.length > 0
                  ) ? null : (
                    <View>
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(243, 243, 243)',
                            paddingBottom: 4,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 4,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              { color: 'rgb(122, 122, 122)', fontSize: 16 }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'search_section')}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View>
                        <>
                          {!(suggestion?.custom_sectors?.length > 0) ? null : (
                            <SimpleStyleFlatList
                              data={suggestion?.custom_sectors}
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
                                'Scroll View->Container->提示页面->板块细分行业->View 2->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'API Request' action */
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'Set Variable' action */
                                          doSearch(
                                            Variables,
                                            setGlobalVariableValue,
                                            [].concat([listData?.id]),
                                            [],
                                            listData?.name
                                          );
                                          setTextInputValue(listData?.name);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <Utils.CustomCodeErrorBoundary>
                                        <HighlightText.Component
                                          style={{
                                            marginTop: 8,
                                            marginBottom: 8,
                                          }}
                                          text={listData?.name}
                                          highlight={textInputValue}
                                        />
                                      </Utils.CustomCodeErrorBoundary>
                                    </Touchable>
                                  </>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                {
                                  marginLeft: 16,
                                  marginRight: 16,
                                  paddingTop: 8,
                                },
                                dimensions.width
                              )}
                            />
                          )}
                        </>
                        {/* List 2 */}
                        <>
                          {!(suggestion?.industries?.length > 0) ? null : (
                            <SimpleStyleFlatList
                              data={suggestion?.industries}
                              decelerationRate={'normal'}
                              horizontal={false}
                              inverted={false}
                              keyExtractor={(list2Data, index) =>
                                list2Data?.id ??
                                list2Data?.uuid ??
                                index?.toString() ??
                                JSON.stringify(list2Data)
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={
                                'Scroll View->Container->提示页面->板块细分行业->View 2->List 2'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              pagingEnabled={false}
                              renderItem={({ item, index }) => {
                                const list2Data = item;
                                return (
                                  <>
                                    {/* Touchable 2 */}
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'API Request' action */
                                          /* hidden 'Set Variable' action */
                                          /* hidden 'Set Variable' action */
                                          doSearch(
                                            Variables,
                                            setGlobalVariableValue,
                                            [],
                                            [].concat([list2Data?.id]),
                                            list2Data?.name
                                          );
                                          setTextInputValue(list2Data?.name);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      style={StyleSheet.applyWidth(
                                        { marginBottom: 16, marginTop: 16 },
                                        dimensions.width
                                      )}
                                    >
                                      <Utils.CustomCodeErrorBoundary>
                                        <HighlightText.Component
                                          style={{
                                            marginTop: 8,
                                            marginBottom: 8,
                                            fontSize: 16,
                                            fontFamily: 'System',
                                            fontWeight: '600',
                                            lineHeight: 22,
                                          }}
                                          text={list2Data?.name}
                                          highlight={textInputValue}
                                        />
                                      </Utils.CustomCodeErrorBoundary>
                                    </Touchable>
                                  </>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              snapToAlignment={'start'}
                              style={StyleSheet.applyWidth(
                                {
                                  marginLeft: 16,
                                  marginRight: 16,
                                  paddingBottom: 8,
                                },
                                dimensions.width
                              )}
                            />
                          )}
                        </>
                      </View>
                    </View>
                  )}
                </>
                {/* 股票 */}
                <>
                  {!(suggestion?.corporations?.length > 0) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 10 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(243, 243, 243)',
                            paddingBottom: 4,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 4,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              { color: 'rgb(122, 122, 122)', fontSize: 16 }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'search_tab_ticker')}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View>
                        <SimpleStyleFlatList
                          data={suggestion?.corporations}
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
                            'Scroll View->Container->提示页面->股票->View 2->List'
                          }
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                <Touchable
                                  onPress={() => {
                                    try {
                                      setCustom_sector_ids([]);
                                      setIndustry_ids([]);
                                      /* 'Navigate' action requires configuration: choose a navigation destination */
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  <Utils.CustomCodeErrorBoundary>
                                    <HighlightText.Component
                                      style={{ marginTop: 8, marginBottom: 8 }}
                                      text={`${listData?.name}(${listData?.ticker})`}
                                      highlight={textInputValue}
                                    />
                                  </Utils.CustomCodeErrorBoundary>
                                </Touchable>
                              </>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                          style={StyleSheet.applyWidth(
                            {
                              marginLeft: 16,
                              marginRight: 16,
                              paddingBottom: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
                {/* 营主 */}
                <>
                  {!(suggestion?.organizations?.length > 0) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 10 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(243, 243, 243)',
                            paddingBottom: 4,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 4,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              { color: 'rgb(122, 122, 122)', fontSize: 16 }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'search_tab_org')}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View>
                        <SimpleStyleFlatList
                          data={suggestion?.organizations}
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
                            'Scroll View->Container->提示页面->营主->View 2->List'
                          }
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                <Touchable
                                  onPress={() => {
                                    try {
                                      setCustom_sector_ids([]);
                                      setIndustry_ids([]);
                                      navigation.push('BottomTabNavigator', {
                                        screen: 'Home',
                                        params: {
                                          screen: 'OrganizerScreen',
                                          params: {
                                            organization_id: listData?.id,
                                          },
                                        },
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  <Utils.CustomCodeErrorBoundary>
                                    <HighlightText.Component
                                      style={{ marginTop: 8, marginBottom: 8 }}
                                      text={listData?.name}
                                      highlight={textInputValue}
                                    />
                                  </Utils.CustomCodeErrorBoundary>
                                </Touchable>
                              </>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                          style={StyleSheet.applyWidth(
                            {
                              marginLeft: 16,
                              marginRight: 16,
                              paddingBottom: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
              </View>
            )}
          </>
        </View>
      </SimpleStyleScrollView>
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

export default withTheme(SearchPageScreen);
