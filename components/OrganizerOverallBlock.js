import React from "react";
import {
  Icon,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";
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

const defaultProps = { organization_id: null };

const OrganizerOverallBlock = (props) => {
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

  return (
    <View>
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={"never"}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {/* spotlights fetch */}
        <AceCampTestApi.FetchOrganizerSpotlightsGET
          handlers={{
            onData: (spotlightsFetchData) => {
              try {
                updateCount(1, spotlightsFetchData?.meta?.total);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          organization_id={getOid()}
          page={1}
          per_page={4}
        >
          {({ loading, error, data, refetchOrganizerSpotlights }) => {
            const spotlightsFetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
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
                            />
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={"start"}
                        scrollEnabled={false}
                      />
                      {/* View 2 */}
                      <>
                        {!(spotlightsFetchData?.meta?.total === 0) ? null : (
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
                              {...GlobalStyles.TextStyles(theme)["Text Title"]
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)["Text Title"]
                                    .style,
                                  {
                                    color: palettes.App["Custom Color 4"],
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
                        {!(spotlightsFetchData?.meta?.total > 4) ? null : (
                          <Touchable
                            onPress={() => {
                              try {
                                changeIndex(1);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <>
                              {!(
                                spotlightsFetchData?.meta?.total > 4
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
                              )}
                            </>
                          </Touchable>
                        )}
                      </>
                    </View>
                  </Shadow.ShadowComponent>
                </Utils.CustomCodeErrorBoundary>
              </View>
            );
          }}
        </AceCampTestApi.FetchOrganizerSpotlightsGET>
        {/* event */}
        <AceCampTestApi.FetchOrganizerMinute$article$eventGET
          handlers={{
            onData: (eventData) => {
              try {
                updateCount(2, eventData?.meta?.total);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          organization_id={getOid()}
          page_size={4}
          source_type={"Event"}
        >
          {({ loading, error, data, refetchOrganizerMinute$article$event }) => {
            const eventData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
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
                            />
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={"start"}
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
                              {...GlobalStyles.TextStyles(theme)["Text Title"]
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)["Text Title"]
                                    .style,
                                  {
                                    color: palettes.App["Custom Color 4"],
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
                          >
                            <>
                              {!(eventData?.meta?.total > 4) ? null : (
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
                              )}
                            </>
                          </Touchable>
                        )}
                      </>
                    </View>
                  </Shadow.ShadowComponent>
                </Utils.CustomCodeErrorBoundary>
              </View>
            );
          }}
        </AceCampTestApi.FetchOrganizerMinute$article$eventGET>
        {/* minute */}
        <AceCampTestApi.FetchOrganizerMinute$article$eventGET
          handlers={{
            onData: (minuteData) => {
              try {
                updateCount(3, minuteData?.meta?.total);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          organization_id={getOid()}
          page_size={4}
          source_type={"Minute"}
        >
          {({ loading, error, data, refetchOrganizerMinute$article$event }) => {
            const minuteData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
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
                            />
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={"start"}
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
                              {...GlobalStyles.TextStyles(theme)["Text Title"]
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)["Text Title"]
                                    .style,
                                  {
                                    color: palettes.App["Custom Color 4"],
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
                          >
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
                                {...GlobalStyles.TextStyles(theme)["Text Title"]
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)["Text Title"]
                                      .style,
                                    {
                                      color: palettes.Brand.appStyle_primary,
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
            );
          }}
        </AceCampTestApi.FetchOrganizerMinute$article$eventGET>
        {/* article */}
        <AceCampTestApi.FetchOrganizerMinute$article$eventGET
          handlers={{
            onData: (articleData) => {
              try {
                updateCount(4, articleData?.meta?.total);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          organization_id={getOid()}
          page_size={4}
          source_type={"Article"}
        >
          {({ loading, error, data, refetchOrganizerMinute$article$event }) => {
            const articleData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
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
                            />
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={"start"}
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
                              {...GlobalStyles.TextStyles(theme)["Text Title"]
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)["Text Title"]
                                    .style,
                                  {
                                    color: palettes.App["Custom Color 4"],
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
                          >
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
                                {...GlobalStyles.TextStyles(theme)["Text Title"]
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)["Text Title"]
                                      .style,
                                    {
                                      color: palettes.Brand.appStyle_primary,
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
            );
          }}
        </AceCampTestApi.FetchOrganizerMinute$article$eventGET>
      </SimpleStyleScrollView>
    </View>
  );
};

export default withTheme(OrganizerOverallBlock);
