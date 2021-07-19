import {
  firebase,
  FirebaseFunctionsTypes,
} from '@react-native-firebase/functions';
import {
  AddRouteRequest,
  AddRouteResponse,
  GetMatchesResponse,
  GetMyRoutesResponse,
  GetMatchesRequest,
  DeleteRouteRequest,
  DeleteRouteResponse,
} from 'lifty-types';

if (__DEV__) {
  firebase.functions().useFunctionsEmulator('http://192.168.0.7:5001');
}

const module: FirebaseFunctionsTypes.Module = firebase.functions();
export async function addRoute(route: AddRouteRequest) {
  const instance = module.httpsCallable('addRoute');
  const result = await instance(route);
  return result.data as AddRouteResponse;
}

export async function getMyRoutes() {
  const instance = module.httpsCallable('getMyRoutes');
  const result = await instance();
  return result.data as GetMyRoutesResponse;
}

export async function getMatches(request: GetMatchesRequest) {
  const instance = module.httpsCallable('getMatches');
  const result = await instance(request);
  return result.data as GetMatchesResponse;
}

export async function deleteRoute(request: DeleteRouteRequest) {
  const instance = module.httpsCallable('deleteRoute');
  const result = await instance(request);
  return result.data as DeleteRouteResponse;
}
