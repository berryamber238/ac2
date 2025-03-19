import React from "react";
import {
  ExpoImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TabView,
  TabViewItem,
  TextInput,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import imageSource from "../utils/imageSource";
import selectFileUtil from "../utils/selectFile";
import showAlertUtil from "../utils/showAlert";
import useWindowDimensions from "../utils/useWindowDimensions";

const AIAssistantScreen = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [company_list, setCompany_list] = React.useState([]);
  const [is_loading, setIs_loading] = React.useState(false);
  const [is_searching, setIs_searching] = React.useState(false);
  const [show_menu, setShow_menu] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState("");
  const safeAreaInsets = useSafeAreaInsets();
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

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App["Custom #ffffff"],
          paddingTop: safeAreaInsets.top,
        },
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
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={"disk"}
            contentPosition={"center"}
            resizeMode={"cover"}
            transitionDuration={300}
            transitionEffect={"cross-dissolve"}
            transitionTiming={"ease-in-out"}
            {...GlobalStyles.ExpoImageStyles(theme)["Image 4"].props}
            source={imageSource(Images["logo"])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)["Image 4"].style,
                { height: 22, width: 22 }
              ),
              dimensions.width
            )}
          />
          {/* Image 2 */}
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={"disk"}
            transitionDuration={300}
            transitionTiming={"ease-in-out"}
            {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
            contentPosition={"left"}
            resizeMode={"contain"}
            source={imageSource(Images["aiassistant"])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                { height: 20, marginLeft: 5, width: 35 }
              ),
              dimensions.width
            )}
            transitionEffect={"flip-from-right"}
          />
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.appStyle_primary,
                fontFamily: "System",
                fontSize: 20,
                fontWeight: "700",
                letterSpacing: 0.2,
                lineHeight: 22,
                marginLeft: 4,
                marginRight: null,
              },
              dimensions.width
            )}
          >
            {t(Variables, "ai_common_name")}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginLeft: 10,
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
                borderWidth: 1,
                flexDirection: "row",
                paddingRight: 8,
                width: "100%",
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App["Custom Color 9"]}
              name={"Ionicons/search"}
              size={16}
              style={StyleSheet.applyWidth({ marginLeft: 8 }, dimensions.width)}
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
                        await AceCampTestApi.searchSuggestGET(Constants, {
                          keyword: newTextInputValue,
                        })
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
              {...GlobalStyles.TextInputStyles(theme)["Login Input"].props}
              placeholder={t(
                Variables,
                "ai_list_search_placeholder"
              ).toString()}
              placeholderTextColor={palettes.App["Custom Color 9"]}
              returnKeyType={"search"}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)["Login Input"].style,
                  {
                    fontFamily: "System",
                    fontSize: 12,
                    fontWeight: "400",
                    lineHeight: 14,
                    paddingBottom: null,
                    paddingLeft: 6,
                    paddingTop: null,
                    width: "70%",
                  }
                ),
                dimensions.width
              )}
              value={textInputValue}
            />
          </View>
        </View>
      </View>

      <TabView
        iconPosition={"top"}
        indicatorColor={theme.colors.branding.primary}
        initialTabIndex={0}
        keyboardDismissMode={"auto"}
        pressColor={theme.colors.branding.primary}
        swipeEnabled={true}
        tabBarPosition={"top"}
        activeColor={palettes.Brand.appStyle_primary}
        scrollEnabled={false}
        style={StyleSheet.applyWidth(
          {
            fontFamily: "System",
            fontSize: 12,
            fontWeight: "600",
            letterSpacing: 0.2,
            lineHeight: 14,
            marginTop: -5,
            textDecorationLine: "none",
          },
          dimensions.width
        )}
        tabsBackgroundColor={palettes.App["Custom #ffffff"]}
      >
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].style,
            dimensions.width
          )}
          title={t(Variables, "ai_record")}
        >
          <View
            style={StyleSheet.applyWidth(
              { height: "100%", width: "100%" },
              dimensions.width
            )}
          >
            <LinearGradient
              endX={100}
              endY={100}
              startX={0}
              startY={0}
              {...GlobalStyles.LinearGradientStyles(theme)["Linear Gradient"]
                .props}
              color1={palettes.App["Custom Color 13"]}
              color2={palettes.App["Custom #ffffff"]}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinearGradientStyles(theme)["Linear Gradient"]
                    .style,
                  { position: "absolute", top: 0 }
                ),
                dimensions.width
              )}
            />
            <SimpleStyleScrollView
              horizontal={false}
              keyboardShouldPersistTaps={"never"}
              nestedScrollEnabled={false}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={StyleSheet.applyWidth(
                {
                  height: "100%",
                  paddingBottom: 16,
                  paddingTop: 16,
                  width: "100%",
                },
                dimensions.width
              )}
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
                distance={3}
                paintInside={false}
                startColor={palettes.App["Custom Color 48"]}
                stretch={false}
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 4,
                    marginBottom: 16,
                    marginLeft: 16,
                    marginRight: 16,
                    width: "100%",
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App["Custom #ffffff"],
                      borderRadius: 4,
                      padding: 8,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App["Custom Color 81"],
                        left: 8,
                        paddingBottom: 2,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 2,
                        position: "absolute",
                        top: 9,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App["Custom Color 82"],
                          fontFamily: "System",
                          fontSize: 10,
                          fontWeight: "400",
                          lineHeight: 14,
                          marginRight: null,
                        },
                        dimensions.width
                      )}
                    >
                      {"已转写"}
                    </Text>
                  </View>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={"tail"}
                    numberOfLines={2}
                    style={StyleSheet.applyWidth(
                      {
                        fontFamily: "System",
                        fontSize: 14,
                        fontWeight: "700",
                        letterSpacing: 0.3,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {"             "}
                    {
                      "难民之难：他们在面对什么困境音频名他们在面对什么困境音频名称.mp3"
                    }
                  </Text>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App["Custom Color 23"],
                            fontFamily: "System",
                            fontSize: 13,
                            fontWeight: "400",
                            letterSpacing: 0.3,
                            lineHeight: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {"音频"}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App["Custom Color 23"],
                            fontFamily: "System",
                            fontSize: 13,
                            fontWeight: "400",
                            letterSpacing: 0.3,
                            lineHeight: 15,
                            marginLeft: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {"时长43:34"}
                      </Text>
                    </View>
                    {/* Text 3 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: "flex-end",
                          color: palettes.App["Custom Color 23"],
                          fontFamily: "System",
                          fontSize: 13,
                          fontWeight: "400",
                          letterSpacing: 0.3,
                          lineHeight: 15,
                          marginLeft: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {"2023/12/23 11:23"}
                    </Text>
                  </View>
                </View>
              </Shadow>
              {/* Shadow 3 */}
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
                distance={3}
                paintInside={false}
                startColor={palettes.App["Custom Color 48"]}
                stretch={false}
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 4,
                    marginBottom: 16,
                    marginLeft: 16,
                    marginRight: 16,
                    width: "100%",
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App["Custom #ffffff"],
                      borderRadius: 4,
                      padding: 8,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: "rgba(251, 182, 11, 0.15)",
                        left: 8,
                        paddingBottom: 2,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 2,
                        position: "absolute",
                        top: 9,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App["Custom Color 83"],
                          fontFamily: "System",
                          fontSize: 10,
                          fontWeight: "400",
                          lineHeight: 14,
                          marginRight: null,
                        },
                        dimensions.width
                      )}
                    >
                      {"转写中"}
                    </Text>
                  </View>
                  {/* Text 2 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={"tail"}
                    numberOfLines={2}
                    style={StyleSheet.applyWidth(
                      {
                        fontFamily: "System",
                        fontSize: 14,
                        fontWeight: "700",
                        letterSpacing: 0.3,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {"             "}
                    {
                      "复星旅文（1992.HK）中国业务春节表现卓越，Club Med和亚特营业额同比"
                    }
                  </Text>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App["Custom Color 23"],
                            fontFamily: "System",
                            fontSize: 13,
                            fontWeight: "400",
                            letterSpacing: 0.3,
                            lineHeight: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {"文档"}
                      </Text>
                    </View>
                    {/* Text 3 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: "flex-end",
                          color: palettes.App["Custom Color 23"],
                          fontFamily: "System",
                          fontSize: 13,
                          fontWeight: "400",
                          letterSpacing: 0.3,
                          lineHeight: 15,
                          marginLeft: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {"2023/12/23 11:23"}
                    </Text>
                  </View>
                </View>
              </Shadow>
              {/* Shadow 2 */}
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
                distance={3}
                paintInside={false}
                startColor={palettes.App["Custom Color 48"]}
                stretch={false}
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 4,
                    marginLeft: 16,
                    marginRight: 16,
                    width: "100%",
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App["Custom #ffffff"],
                      borderRadius: 4,
                      padding: 8,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: "rgba(243, 50, 31, 0.15)",
                        left: 8,
                        paddingBottom: 2,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 2,
                        position: "absolute",
                        top: 9,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App["Custom Color 15"],
                          fontFamily: "System",
                          fontSize: 10,
                          fontWeight: "400",
                          lineHeight: 14,
                          marginRight: null,
                        },
                        dimensions.width
                      )}
                    >
                      {"失 败"}
                    </Text>
                  </View>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    ellipsizeMode={"tail"}
                    numberOfLines={2}
                    style={StyleSheet.applyWidth(
                      {
                        fontFamily: "System",
                        fontSize: 14,
                        fontWeight: "700",
                        letterSpacing: 0.3,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {"             "}
                    {
                      "谈谷歌I/O大会技术体感，也涉及到GPT-4o最近的测试结果，两者结合起来看"
                    }
                  </Text>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
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
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App["Custom Color 23"],
                            fontFamily: "System",
                            fontSize: 13,
                            fontWeight: "400",
                            letterSpacing: 0.3,
                            lineHeight: 15,
                          },
                          dimensions.width
                        )}
                      >
                        {"音频"}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App["Custom Color 23"],
                            fontFamily: "System",
                            fontSize: 13,
                            fontWeight: "400",
                            letterSpacing: 0.3,
                            lineHeight: 15,
                            marginLeft: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {"时长43:34"}
                      </Text>
                    </View>
                    {/* Text 3 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: "flex-end",
                          color: palettes.App["Custom Color 23"],
                          fontFamily: "System",
                          fontSize: 13,
                          fontWeight: "400",
                          letterSpacing: 0.3,
                          lineHeight: 15,
                          marginLeft: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {"2023/12/23 11:23"}
                    </Text>
                  </View>
                </View>
              </Shadow>
            </SimpleStyleScrollView>
          </View>
        </TabViewItem>
        {/* Tab View Item 2 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].style,
            dimensions.width
          )}
          title={t(Variables, "ai_translate")}
        />
        {/* Tab View Item 3 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].style,
            dimensions.width
          )}
          title={t(Variables, "ai_record_task")}
        />
        {/* Tab View Item 4 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)["Tab View Item"].style,
            dimensions.width
          )}
          title={t(Variables, "ai_3rd_part")}
        />
      </TabView>

      <View
        style={StyleSheet.applyWidth(
          { bottom: 16, position: "absolute", right: 16, zIndex: 300 },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              setShow_menu(!show_menu);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={"disk"}
            contentPosition={"center"}
            resizeMode={"cover"}
            transitionDuration={300}
            transitionEffect={"cross-dissolve"}
            transitionTiming={"ease-in-out"}
            {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
            source={imageSource(Images["plusbtn"])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                { height: 50, width: 50 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
      {/* View 2 */}
      <>
        {!show_menu ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                bottom: 0,
                left: 0,
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 200,
              },
              dimensions.width
            )}
          >
            <BlurView
              {...GlobalStyles.BlurViewStyles(theme)["Blur View"].props}
              experimentalBlurMethod={"dimezisBlurView"}
              intensity={20}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)["Blur View"].style,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 200,
                  }
                ),
                dimensions.width
              )}
              tint={"light"}
            >
              <Touchable
                onPress={() => {
                  try {
                    /* 'Select File' action requires configuration: Enter a Result Name */

                    showAlertUtil({
                      title: "提示",
                      message: "暂未实现",
                      buttonText: "确定",
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: "center",
                      height: 60,
                      justifyContent: "center",
                      width: 300,
                    },
                    dimensions.width
                  )}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={"disk"}
                    contentPosition={"center"}
                    transitionDuration={300}
                    transitionEffect={"cross-dissolve"}
                    transitionTiming={"ease-in-out"}
                    {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
                    resizeMode={"cover"}
                    source={imageSource(Images["addbtn"])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                        { height: 60, position: "absolute", width: 300 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)["Text Title"].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)["Text Title"].style,
                        theme.typography.body1,
                        { color: palettes.App["Custom #ffffff"] }
                      ),
                      dimensions.width
                    )}
                  >
                    {"上传手机音视频/文档"}
                  </Text>
                </View>
              </Touchable>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    height: 60,
                    justifyContent: "center",
                    marginTop: 10,
                    width: 300,
                  },
                  dimensions.width
                )}
              >
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={"disk"}
                  contentPosition={"center"}
                  transitionDuration={300}
                  transitionEffect={"cross-dissolve"}
                  transitionTiming={"ease-in-out"}
                  {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
                  resizeMode={"cover"}
                  source={imageSource(Images["addbtnlight"])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                      { height: 60, position: "absolute", width: 300 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Title"].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)["Text Title"].style,
                      theme.typography.body1,
                      { color: palettes.App.appStyle_black }
                    ),
                    dimensions.width
                  )}
                >
                  {"多平台会议录制"}
                </Text>
              </View>
              {/* View 4 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    height: 60,
                    justifyContent: "center",
                    marginTop: 10,
                    width: 300,
                  },
                  dimensions.width
                )}
              >
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={"disk"}
                  contentPosition={"center"}
                  transitionDuration={300}
                  transitionEffect={"cross-dissolve"}
                  transitionTiming={"ease-in-out"}
                  {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
                  resizeMode={"cover"}
                  source={imageSource(Images["addbtnlight"])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                      { height: 60, position: "absolute", width: 300 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Title"].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)["Text Title"].style,
                      theme.typography.body1,
                      { color: palettes.App.appStyle_black }
                    ),
                    dimensions.width
                  )}
                >
                  {"电话会议录制"}
                </Text>
              </View>
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    height: 60,
                    justifyContent: "center",
                    marginTop: 10,
                    width: 300,
                  },
                  dimensions.width
                )}
              >
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={"disk"}
                  contentPosition={"center"}
                  transitionDuration={300}
                  transitionEffect={"cross-dissolve"}
                  transitionTiming={"ease-in-out"}
                  {...GlobalStyles.ExpoImageStyles(theme)["SVG 2"].props}
                  resizeMode={"cover"}
                  source={imageSource(Images["addbtnlight"])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)["SVG 2"].style,
                      { height: 60, position: "absolute", width: 300 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Title"].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)["Text Title"].style,
                      theme.typography.body1,
                      { color: palettes.App.appStyle_black }
                    ),
                    dimensions.width
                  )}
                >
                  {"现场实时录制"}
                </Text>
              </View>
            </BlurView>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(AIAssistantScreen);
