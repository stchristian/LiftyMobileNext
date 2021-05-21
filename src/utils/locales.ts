import {DateObject} from 'react-native-calendars';

export const hu = {
  date: {
    monthNames: [
      'Január',
      'Február',
      'Március',
      'Április',
      'Május',
      'Június',
      'Július',
      'Augusztus',
      'Szeptember',
      'Október',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Febr',
      'Márc',
      'Ápr',
      'Máj',
      'Jún',
      'Júl',
      'Aug',
      'Szept',
      'Okt',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Hétfő',
      'Kedd',
      'Szerda',
      'Csütörtök',
      'Péntek',
      'Szombat',
      'Vasárnap',
    ],
    dayNamesShort: ['H', 'K', 'Sze', 'CS', 'P', 'Szo', 'V'],
    today: 'Ma',
  },
};

export function shortDateFormat(date: Date) {
  return `${hu.date.monthNames[date.getMonth()]} ${date.getDay()}.`;
}

export function time(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}
