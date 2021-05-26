import {ADD_ROUTE} from './actions';

export function addRoute(route: any) {
  return {
    type: ADD_ROUTE,
    payload: route,
  };
}
