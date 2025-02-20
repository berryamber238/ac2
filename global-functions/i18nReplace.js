const i18nReplace = (str, typeStr, dataStr) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  typeStr.forEach((item, index) => {
    str = str.replace(item, dataStr[index]);
  });

  return str;
};

export default i18nReplace;
