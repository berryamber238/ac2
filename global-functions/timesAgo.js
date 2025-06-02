import * as gf from '../custom-files/gf';

const timesAgo = (Variables, date) => {
  const now = new Date();
  const secondsPast = (now.getTime() - new Date(date * 1000)) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)}秒前`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}分钟前`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)}小时前`;
  }
  if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 86400)}天前`;
  }
  return gf.fromUnixTimestamp(Variables, date, 'YYYY/MM/DD HH:mm');
};

export default timesAgo;
