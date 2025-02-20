const LabelPickerChangeTextStyle = (Variables, id) => {
  if (Variables['label_picker_current_selected_values'].includes(id)) {
    return '#2B33E6FF';
  }
  return '#596A7A';
};

export default LabelPickerChangeTextStyle;
