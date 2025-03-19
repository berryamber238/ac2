const removeEleFromArray = (arr, eleForDelete) => {
  return arr.filter(item => {
    return item !== eleForDelete;
  });
};

export default removeEleFromArray;
