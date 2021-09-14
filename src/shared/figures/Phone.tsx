import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function Phone() {
  return (
    // @ts-ignore
    <Svg width={20} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={0.118}
        y={4.236}
        width={14}
        height={24}
        rx={2}
        transform="rotate(-15.087 .118 4.236)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.497 3.325l.364 1.351a1 1 0 001.226.706l5.391-1.454a1 1 0 00.705-1.225L10.82 1.35M9.838 24.608l5.633-1.519"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Phone;
