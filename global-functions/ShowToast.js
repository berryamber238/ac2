import * as Toast from '../custom-files/Toast';

const ShowToast = (msg, position, type) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  Toast.showToast(msg, position, type);
};

export default ShowToast;
