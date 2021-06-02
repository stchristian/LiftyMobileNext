import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {useCallback, useEffect} from 'react';
import {setUser} from 'src/store/actionCreators';
import {useAppDispatch, useAppSelector} from './store';

const authInstance = auth();

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  const onAuthStateChanged = useCallback(
    user => {
      dispatch(setUser(user));
    },
    [dispatch],
  );

  useEffect(() => {
    const subscriber = authInstance.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);
};

export const useAuthRedirect = () => {
  const navigation = useNavigation();
  const userSetAt = useAppSelector(state => state.userSetAt);
  const user = useAppSelector(state => state.user);
  return useCallback(() => {
    if (userSetAt && user) {
      navigation.navigate('Tab');
    } else if (userSetAt && user === null) {
      navigation.navigate('HomeStack', {screen: 'Login'});
    }
  }, [userSetAt, user, navigation]);
};

export const useLogin = () => {
  return useCallback((email: string, password: string) => {
    authInstance.signInWithEmailAndPassword(email, password);
  }, []);
};

export const useLogout = () => {
  return useCallback(() => {
    authInstance.signOut();
  }, []);
};
