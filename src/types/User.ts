export type User = {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
} & AdditionalUserInfo;

export type AdditionalUserInfo = {
  firstName: string;
  lastName: string;
};
