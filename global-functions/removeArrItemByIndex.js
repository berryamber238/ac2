const removeArrItemByIndex = (arr, index) => {
  const newArray = [...arr];
  if (index > -1 && index < newArray.length) {
    newArray.splice(index, 1);
    return newArray;
  }
};

export default removeArrItemByIndex;
