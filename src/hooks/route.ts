import {useCallback, useMemo, useState, useEffect} from 'react';
import {addRoute, deleteRoute, updateRoute} from 'src/store/actionCreators';
import {
  addRoute as addRouteCallable,
  getMatches,
  deleteRoute as deleteRouteCallable,
} from 'src/api/callables';
import {useAppSelector, useAppDispatch} from './store';
import {getDirections} from 'src/api/google';
import {LatLng} from 'react-native-maps';
import {AddRouteRequest, Route} from 'lifty-types';
import {transformPolylineToCoordinatesFormat} from 'src/utils/route';

export const useAddRouteRequest = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    async (route: AddRouteRequest) => {
      const tmpId = Date.now().toString();
      dispatch(
        //@ts-ignore
        addRoute({
          _id: tmpId,
          ...route,
        }),
      );
      const addedRoute = await addRouteCallable(route);
      dispatch(updateRoute(tmpId, addedRoute));
    },
    [dispatch],
  );
};

export const useMyRoutes = () => {
  const routes = useAppSelector(state => state.routes);
  return routes;
};

export const useRoutePolyline = (
  sourcePlaceId?: any,
  destinationPlaceId?: any,
) => {
  const [polyline, setPolyline] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    if (sourcePlaceId && destinationPlaceId) {
      getDirections(sourcePlaceId, destinationPlaceId).then(data => {
        if ((data.status = 'OK' && data.routes.length === 1 && mounted)) {
          setPolyline(data.routes[0].overview_polyline.points);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [sourcePlaceId, destinationPlaceId]);

  return polyline;
};

export const useDecodedPolyline = (polyline: string | null) => {
  const [decodedPolyline, setDecodedPolyline] = useState<LatLng[] | null>(null);

  useEffect(() => {
    if (polyline) {
      setDecodedPolyline(transformPolylineToCoordinatesFormat(polyline));
    }
  }, [polyline]);
  return decodedPolyline;
};

export const useRouteById = (routeId?: string) => {
  const routes = useMyRoutes();

  return useMemo(
    () => routes.find(route => route._id === routeId) || null,
    [routes, routeId],
  );
};

export const useRouteMatches = (routeId: string) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    let mounted = true;
    if (routeId) {
      getMatches({
        routeId,
      }).then(result => {
        mounted && setRoutes(result);
      });
    }
    return () => {
      mounted = false;
    };
  }, [routeId]);
  return routes;
};

export const useDeleteRouteRequest = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (routeId: string) => {
      deleteRouteCallable({
        routeId,
      });
      dispatch(deleteRoute(routeId));
    },
    [dispatch],
  );
};
