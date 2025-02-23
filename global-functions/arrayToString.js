const arrayToString = data => {
  if (data === null) return '';
  let str = '';
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 1) {
      str += data[i];
    } else {
      str += data[i] + ', ';
    }
  }
  return str;
};

export default arrayToString;
