import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type User = FirebaseAuthTypes.User & AdditionalUserInfo;
export type AdditionalUserInfo = {
  firstName: string;
  lastName: string;
};
