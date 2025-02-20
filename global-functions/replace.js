const replace = (source, regexString) => {
  if (regexString && source) {
    const regex = new RegExp(regexString, 'gi');
    const result = source.replace(regex, '');
    return result;
  }
  return source;
};

export default replace;
