// This import is required if you are defining react components in this module.
import React, { useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import FilterScreenBlock from "../components/FilterScreenBlock";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import useWindowDimensions from "../utils/useWindowDimensions";
import { DataContext } from "./DataContext";
import { SheetProvider } from "react-native-actions-sheet";
import "./sheets.js";
const Drawer = createDrawerNavigator();

export const CustomDrawer = React.forwardRef((props, ref) => {
  const drawerRef = useRef(null);
  const [sharedData, setSharedData] = React.useState({});
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [feedsId, setFeedsId] = React.useState();
  const [actionViewShown, setActionViewShown] = React.useState(false);

  const confirmFilter = (value) => {
    if (value) setSharedData(value);
  };
  const updatePosition = (value) => {
    if (value) setCurrentPosition(value);
  };
  const showActionView = (feedId, type) => {
    setFeedsId(feedId);
    setActionViewShown(true);
  };
  const gotoScreen = props.gotoScreen;
  React.useImperativeHandle(ref, () => ({
    openDrawer: () => {},
    closeDrawer: () => {},
  }));

  return (
    <>
      <DataContext.Provider
        value={{
          sharedData,
          confirmFilter,
          currentPosition,
          updatePosition,
          actionViewShown,
          feedsId,
          gotoScreen,
        }}
      >
        <NavigationContainer independent={true} ref={drawerRef}>
          <SheetProvider context="global">
            <Drawer.Navigator
              drawerContent={(props) => {
                return (
                  <DrawerContentScrollView>
                    <FilterScreenBlock {...props} />
                  </DrawerContentScrollView>
                );
              }}
              screenOptions={{
                drawerStyle: { width: "80%" },
                headerShown: false, // 隐藏头部信息
                drawerPosition: "right",
              }}
            >
              <Drawer.Screen
                name="EmptyScreen"
                component={HomeScreen}
                //initialParams={{ gotoScreen: props.gotoScreen}}
              />
            </Drawer.Navigator>
          </SheetProvider>
        </NavigationContainer>
      </DataContext.Provider>
    </>
  );
});
