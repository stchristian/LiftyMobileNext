import firestore from '@react-native-firebase/firestore';
import { AdditionalUserInfo } from 'src/types/User';

const instance = firestore();

export async function getUserInfo(uid: string) {
  const user = await instance.collection('users').doc(uid).get();
  return user.data() as AdditionalUserInfo;
}

export function addUserInfo(
  uid: string,
  data: {
    firstName: string;
    lastName: string;
  },
) {
  return instance.collection('users').doc(uid).set(data);
}

export async function updateUserInfo(
  uid: string,
  data: Partial<AdditionalUserInfo>,
) {
  await instance.collection('users').doc(uid).set(data, { merge: true });
  const user = await instance.collection('users').doc(uid).get();
  return user.data() as AdditionalUserInfo;
}
