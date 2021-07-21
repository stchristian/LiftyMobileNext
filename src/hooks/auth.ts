import auth from '@react-native-firebase/auth';
import {useCallback, useEffect} from 'react';
import {getMyRoutes} from 'src/api/callables';
import {getUserInfo} from 'src/api/firestore';
import {resetStore, setMyRoutes, setUser} from 'src/store/actionCreators';
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

export const useLoggedInUser = () => {
  return useAppSelector(state => state.user);
};
