import React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from 'assets/colors';

const CircleFill = ({fill = Colors.ON_PRIMARY}: {fill: string}) => {
  return (
    <Svg height="8" width="8" viewBox="0 0 8 8">
      <Circle cx="4" cy="4" r="4" fill={fill} />
    </Svg>
  );
};

export default CircleFill;
