const LabelPickerItemClick = (Variables, setGlobalVariableValue, id) => {
  const selectedValues = Variables['label_picker_current_selected_values'];

  if (selectedValues.includes(id)) {
    let newArr = selectedValues.filter(item => item !== id);
    selectedValues.splice(0, selectedValues.length);
    selectedValues.push(...newArr);
  } else {
    selectedValues.push(id);
  }
  setGlobalVariableValue(
    'label_picker_current_selected_values',
    selectedValues
  );

  if (
    selectedValues.length ===
    Variables.ace_dic.data[Variables.label_picker_dic_name].length
  ) {
    setGlobalVariableValue({ key: 'label_picker_checkedall', value: true });
  } else {
    setGlobalVariableValue({ key: 'label_picker_checkedall', value: false });
  }

  return selectedValues.length;
};

export default LabelPickerItemClick;
