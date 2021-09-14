import * as React from 'react';
import Svg, { Rect, Ellipse, Path, SvgProps } from 'react-native-svg';

function NoProfilePicture(props: SvgProps) {
  return (
    <Svg width={74} height={74} fill="none" {...props}>
      <Rect width={74} height={74} rx={37} fill="#E4F336" />
      <Ellipse
        cx={36.999}
        cy={29.329}
        rx={16.244}
        ry={15.793}
        stroke="#000"
        strokeWidth={2.193}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58.676 60.463c-5.43-6.111-13.133-9.927-21.676-9.927s-16.246 3.816-21.677 9.927M46.927 28.878c0 5.482-4.444 9.927-9.927 9.927-5.482 0-9.927-4.445-9.927-9.927"
        stroke="#000"
        strokeWidth={2.193}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default NoProfilePicture;
