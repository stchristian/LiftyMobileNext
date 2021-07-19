import moment from 'moment';
import 'moment/locale/hu';
moment.locale('hu');

export function getTime(date: Date) {
  return moment(date.valueOf()).format('h:mm');
}

export function shortDateFormat(date: Date) {
  return moment(date.valueOf()).format('MMMM D');
}
