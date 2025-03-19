const containsSpecialCharacters = str => {
  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // 使用正则表达式测试字符串
  return specialCharactersRegex.test(str);
};

export default containsSpecialCharacters;
