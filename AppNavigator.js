import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import CartScreen from './screens/CartScreen';
import CategoryDetailViewRecommendedTabScreen from './screens/CategoryDetailViewRecommendedTabScreen';
import CategoryDetailViewTrendingTabScreen from './screens/CategoryDetailViewTrendingTabScreen';
import CategoryRecordDetailViewScreen from './screens/CategoryRecordDetailViewScreen';
import HomeScreen from './screens/HomeScreen';
import OrderCheckoutScreen from './screens/OrderCheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderPaymentMethodScreen from './screens/OrderPaymentMethodScreen';
import OrderVouchersScreen from './screens/OrderVouchersScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

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

function CheckoutFlowStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="OrderCheckoutScreen"
      screenOptions={({ navigation }) => ({
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerMode: 'none',
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="OrderCheckoutScreen"
        component={OrderCheckoutScreen}
        options={({ navigation }) => ({
          title: 'Order Checkout Screen',
        })}
      />
      <Stack.Screen
        name="OrderConfirmationScreen"
        component={OrderConfirmationScreen}
        options={({ navigation }) => ({
          title: 'Order Confirmation',
        })}
      />
      <Stack.Screen
        name="OrderPaymentMethodScreen"
        component={OrderPaymentMethodScreen}
        options={({ navigation }) => ({
          title: 'Order Payment Method Screen',
        })}
      />
      <Stack.Screen
        name="OrderVouchersScreen"
        component={OrderVouchersScreen}
        options={({ navigation }) => ({
          title: 'Order Vouchers Screen',
        })}
      />
    </Stack.Navigator>
  );
}

function CartNavigators() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerMode: 'none',
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({ navigation }) => ({
          title: 'Cart Screen',
        })}
      />
    </Stack.Navigator>
  );
}

function HomeNavigators() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ navigation }) => ({
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerMode: 'none',
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="CategoryDetailViewRecommendedTabScreen"
        component={CategoryDetailViewRecommendedTabScreen}
        options={({ navigation }) => ({
          title: 'Category Detail View Recommended Tab',
        })}
      />
      <Stack.Screen
        name="CategoryDetailViewTrendingTabScreen"
        component={CategoryDetailViewTrendingTabScreen}
        options={({ navigation }) => ({
          title: 'Category Detail View Trending Tab',
        })}
      />
      <Stack.Screen
        name="CategoryRecordDetailViewScreen"
        component={CategoryRecordDetailViewScreen}
        options={({ navigation }) => ({
          title: 'Category Record Detail View',
        })}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home Screen',
        })}
      />
    </Stack.Navigator>
  );
}

function PrimaryBottomNavigator() {
  const theme = useTheme();

  const tabBarOrDrawerIcons = {
    HomeNavigators: 'AntDesign/home',
    CartNavigators: 'AntDesign/shoppingcart',
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeNavigators"
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colors.background.brand,
        tabBarActiveTintColor: palettes.Brand.Shopping_Primary,
        tabBarInactiveBackgroundColor: theme.colors.background.brand,
        tabBarLabelStyle: theme.typography.custom15,
        tabBarStyle: { borderTopColor: 'transparent' },
      })}
    >
      <Tab.Screen
        name="HomeNavigators"
        component={HomeNavigators}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/home"
              size={25}
              color={focused ? palettes.Brand.Shopping_Primary : color}
            />
          ),
          tabBarLabel: 'Home',
          title: 'Home Navigators',
        })}
      />
      <Tab.Screen
        name="CartNavigators"
        component={CartNavigators}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/shoppingcart"
              size={25}
              color={focused ? palettes.Brand.Shopping_Primary : color}
            />
          ),
          tabBarLabel: 'Cart',
          title: 'Cart Navigators',
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

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
        initialRouteName="PrimaryBottomNavigator"
        screenOptions={({ navigation }) => ({
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerMode: 'none',
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="CheckoutFlowStack"
          component={CheckoutFlowStack}
          options={({ navigation }) => ({
            title: 'Checkout Flow Stack',
          })}
        />
        <Stack.Screen
          name="PrimaryBottomNavigator"
          component={PrimaryBottomNavigator}
          options={({ navigation }) => ({
            title: 'Primary Bottom Navigator',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
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
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
