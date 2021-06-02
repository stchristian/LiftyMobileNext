import {ADD_ROUTE, SET_USER} from './actions';
import {AnyAction} from 'redux';
import {User} from 'src/types/User';

const initialState = {
  routes: [
    {
      destination: {
        address: 'Farkaslyuk, 3608 Magyarország',
        placeId: 'ChIJY1m1yZt_QEcRoIQeDCnEAAQ',
      },
      id: 1621889785978,
      name: 'Melóba',
      origin: {
        address: 'Ózd, Egyház völgy 2, 3600 Magyarország',
        placeId: 'ChIJTZSLsp6AP0cR3cPUG79_PyA',
      },
    },
  ] as any[],
  user: null as User | null,
  userSetAt: null as Date | null,
};

export type StoreState = typeof initialState;

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userSetAt: new Date(),
      };
    default:
      return state;
  }
}
