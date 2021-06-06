import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/core';
import {useCallback, useEffect} from 'react';
import {getMyRoutes} from 'src/api/callables';
import {getUserInfo} from 'src/api/firestore';
import {setMyRoutes, setUser} from 'src/store/actionCreators';
import {useAppDispatch, useAppSelector} from './store';

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
      console.log(routes);

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

export const useAuthRedirect = () => {
  const userSetAt = useAppSelector(state => state.userSetAt);
  const user = useAppSelector(state => state.user);
  const navigation = useNavigation();

  return useCallback(() => {
    if (userSetAt && user) {
      navigation.dispatch(StackActions.replace('Tab'));
    } else if (userSetAt && user === null) {
      navigation.dispatch(StackActions.replace('HomeStack'));
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

export const useLoggedInUser = () => {
  return useAppSelector(state => state.user);
};
