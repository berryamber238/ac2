import React from "react";
import {
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { Fetch } from "react-request";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import EmptyViewBlock from "../components/EmptyViewBlock";
import SpotlightSectionBlock from "../components/SpotlightSectionBlock";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as AceCampApi from "../custom-files/AceCampApi";
import * as DataContext from "../custom-files/DataContext";
import * as HttpClient from "../custom-files/HttpClient";
import * as Test from "../custom-files/Test";
import getNoteStatus from "../global-functions/getNoteStatus";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { gotoScreen: () => {} };

const SpotlightBlock = (props) => {
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
        link: "https://www.acecamptech.com/vip_infos",
        title: "本营会员计划",
        image_url:
          "https://image.acecamptech.com/banner/11/0.15096961053540503.png",
        h5_image_url:
          "https://image.acecamptech.com/banner/11/0.15096961053540503.png",
        app_link_type: "url",
        web_image_url:
          "https://image.acecamptech.com/banner/11/0.4401433685894576.png",
        app_link_params: {},
      },
      {
        id: 143,
        link: "https://www.acecamptech.com/article/detail/70539717",
        title: "本营AI助手宣传",
        image_url:
          "https://image.acecamptech.com/banner/51/0.3849892055895564.png",
        h5_image_url:
          "https://image.acecamptech.com/banner/51/0.3849892055895564.png",
        app_link_type: "url",
        web_image_url:
          "https://image.acecamptech.com/banner/51/0.3344699627593397.png",
        app_link_params: {},
      },
      {
        id: 108,
        link: "https://www.acecamptech.com/article/detail/70534239",
        title: "全职/兼职研究分析师邀请",
        image_url:
          "https://image.acecamptech.com/banner/51/0.7706755021180371.png",
        h5_image_url:
          "https://image.acecamptech.com/banner/51/0.7706755021180371.png",
        app_link_type: "url",
        web_image_url:
          "https://image.acecamptech.com/banner/51/0.9415021805672252.png",
        app_link_params: {},
      },
    ],
    meta: { ts: 1730644872 },
  });
  const [follow, setFollow] = React.useState("");
  const [recommend_search, setRecommend_search] = React.useState([]);
  const [vip, setVip] = React.useState("");
  const [refreshingScrollView, setRefreshingScrollView] = React.useState(false);
  const endpoint = HttpClient.apiEndpoints.banners_list;

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
    if (queryData?.recommend_search?.includes("vip")) setVip("true");
    else setVip(undefined);
    if (queryData?.recommend_search?.includes("follow")) setFollow("true");
    else setFollow(undefined);
  }, [queryData]);

  return (
    <View
      style={StyleSheet.applyWidth(
        { height: "100%", width: "100%" },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={"never"}
        nestedScrollEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingScrollView}
            onRefresh={() => {
              try {
                setRefreshingScrollView(true);
                console.log("refresh");
                setRefreshingScrollView(false);
              } catch (err) {
                console.error(err);
                setRefreshingScrollView(false);
              }
            }}
          />
        }
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        style={StyleSheet.applyWidth(
          { height: "100%", width: "100%" },
          dimensions.width
        )}
      >
        <AceCampTestApi.FetchSpotlightsGET
          custom_sector_ids={custom_sector_ids}
        >
          {({ loading, error, data, refetchSpotlights }) => {
            const fetchData = data?.json;
            refetchFunc = refetchSpotlights;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                <SimpleStyleFlashList
                  data={fetchData?.data}
                  estimatedItemSize={50}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ??
                    flashListData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashListData)
                  }
                  listKey={"Scroll View->Fetch->FlashList"}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <SpotlightSectionBlock
                        dataItem={flashListData}
                        gotoScreen={props.gotoScreen}
                      />
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  scrollEnabled={true}
                />
              </>
            );
          }}
        </AceCampTestApi.FetchSpotlightsGET>
      </SimpleStyleScrollView>
      <>
        {getNoteStatus(Variables) === 0 ? null : (
          <EmptyViewBlock type={getNoteStatus(Variables)} />
        )}
      </>
    </View>
  );
};

export default withTheme(SpotlightBlock);
