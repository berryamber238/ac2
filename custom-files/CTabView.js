import * as React from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
} from "react-native";
import { Icon } from "@draftbit/ui";
import { TabView, SceneMap } from "react-native-tab-view";
import t from "../global-functions/t";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as DataContext from "./DataContext";

const createScene = (Component, props) => () => <Component {...props} />;

export class TabViewExample extends React.Component {
  getSceneObj = (sceneObj) => {
    let newSceneObj = {};
    console.log(sceneObj);
    for (const key in sceneObj) {
      if (sceneObj.hasOwnProperty(key)) {
        newSceneObj[key] = createScene(sceneObj[key], {
          setDataCount: this._handleDataCount,
          headers: this.props.headers,
          setIndex: this._handleIndexChange,
          gotoScreen: this.props.gotoScreen,
        });
      }
    }
    return newSceneObj;
  };
  state = {
    index: 0,
    routes: this.props.headers,
    dataCount: {},
  };

  _handleDataCount = (tabName, count) => {
    const newDataCount = Object.assign({}, this.state.dataCount);
    newDataCount[tabName] = count;
    this.setState({ dataCount: newDataCount });
  };
  _handleIndexChange = (index) => {
    if (this.props.updatePosition) {
      this.props.updatePosition(index);
    }
    this.setState({ index });
  };

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const Constants = GlobalVariables.useValues();
    const Variables = Constants;
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            // const color = props.position.interpolate({
            //   inputRange,
            //   outputRange: inputRange.map(inputIndex =>
            //     inputIndex === i ? '#2b33e6' : '#748593'
            //     // inputIndex === i ? 1: 0.5
            //   ),
            // });

            //             color={['#2b33e6' ,'#748593']}
            // fontSize={18}
            // iconIndex={1}
            // showFilter={true}
            const color =
              props.navigationState.index === i
                ? this.props.color[0]
                : this.props.color[1]; //'#2b33e6' : '#748593';
            return (
              <TouchableOpacity
                style={[
                  styles.tabItem,
                  styles.tabBar,
                  { padding: this.props.padding },
                ]}
                onPress={() => {
                  this.setState({ index: i });
                  this._handleIndexChange(i);
                }}
              >
                {i === this.props.iconIndex ? (
                  <Icon
                    color="#FF4C4C"
                    name={"MaterialCommunityIcons/fire"}
                    size={20}
                  />
                ) : null}
                <Animated.Text
                  style={{
                    color: color,
                    fontSize: this.props.fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {t(Variables, route.title)}{" "}
                  {this.state.dataCount ? this.state.dataCount[route.key] : ""}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!this.props.showFilter ? null : (
          <TouchableHighlight
            onPress={this.props.filterFunc}
            style={{ paddingRight: 20 }}
            underlayColor="white"
          >
            <Icon color="#2b33e6" name={"AntDesign/filter"} size={20} />
          </TouchableHighlight>
        )}
      </View>
    );
  };

  // _renderScene = ()=>{
  //   return SceneMap(this.props.scene)};
  _renderScene = SceneMap(this.getSceneObj(this.props.scene));
  // _renderScene =  ({ route }) => {
  //   return createScene(this.props.scene[route.key],{ setDataCount: 'Hello from FirstRoute' })
  // };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    alignItems: "center",
  },
});
