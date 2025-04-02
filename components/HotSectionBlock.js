import React from "react";
import { Icon, Touchable, withTheme } from "@draftbit/ui";
import { Text, View } from "react-native";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as gf from "../custom-files/gf";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = {
  dataItem: {
    id: 2070501645,
    cursor: 1625226206,
    source: {
      id: 70501645,
      free: true,
      type: "minute",
      title:
        "我住在上福路上的良友公寓变成了“魔都小众拍照打卡地”，来这里拍照变成流量法宝，有人开始不择手段闯进楼里海网红洋房公寓，每天都在与“侵略者”战斗",
      badges: ["hot"],
      repost: false,
      summary:
        "上海永福路上的良友公寓变成了“魔都小众拍照打卡地”，来这里拍照变成流量法宝，有人开始不择手段闯进楼里。\n住在这里的居民们每天生活在担惊受怕中，生活变得一团糟。",
      highlights: null,
      industry_ids: [1010],
      organization: {
        id: 167,
        logo: null,
        name: "ＴＣＬ电子",
        state: "passed",
        fund_type_ids: [],
        organization_type_id: 6,
      },
      release_time: 1624966360,
      current_price: 0,
      original_price: 0,
      custom_sector_ids: [],
      has_article_speech: null,
      co_host_organizations: [],
    },
    topping: false,
    visible: false,
    source_id: 70501645,
    source_type: "Minute",
  },
  gotoScreen: () => {},
  index: 0,
};

const HotSectionBlock = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [is_first_layout, setIs_first_layout] = React.useState(true);
  const [newText, setNewText] = React.useState("");
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [type, setType] = React.useState("报名中");
  const getType = (Variables, a) => {
    switch (a) {
      case "Minute":
        //纪要
        return gf.t(Variables, "mine_note_collection");

        break;
      case "Article":
        //观点
        return gf.t(Variables, "tab_vote_point");
        break;
      case "Event":
        return gf.t(Variables, "tab_events");
        //活动
        break;
    }
    return a;
  };

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App.White,
          paddingBottom: 14,
          paddingTop: 14,
        },
        dimensions.width
      )}
    >
      {/* 活动 */}
      <View>
        {/* 标题和图片 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: "flex-start", flexDirection: "row" },
            dimensions.width
          )}
        >
          <Utils.CustomCodeErrorBoundary>
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    (props.dataItem ?? defaultProps.dataItem)?.source_type,
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Text
                accessible={true}
                selectable={false}
                onTextLayout={(e) => {
                  if (!is_first_layout) {
                    return;
                  }
                  setIs_first_layout(false);
                  const { lines } = e.nativeEvent;

                  if (lines.length > 2) {
                    const truncated = lines
                      .slice(0, 2)
                      .map((line) => line.text)
                      .join(" ");
                    const finalTruncatedText =
                      props.index < 3
                        ? truncated.slice(0, truncated.length - 5) + "..."
                        : truncated.slice(0, truncated.length - 2) + "...";
                    setNewText(" " + finalTruncatedText.split("|")[1]);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: "System",
                    fontSize: 16,
                    fontWeight: "600",
                    letterSpacing: 0.2,
                    lineHeight: 24,
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App["Custom Color 17"],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          (props.index ?? defaultProps.index) < 3
                            ? palettes.App["Custom Color 15"]
                            : palettes.App["Custom Color 16"],
                      },
                    ],
                  },
                  dimensions.width
                )}
              >
                {(props.index ?? defaultProps.index) + 1}
                {". "}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "600",
                      letterSpacing: 0.2,
                      lineHeight: 24,
                      lineHeight: 30,
                      color: palettes.App["Custom Color 17"],
                    },
                    dimensions.width
                  )}
                >
                  {getType(
                    Variables,
                    (props.dataItem ?? defaultProps.dataItem)?.source_type
                  )}
                  {"  |"}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "600",
                      letterSpacing: 0.2,
                      lineHeight: 24,
                      color: "#000000",
                      lineHeight: 30,
                    },
                    dimensions.width
                  )}
                  textBreakStrategy={"highQuality"}
                >
                  {newText
                    ? newText
                    : "  " +
                      (props.dataItem ?? defaultProps.dataItem)?.source?.title}
                </Text>
                <>
                  {!((props.index ?? defaultProps.index) < 3) ? null : (
                    <Icon
                      color={palettes.App["Custom Color 15"]}
                      name={"MaterialCommunityIcons/fire"}
                      size={20}
                    />
                  )}
                </>
                <>
                  {!((props.index ?? defaultProps.index) < 3) ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          fontFamily: "System",
                          fontSize: 16,
                          fontWeight: "700",
                          letterSpacing: 0.2,
                          lineHeight: 24,
                          color: palettes.App["Custom Color 15"],
                        },
                        dimensions.width
                      )}
                    >
                      {"HOT"}
                    </Text>
                  )}
                </>
              </Text>
            </Touchable>
          </Utils.CustomCodeErrorBoundary>
        </View>
      </View>
    </View>
  );
};

export default withTheme(HotSectionBlock);
