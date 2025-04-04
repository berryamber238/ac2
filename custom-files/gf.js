// This import is required if you are defining react components in this module.
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
import React from "react";
import t from "../global-functions/t";
import getNameById from "../global-functions/getNameById";
import crypto from "./crypto.js";
import { FontAwesome } from "react-native-vector-icons";
import { Text, Animated, TouchableOpacity, StatusBar } from "react-native";
import RenderHtml from "react-native-render-html";
import Markdown from "react-native-markdown-display";
import DropDownPicker from "react-native-dropdown-picker";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/MaterialIcons";
import ActionSheet, {
  useSheetRef,
  SheetManager,
  ActionSheetRef,
} from "react-native-actions-sheet";

export { CryptoJS, crypto };
export { t, getNameById, Buffer };
export { FontAwesome, Text };
export { Animated, RenderHtml, Markdown, DropDownPicker, TouchableOpacity };
export { actions, RichEditor, RichToolbar, Icon };
export { StatusBar, useSheetRef, ActionSheet, SheetManager, ActionSheetRef };
