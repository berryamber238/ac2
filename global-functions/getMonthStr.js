const getMonthStr = (Variables, month) => {
  if (Variables.current_lang === 'EN') {
    switch (month) {
      case '01':
        return 'Jan';
        break;
      case '02':
        return 'Feb';
        break;
      case '03':
        return 'Mar';
        break;
      case '04':
        return 'Apr';
        break;
      case '05':
        return 'May';
        break;
      case '06':
        return 'Jun';
        break;
      case '07':
        return 'Jul';
        break;
      case '08':
        return 'Aug';
        break;
      case '09':
        return 'Sep';
        break;
      case '10':
        return 'Oct';
        break;
      case '11':
        return 'Nov';
        break;
      case '12':
        return 'Dec';
        break;
    }
  } else {
    switch (month) {
      case '01':
        return '一月';
        break;
      case '02':
        return '二月';
        break;
      case '03':
        return '三月';
        break;
      case '04':
        return '四月';
        break;
      case '05':
        return '五月';
        break;
      case '06':
        return '六月';
        break;
      case '07':
        return '七月';
        break;
      case '08':
        return '八月';
        break;
      case '09':
        return '九月';
        break;
      case '10':
        return '十月';
        break;
      case '11':
        return '十一月';
        break;
      case '12':
        return '十二月';
        break;
    }
  }
};

export default getMonthStr;
