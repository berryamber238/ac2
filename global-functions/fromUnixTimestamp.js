import * as gf from '../custom-files/gf';

const fromUnixTimestamp = (Variables, ts, formatStr) => {
  const date = ts ? new Date(ts * 1000) : new Date();
  const format = formatStr ? formatStr : 'YYYY/MM/DD W HH:mm';
  const dayOfWeek = date.getDay();

  const map = {
    MM: ('0' + (date.getMonth() + 1)).slice(-2),
    DD: ('0' + date.getDate()).slice(-2),
    YYYY: date.getFullYear(),
    HH: ('0' + date.getHours()).slice(-2),
    mm: ('0' + date.getMinutes()).slice(-2),
    ss: ('0' + date.getSeconds()).slice(-2),
    W:
      dayOfWeek === 0
        ? gf.t(Variables, 'day_of_week_0')
        : dayOfWeek === 1
        ? gf.t(Variables, 'day_of_week_1')
        : dayOfWeek === 2
        ? gf.t(Variables, 'day_of_week_2')
        : dayOfWeek === 3
        ? gf.t(Variables, 'day_of_week_3')
        : dayOfWeek === 4
        ? gf.t(Variables, 'day_of_week_4')
        : dayOfWeek === 5
        ? gf.t(Variables, 'day_of_week_5')
        : gf.t(Variables, 'day_of_week_6'),
  };

  return format.replace(/MM|DD|YYYY|HH|mm|ss|W/gi, matched => map[matched]);
};

export default fromUnixTimestamp;
