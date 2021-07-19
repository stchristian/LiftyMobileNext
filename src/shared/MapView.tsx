import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, ViewStyle, Dimensions} from 'react-native';
import RNMapView, {LatLng, Polyline} from 'react-native-maps';
import mapStyle from '../assets/mapStyle.json';
import {Route} from 'lifty-types';
import {transformPolylineToCoordinatesFormat} from 'src/utils/route';
// import {  } from "module";
// export const Marker = ({ key, coordinate }) => {
//   return <Marker key={key} coordinate =/>
// }

const padding = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};

export type RouteProp = {
  route: Route;
  color: string;
  strokeWidth?: number;
};

const MapView = ({
  height = 200,
  style,
  children,
  routes = [],
}: {
  height?: number;
  style?: ViewStyle;
  children?: any;
  routes?: RouteProp[];
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width - 1);
  const [region, setRegion] = useState({
    latitude: 47.497913,
    longitude: 19.040236,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const mapRef = useRef<RNMapView>(null);

  const polylineDataPoints = useMemo(() => {
    return routes.map(routeProp => ({
      decodedPolyline: transformPolylineToCoordinatesFormat(
        routeProp.route.polyline,
      ),
      color: routeProp.color,
      key: routeProp.route._id,
      strokeWidth: routeProp?.strokeWidth || 4,
    }));
  }, [routes]);

  useEffect(() => {
    if (polylineDataPoints && mapRef.current) {
      mapRef.current.fitToCoordinates(
        polylineDataPoints.reduce((coords, route) => {
          return [...coords, ...route.decodedPolyline];
        }, [] as LatLng[]),
      );
    }
  }, [polylineDataPoints]);

  return (
    <RNMapView
      provider="google"
      style={{...styles.map, height, width, ...style}}
      customMapStyle={mapStyle}
      ref={mapRef}
      mapPadding={padding}
      onMapReady={() => {
        setWidth(width + 1);
        setTimeout(() => {
          mapRef.current!.fitToElements(true);
        }, 100);
        // console.log(mapRef.current?.state, children);
      }}
      initialRegion={region}>
      {children}

      {polylineDataPoints.length > 0
        ? polylineDataPoints.map(dp => (
            <Polyline
              key={dp.key}
              coordinates={dp.decodedPolyline}
              strokeColor={dp.color}
              strokeWidth={dp.strokeWidth}
            />
          ))
        : null}
    </RNMapView>
  );
};

const styles = StyleSheet.create({
  map: {},
});

export default React.memo(MapView);
