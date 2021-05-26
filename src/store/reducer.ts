import {ADD_ROUTE} from './actions';
import {AnyAction} from 'redux';

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
};

export type StoreState = typeof initialState;

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
      };
    default:
      return state;
  }
}
