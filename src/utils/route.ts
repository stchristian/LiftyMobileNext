import {decode} from '@googlemaps/polyline-codec';

export function transformPolylineToCoordinatesFormat(polyline: string) {
  return decode(polyline).map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  }));
}
