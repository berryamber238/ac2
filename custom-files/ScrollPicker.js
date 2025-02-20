// This import is required if you are defining react components in this module.
import React from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
import Picker from './Picker.js';
import * as Province from './ChinaCityCode.json';
import * as G from '../config/GlobalVariableContext';
// Define and export your components as named exports here.

// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />
// let callbackMethod;
// const setCallbackMethod = (methodFunc) => {
//     callbackMethod = methodFunc
// }
let callbackMethod;
let data;
export const picker = ({ pickerData, selectTo }) => {
  const variables = G.useValues();
  const setGlobalVariable = G.useSetValue();

  data = pickerData ? pickerData : variables.scroll_picker_modal_data.data;

  // const data = Province.data;
  // const name = variables.current_lang==='CN'?'name':'en_name';
  //const callbackMethod = variables.scroll_picker_setting.callbackMethod;
  return (
    <Picker
      data={data.data ? data.data : data}
      name="name"
      selectTo={variables.scroll_picker_current_selected_index}
      onRowChange={index => {
        setGlobalVariable({
          key: 'scroll_picker_current_selected_index',
          value: index,
        });
      }}
    />
  );
};

export const setCallbackMethod = method => {
  callbackMethod = method;
};
let confirmFun;
export const setConfirmCallback = confirmCallbackFun => {
  confirmFun = confirmCallbackFun;
};

export const callConfirmCallback = v => {
  confirmFun(v, data);
};

export const callCancel = g => {
  g({ key: 'scroll_picker_modal_shown', value: false });
  g({ key: 'scroll_picker_modal_title', value: '' });
  g({ key: 'scroll_picker_modal_data', value: { data: [] } });
  g({ key: 'scroll_picker_current_selected_index', value: -1 });
};
