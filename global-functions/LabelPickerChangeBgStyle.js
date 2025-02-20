const LabelPickerChangeBgStyle = (Variables, id) => {
  const selectedValues = Variables['label_picker_current_selected_values'];
  if (selectedValues.includes(id)) {
    return '#F1F6FA';
  }
  return '#F4F5F6';
};

export default LabelPickerChangeBgStyle;
