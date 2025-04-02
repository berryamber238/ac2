import React from "react";
import {
  Icon,
  LinearGradient,
  LoadingIndicator,
  SVG,
  ScreenContainer,
  Shadow,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TextInput,
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
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import imageSource from "../utils/imageSource";
import showAlertUtil from "../utils/showAlert";
import useWindowDimensions from "../utils/useWindowDimensions";
import waitUtil from "../utils/wait";

const CompanyListScreen = (props) => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [company_list, setCompany_list] = React.useState([]);
  const [is_loading, setIs_loading] = React.useState(
    Constants["tag_all_selected"]
  );
  const [is_popular, setIs_popular] = React.useState(true);
  const [is_searching, setIs_searching] = React.useState(false);
  const [page, setPage] = React.useState(2);
  const [textInputValue, setTextInputValue] = React.useState("");
  const [total_record, setTotal_record] = React.useState(0);
  const setFollowingData = (listItem) => {
    if (listItem.following) {
      listItem.following = null;
    } else {
      listItem.following = true;
    }
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: "dark-content" });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestSnsActionsDoPOST = AceCampTestApi.useSnsActionsDoPOST();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <AceCampTestApi.FetchCompanyPopularsGET
        following={!is_popular}
        handlers={{
          onData: (fetchData) => {
            const handler = async () => {
              try {
                setCompany_list(fetchData?.data?.corporations);
                setTotal_record(fetchData?.meta?.total);
                setPage(2);
                await waitUtil({ milliseconds: 500 });
                setIs_loading(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          },
        }}
        page={1}
        per_page={20}
      >
        {({ loading, error, data, refetchCompanyPopulars }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* Container */}
              <View
                style={StyleSheet.applyWidth(
                  { backgroundColor: palettes.App.White },
                  dimensions.width
                )}
              >
                {/* 标题及搜索框 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.White,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 16,
                      paddingRight: 16,
                      zIndex: 100,
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
                    <Image
                      resizeMode={"cover"}
                      {...GlobalStyles.ImageStyles(theme)["Image"].props}
                      source={imageSource(Images["logo"])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)["Image"].style,
                          { height: 26, width: 26 }
                        ),
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: "System",
                          fontSize: 18,
                          fontWeight: "700",
                          letterSpacing: 0.2,
                          lineHeight: 24,
                          marginLeft: 4,
                          marginRight: null,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, "company_list_title")}
                    </Text>
                  </View>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: "center",
                          borderColor: "rgba(43, 51, 230, 0.3)",
                          borderRadius: 20,
                          borderWidth: 2,
                          flexDirection: "row",
                          paddingRight: 8,
                          width: "70%",
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        size={24}
                        color={palettes.App["Custom Color 9"]}
                        name={"EvilIcons/search"}
                      />
                      <TextInput
                        autoCapitalize={"none"}
                        autoCorrect={true}
                        changeTextDelay={500}
                        onChangeText={(newTextInputValue) => {
                          const textInputValue = newTextInputValue;
                          try {
                            setTextInputValue(newTextInputValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        onChangeTextDelayed={(newTextInputValue) => {
                          const handler = async () => {
                            const textInputValue = newTextInputValue;
                            try {
                              if (newTextInputValue?.length > 0) {
                                setIs_searching(true);
                                const suggest_result = (
                                  await AceCampTestApi.searchSuggestGET(
                                    Constants,
                                    { keyword: newTextInputValue }
                                  )
                                )?.json;
                                console.log(suggest_result);
                                setCompany_list(
                                  [].concat(suggest_result?.data?.corporations)
                                );
                              } else {
                                setIs_searching(false);
                                setIs_loading(true);
                                await refetchCompanyPopulars();
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        webShowOutline={true}
                        {...GlobalStyles.TextInputStyles(theme)["Login Input"]
                          .props}
                        placeholder={t(
                          Variables,
                          "company_list_search_placehold"
                        ).toString()}
                        placeholderTextColor={palettes.App["Custom Color 9"]}
                        returnKeyType={"search"}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextInputStyles(theme)["Login Input"]
                              .style,
                            {
                              fontFamily: "System",
                              fontSize: 13,
                              fontWeight: "400",
                              lineHeight: 17,
                              paddingBottom: 6,
                              paddingTop: 6,
                            }
                          ),
                          dimensions.width
                        )}
                        value={textInputValue}
                      />
                    </View>
                  </View>
                </View>
                {/* 菜单 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.White,
                      flexDirection: "row",
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                      zIndex: 100,
                    },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setIs_loading(true);
                        setIs_popular(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Company List Menu"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Company List Menu"]
                            .style,
                          {
                            color: is_popular
                              ? palettes.Brand.appStyle_primary
                              : palettes.App["Custom Color 23"],
                            marginBottom: 4,
                            marginLeft: 8,
                            marginRight: 4,
                            marginTop: 4,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, "company_list_hot")}
                    </Text>
                  </Touchable>
                  {/* Touchable 2 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setIs_loading(true);
                        setIs_popular(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Text 2 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Company List Menu"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Company List Menu"]
                            .style,
                          {
                            color: is_popular
                              ? palettes.App["Custom Color 23"]
                              : palettes.Brand.appStyle_primary,
                            marginBottom: 4,
                            marginLeft: 4,
                            marginRight: 8,
                            marginTop: 4,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, "company_list_my_follow")}
                    </Text>
                  </Touchable>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      height: "100%",
                      paddingBottom: safeAreaInsets.bottom + 50,
                      width: "100%",
                    },
                    dimensions.width
                  )}
                >
                  <LinearGradient
                    endY={100}
                    startX={0}
                    startY={0}
                    {...GlobalStyles.LinearGradientStyles(theme)[
                      "Linear Gradient"
                    ].props}
                    color1={palettes.App["Custom Color 13"]}
                    color2={palettes.App.White}
                    endX={0}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.LinearGradientStyles(theme)[
                          "Linear Gradient"
                        ].style,
                        { position: "absolute" }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 无数据 */}
                  <>
                    {!(fetchData?.meta?.total === 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: "center",
                            flexDirection: "column",
                            marginTop: 150,
                            width: "100%",
                          },
                          dimensions.width
                        )}
                      >
                        <SVG
                          source={
                            "https://static.acecamptech.com/system/empty.svg"
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
                              color: palettes.App["Custom Color 4"],
                              fontFamily: "System",
                              fontSize: 12,
                              fontWeight: "400",
                              letterSpacing: 0.3,
                              lineHeight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, "common_no_content")}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* FlashList */}
                  <SimpleStyleFlatList
                    data={company_list}
                    decelerationRate={"normal"}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(flashListData, index) =>
                      flashListData?.corporation_id
                    }
                    keyboardShouldPersistTaps={"never"}
                    listKey={"Fetch->Container->View->FlashList"}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (is_searching) {
                            return;
                          }
                          if (is_loading) {
                            return;
                          }
                          if (company_list?.length >= fetchData?.meta?.total) {
                            return;
                          }
                          setIs_loading(true);
                          const company_result = (
                            await AceCampTestApi.companyPopularsGET(Constants, {
                              following: !is_popular,
                              page: page,
                              per_page: 20,
                            })
                          )?.json;
                          setCompany_list(
                            company_list.concat(
                              company_result?.data?.corporations
                            )
                          );
                          setPage(page + 1);
                          await waitUtil({ milliseconds: 500 });
                          setIs_loading(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const flashListData = item;
                      return (
                        <Touchable
                          onPress={() => {
                            try {
                              navigation.push("BottomTabNavigator", {
                                screen: "Company",
                                params: {
                                  screen: "CompanyInfoScreen",
                                  params: {
                                    ticker: flashListData?.ticker,
                                    name: flashListData?.name,
                                    id: flashListData?.corporation_id,
                                    logo: flashListData?.logo,
                                    following: flashListData?.following,
                                  },
                                },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Shadow
                            offsetX={0}
                            offsetY={0}
                            showShadowCornerBottomEnd={true}
                            showShadowCornerBottomStart={true}
                            showShadowCornerTopEnd={true}
                            showShadowCornerTopStart={true}
                            showShadowSideBottom={true}
                            showShadowSideEnd={true}
                            showShadowSideStart={true}
                            showShadowSideTop={true}
                            distance={6}
                            paintInside={true}
                            startColor={palettes.App["Custom Color 48"]}
                            stretch={false}
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: "rgba(0, 0, 0, 0)",
                                borderRadius: 8,
                                marginBottom: 8,
                                marginTop: 8,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: "100%",
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: dimensions.width - 32,
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            {/* 公司列表 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: "center",
                                  backgroundColor: palettes.App.White,
                                  borderColor: palettes.App["Custom Color 48"],
                                  borderRadius: 6,
                                  flexDirection: "row",
                                  height: 70,
                                  justifyContent: "space-between",
                                  paddingBottom: 9,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 9,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginRight: 5 },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!flashListData?.logo ? null : (
                                    <Image
                                      resizeMode={"cover"}
                                      {...GlobalStyles.ImageStyles(theme)[
                                        "Image"
                                      ].props}
                                      source={imageSource(
                                        `${flashListData?.logo}`
                                      )}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.ImageStyles(theme)[
                                            "Image"
                                          ].style,
                                          { height: 32, width: 32 }
                                        ),
                                        dimensions.width
                                      )}
                                    />
                                  )}
                                </>
                                <>
                                  {flashListData?.logo ? null : (
                                    <SVG
                                      {...GlobalStyles.SVGStyles(theme)["SVG"]
                                        .props}
                                      source={
                                        "https://static.acecamptech.com/www/static/media/relation-company.179798304f24764e14e2a7584e0facaa.svg"
                                      }
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.SVGStyles(theme)["SVG"]
                                            .style,
                                          { height: 32, width: 32 }
                                        ),
                                        dimensions.width
                                      )}
                                    />
                                  )}
                                </>
                              </View>
                              {/* View 2 */}
                              <View>
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
                                        fontFamily: "System",
                                        fontSize: 15,
                                        fontWeight: "600",
                                        lineHeight: 20,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.name}
                                </Text>
                                {/* Text 2 */}
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
                                        color: palettes.App["Custom Color 24"],
                                        fontFamily: "System",
                                        fontSize: 12,
                                        fontWeight: "600",
                                        lineHeight: 20,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {flashListData?.ticker}
                                </Text>
                              </View>
                              {/* View 3 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignItems: "flex-end", flex: 1 },
                                  dimensions.width
                                )}
                              >
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
                                      "Text Title"
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          "Text Title"
                                        ].style,
                                        {
                                          color: undefined
                                            ? "#F3321F"
                                            : "#088232",
                                          fontSize: 12,
                                          lineHeight: 20,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {flashListData?.current_price}
                                  </Text>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: undefined
                                          ? "#ff4b4b1a"
                                          : "#14b66c1a",
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Text 2 */}
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
                                            color: undefined
                                              ? "#F3321F"
                                              : "#088232",
                                            fontFamily: "System",
                                            fontSize: 12,
                                            fontWeight: "400",
                                            lineHeight: 20,
                                            marginLeft: 4,
                                            marginRight: 4,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {flashListData?.current_change_percent}
                                      {"%"}
                                    </Text>
                                  </View>
                                </View>

                                <Touchable
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        const result = (
                                          await aceCampTestSnsActionsDoPOST.mutateAsync(
                                            {
                                              action: flashListData?.following
                                                ? "unfollow"
                                                : "follow",
                                              target_id:
                                                flashListData?.corporation_id
                                                  ? flashListData?.corporation_id
                                                  : flashListData?.id,
                                              target_type: "Corporation",
                                            }
                                          )
                                        )?.json;
                                        if (result?.code === 200) {
                                          setFollowingData(flashListData);
                                        } else {
                                        }
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                >
                                  {/* View 2 */}
                                  <>
                                    {!!flashListData?.following ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: "center",
                                            flexDirection: "row",
                                            marginTop: 4,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Icon
                                          color={
                                            palettes.Brand.appStyle_primary
                                          }
                                          name={"AntDesign/pluscircleo"}
                                          size={18}
                                        />
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
                                                fontWeight: "600",
                                                lineHeight: 20,
                                                marginLeft: 4,
                                                marginRight: null,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {t(Variables, "tab_circle_follow")}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  <>
                                    {!flashListData?.following ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            backgroundColor:
                                              palettes.App["Custom Color 27"],
                                            borderRadius: 8,
                                            marginTop: 4,
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
                                                  palettes.App[
                                                    "Custom #ffffff"
                                                  ],
                                                fontFamily: "System",
                                                fontSize: 14,
                                                fontWeight: "600",
                                                lineHeight: 20,
                                                marginLeft: 4,
                                                marginRight: 4,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {t(Variables, "common_followed")}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                </Touchable>
                              </View>
                            </View>
                          </Shadow>
                        </Touchable>
                      );
                    }}
                    snapToAlignment={"start"}
                    onEndReachedThreshold={0.1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      {
                        paddingBottom: safeAreaInsets.bottom + 40,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 10,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* 读取窗口 */}
                <>
                  {!is_loading ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: "center",
                          height: [
                            { minWidth: Breakpoints.Mobile, value: "100%" },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: dimensions.height,
                            },
                          ],
                          justifyContent: "center",
                          left: 0,
                          opacity: 1,
                          position: "absolute",
                          top: 0,
                          width: [
                            { minWidth: Breakpoints.Mobile, value: "100%" },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: dimensions.width,
                            },
                          ],
                          zIndex: 99,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: "center",
                            backgroundColor: palettes.App["Custom Color 5"],
                            borderRadius: 8,
                            height: 70,
                            justifyContent: "center",
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
                          type={"wave"}
                        />
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App["Custom Color 5"],
                            height: "100%",
                            left: 0,
                            opacity: 0.43,
                            position: "absolute",
                            top: 0,
                            width: "100%",
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
            </>
          );
        }}
      </AceCampTestApi.FetchCompanyPopularsGET>
    </ScreenContainer>
  );
};

export default withTheme(CompanyListScreen);
