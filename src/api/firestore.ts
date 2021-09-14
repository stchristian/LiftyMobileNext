import firestore from '@react-native-firebase/firestore';
import { User } from 'lifty-types';

const instance = firestore();

export async function getUser(uid: string) {
  const user = await instance.collection('users').doc(uid).get();
  return user.data() as User;
}

export function addUser(user: User) {
  return instance.collection('users').doc(user.uid).set(user);
}
