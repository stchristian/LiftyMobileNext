import {NativeModules} from 'react-native';
import {useCallback} from 'react';
const {TimePickerModule} = NativeModules;

export const useTimePicker = (callback: Function) => {
  return {
    showTimePicker: useCallback(
      (hour: number, minute: number) => {
        TimePickerModule.openTimePickerDialog(hour, minute, callback);
      },
      [callback],
    ),
  };
};
