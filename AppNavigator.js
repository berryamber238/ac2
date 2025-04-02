import React from "react";
import { Icon, Touchable, useTheme } from "@draftbit/ui";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { I18nManager, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { systemWeights } from "react-native-typography";
import LinkingConfiguration from "./LinkingConfiguration";
import TabBarBlock from "./components/TabBarBlock";
import * as GlobalVariables from "./config/GlobalVariableContext";
import setUndefined from "./global-functions/setUndefined";
import t from "./global-functions/t";
import AIAssistantScreen from "./screens/AIAssistantScreen";
import AITranscribeDetailScreen from "./screens/AITranscribeDetailScreen";
import AITranslateDetailScreen from "./screens/AITranslateDetailScreen";
import AccountCancellationCheckScreen from "./screens/AccountCancellationCheckScreen";
import AccountCancellationReasonScreen from "./screens/AccountCancellationReasonScreen";
import AccountCancellationScreen from "./screens/AccountCancellationScreen";
import AccountCancellationSubmitScreen from "./screens/AccountCancellationSubmitScreen";
import ArticleDetailScreen from "./screens/ArticleDetailScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ChangeUserEmailScreen from "./screens/ChangeUserEmailScreen";
import ChangeUserPhoneScreen from "./screens/ChangeUserPhoneScreen";
import CompanyInfoScreen from "./screens/CompanyInfoScreen";
import CompanyListScreen from "./screens/CompanyListScreen";
import CreatePointScreen from "./screens/CreatePointScreen";
import CreateTopicScreen from "./screens/CreateTopicScreen";
import DailyUpdateScreen from "./screens/DailyUpdateScreen";
import DrawerNavScreen from "./screens/DrawerNavScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import HomeScreen from "./screens/HomeScreen";
import LiveScreen from "./screens/LiveScreen";
import LoginScreen from "./screens/LoginScreen";
import MessageCenterScreen from "./screens/MessageCenterScreen";
import MineAuthScreen from "./screens/MineAuthScreen";
import MineBuyArticleScreen from "./screens/MineBuyArticleScreen";
import MineBuyLiveScreen from "./screens/MineBuyLiveScreen";
import MineCountryCodeListScreen from "./screens/MineCountryCodeListScreen";
import MineIdentityInfoScreen from "./screens/MineIdentityInfoScreen";
import MineIndexScreen from "./screens/MineIndexScreen";
import MineMyFansScreen from "./screens/MineMyFansScreen";
import MineMyFavoritesDetail2Screen from "./screens/MineMyFavoritesDetail2Screen";
import MineMyFavoritesDetailScreen from "./screens/MineMyFavoritesDetailScreen";
import MineMyFavoritesScreen from "./screens/MineMyFavoritesScreen";
import MineMyFollowScreen from "./screens/MineMyFollowScreen";
import MineMyLikeScreen from "./screens/MineMyLikeScreen";
import MineMyPointScreen from "./screens/MineMyPointScreen";
import MineMyTopicScreen from "./screens/MineMyTopicScreen";
import MineSettingsScreen from "./screens/MineSettingsScreen";
import MineUserInfoScreen from "./screens/MineUserInfoScreen";
import OpinionInfoScreen from "./screens/OpinionInfoScreen";
import OrganizerScreen from "./screens/OrganizerScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchPageScreen from "./screens/SearchPageScreen";
import SettingAccountSafeScreen from "./screens/SettingAccountSafeScreen";
import SettingChangePasswordScreen from "./screens/SettingChangePasswordScreen";
import SettingUserPhoneScreen from "./screens/SettingUserPhoneScreen";
import SplashScreen from "./screens/SplashScreen";
import SpotlightDetailScreen from "./screens/SpotlightDetailScreen";
import VipInfoScreen from "./screens/VipInfoScreen";
import WebViewScreen from "./screens/WebViewScreen";
import palettes from "./themes/palettes";
import Breakpoints from "./utils/Breakpoints";
import useWindowDimensions from "./utils/useWindowDimensions";
import LoginPrompt from "./custom-files/LoginPrompt";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor, navigation }) {
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

function AI({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();

      navigation.navigate("BottomTabNavigator", {
        screen: "AI",
        params: { screen: "AIAssistantScreen" },
      });
    });

    return unsubscribe;
  }, [navigation]);

  const theme = useTheme();

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName="AIAssistantScreen"
      presentation="card"
      tabPressToInitialScreen={true}
      screenOptions={({ navigation }) => ({
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === "android" ? DefaultAndroidBackIcon : null,
        headerMode: "none",
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="AIAssistantScreen"
        component={AIAssistantScreen}
        options={({ navigation }) => ({
          title: "AI-Assistant",
        })}
      />
    </Stack.Navigator>
  );
}

function Company({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();

      navigation.navigate("BottomTabNavigator", {
        screen: "Company",
        params: { screen: "CompanyListScreen" },
      });
    });

    return unsubscribe;
  }, [navigation]);

  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  return (
    <Stack.Navigator
      initialRouteName="CompanyListScreen"
      tabPressToInitialScreen={true}
      screenOptions={({ navigation }) => ({
        cardStyle: { flex: 1, backgroundColor: palettes.App["Custom #ffffff"] },
        headerBackImage:
          Platform.OS === "android" ? DefaultAndroidBackIcon : null,
        headerMode: "none",
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="CompanyInfoScreen"
        component={CompanyInfoScreen}
        options={({ navigation }) => ({
          cardStyle: { backgroundColor: palettes.App["Custom #ffffff"] },
          title: "Company-Info",
        })}
      />
      <Stack.Screen
        name="CompanyListScreen"
        component={CompanyListScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: "Company-List",
        })}
      />
    </Stack.Navigator>
  );
}

function Home({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();

      navigation.navigate("BottomTabNavigator", {
        screen: "Home",
        params: { screen: "DrawerNavScreen" },
      });
    });

    return unsubscribe;
  }, [navigation]);

  const theme = useTheme();

  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <Stack.Navigator
      initialRouteName="DrawerNavScreen"
      presentation="card"
      tabPressToInitialScreen={true}
      screenOptions={({ navigation }) => ({
        animationEnabled: true,
        cardOverlayEnabled: true,
        cardStyle: { flex: 1 },
        gestureEnabled: true,
        headerBackImage:
          Platform.OS === "android" ? DefaultAndroidBackIcon : null,
        headerMode: "none",
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="DrawerNavScreen"
        component={DrawerNavScreen}
        options={({ navigation }) => ({
          title: "DrawerNav",
        })}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: "home",
          headerTransparent: false,
          title: "Home",
        })}
      />
      <Stack.Screen
        name="OrganizerScreen"
        component={OrganizerScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: "Organizer",
        })}
      />
      <Stack.Screen
        name="SpotlightDetailScreen"
        component={SpotlightDetailScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTintColor: palettes.App["Custom #ffffff"],
          title: "Spotlight-detail",
        })}
      />
    </Stack.Navigator>
  );
}

function Mine({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();

      navigation.navigate("BottomTabNavigator", {
        screen: "Mine",
        params: { screen: "MineIndexScreen" },
      });
    });

    return unsubscribe;
  }, [navigation]);

  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="MineIndexScreen"
      tabPressToInitialScreen={true}
      screenOptions={({ navigation }) => ({
        animationEnabled: true,
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === "android" ? DefaultAndroidBackIcon : null,
        headerMode: "none",
        headerShown: false,
        headerTransparent: false,
      })}
    >
      <Stack.Screen
        name="MineIndexScreen"
        component={MineIndexScreen}
        options={({ navigation }) => ({
          headerMode: "float",
          headerShown: false,
          headerStyle: { backgroundColor: "transparent" },
          headerTransparent: true,
          title: "Mine-index",
        })}
      />
      <Stack.Screen
        name="MineMyFavoritesDetail2Screen"
        component={MineMyFavoritesDetail2Screen}
        options={({ navigation }) => ({
          animationEnabled: true,
          gestureEnabled: true,
          title: "Mine-My-Favorites-Detail 2",
        })}
      />
      <Stack.Screen
        name="MineMyFavoritesScreen"
        component={MineMyFavoritesScreen}
        options={({ navigation }) => ({
          title: "Mine-My-Favorites",
        })}
      />
      <Stack.Screen
        name="MineSettingsScreen"
        component={MineSettingsScreen}
        options={({ navigation }) => ({
          animationEnabled: true,
          headerShown: false,
          title: "Mine-Settings",
        })}
      />
      <Stack.Screen
        name="MineUserInfoScreen"
        component={MineUserInfoScreen}
        options={({ navigation }) => ({
          title: "Mine-UserInfo",
        })}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const theme = useTheme();

  const safeAreaInsets = useSafeAreaInsets();

  const tabBarOrDrawerIcons = {
    Home: "AntDesign/home",
    Company: "Ionicons/search",
    AI: "MaterialCommunityIcons/ticket-confirmation",
    Mine: "Ionicons/person",
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={({ state, descriptors }) => {
        const mapRoute = (route) => {
          const descriptor = descriptors[route.key];
          return {
            name: route.name,
            label: descriptor.options.tabBarLabel ?? route.name,
            icon: tabBarOrDrawerIcons[route.name] ?? "",
          };
        };
        const routes = state.routes.map(mapRoute);
        const currentRoute = mapRoute(
          state.routes.find((_, index) => index === state.index)
        );
        return (
          <View style={{ marginBottom: safeAreaInsets.bottom }}>
            <TabBarBlock routes={routes} currentRoute={currentRoute} />
          </View>
        );
      }}
      backBehavior="history"
      screenOptions={({ navigation }) => ({
        headerMode: "screen",
        headerShown: false,
        headerStyle: { backgroundColor: "transparent" },
        headerTransparent: true,
        tabBarActiveBackgroundColor: 'theme.colors["White"]',
        tabBarInactiveBackgroundColor: 'theme.colors["White"]',
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: theme.typography.custom22,
        tabBarStyle: {
          backgroundColor: palettes.App.White,
          borderTopColor: "transparent",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon name="AntDesign/home" size={25} color={color} />
          ),
          tabBarLabel: "首页",
          title: "Home",
        })}
      />
      <Tab.Screen
        name="Company"
        component={Company}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Ionicons/search" size={25} color={color} />
          ),
          tabBarLabel: "公司",
          title: "Company",
        })}
      />
      <Tab.Screen
        name="AI"
        component={AI}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/ticket-confirmation"
              size={25}
              color={color}
            />
          ),
          tabBarLabel: "AI助手",
          title: "AI",
        })}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Ionicons/person" size={25} color={color} />
          ),
          tabBarLabel: "我的",
          title: "Mine",
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  const dimensions = useWindowDimensions();

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.base,
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="SplashScreen"
        presentation="card"
        screenOptions={({ navigation }) => ({
          animationEnabled: true,
          cardStyle: {
            flex: 1,
            backgroundColor: palettes.App["Custom #ffffff"],
          },
          gestureEnabled: true,
          headerBackImage:
            Platform.OS === "android" ? DefaultAndroidBackIcon : null,
          headerMode: "screen",
          headerShown: false,
          headerStyle: {
            backgroundColor: palettes.App["Custom #ffffff"],
            borderBottomColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTransparent: true,
        })}
      >
        <Stack.Screen
          name="AITranscribeDetailScreen"
          component={AITranscribeDetailScreen}
          options={({ navigation }) => ({
            title: "AI-Transcribe-Detail",
          })}
        />
        <Stack.Screen
          name="AITranslateDetailScreen"
          component={AITranslateDetailScreen}
          options={({ navigation }) => ({
            title: "AI-Translate-Detail",
          })}
        />
        <Stack.Screen
          name="AccountCancellationCheckScreen"
          component={AccountCancellationCheckScreen}
          options={({ navigation }) => ({
            title: "Account-Cancellation-Check",
          })}
        />
        <Stack.Screen
          name="AccountCancellationReasonScreen"
          component={AccountCancellationReasonScreen}
          options={({ navigation }) => ({
            title: "Account-Cancellation-Reason",
          })}
        />
        <Stack.Screen
          name="AccountCancellationScreen"
          component={AccountCancellationScreen}
          options={({ navigation }) => ({
            title: "Account-Cancellation",
          })}
        />
        <Stack.Screen
          name="AccountCancellationSubmitScreen"
          component={AccountCancellationSubmitScreen}
          options={({ navigation }) => ({
            title: "Account-Cancellation-Submit",
          })}
        />
        <Stack.Screen
          name="ArticleDetailScreen"
          component={ArticleDetailScreen}
          options={({ navigation }) => ({
            animationEnabled: true,
            gestureDirection: "horizontal",
            gestureEnabled: true,
            headerShown: false,
            title: "Article-Detail",
          })}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Calendar",
          })}
        />
        <Stack.Screen
          name="ChangeUserEmailScreen"
          component={ChangeUserEmailScreen}
          options={({ navigation }) => ({
            title: "Change-User-email",
          })}
        />
        <Stack.Screen
          name="ChangeUserPhoneScreen"
          component={ChangeUserPhoneScreen}
          options={({ navigation }) => ({
            title: "Change-User-Phone",
          })}
        />
        <Stack.Screen
          name="CreatePointScreen"
          component={CreatePointScreen}
          options={({ navigation }) => ({
            animationEnabled: true,
            gestureEnabled: true,
            headerShown: false,
            title: "Create-Point",
          })}
        />
        <Stack.Screen
          name="CreateTopicScreen"
          component={CreateTopicScreen}
          options={({ navigation }) => ({
            title: "Create-Topic",
          })}
        />
        <Stack.Screen
          name="DailyUpdateScreen"
          component={DailyUpdateScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "DailyUpdate",
          })}
        />
        <Stack.Screen
          name="EventDetailScreen"
          component={EventDetailScreen}
          options={({ navigation }) => ({
            gestureEnabled: true,
            headerShown: false,
            title: "Event-Detail",
          })}
        />
        <Stack.Screen
          name="LiveScreen"
          component={LiveScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Live",
          })}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerMode: "screen",
            headerShown: false,
            headerStyle: { backgroundColor: "transparent" },
            headerTransparent: true,
            title: "Login",
          })}
        />
        <Stack.Screen
          name="MessageCenterScreen"
          component={MessageCenterScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "MessageCenter",
          })}
        />
        <Stack.Screen
          name="MineAuthScreen"
          component={MineAuthScreen}
          options={({ navigation }) => ({
            title: "Mine-Auth",
          })}
        />
        <Stack.Screen
          name="MineBuyArticleScreen"
          component={MineBuyArticleScreen}
          options={({ navigation }) => ({
            title: "Mine-Buy-Article",
          })}
        />
        <Stack.Screen
          name="MineBuyLiveScreen"
          component={MineBuyLiveScreen}
          options={({ navigation }) => ({
            title: "Mine-Buy-Live",
          })}
        />
        <Stack.Screen
          name="MineCountryCodeListScreen"
          component={MineCountryCodeListScreen}
          options={({ navigation }) => ({
            animationEnabled: true,
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? null : (
                <View
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                >
                  <Icon
                    name="AntDesign/arrowleft"
                    size={Platform.OS === "ios" ? 21 : 24}
                    color={palettes.App["Custom #d8d8d8"]}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </View>
              ),
            headerMode: "screen",
            headerShown: false,
            headerStyle: {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderBottomColor: "transparent",
            },
            headerTitle: " ",
            headerTransparent: false,
            title: "Mine-CountryCodeList",
          })}
        />
        <Stack.Screen
          name="MineIdentityInfoScreen"
          component={MineIdentityInfoScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Mine-IdentityInfo",
          })}
        />
        <Stack.Screen
          name="MineMyFansScreen"
          component={MineMyFansScreen}
          options={({ navigation }) => ({
            title: "Mine-My-Fans",
          })}
        />
        <Stack.Screen
          name="MineMyFavoritesDetailScreen"
          component={MineMyFavoritesDetailScreen}
          options={({ navigation }) => ({
            title: "Mine-My-Favorites-Detail",
          })}
        />
        <Stack.Screen
          name="MineMyFollowScreen"
          component={MineMyFollowScreen}
          options={({ navigation }) => ({
            title: "Mine-My-Follow",
          })}
        />
        <Stack.Screen
          name="MineMyLikeScreen"
          component={MineMyLikeScreen}
          options={({ navigation }) => ({
            title: "Mine-My-Like",
          })}
        />
        <Stack.Screen
          name="MineMyPointScreen"
          component={MineMyPointScreen}
          options={({ navigation }) => ({
            title: "Mine-MyPoint",
          })}
        />
        <Stack.Screen
          name="MineMyTopicScreen"
          component={MineMyTopicScreen}
          options={({ navigation }) => ({
            title: "Mine-MyTopic",
          })}
        />
        <Stack.Screen
          name="OpinionInfoScreen"
          component={OpinionInfoScreen}
          options={({ navigation }) => ({
            animationEnabled: true,
            cardOverlayEnabled: false,
            gestureEnabled: true,
            headerShown: false,
            title: "Opinion-Info",
          })}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Register",
          })}
        />
        <Stack.Screen
          name="SearchPageScreen"
          component={SearchPageScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "SearchPage",
          })}
        />
        <Stack.Screen
          name="SettingAccountSafeScreen"
          component={SettingAccountSafeScreen}
          options={({ navigation }) => ({
            title: "Setting-Account-Safe",
          })}
        />
        <Stack.Screen
          name="SettingChangePasswordScreen"
          component={SettingChangePasswordScreen}
          options={({ navigation }) => ({
            title: "Setting-Change-Password",
          })}
        />
        <Stack.Screen
          name="SettingUserPhoneScreen"
          component={SettingUserPhoneScreen}
          options={({ navigation }) => ({
            title: "Setting-User-Phone",
          })}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={({ navigation }) => ({
            title: "Splash",
          })}
        />
        <Stack.Screen
          name="VipInfoScreen"
          component={VipInfoScreen}
          options={({ navigation }) => ({
            title: "Vip-Info",
          })}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={({ navigation }) => ({
            animationEnabled: true,
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? null : (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/arrowleft"
                    size={Platform.OS === "ios" ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </Touchable>
              ),
            headerMode: "float",
            headerShown: false,
            headerStyle: {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderBottomColor: "transparent",
            },
            headerTintColor: palettes.Brand.appStyle_background,
            headerTitle: "APP隐私协议",
            headerTitleAlign: "center",
            headerTransparent: false,
            title: "WebView",
          })}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Bottom Tab Navigator",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
