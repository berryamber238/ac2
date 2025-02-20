// This import is required if you are defining react components in this module.
import React from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
let confirmCallback;
export const setConfirmCallback = func => {
  confirmCallback = func;
};

export const callConfirm = v => {
  confirmCallback(v);
};

export const callCancel = setVariables => {
  setVariables({ key: 'label_picker_checkedall', value: false });
  setVariables({
    key: 'label_picker_current_selected_values',
    value: new Array(),
  });
  setVariables({ key: 'label_picker_current_selected_size', value: 0 });
  setVariables({ key: 'modal_cover_shown', value: false });
  setVariables({ key: 'label_picker_modal_shown', value: false });
};
