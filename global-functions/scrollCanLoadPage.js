const scrollCanLoadPage = (event) => {
  const offsetY = event.nativeEvent.contentOffset.y;
  const contentSize =
    event.nativeEvent.contentSize.height -
    event.nativeEvent.layoutMeasurement.height -
    50;

  if (offsetY > contentSize) {
    return false;
  }

  return true;
};

export default scrollCanLoadPage;
