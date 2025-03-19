const containsUpperLowerDigit = str => {
  const hasUpperCase = /[A-Z]/.test(str);
  const hasLowerCase = /[a-z]/.test(str);
  const hasDigit = /\d/.test(str);

  return hasUpperCase && hasLowerCase && hasDigit;
};

export default containsUpperLowerDigit;
