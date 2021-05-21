import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import RNMapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../assets/mapStyle.json';

const MapView = ({
  height = 200,
  style,
}: {
  height?: number;
  style?: ViewStyle;
}) => {
  return (
    <RNMapView
      provider={PROVIDER_GOOGLE}
      style={{...styles.map, height, ...style}}
      customMapStyle={mapStyle}
      region={{
        latitude: 47.497913,
        longitude: 19.040236,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {},
});

export default MapView;
