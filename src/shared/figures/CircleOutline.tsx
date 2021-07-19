import React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from 'assets/colors';

const CircleOutline = ({color = Colors.ON_PRIMARY}: {color: string}) => {
  return (
    <Svg height="8" width="8" viewBox="0 0 8 8">
      <Circle cx="4" cy="4" r="3" stroke={color} strokeWidth={2} />
    </Svg>
  );
};

export default CircleOutline;
