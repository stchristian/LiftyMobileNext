import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import fontStyles from 'assets/styles/font';
export enum WayPointType {
  START,
  CONNECTING,
  END,
  SINGLE,
}

const CIRCLE_SIZE = '32';

type WaypointProps = {
  label: string;
};

export const StartWayPoint = ({label}: WaypointProps) => {
  return (
    <View style={styles.container}>
      <Svg height="40" width="20" viewBox="0 0 100 200">
        <Circle cx="50" cy="50" r="45" fill="black" />
        <Line
          x1="50"
          y1="95"
          x2="50"
          y2="200"
          stroke="black"
          strokeWidth="10"
        />
      </Svg>
      <Text style={styles.waypointLabel}>{label}</Text>
    </View>
  );
};

export const ConnectingWayPoint = () => {
  return (
    <Svg height="60" width="20" viewBox="0 0 100 300">
      <Line x1="50" y1="0" x2="50" y2="105" stroke="black" strokeWidth="5" />
      <Circle cx="150" cy="150" r="45" fill="black" />
      <Line x1="50" y1="195" x2="50" y2="300" stroke="black" strokeWidth="5" />
    </Svg>
  );
};

export const EndWayPoint = ({label}: WaypointProps) => {
  return (
    <View style={{...styles.container, ...styles.end}}>
      <Svg height="40" width="20" viewBox="0 0 100 200">
        <Line x1="50" y1="0" x2="50" y2="105" stroke="black" strokeWidth="10" />
        <Circle cx="50" cy="150" r="45" stroke="black" strokeWidth="10" />
      </Svg>
      <Text style={styles.waypointLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  end: {
    alignItems: 'flex-end',
  },
  waypointLabel: {
    ...fontStyles.default,
    marginLeft: 8,
  },
});
