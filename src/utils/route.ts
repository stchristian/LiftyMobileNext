import { decode } from '@googlemaps/polyline-codec';
import { LatLng } from 'react-native-maps';
import {
  LatLngTuple,
  LngLatTuple,
  PointGeoJSON,
  LineStringGeoJSON,
  RouteGeoData,
} from 'lifty-types';
import * as turf from '@turf/turf';

export function transformPolylineToCoordinatesFormat(polyline: string) {
  return decode(polyline).map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  })) as LatLng[];
}

const swapCoordinates = <A, B>(coordinate: [A, B]) => {
  return [coordinate[1], coordinate[0]] as [B, A];
};

export const getRouteGeoData = (polyline: string) => {
  const decodedCoordinates = decode(polyline).map(coord =>
    swapCoordinates(coord as LatLngTuple),
  ) as LngLatTuple[];

  const origin = {
    type: 'Point',
    coordinates: decodedCoordinates[0],
  } as PointGeoJSON;

  const destination = {
    type: 'Point',
    coordinates: decodedCoordinates[decodedCoordinates.length - 1],
  } as PointGeoJSON;

  const lineString = {
    type: 'LineString',
    coordinates: decodedCoordinates,
  } as LineStringGeoJSON;

  //@ts-ignore
  const polygon = turf.buffer(lineString, 500, {
    units: 'meters',
  });

  return {
    origin,
    destination,
    points: lineString,
    //@ts-ignore
    polygon: turf.getGeom(polygon),
  } as RouteGeoData;
};
