const removeEleFromArray = (arr, eleForDelete) => {
  return arr.filter(item => {
    return !arr.includes(eleForDelete);
  });
};

export default removeEleFromArray;
