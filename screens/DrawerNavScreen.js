import React from "react";
import { ScreenContainer, Touchable, withTheme } from "@draftbit/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Fetch } from "react-request";
import * as GlobalStyles from "../GlobalStyles.js";
import * as AceCampTestApi from "../apis/AceCampTestApi.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as DrawerNav from "../custom-files/DrawerNav";
import * as HttpClient from "../custom-files/HttpClient";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const DrawerNavScreen = (props) => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const gotoScreen = (screen, id) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    ///sdfsdf
    switch (screen) {
      case "LoginScreen":
        navigation.navigate("BottomTabNavigator", {
          screen: "Tickets",
          params: { screen: "LoginScreen" },
        });
        break;
      case "Article":
      case "Minute":
        navigation.push("ArticleDetailScreen", { article_info_id: id });
        break;
      case "Event":
        navigation.push("EventDetailScreen", { event_id: id });
        break;
      case "Spotlight":
        navigation.push("SpotlightDetailScreen", { spotlightId: id });
        break;
      case "Opinion":
        navigation.push("OpinionInfoScreen", { id: id });
        break;
      case "SearchPage":
        navigation.push("SearchPageScreen", {});
        break;
      case "Calendar":
        navigation.push("CalendarScreen", {});
        break;
      case "MessageCenter":
        navigation.push("MessageCenterScreen", {});
        break;
      case "DailyUpdate":
        navigation.push("DailyUpdateScreen", {});
        break;
    }
  };
  React.useEffect(() => {
    const getUserInfo = async () => {
      const url = HttpClient.apiEndpoints["me_info"];
      const response = await HttpClient.fetcher(url.url, url.method);
      const responseCookies = await AsyncStorage.getItem("cookies");
      const responseStr = await response.json();

      if (responseStr.code == 200 && responseStr.data) {
        setGlobalVariableValue({ key: "user_info", value: responseStr.data });
        setGlobalVariableValue({ key: "cookie", value: responseCookies });
        setGlobalVariableValue({ key: "is_login", value: true });
        setGlobalVariableValue({
          key: "is_vip",
          value: responseStr.data.has_vip,
        });
      } else {
        setGlobalVariableValue({ key: "is_login", value: false });
        setGlobalVariableValue({ key: "is_vip", value: false });
      }
    };

    getUserInfo();
  }, []);
  React.useEffect(() => {
    const handler = async () => {
      try {
        const result = (await AceCampTestApi.dimensionsGET(Constants))?.json;
        setGlobalVariableValue({
          key: "ace_dic",
          value: result,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);
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
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <DrawerNav.CustomDrawer
          gotoScreen={gotoScreen}
        ></DrawerNav.CustomDrawer>
      </Utils.CustomCodeErrorBoundary>
      {/* Fetch component: no endpoint configured */ null}
    </ScreenContainer>
  );
};

export default withTheme(DrawerNavScreen);
