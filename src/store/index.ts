import {createStore, combineReducers} from 'redux';
import reducer from './reducer';

// const rootReducer = combineReducers({
//   reducer,
// });

export const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
