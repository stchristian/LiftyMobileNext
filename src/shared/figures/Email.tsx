import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Email() {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        clipRule="evenodd"
        d="M21.5 17a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 17V8A1.5 1.5 0 014 6.5h16A1.5 1.5 0 0121.5 8v9z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 7l-9 7-9-7"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Email;
