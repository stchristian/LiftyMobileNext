import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function Person() {
  return (
    // @ts-ignore
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle
        cx={12}
        cy={7}
        r={4}
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 21v-1a7 7 0 00-7-7v0a7 7 0 00-7 7v1"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Person;
