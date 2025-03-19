import React from "react";
import { Icon, ScreenContainer, Touchable, withTheme } from "@draftbit/ui";
import * as WebBrowser from "expo-web-browser";
import { Image, Modal, Text, View } from "react-native";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import palettes from "../themes/palettes";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import imageSource from "../utils/imageSource";
import useWindowDimensions from "../utils/useWindowDimensions";

const MineSettingsScreen = (props) => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [numberInputFour, setNumberInputFour] = React.useState("");
  const [numberInputOne, setNumberInputOne] = React.useState("");
  const [numberInputThree, setNumberInputThree] = React.useState("");
  const [numberInputTwo, setNumberInputTwo] = React.useState("");
  const [ticket_success_modal, setTicket_success_modal] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.Brand.appStyle_background },
        dimensions.width
      )}
    >
      {/* Main Content */}
      <View
        style={StyleSheet.applyWidth(
          {
            flex: 1,
            marginBottom: 120,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
          },
          dimensions.width
        )}
      >
        {/* Page Top */}
        <View
          {...GlobalStyles.ViewStyles(theme)["Page Top 6"].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)["Page Top 6"].style,
              { marginBottom: 24 }
            ),
            dimensions.width
          )}
        >
          {/* Back Icon View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: "center",
                height: 28,
                justifyContent: "center",
                marginRight: 16,
                width: 28,
              },
              dimensions.width
            )}
          >
            {/* Back Button Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Back Icon */}
              <Image
                resizeMode={"cover"}
                {...GlobalStyles.ImageStyles(theme)["Image"].props}
                source={imageSource(Images["ArrowLeft"])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)["Image"].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>
          </View>
          {/* Screen Title */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)["H4"].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)["H4"].style, {
                flex: 1,
                marginRight: 16,
              }),
              dimensions.width
            )}
          >
            {"通用设置"}
          </Text>
        </View>
        {/* Pin Section */}
        <View
          style={StyleSheet.applyWidth(
            { alignSelf: "auto", flex: 1, gap: 30 },
            dimensions.width
          )}
        >
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"账户安全"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"语言"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  await WebBrowser.openBrowserAsync("https://www.google.com");
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"服务协议"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 4 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"隐私政策"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 5 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"清除缓存"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 6 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Body XL Semibold"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Body XL Semibold"].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {"关于我们"}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={"Entypo/chevron-thin-right"}
                size={20}
              />
            </View>
          </Touchable>
        </View>
      </View>
      {/* Continue Button */}
      <View
        {...GlobalStyles.ViewStyles(theme)["Bottom Button"].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)["Bottom Button"].style,
          dimensions.width
        )}
      >
        {/* Button Touchable */}
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: "is_login",
                value: false,
              });
              if (navigation.canGoBack()) {
                navigation.popToTop();
              }
              navigation.replace("Mine");
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ width: "100%" }, dimensions.width)}
        >
          {/* Button View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderColor: palettes.Red[500],
                borderWidth: 1,
                height: 50,
                justifyContent: "center",
                paddingLeft: 18,
                paddingRight: 18,
                width: "100%",
              },
              dimensions.width
            )}
          >
            {/* Button Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["Body L Bold"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["Body L Bold"].style,
                  { color: palettes.Red[600] }
                ),
                dimensions.width
              )}
            >
              {"退出登录"}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(MineSettingsScreen);
