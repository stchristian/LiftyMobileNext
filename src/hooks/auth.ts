import auth from '@react-native-firebase/auth';
import {useCallback, useEffect, useState} from 'react';
import {getMyRoutes} from 'src/api/callables';
import {getUserInfo} from 'src/api/firestore';
import {resetStore, setMyRoutes, setUser} from 'src/store/actionCreators';
import {useAppDispatch, useAppSelector} from './store';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/user.addresses.read',
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '170915345517-9g5dpj8r44je0nh8f5renkcn0d14r54e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const authInstance = auth();

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const onAuthStateChanged = useCallback(
    async user => {
      console.log('AUTH STATE CHANGED', !!user);
      if (user === null) {
        return dispatch(setUser(null));
      }
      const [info, routes] = await Promise.all([
        getUserInfo(user.uid),
        getMyRoutes(),
      ]);

      dispatch(
        setUser({
          ...user,
          ...info,
        }),
      );
      dispatch(setMyRoutes(routes));
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

export const useGoogleSignin = () => {
  const [inProgress, setInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const signIn = useCallback(async () => {
    try {
      setInProgress(true);
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      setUserInfo(result);
      console.log('GOOGLE SIGNIN', result);
    } catch (error) {
      console.error(JSON.stringify(error));
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

  return [userInfo, inProgress, signIn];
};

export const useLoggedInUser = () => {
  return useAppSelector(state => state.user);
};
