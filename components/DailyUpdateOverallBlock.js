import React from "react";
import {
  Divider,
  Icon,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fetch } from "react-request";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import RecommandSectionBlock from "../components/RecommandSectionBlock";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as Shadow from "../custom-files/Shadow";
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { date_type: "recently", section: "All" };

const DailyUpdateOverallBlock = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const changeIndex = (index) => {
    props.setIndex(index);
  };

  const getOid = () => {
    if (props.headers) {
      const oid = props.headers[0].params.organization_id;
      return oid;
    }
    return 0;
  };

  const updateCount = (type, count) => {
    props.setDataCount(props.headers[type].key, count);
  };
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View>
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={"never"}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App["Custom Color 19"],
            height: "100%",
            paddingBottom: 100 + safeAreaInsets.bottom + safeAreaInsets.top,
          },
          dimensions.width
        )}
      >
        {/* event */}
        <>
          {!(
            (props.section ?? defaultProps.section) === "All" ||
            (props.section ?? defaultProps.section) === "Event"
          ) ? null : (
            <AceCampTestApi.FetchDailyupdateFeedsGET
              collection={props.date_type ?? defaultProps.date_type}
              handlers={{
                onData: (eventData) => {
                  try {
                    /* hidden 'Run a Custom Function' action */
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page_size={4}
              source_type={"Event"}
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
                    {!(eventData?.data?.feeds?.length > 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App["Custom Color 19"],
                            paddingBottom: 5,
                            paddingTop: 20,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 系列活动-标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "flex-end",
                              flexDirection: "row",
                              marginBottom: 10,
                              paddingLeft: 16,
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
                                fontFamily: "System",
                                fontSize: 18,
                                fontWeight: "700",
                                letterSpacing: 0.2,
                                lineHeight: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "tab_events")}
                          </Text>

                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App["Custom Color 23"],
                                fontFamily: "System",
                                fontSize: 15,
                                fontWeight: "400",
                                letterSpacing: 0.2,
                                lineHeight: 26,
                                marginLeft: 14,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "organizer_event_new")}
                            {eventData?.meta?.total}
                            {t(Variables, "spotlight_related_event_total_tip")}
                          </Text>
                        </View>
                        {/* Custom Code 2 */}
                        <Utils.CustomCodeErrorBoundary>
                          <Shadow.ShadowComponent
                            startColor={"#0002"}
                            endColor={"#0000"}
                            offset={[14, 0]}
                            distance={5}
                          >
                            {/* 系列活动-列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App["Custom #ffffff"],
                                  borderRadius: 4,
                                  marginLeft: 14,
                                  marginRight: 14,
                                  overflow: "hidden",
                                  width: dimensions.width - 28,
                                },
                                dimensions.width
                              )}
                            >
                              <SimpleStyleFlatList
                                data={eventData?.data?.feeds}
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
                                  "Scroll View->event->View->Custom Code 2->系列活动-列表->List"
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <RecommandSectionBlock
                                      dataItem={listData}
                                      hideMenu={true}
                                      isLatest={
                                        eventData?.data?.feeds?.length - 1 ===
                                        index
                                      }
                                    />
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment={"start"}
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
                                        alignItems: "center",
                                        backgroundColor: palettes.App.White,
                                        flexDirection: "row",
                                        justifyContent: "center",
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
                                        "Text Title"
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            "Text Title"
                                          ].style,
                                          {
                                            color:
                                              palettes.App["Custom Color 4"],
                                            fontFamily: "System",
                                            fontSize: 14,
                                            fontWeight: "400",
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, "common_no_content")}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {!(eventData?.meta?.total > 4) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        changeIndex(2);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { marginTop: -5 },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {null ? null : (
                                        <Divider
                                          {...GlobalStyles.DividerStyles(theme)[
                                            "Divider"
                                          ].props}
                                          color={palettes.App["Custom Color 4"]}
                                          style={StyleSheet.applyWidth(
                                            GlobalStyles.DividerStyles(theme)[
                                              "Divider"
                                            ].style,
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                    <>
                                      {!(eventData?.meta?.total > 4) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: "center",
                                              backgroundColor:
                                                palettes.App.White,
                                              flexDirection: "row",
                                              justifyContent: "center",
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
                                              "Text Title"
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  "Text Title"
                                                ].style,
                                                {
                                                  color:
                                                    palettes.Brand
                                                      .appStyle_primary,
                                                  fontFamily: "System",
                                                  fontSize: 14,
                                                  fontWeight: "400",
                                                  marginRight: null,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {t(Variables, "common_get_more")}
                                          </Text>
                                          <Icon
                                            color={
                                              palettes.Brand.appStyle_primary
                                            }
                                            name={"AntDesign/right"}
                                            size={14}
                                          />
                                        </View>
                                      )}
                                    </>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </Shadow.ShadowComponent>
                        </Utils.CustomCodeErrorBoundary>
                      </View>
                    )}
                  </>
                );
              }}
            </AceCampTestApi.FetchDailyupdateFeedsGET>
          )}
        </>
        {/* minute */}
        <>
          {!(
            (props.section ?? defaultProps.section) === "All" ||
            (props.section ?? defaultProps.section) === "Minute"
          ) ? null : (
            <AceCampTestApi.FetchDailyupdateFeedsGET
              collection={props.date_type ?? defaultProps.date_type}
              handlers={{
                onData: (minuteData) => {
                  try {
                    /* hidden 'Run a Custom Function' action */
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page_size={4}
              source_type={"Minute"}
            >
              {({ loading, error, data, refetchDailyupdateFeeds }) => {
                const minuteData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {!(minuteData?.data?.feeds?.length > 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App["Custom Color 19"],
                            paddingBottom: 5,
                            paddingTop: 20,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 系列活动-标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "flex-end",
                              flexDirection: "row",
                              marginBottom: 10,
                              paddingLeft: 16,
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
                                fontFamily: "System",
                                fontSize: 18,
                                fontWeight: "700",
                                letterSpacing: 0.2,
                                lineHeight: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "mine_note_collection")}
                          </Text>

                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App["Custom Color 23"],
                                fontFamily: "System",
                                fontSize: 15,
                                fontWeight: "400",
                                letterSpacing: 0.2,
                                lineHeight: 26,
                                marginLeft: 14,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "spotlight_related_company_total")}
                            {minuteData?.meta?.total}
                            {t(Variables, "organizer_minute_tip")}
                          </Text>
                        </View>
                        {/* Custom Code 2 */}
                        <Utils.CustomCodeErrorBoundary>
                          <Shadow.ShadowComponent
                            startColor={"#0002"}
                            endColor={"#0000"}
                            offset={[14, 0]}
                            distance={5}
                          >
                            {/* 系列活动-列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App["Custom #ffffff"],
                                  borderRadius: 4,
                                  marginLeft: 14,
                                  marginRight: 14,
                                  overflow: "hidden",
                                  width: dimensions.width - 28,
                                },
                                dimensions.width
                              )}
                            >
                              <SimpleStyleFlatList
                                data={minuteData?.data?.feeds}
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
                                  "Scroll View->minute->View->Custom Code 2->系列活动-列表->List"
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <RecommandSectionBlock
                                      dataItem={listData}
                                      hideMenu={true}
                                      isLatest={
                                        index ===
                                        minuteData?.data?.feeds?.length - 1
                                      }
                                    />
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment={"start"}
                                style={StyleSheet.applyWidth(
                                  { paddingLeft: 8, paddingRight: 8 },
                                  dimensions.width
                                )}
                              />
                              {/* View 3 */}
                              <>
                                {!(minuteData?.meta?.total === 0) ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: "center",
                                        backgroundColor: palettes.App.White,
                                        flexDirection: "row",
                                        justifyContent: "center",
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
                                        "Text Title"
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            "Text Title"
                                          ].style,
                                          {
                                            color:
                                              palettes.App["Custom Color 4"],
                                            fontFamily: "System",
                                            fontSize: 14,
                                            fontWeight: "400",
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, "common_no_content")}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {!(minuteData?.meta?.total > 4) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        changeIndex(3);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { marginTop: -5 },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {null ? null : (
                                        <Divider
                                          {...GlobalStyles.DividerStyles(theme)[
                                            "Divider"
                                          ].props}
                                          color={palettes.App["Custom Color 4"]}
                                          style={StyleSheet.applyWidth(
                                            GlobalStyles.DividerStyles(theme)[
                                              "Divider"
                                            ].style,
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: "center",
                                          backgroundColor: palettes.App.White,
                                          flexDirection: "row",
                                          justifyContent: "center",
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
                                          "Text Title"
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              "Text Title"
                                            ].style,
                                            {
                                              color:
                                                palettes.Brand.appStyle_primary,
                                              fontFamily: "System",
                                              fontSize: 14,
                                              fontWeight: "400",
                                              marginRight: null,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {t(Variables, "common_get_more")}
                                      </Text>
                                      <Icon
                                        color={palettes.Brand.appStyle_primary}
                                        name={"AntDesign/right"}
                                        size={14}
                                      />
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </Shadow.ShadowComponent>
                        </Utils.CustomCodeErrorBoundary>
                      </View>
                    )}
                  </>
                );
              }}
            </AceCampTestApi.FetchDailyupdateFeedsGET>
          )}
        </>
        {/* article */}
        <>
          {!(
            (props.section ?? defaultProps.section) === "All" ||
            (props.section ?? defaultProps.section) === "Article"
          ) ? null : (
            <AceCampTestApi.FetchDailyupdateFeedsGET
              collection={props.date_type ?? defaultProps.date_type}
              handlers={{
                onData: (articleData) => {
                  try {
                    /* hidden 'Run a Custom Function' action */
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page_size={4}
              source_type={"Article"}
            >
              {({ loading, error, data, refetchDailyupdateFeeds }) => {
                const articleData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {!(articleData?.data?.feeds?.length > 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App["Custom Color 19"],
                            paddingBottom: 10,
                            paddingTop: 20,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 系列活动-标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "flex-end",
                              flexDirection: "row",
                              marginBottom: 10,
                              paddingLeft: 16,
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
                                fontFamily: "System",
                                fontSize: 18,
                                fontWeight: "700",
                                letterSpacing: 0.2,
                                lineHeight: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "tab_vote_point")}
                          </Text>

                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App["Custom Color 23"],
                                fontFamily: "System",
                                fontSize: 15,
                                fontWeight: "400",
                                letterSpacing: 0.2,
                                lineHeight: 26,
                                marginLeft: 14,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "spotlight_related_company_total")}
                            {articleData?.meta?.total}
                            {t(Variables, "organizer_minute_tip")}
                          </Text>
                        </View>
                        {/* Custom Code 2 */}
                        <Utils.CustomCodeErrorBoundary>
                          <Shadow.ShadowComponent
                            startColor={"#0002"}
                            endColor={"#0000"}
                            offset={[14, 0]}
                            distance={5}
                          >
                            {/* 系列活动-列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App["Custom #ffffff"],
                                  borderRadius: 4,
                                  marginLeft: 14,
                                  marginRight: 14,
                                  overflow: "hidden",
                                  width: dimensions.width - 28,
                                },
                                dimensions.width
                              )}
                            >
                              <SimpleStyleFlatList
                                data={articleData?.data?.feeds}
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
                                  "Scroll View->article->View->Custom Code 2->系列活动-列表->List"
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <RecommandSectionBlock
                                      dataItem={listData}
                                      hideMenu={true}
                                      isLatest={
                                        index ===
                                        articleData?.data?.feeds?.length - 1
                                      }
                                    />
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment={"start"}
                                style={StyleSheet.applyWidth(
                                  { paddingLeft: 8, paddingRight: 8 },
                                  dimensions.width
                                )}
                              />
                              {/* View 3 */}
                              <>
                                {!(articleData?.meta?.total === 0) ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: "center",
                                        backgroundColor: palettes.App.White,
                                        flexDirection: "row",
                                        justifyContent: "center",
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
                                        "Text Title"
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            "Text Title"
                                          ].style,
                                          {
                                            color:
                                              palettes.App["Custom Color 4"],
                                            fontFamily: "System",
                                            fontSize: 14,
                                            fontWeight: "400",
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, "common_no_content")}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {!(articleData?.meta?.total > 4) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        changeIndex(4);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { marginTop: -5 },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {null ? null : (
                                        <Divider
                                          {...GlobalStyles.DividerStyles(theme)[
                                            "Divider"
                                          ].props}
                                          color={palettes.App["Custom Color 4"]}
                                          style={StyleSheet.applyWidth(
                                            GlobalStyles.DividerStyles(theme)[
                                              "Divider"
                                            ].style,
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: "center",
                                          backgroundColor: palettes.App.White,
                                          flexDirection: "row",
                                          justifyContent: "center",
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
                                          "Text Title"
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              "Text Title"
                                            ].style,
                                            {
                                              color:
                                                palettes.Brand.appStyle_primary,
                                              fontFamily: "System",
                                              fontSize: 14,
                                              fontWeight: "400",
                                              marginRight: null,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {t(Variables, "common_get_more")}
                                      </Text>
                                      <Icon
                                        color={palettes.Brand.appStyle_primary}
                                        name={"AntDesign/right"}
                                        size={14}
                                      />
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </Shadow.ShadowComponent>
                        </Utils.CustomCodeErrorBoundary>
                      </View>
                    )}
                  </>
                );
              }}
            </AceCampTestApi.FetchDailyupdateFeedsGET>
          )}
        </>
        {/* spotlights fetch */}
        <>
          {!(
            (props.section ?? defaultProps.section) === "All" ||
            (props.section ?? defaultProps.section) === "Spotlight"
          ) ? null : (
            <AceCampTestApi.FetchDailyupdateSpotlightGET
              collection={props.date_type ?? defaultProps.date_type}
              handlers={{
                onData: (spotlightsFetchData) => {
                  try {
                    /* hidden 'Run a Custom Function' action */
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
              per_page={4}
            >
              {({ loading, error, data, refetchDailyupdateSpotlight }) => {
                const spotlightsFetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {!(spotlightsFetchData?.data?.feeds?.length > 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App["Custom Color 19"],
                            paddingBottom: 5,
                            paddingTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {/* 专题-标题 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "flex-end",
                              flexDirection: "row",
                              marginBottom: 10,
                              paddingLeft: 16,
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
                                fontFamily: "System",
                                fontSize: 18,
                                fontWeight: "700",
                                letterSpacing: 0.2,
                                lineHeight: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "home_special")}
                          </Text>

                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App["Custom Color 23"],
                                fontFamily: "System",
                                fontSize: 15,
                                fontWeight: "400",
                                letterSpacing: 0.2,
                                lineHeight: 26,
                                marginLeft: 14,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, "spotlight_related_company_total")}
                            {spotlightsFetchData?.meta?.total}
                            {t(Variables, "organizer_spotlights_total")}
                          </Text>
                        </View>
                        {/* Custom Code 2 */}
                        <Utils.CustomCodeErrorBoundary>
                          <Shadow.ShadowComponent
                            startColor={"#0002"}
                            endColor={"#0000"}
                            offset={[14, 0]}
                            distance={5}
                          >
                            {/* 系列活动-列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App["Custom #ffffff"],
                                  borderRadius: 4,
                                  marginLeft: 14,
                                  marginRight: 14,
                                  overflow: "hidden",
                                  width: dimensions.width - 28,
                                },
                                dimensions.width
                              )}
                            >
                              <SimpleStyleFlatList
                                data={spotlightsFetchData?.data}
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
                                  "Scroll View->spotlights fetch->View->Custom Code 2->系列活动-列表->List"
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <RecommandSectionBlock
                                      dataItem={listData}
                                      hideMenu={true}
                                      isLatest={
                                        index ===
                                        spotlightsFetchData?.data?.length - 1
                                      }
                                    />
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment={"start"}
                                scrollEnabled={false}
                                style={StyleSheet.applyWidth(
                                  { paddingLeft: 8, paddingRight: 8 },
                                  dimensions.width
                                )}
                              />
                              {/* View 2 */}
                              <>
                                {!(
                                  spotlightsFetchData?.meta?.total === 0
                                ) ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: "center",
                                        backgroundColor: palettes.App.White,
                                        flexDirection: "row",
                                        justifyContent: "center",
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
                                        "Text Title"
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            "Text Title"
                                          ].style,
                                          {
                                            color:
                                              palettes.App["Custom Color 4"],
                                            fontFamily: "System",
                                            fontSize: 14,
                                            fontWeight: "400",
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, "common_no_content")}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {!(
                                  spotlightsFetchData?.meta?.total > 4
                                ) ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        changeIndex(1);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { marginTop: -5 },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {null ? null : (
                                        <Divider
                                          {...GlobalStyles.DividerStyles(theme)[
                                            "Divider"
                                          ].props}
                                          color={palettes.App["Custom Color 4"]}
                                          style={StyleSheet.applyWidth(
                                            GlobalStyles.DividerStyles(theme)[
                                              "Divider"
                                            ].style,
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                    <>
                                      {!(
                                        spotlightsFetchData?.meta?.total > 4
                                      ) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: "center",
                                              backgroundColor:
                                                palettes.App.White,
                                              flexDirection: "row",
                                              justifyContent: "center",
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
                                              "Text Title"
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  "Text Title"
                                                ].style,
                                                {
                                                  color:
                                                    palettes.Brand
                                                      .appStyle_primary,
                                                  fontFamily: "System",
                                                  fontSize: 14,
                                                  fontWeight: "400",
                                                  marginRight: null,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {t(Variables, "common_get_more")}
                                          </Text>
                                          <Icon
                                            color={
                                              palettes.Brand.appStyle_primary
                                            }
                                            name={"AntDesign/right"}
                                            size={14}
                                          />
                                        </View>
                                      )}
                                    </>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </Shadow.ShadowComponent>
                        </Utils.CustomCodeErrorBoundary>
                      </View>
                    )}
                  </>
                );
              }}
            </AceCampTestApi.FetchDailyupdateSpotlightGET>
          )}
        </>
      </SimpleStyleScrollView>
    </View>
  );
};

export default withTheme(DailyUpdateOverallBlock);
