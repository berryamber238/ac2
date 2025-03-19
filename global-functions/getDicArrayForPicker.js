const getDicArrayForPicker = (dic) => {
  const newDic = dic.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return newDic;
};

export default getDicArrayForPicker;
