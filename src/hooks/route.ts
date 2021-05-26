import {useCallback} from 'react';
import {addRoute} from 'src/store/actionCreators';
import {useAppSelector, useAppDispatch} from './store';

export const useAddRouteRequest = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (newRoute: any) => {
      dispatch(addRoute(newRoute));
    },
    [dispatch],
  );
};

export const useMyRoutes = () => {
  const routes = useAppSelector(state => state.routes);
  return routes;
};
