import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, ViewStyle, Dimensions} from 'react-native';
import RNMapView from 'react-native-maps';
import mapStyle from '../assets/mapStyle.json';
import Screen from './Screen';

// export const Marker = ({ key, coordinate }) => {
//   return <Marker key={key} coordinate =/>
// }

const MapView = ({
  height = 200,
  style,
  children,
}: {
  height?: number;
  style?: ViewStyle;
  children?: any;
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width - 1);
  const [region, setRegion] = useState({
    latitude: 47.497913,
    longitude: 19.040236,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const mapRef = useRef<RNMapView>(null);
  useEffect(() => {
    if (children && mapRef.current) {
      mapRef.current.fitToElements(true);
    }
    return () => {};
  }, [children]);

  return (
    <RNMapView
      provider="google"
      style={{...styles.map, height, width, ...style}}
      customMapStyle={mapStyle}
      ref={mapRef}
      mapPadding={{
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      }}
      onMapReady={() => setWidth(width + 1)}
      initialRegion={region}>
      {children}
    </RNMapView>
  );
};

const styles = StyleSheet.create({
  map: {},
});

export default MapView;
