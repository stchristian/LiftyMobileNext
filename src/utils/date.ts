import moment from 'moment';

export function getTime(date: Date) {
  return moment(date.valueOf()).format('h:mm');
}
