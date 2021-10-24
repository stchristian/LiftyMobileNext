import firestore from '@react-native-firebase/firestore';
import { User } from 'lifty-types';
import config from 'src/config';

// if (__DEV__) {
//   console.log(typeof firestore().useEmulator);
//   firestore().useEmulator(config.EMULATOR_HOST, config.EMULATOR_FIRESTORE_PORT);
// }

const instance = firestore();

export async function getUser(uid: string) {
  const user = await instance.collection('users').doc(uid).get();
  return user.data() as User;
}

export function addUser(user: User) {
  return instance.collection('users').doc(user.uid).set(user);
}
export async function updateUser(uid: string, data: Partial<User>) {
  await instance.collection('users').doc(uid).set(data, { merge: true });
  const user = await instance.collection('users').doc(uid).get();
  return user.data() as User;
}
