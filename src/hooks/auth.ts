import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { getMyRoutes } from 'src/api/callables';
import { addUserInfo, getUserInfo } from 'src/api/firestore';
import { resetStore, setMyRoutes, setUser } from 'src/store/actionCreators';
import { useAppDispatch, useAppSelector } from './store';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { User } from 'src/types/User';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '170915345517-9g5dpj8r44je0nh8f5renkcn0d14r54e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const authInstance = auth();

/**
 * This hooks should be called in a root component once. It listens to changes in firebase authentication state, and according to the change it updates user data in the store
 */
export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback =
    useCallback(
      async firebaseUser => {
        console.log('AUTH STATE CHANGED', !!firebaseUser);
        if (firebaseUser === null) {
          return dispatch(setUser(null));
        }
        //TODO: remove setTimout
        //When you first log in with google, firebase auth listener fires but the saving of additional data might not have been finished.
        // We wait a little here in order to save the addition user data to firebase
        setTimeout(async () => {
          const [info, routes] = await Promise.all([
            getUserInfo(firebaseUser.uid),
            getMyRoutes(),
          ]);

          const user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            displayName: firebaseUser.displayName,
          } as User;
          dispatch(
            setUser({
              ...user,
              ...info,
            }),
          );
          dispatch(setMyRoutes(routes));
        }, 1000);
      },
      [dispatch],
    );

  useEffect(() => {
    const subscriber = authInstance.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);
};

export const useLogin = () => {
  return useCallback((email: string, password: string) => {
    authInstance.signInWithEmailAndPassword(email, password);
  }, []);
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    authInstance.signOut();
    dispatch(resetStore());
  }, [dispatch]);
};

/**
 * Google auth works as follows:
 * 1) Initiate google signin (user has to choose which account he/she would like to sign in with)
 * 2) From 1) we got back an ID token. With this a credential is retrieved from firebase.
 * 3) We use this credential to sign in the user to firebase.
 */
export const useGoogleSignin = () => {
  const [inProgress, setInProgress] = useState(false);
  const signIn = useCallback(async () => {
    try {
      setInProgress(true);
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const { additionalUserInfo, user } = await auth().signInWithCredential(
        googleCredential,
      );
      if (additionalUserInfo?.isNewUser) {
        await addUserInfo(user.uid, {
          ...(additionalUserInfo.profile
            ? {
                lastName: additionalUserInfo.profile.family_name,
                firstName: additionalUserInfo.profile.given_name,
              }
            : {
                lastName: 'NO_DATA',
                firstName: 'NO_DATA',
              }),
        });
      }
    } catch (error) {
      console.log(error);
      //TODO: handle different error codes?!
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setInProgress(false);
    }
  }, []);

  return { inProgress, signIn };
};

export const useLoggedInUser = () => {
  return useAppSelector(state => state.user);
};
