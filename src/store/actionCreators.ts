import {User} from 'src/types/User';
import {ADD_ROUTE, SET_USER} from './actions';

export function addRoute(route: any) {
  return {
    type: ADD_ROUTE,
    payload: route,
  };
}

export function setUser(user: User | null) {
  return {
    type: SET_USER,
    payload: user,
  };
}
