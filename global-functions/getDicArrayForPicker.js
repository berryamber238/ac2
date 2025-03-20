const getDicArrayForPicker = dic => {
  const newDic = dic.map(item => ({
    label: item.name,
    value: item.id,
  }));

  debugger;
  return newDic;
};

export default getDicArrayForPicker;
