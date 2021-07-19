import {decode} from '@googlemaps/polyline-codec';
import {LatLng} from 'react-native-maps';

export function transformPolylineToCoordinatesFormat(polyline: string) {
  return decode(polyline).map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  })) as LatLng[];
}
