import React from "react";
import { IconButton, withTheme } from "@draftbit/ui";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import palettes from "../themes/palettes";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { title: null };

const HeaderBlock = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
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

  return (
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
            {props.title ?? defaultProps.title}
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
  );
};

export default withTheme(HeaderBlock);
