const XDate = require('xdate');
const latinNumbersPattern = /[0-9]/g;

export function month(date) {
  const year = date.getFullYear(),
    month = date.getMonth();
  const days = new XDate(year, month + 1, 0).getDate();
  const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
  const lastDay = new XDate(year, month, days, 0, 0, 0, true);
  return fromTo(firstDay, lastDay);
}
function fromTo(a, b) {
  const days = [];
  let from = +a;
  const to = +b;
  for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
    days.push(new XDate(from, true));
  }
  return days;
}
export function page(date, firstDayOfWeek = 0, showSixWeeks = false) {
  debugger;
  const days = month(date);
  let before = [];
  let after = [];
  const fdow = (7 + firstDayOfWeek) % 7 || 7;
  const ldow = (fdow + 6) % 7;
  firstDayOfWeek = firstDayOfWeek || 0;
  const from = days[0].clone();
  const daysBefore = from.getDay();
  if (from.getDay() !== fdow) {
    from.addDays(-(from.getDay() + 7 - fdow) % 7);
  }
  const to = days[days.length - 1].clone();
  const day = to.getDay();
  if (day !== ldow) {
    to.addDays((ldow + 7 - day) % 7);
  }

  return [from, to];
}
export function isLTE(a, b) {
  if (a && b) {
    return a.diffDays(b) > -1;
  }
}
export function isGTE(a, b) {
  if (a && b) {
    return b.diffDays(a) > -1;
  }
}
