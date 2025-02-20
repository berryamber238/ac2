const LabelPickerSelectAllPress = (
  Variables,
  setGlobalVariableValue,
  isChecked
) => {
  const selectedValues = Variables['label_picker_current_selected_values'];
  selectedValues.splice(0, selectedValues.length);
  if (isChecked) {
    selectedValues.push(
      ...Variables.ace_dic.data[Variables.label_picker_dic_name].map(
        item => item.id
      )
    );
  }

  setGlobalVariableValue({
    key: 'label_picker_current_selected_values',
    value: selectedValues,
  });

  return selectedValues.length;
};

export default LabelPickerSelectAllPress;
