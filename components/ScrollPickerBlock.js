import React from "react";
import { Button, Divider, Touchable, withTheme } from "@draftbit/ui";
import { Modal, Text, View } from "react-native";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import * as ScrollPicker from "../custom-files/ScrollPicker";
import * as gf from "../custom-files/gf";
import ScrollPickerConfirmBtnPress from "../global-functions/ScrollPickerConfirmBtnPress";
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import useWindowDimensions from "../utils/useWindowDimensions";

const defaultProps = { id: null };

const ScrollPickerBlock = (props) => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [bottom_sheet_shown, setBottom_sheet_shown] = React.useState(false);
  const [scroll_picker_modal_style, setScroll_picker_modal_style] =
    React.useState({});
  const CheckedAllItem = (Variables, checkedValue) => {
    if ((checkedValue.length = Variables["pickupDic"].length)) {
      return true;
    }
    return false;
  };

  const SetPickupDataSource = (
    Variables,
    setGlobalVariableValue,
    dataSourceName
  ) => {
    setCurrentPickupType(dataSourceName);
    Variables.pickupDic = Variables[dataSourceName];
  };

  const changeBgStyle = (id) => {};

  const changeTextStyle = (id) => {
    if (multiSelectPickerValue.includes(id)) {
      return "#2B33E6FF";
    }
    return "#596A7A";
  };

  const confirmPickup = (Variables) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    const fullData = Variables["pickupDic"];
    const text = multiSelectPickerValue
      .map((id) => {
        let item = fullData.find((element) => element.id === id);
        return item ? item.sc_name : "";
      })
      .filter((sc_name) => sc_name !== "")
      .join("、");

    switch (currentPickupType) {
      case "industries":
        setIndustryIds(multiSelectPickerValue);
        setIndustryText(text);
        break;
      case "ticker_regions":
        setRegionIds(multiSelectPickerValue);
        setRegionText(text);
        break;
    }
  };

  const initScrollPickerSetting = (Variables, setGlobalVariableValue) => {
    const data = {
      data: [
        { id: 1, name: trans.t(Variables, "tab_point_nick_name") },
        { id: 2, name: trans.t(Variables, "tab_point_real_name") },
      ],
    };
    setGlobalVariableValue({
      key: "scroll_picker_current_selected_index",
      value: fd_showReal ? 1 : 0,
    });
    setGlobalVariableValue({
      key: "scroll_picker_modal_title",
      value: trans.t(Variables, "tab_point_set_first"),
    });
    setGlobalVariableValue({ key: "scroll_picker_modal_data", value: data });
    setGlobalVariableValue({ key: "scroll_picker_modal_shown", value: true });

    //设定滚动选择器Modal的确认回调
    ScrollPicker.setConfirmCallback(() => {
      const selectIndex = Variables["scroll_picker_current_selected_index"];
      if (selectIndex !== -1) {
        switch (selectIndex) {
          case 0:
            setFt_realText("刘伟巍");
            setFd_showReal(true);
            break;
          case 1:
            setFt_realText("虚拟身份(用户132435235)");
            setFd_showReal(false);
            break;
        }
      }
      setGlobalVariableValue({
        key: "scroll_picker_current_selected_index",
        value: -1,
      });
      setGlobalVariableValue({ key: "scroll_picker_modal_title", value: "" });
      setGlobalVariableValue({ key: "scroll_picker_modal_data", value: {} });
      setGlobalVariableValue({
        key: "scroll_picker_modal_shown",
        value: false,
      });
    });
  };

  const onPickerupItemClick = (Variables, setGlobalVariableValue, id) => {
    if (multiSelectPickerValue.includes(id)) {
      let newArr = multiSelectPickerValue.filter((item) => item !== id);

      multiSelectPickerValue.splice(0, multiSelectPickerValue.length);
      multiSelectPickerValue.push(...newArr);
      setMultiSelectPickerValue(multiSelectPickerValue);
    } else {
      multiSelectPickerValue.push(id);
      setMultiSelectPickerValue(multiSelectPickerValue);
    }
    if (multiSelectPickerValue.length === Variables["pickupDic"].length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
    return multiSelectPickerValue.length;
  };

  const onPressSelectAll = (Variables, isChecked) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    multiSelectPickerValue.splice(0, multiSelectPickerValue.length);
    if (isChecked) {
      multiSelectPickerValue.push(
        ...Variables["pickupDic"].map((item) => item.id)
      );
    }
    setMultiSelectPickerValue(multiSelectPickerValue);
    setMultiSelectionSize(multiSelectPickerValue.length);
  };

  return (
    <View>
      {/* Cover Modal */}
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        animationType={"fade"}
        presentationStyle={"overFullScreen"}
        transparent={true}
        visible={
          Constants["user_info_edit_status"] &&
          (bottom_sheet_shown || Constants["scroll_picker_modal_shown"])
        }
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_greyscale_500,
              height: "100%",
              opacity: 0.45,
              width: "100%",
            },
            dimensions.width
          )}
        />
      </Modal>
      {/* Scroll Picker Modal */}
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        {...GlobalStyles.ModalStyles(theme)["Modal"].props}
        animationType={"slide"}
        presentationStyle={"overFullScreen"}
        style={StyleSheet.applyWidth(
          GlobalStyles.ModalStyles(theme)["Modal"].style,
          dimensions.width
        )}
        transparent={true}
        visible={
          Constants["user_info_edit_status"] &&
          Constants["scroll_picker_modal_shown"]
        }
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: "scroll_picker_modal_shown",
                value: false,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            {
              height: [
                { minWidth: Breakpoints.Mobile, value: "40%" },
                {
                  minWidth: Breakpoints.Mobile,
                  value: scroll_picker_modal_style?.coverHeight,
                },
              ],
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, opacity: 0, width: "100%" },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_white,
              flexDirection: "column",
              height: [
                { minWidth: Breakpoints.Mobile, value: "60%" },
                {
                  minWidth: Breakpoints.Mobile,
                  value: scroll_picker_modal_style?.height,
                },
              ],
              width: "100%",
            },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Cancel Btn */}
            <Button
              accessible={true}
              iconPosition={"left"}
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: "scroll_picker_modal_shown",
                    value: false,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)["Cancel Btn"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)["Cancel Btn"].style,
                  { color: palettes.App.appStyle_greyscale_500 }
                ),
                dimensions.width
              )}
              title={`${t(Variables, "common_cancel")}`}
            />
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["Body S Medium"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["Body S Medium"].style,
                  { flex: null }
                ),
                dimensions.width
              )}
            >
              {Constants["scroll_picker_modal_title"]}
            </Text>
            {/* Confirm Btn */}
            <Button
              accessible={true}
              iconPosition={"left"}
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: "scroll_picker_modal_shown",
                    value: false,
                  });
                  ScrollPickerConfirmBtnPress(Variables);
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)["Confirm Btn"].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.ButtonStyles(theme)["Confirm Btn"].style,
                dimensions.width
              )}
              title={`${t(Variables, "common_yes")}`}
            />
          </View>
          <Divider
            color={theme.colors.border.base}
            {...GlobalStyles.DividerStyles(theme)["Divider"].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.DividerStyles(theme)["Divider"].style,
              dimensions.width
            )}
          />
          <Utils.CustomCodeErrorBoundary>
            <ScrollPicker.picker />
          </Utils.CustomCodeErrorBoundary>
        </View>
      </Modal>
    </View>
  );
};

export default withTheme(ScrollPickerBlock);
