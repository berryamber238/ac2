import React from "react";
import {
  LinearGradient,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { Fetch } from "react-request";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import HotSectionBlock from "../components/HotSectionBlock";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as DataContext from "../custom-files/DataContext";
import * as HttpClient from "../custom-files/HttpClient";
import * as Test from "../custom-files/Test";
import getNoteStatus from "../global-functions/getNoteStatus";
import palettes from "../themes/palettes";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { gotoScreen: () => {} };

const HotBlock = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [content_language_preference, setContent_language_preference] =
    React.useState([]);
  const [custom_sector_ids, setCustom_sector_ids] = React.useState([]);
  const [data, setData] = React.useState("");
  const [follow, setFollow] = React.useState("");
  const [recommend_search, setRecommend_search] = React.useState([]);
  const [vip, setVip] = React.useState("");
  const [
    refreshingLinearGradientFetchShadowScrollView,
    setRefreshingLinearGradientFetchShadowScrollView,
  ] = React.useState(false);
  const queryData = React.useContext(DataContext.DataContext)?.sharedData;

  let refetchFunc;

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
    if (refetchFunc) {
      refetchFunc();
    } else {
      console.log("refetch not set");
    }
  }, [queryData]);

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: "rgba(239, 245, 254, 0)", height: "100%" },
        dimensions.width
      )}
    >
      <LinearGradient
        {...GlobalStyles.LinearGradientStyles(theme)["Linear Gradient"].props}
        color1={palettes.App["Custom Color 13"]}
        color2={palettes.App["Custom Color 13"]}
        color3={palettes.App["Custom #ffffff"]}
        endX={100}
        endY={100}
        startX={100}
        startY={0}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.LinearGradientStyles(theme)["Linear Gradient"].style,
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
                startColor={palettes.App["Custom Color 105"]}
                style={StyleSheet.applyWidth(
                  { borderRadius: 4 },
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
                      refreshing={refreshingLinearGradientFetchShadowScrollView}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingLinearGradientFetchShadowScrollView(
                              true
                            );
                            await refetchHot();
                            setRefreshingLinearGradientFetchShadowScrollView(
                              false
                            );
                          } catch (err) {
                            console.error(err);
                            setRefreshingLinearGradientFetchShadowScrollView(
                              false
                            );
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App["Custom #ffffff"],
                      borderRadius: 4,
                      height: "100%",
                      width: "100%",
                    },
                    dimensions.width
                  )}
                >
                  <SimpleStyleFlatList
                    data={fetchData?.data?.feeds}
                    decelerationRate={"normal"}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) =>
                      listData?.id ??
                      listData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(listData)
                    }
                    keyboardShouldPersistTaps={"never"}
                    listKey={
                      "Linear Gradient->Fetch->Shadow->Scroll View->List"
                    }
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <HotSectionBlock
                          dataItem={listData}
                          gotoScreen={props.gotoScreen}
                          index={index}
                        />
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={"start"}
                    style={StyleSheet.applyWidth(
                      { paddingLeft: 16, paddingRight: 16 },
                      dimensions.width
                    )}
                  />
                </SimpleStyleScrollView>
              </Shadow>
            );
          }}
        </AceCampTestApi.FetchHotGET>
      </LinearGradient>
    </View>
  );
};

export default withTheme(HotBlock);
