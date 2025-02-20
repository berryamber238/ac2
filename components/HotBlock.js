import React from 'react';
import {
  LinearGradient,
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import HotSectionBlock from '../components/HotSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as DataContext from '../custom-files/DataContext';
import * as HttpClient from '../custom-files/HttpClient';
import * as Shadow from '../custom-files/Shadow';
import * as Test from '../custom-files/Test';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { gotoScreen: () => {} };

const HotBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [content_language_preference, setContent_language_preference] =
    React.useState([]);
  const [custom_sector_ids, setCustom_sector_ids] = React.useState([]);
  const [data, setData] = React.useState({
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
  const [follow, setFollow] = React.useState('');
  const [recommend_search, setRecommend_search] = React.useState([]);
  const [vip, setVip] = React.useState('');
  const [
    refreshingLinearGradientCustomCodeScrollView,
    setRefreshingLinearGradientCustomCodeScrollView,
  ] = React.useState(false);
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
    if (refetchFunc) {
      refetchFunc();
    } else {
      console.log('refetch not set');
    }
  }, [queryData]);

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: 'rgba(239, 245, 254, 0)', height: '100%' },
        dimensions.width
      )}
    >
      <LinearGradient
        {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].props}
        color1={palettes.App['Custom Color 13']}
        color2={palettes.App['Custom Color 13']}
        color3={palettes.App['Custom #ffffff']}
        endX={100}
        endY={100}
        startX={100}
        startY={0}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].style,
            {
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
            }
          ),
          dimensions.width
        )}
      >
        <Utils.CustomCodeErrorBoundary>
          <Shadow.ShadowComponent>
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingLinearGradientCustomCodeScrollView}
                  onRefresh={() => {
                    try {
                      setRefreshingLinearGradientCustomCodeScrollView(true);
                      console.log('refresh');
                      setRefreshingLinearGradientCustomCodeScrollView(false);
                    } catch (err) {
                      console.error(err);
                      setRefreshingLinearGradientCustomCodeScrollView(false);
                    }
                  }}
                />
              }
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.White,
                  borderRadius: 4,
                  height: dimensions.height - 20,
                  width: dimensions.width - 20,
                },
                dimensions.width
              )}
            >
              <AceCampTestApi.FetchHotGET
                content_language_preference={content_language_preference}
                custom_sector_ids={custom_sector_ids}
                follow={follow}
                recommend_search={recommend_search}
                vip={vip}
              >
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
                      <SimpleStyleFlashList
                        data={fetchData?.data?.feeds}
                        estimatedItemSize={50}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(flashListData, index) =>
                          flashListData?.id ??
                          flashListData?.uuid ??
                          index?.toString() ??
                          JSON.stringify(flashListData)
                        }
                        listKey={
                          'Linear Gradient->Custom Code->Scroll View->Fetch->FlashList'
                        }
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item, index }) => {
                          const flashListData = item;
                          return (
                            <HotSectionBlock
                              dataItem={flashListData}
                              gotoScreen={props.gotoScreen}
                              index={index}
                            />
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        scrollEnabled={true}
                        style={StyleSheet.applyWidth(
                          { paddingLeft: 16, paddingRight: 16 },
                          dimensions.width
                        )}
                      />
                      <Utils.CustomCodeErrorBoundary>
                        {refetchFunc
                          ? console.log('已设置')
                          : (refetchFunc = refetchHot)}
                      </Utils.CustomCodeErrorBoundary>
                    </>
                  );
                }}
              </AceCampTestApi.FetchHotGET>
            </SimpleStyleScrollView>
          </Shadow.ShadowComponent>
        </Utils.CustomCodeErrorBoundary>
      </LinearGradient>
    </View>
  );
};

export default withTheme(HotBlock);
