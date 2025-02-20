const splitList = (originalArray, size) => {
  const groupedArray = originalArray.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / size);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  }, []);

  return groupedArray;
};

export default splitList;
