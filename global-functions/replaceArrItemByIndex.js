const replaceArrItemByIndex = (arr, index, newValue) => {
  return arr.map((item, i) => (i === index ? newValue : item));
};

export default replaceArrItemByIndex;
