import React from 'react';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
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
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as DataContext from '../custom-files/DataContext';
import * as HttpClient from '../custom-files/HttpClient';
import * as Test from '../custom-files/Test';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { gotoScreen: () => {} };

const RecommendBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [actionId, setActionId] = React.useState(0);
  const [content_language_preference, setContent_language_preference] =
    React.useState([]);
  const [cursor, setCursor] = React.useState('');
  const [custom_sector_ids, setCustom_sector_ids] = React.useState([]);
  const [dataList, setDataList] = React.useState([]);
  const [follow, setFollow] = React.useState('');
  const [imageData, setImageData] = React.useState({
    ret: true,
    code: 200,
    data: [
      {
        id: 142,
        link: 'https://www.acecamptech.com/vip_infos',
        title: '本营会员计划',
        image_url:
          'https://image.acecamptech.com/banner/11/0.15096961053540503.png',
        h5_image_url:
          'https://image.acecamptech.com/banner/11/0.15096961053540503.png',
        app_link_type: 'url',
        web_image_url:
          'https://image.acecamptech.com/banner/11/0.4401433685894576.png',
        app_link_params: {},
      },
      {
        id: 143,
        link: 'https://www.acecamptech.com/article/detail/70539717',
        title: '本营AI助手宣传',
        image_url:
          'https://image.acecamptech.com/banner/51/0.3849892055895564.png',
        h5_image_url:
          'https://image.acecamptech.com/banner/51/0.3849892055895564.png',
        app_link_type: 'url',
        web_image_url:
          'https://image.acecamptech.com/banner/51/0.3344699627593397.png',
        app_link_params: {},
      },
      {
        id: 108,
        link: 'https://www.acecamptech.com/article/detail/70534239',
        title: '全职/兼职研究分析师邀请',
        image_url:
          'https://image.acecamptech.com/banner/51/0.7706755021180371.png',
        h5_image_url:
          'https://image.acecamptech.com/banner/51/0.7706755021180371.png',
        app_link_type: 'url',
        web_image_url:
          'https://image.acecamptech.com/banner/51/0.9415021805672252.png',
        app_link_params: {},
      },
    ],
    meta: { ts: 1730644872 },
  });
  const [is_loading, setIs_loading] = React.useState(false);
  const [nav, setNav] = React.useState({});
  const [recommend_search, setRecommend_search] = React.useState([]);
  const [showActionSheet, setShowActionSheet] = React.useState(false);
  const [vip, setVip] = React.useState('');
  const [refreshingFetchFlashList, setRefreshingFetchFlashList] =
    React.useState(false);
  const [refreshingFetchScrollView, setRefreshingFetchScrollView] =
    React.useState(false);
  const [refreshingFetchScrollViewList, setRefreshingFetchScrollViewList] =
    React.useState(false);
  const [
    refreshingFetchScrollViewFlashList2,
    setRefreshingFetchScrollViewFlashList2,
  ] = React.useState(false);
  const [
    refreshingFetchScrollViewFlashList22,
    setRefreshingFetchScrollViewFlashList22,
  ] = React.useState(false);
  const openActionSheet = id => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    setShowActionSheet(true);
    setActionId(id);
  };
  const endpoint = HttpClient.apiEndpoints.banners_list;
  // const result = Test.fetch(endpoint.url,endpoint.method,null);

  const queryData = React.useContext(DataContext.DataContext)?.sharedData;

  let refetchFunc;

  // React.useEffect(() => {
  //     if (result) {

  //     }
  //   }, [result]);

  React.useEffect(() => {
    if (
      queryData?.content_language_preference &&
      queryData?.content_language_preference.length > 0
    ) {
      setContent_language_preference(queryData.content_language_preference[0]);
    }
    setCustom_sector_ids(queryData?.custom_sector_ids);
    setRecommend_search(queryData?.recommend_search);
    if (queryData?.recommend_search?.includes('vip')) setVip('true');
    else setVip(undefined);
    if (queryData?.recommend_search?.includes('follow')) setFollow('true');
    else setFollow(undefined);
  }, [queryData]);

  return (
    <View>
      <AceCampTestApi.FetchFeedsGET
        content_language_preference={content_language_preference}
        custom_sector_ids={custom_sector_ids}
        follow={follow}
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              setDataList(fetchData?.data?.feeds);
              setCursor(
                (() => {
                  const e = fetchData?.data?.feeds;
                  return e[e.length - 1];
                })()?.cursor
              );
            } catch (err) {
              console.error(err);
            }
          },
        }}
        recommend_search={recommend_search}
        vip={vip}
      >
        {({ loading, error, data, refetchFeeds }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              <SimpleStyleScrollView
                bounces={true}
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingFetchScrollView}
                    onRefresh={() => {
                      const handler = async () => {
                        try {
                          setRefreshingFetchScrollView(true);
                          await refetchFeeds();
                          setRefreshingFetchScrollView(false);
                        } catch (err) {
                          console.error(err);
                          setRefreshingFetchScrollView(false);
                        }
                      };
                      handler();
                    }}
                  />
                }
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  { height: '100%', width: '100%' },
                  dimensions.width
                )}
              >
                <Swiper
                  data={imageData?.data}
                  dotActiveColor={theme.colors.branding.primary}
                  dotColor={theme.colors.text.light}
                  dotsTouchable={true}
                  hideDots={false}
                  keyExtractor={(swiperData, index) =>
                    swiperData?.id ??
                    swiperData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(swiperData)
                  }
                  listKey={'Fetch->Scroll View->Swiper'}
                  minDistanceForAction={0.2}
                  minDistanceToCapture={5}
                  renderItem={({ item, index }) => {
                    const swiperData = item;
                    return (
                      <SwiperItem
                        style={StyleSheet.applyWidth(
                          { flex: 1 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { height: 150, width: '100%' },
                            dimensions.width
                          )}
                        >
                          <Image
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            resizeMode={'cover'}
                            source={imageSource(`${swiperData?.image_url}`)}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                { borderRadius: 8, height: 150, width: '100%' }
                              ),
                              dimensions.width
                            )}
                          />
                        </View>
                      </SwiperItem>
                    );
                  }}
                  vertical={false}
                  {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
                  loop={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SwiperStyles(theme)['Swiper'].style,
                      {
                        borderRadius: 8,
                        height: 150,
                        marginBottom: 16,
                        marginLeft: 16,
                        marginRight: 16,
                      }
                    ),
                    dimensions.width
                  )}
                  timeout={10}
                />
                {/* FlashList 2 2 */}
                <SimpleStyleFlashList
                  data={dataList}
                  estimatedItemSize={50}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(flashList22Data, index) =>
                    flashList22Data?.id ??
                    flashList22Data?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashList22Data)
                  }
                  listKey={'Fetch->Scroll View->FlashList 2 2'}
                  numColumns={1}
                  onEndReached={() => {
                    const handler = async () => {
                      try {
                        console.log('fetch next');
                        if (is_loading) {
                          return;
                        }
                        setIs_loading(true);
                        const result = (
                          await AceCampTestApi.feedsGET(Constants, {
                            content_language_preference:
                              content_language_preference,
                            cursor: cursor,
                            custom_sector_ids: custom_sector_ids,
                            follow: follow,
                            recommend_search: recommend_search,
                            vip: vip,
                          })
                        )?.json;
                        setDataList(dataList.concat(result?.data?.feeds));
                        setCursor(
                          (() => {
                            const e = result?.data?.feeds;
                            return e[e.length - 1];
                          })()?.cursor
                        );
                        await waitUtil({ milliseconds: 1000 });
                        setIs_loading(false);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  onEndReachedThreshold={0.5}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingFetchScrollViewFlashList22}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingFetchScrollViewFlashList22(true);
                            await refetchFeeds();
                            setRefreshingFetchScrollViewFlashList22(false);
                          } catch (err) {
                            console.error(err);
                            setRefreshingFetchScrollViewFlashList22(false);
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  renderItem={({ item, index }) => {
                    const flashList22Data = item;
                    return (
                      <>
                        {/* Section */}
                        <RecommandSectionBlock
                          showActionSheet={id => {
                            try {
                              openActionSheet(id);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          dataItem={flashList22Data}
                          gotoScreen={props.gotoScreen}
                        />
                      </>
                    );
                  }}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    { paddingLeft: 16, paddingRight: 16 },
                    dimensions.width
                  )}
                />
              </SimpleStyleScrollView>
            </>
          );
        }}
      </AceCampTestApi.FetchFeedsGET>
      {/* Action Sheet 2 */}
      <ActionSheet visible={showActionSheet}>
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_industry')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 2 */}
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_stock')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 3 */}
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_content')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        <ActionSheetCancel
          label={'Cancel'}
          onPress={() => {
            try {
              setShowActionSheet(false);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </ActionSheet>
    </View>
  );
};

export default withTheme(RecommendBlock);
