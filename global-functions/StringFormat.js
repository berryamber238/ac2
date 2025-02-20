const StringFormat = (sourceStr, args) => {
  return sourceStr.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
};

export default StringFormat;
