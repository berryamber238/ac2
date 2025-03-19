import React from "react";
import {
  IconButton,
  LoadingIndicator,
  ScreenContainer,
  SimpleStyleFlashList,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fetch } from "react-request";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as RefreshControls from "../custom-files/RefreshControls";
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import imageSource from "../utils/imageSource";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { callback: () => {}, id: 100, title: null };

const MineCountryCodeListScreen = (props) => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [isLoading, setIsLoading] = React.useState(false);
  const [listData, setListData] = React.useState([]);
  const [page, setPage] = React.useState(2);
  const listDataUpdate = (newData) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    listData.push(...newData);
  };

  const onScroll = async (ev) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const offsetY = ev.nativeEvent.contentOffset.y;

    if (
      offsetY + ev.nativeEvent.layoutMeasurement.height >=
      ev.nativeEvent.contentSize.height - 3
    ) {
      const result = (
        await AceCampTestApi.regionsGET(Constants, { page: page })
      )?.json;
      setListData(listData.concat(result?.data));
      if (result.length > 0) {
        setPage(page + 1);
      }
    }
    setIsLoading(false);
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: "light-content" });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={false}
      scrollable={false}
    >
      {/* Title View */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.Brand.appStyle_primary,
            flexDirection: "column",
            paddingBottom: 15,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: safeAreaInsets.top + 15,
            width: "100%",
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: "flex-start",
                height: 25,
                justifyContent: "center",
                width: 25,
              },
              dimensions.width
            )}
          >
            <IconButton
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
              size={32}
              color={palettes.Brand.appStyle_background}
              icon={"AntDesign/left"}
            />
          </View>
          {/* View 3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: "center",
                flexDirection: "row",
                height: 25,
                justifyContent: "center",
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                  {
                    alignSelf: "center",
                    color: palettes.Brand.appStyle_background,
                    fontSize: 20,
                    lineHeight: 22,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, props.route?.params?.title ?? defaultProps.title)}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: "flex-end",
                height: 25,
                justifyContent: "center",
                width: 25,
              },
              dimensions.width
            )}
          ></View>
        </View>
      </View>

      <AceCampTestApi.FetchRegionsGET
        handlers={{
          onData: (fetchData) => {
            try {
              setListData(listData.concat(fetchData?.data));
              /* hidden 'Set Variable' action */
            } catch (err) {
              console.error(err);
            }
          },
        }}
        page={1}
      >
        {({ loading, error, data, refetchRegions }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <Utils.CustomCodeErrorBoundary>
              <RefreshControls.RefreshView
                listData={listData}
                setListData={setListData}
                api={AceCampTestApi}
                page={page}
                setPage={setPage}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Constants={Constants}
              >
                <SimpleStyleFlashList
                  data={listData}
                  estimatedItemSize={50}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(flashListData, index) => flashListData?.id}
                  listKey={"gT71epE4"}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.goBack();
                            props.route?.params?.callback?.(
                              flashListData?.id,
                              flashListData?.country_code
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: "center",
                              flexDirection: "row",
                              height: 50,
                              justifyContent: "space-between",
                              paddingBottom: 10,
                              paddingLeft: 16,
                              paddingRight: 16,
                              paddingTop: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: "center", flexDirection: "row" },
                              dimensions.width
                            )}
                          >
                            {/* Text 2 */}
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)[
                                "Text Form Label"
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    "Text Form Label"
                                  ].style,
                                  { marginLeft: 8, marginRight: 8 }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.emoji_flag}
                            </Text>

                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                "Text Form Label"
                              ].props}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    "Text Form Label"
                                  ].style,
                                  { fontFamily: "System", fontWeight: "400" }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.name}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)[
                                "Text Form Label"
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  "Text Form Label"
                                ].style,
                                dimensions.width
                              )}
                            >
                              {"+"}
                              {flashListData?.country_code}
                            </Text>
                            <>
                              {!(
                                flashListData?.id ===
                                (props.route?.params?.id ?? defaultProps.id)
                              ) ? null : (
                                <Image
                                  resizeMode={"cover"}
                                  {...GlobalStyles.ImageStyles(theme)["Image"]
                                    .props}
                                  source={imageSource(Images["iconselectdrop"])}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)["Image"]
                                        .style,
                                      { height: 20, marginLeft: 8, width: 20 }
                                    ),
                                    dimensions.width
                                  )}
                                />
                              )}
                            </>
                          </View>
                        </View>
                      </Touchable>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                />
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: "center",
                      borderTopWidth: 0,
                      flexDirection: "row",
                      height: 50,
                      justifyContent: "center",
                      marginTop: 7,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {!isLoading ? null : (
                      <LoadingIndicator
                        type={"circleFade"}
                        color={palettes.Brand.appStyle_primary}
                        size={16}
                        style={StyleSheet.applyWidth(
                          { marginRight: 14 },
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                        { fontFamily: "Urbanist_400Regular", fontSize: 14 }
                      ),
                      dimensions.width
                    )}
                  >
                    {isLoading
                      ? t(Variables, "common_loading")
                      : t(Variables, "common_load_more")}
                  </Text>
                </View>
              </RefreshControls.RefreshView>
            </Utils.CustomCodeErrorBoundary>
          );
        }}
      </AceCampTestApi.FetchRegionsGET>
      <View />
    </ScreenContainer>
  );
};

export default withTheme(MineCountryCodeListScreen);
