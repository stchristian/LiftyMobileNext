import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Circle
        cx={16}
        cy={16}
        r={16}
        transform="rotate(-180 16 16)"
        fill="#E4F336"
      />
      <Path
        d="M27.2 15.36H5.76M11.52 21.12l-5.76-5.76 5.76-5.76"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
