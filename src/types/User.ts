export type User = {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  phoneNumber: string | null;
} & AdditionalUserInfo;

export type AdditionalUserInfo = {
  firstName: string;
  lastName: string;
};
