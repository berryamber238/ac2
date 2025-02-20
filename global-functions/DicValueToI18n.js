import * as gf from '../custom-files/gf';

const DicValueToI18n = (Variables, inputObj) => {
  inputObj.name = gf.t(Variables, inputObj.name);

  inputObj.items.forEach(item => {
    item.value = gf.t(Variables, item.value);
  });

  return inputObj;
};

export default DicValueToI18n;
