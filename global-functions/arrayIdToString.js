import * as gf from '../custom-files/gf';

const arrayIdToString = (Variables, type, data, dot) => {
  let str = '';
  if (data === null) return '';
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 1) {
      str += gf.getNameById(Variables, type, data[i]);
    } else {
      str += gf.getNameById(Variables, type, data[i]) + dot;
    }
  }
  return str;
};

export default arrayIdToString;
