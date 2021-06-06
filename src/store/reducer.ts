import * as ActionTypes from './actions';
import {User} from 'src/types/User';
import {Route} from 'lifty-types';
import * as actionsCreators from './actionCreators';

const initialState = {
  routes: [] as Route[],
  user: null as User | null,
  userSetAt: null as Date | null,
};

type StoreState = typeof initialState;
type Actions = typeof actionsCreators;
type Action = ReturnType<Actions[keyof Actions]>;

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_MY_ROUTES:
      return {
        ...state,
        routes: action.payload,
      };

    case ActionTypes.UPDATE_ROUTE:
      return {
        ...state,
        routes: state.routes.map(route =>
          route._id === action.payload._id
            ? {
                ...route,
                ...action.payload.partial,
              }
            : route,
        ),
      };
    case ActionTypes.ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        userSetAt: new Date(),
      };
    default:
      return state;
  }
}
