import { Route, User } from 'lifty-types';
import * as ActionTypes from './actions';

const createAction = <T extends keyof typeof ActionTypes, P>(
  type: T,
  payload?: P,
) => ({ type, payload: payload! });

export function addRoute(route: Route) {
  return createAction(ActionTypes.ADD_ROUTE, route);
}

export function setUser(user: User | null) {
  return createAction(ActionTypes.SET_USER, user);
}

export function setMyRoutes(routes: Route[]) {
  return createAction(ActionTypes.SET_MY_ROUTES, routes);
}

export function updateRoute(_id: string, partial: Partial<Route>) {
  return createAction(ActionTypes.UPDATE_ROUTE, {
    _id,
    partial,
  });
}

export function resetStore() {
  return createAction(ActionTypes.RESET_STORE);
}

export function deleteRoute(routeId: string) {
  return createAction(ActionTypes.DELETE_ROUTE, routeId);
}
