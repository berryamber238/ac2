import React, { Component, createRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
} from "react-native";

import { CSS } from "./CSS";

export default class Picker extends Component {
  constructor(props) {
    super(props);
    let data = props.data;
    this.onScrollCount = 0;
    this.state = {
      data: data,
    };
    this._ScrollView = createRef();
    this._ScrollView2 = createRef();
    this._h = 40;
  }

  setDataSource(data) {
    if (this._ScrollView.current) {
      this._ScrollView.current.scrollTo({ y: 0, animated: false });
    }
    this.setState({ data: data });
  }

  getItem(size) {
    if (this.state.data.length == 0) {
      return false;
    }

    let arr = this.state.data;
    return arr.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            height: this._h,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: size == "big" ? CSS.pixel(36) : CSS.pixel(28),
              color: size == "big" ? "#4a4a4a" : "#a0a0a0",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            {this.props.name ? item[this.props.name] : item}
          </Text>
        </View>
      );
    });
  }

  _onScrollEndDrag(e) {
    let y = e.nativeEvent.contentOffset.y;
    console.log(y);
    let onScrollEndDragCount = this.onScrollCount;
    let start = Date.now();
    if (this.fixInterval) {
      clearInterval(this.fixInterval);
    }
    this.fixInterval = setInterval(
      () => this._timeFix(start, y, onScrollEndDragCount),
      10
    );
  }

  _timeFix(start, y, onScrollEndDragCount) {
    let now = Date.now();
    let end = 200;
    if (now - start > end) {
      clearInterval(this.fixInterval);
      if (onScrollEndDragCount == this.onScrollCount) {
        this._onScrollEnd(y);
      }
    }
  }

  _onMomentumScrollEnd(e) {
    let y = e.nativeEvent.contentOffset.y;
    this._onScrollEnd(y);
  }

  _onScroll(e) {
    this.onScrollCount++;
    let y = e.nativeEvent.contentOffset.y;
    if (this._ScrollView2.current) {
      this._ScrollView2.current.scrollTo({ y: y, animated: false });
    }
  }

  _onScrollEnd(y) {
    let y1 = y - (y % this._h);
    if (y % this._h > this._h / 2) {
      y1 = y1 + this._h;
    }
    let index = y1 / this._h;
    if (this._ScrollView.current) {
      this._ScrollView.current.scrollTo({ y: y1, animated: false });
    }
    if (this.props.onRowChange) {
      this.props.onRowChange(index);
    }
  }

  _selectTo(index) {
    let y = index * this._h;
    if (this._ScrollView.current) {
      this._ScrollView.current.scrollTo({ y, animated: false });
    }
  }

  componentDidMount() {
    if (this.props.selectTo) {
      this._selectTo(this.props.selectTo);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 125, backgroundColor: "#ffffff" }}>
          <ScrollView
            bounces={false}
            onScrollEndDrag={(e) => {
              this._onScrollEndDrag(e);
            }}
            onMomentumScrollEnd={(e) => {
              this._onMomentumScrollEnd(e);
            }}
            onScroll={(e) => {
              this._onScroll(e);
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ref={this._ScrollView}
          >
            <View style={{ height: 50 }} />
            {this.getItem("small")}
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
        <View
          style={{
            height: this._h,
            marginTop: -80,
            backgroundColor: "#ffffff",
          }}
          pointerEvents="none"
        >
          <View style={{ height: CSS.pixel(1), backgroundColor: "#a2a2a2" }} />
          <ScrollView
            style={{ backgroundColor: "#CCCCCC" }}
            showsVerticalScrollIndicator={false}
            ref={this._ScrollView2}
          >
            {this.getItem("big")}
          </ScrollView>
          <View style={{ height: CSS.pixel(1), backgroundColor: "#dddddd" }} />
        </View>
        <View style={{ height: 100 }} pointerEvents="none" />
      </View>
    );
  }
}
