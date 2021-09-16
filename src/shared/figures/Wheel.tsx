import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Wheel() {
  return (
    <Svg width={34} height={34} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        clipRule="evenodd"
        d="M28.484 19.087H33v-4.174h-4.518c-.29-1.206-.766-3.034-1.395-4.065l3.194-3.193-3.936-3.936-3.195 3.194c-1.03-.629-2.857-1.103-4.063-1.394V1h-4.174v4.519c-1.206.29-3.034.765-4.064 1.394L7.653 3.719 3.717 7.655l3.196 3.194c-.629 1.03-1.105 2.858-1.397 4.064H1v4.174h4.516c.292 1.206.768 3.034 1.397 4.064l-3.196 3.196 3.936 3.934 3.195-3.195c1.03.63 2.859 1.106 4.065 1.398V33h4.174v-4.516c1.206-.292 3.034-.768 4.063-1.397l3.197 3.194 3.934-3.934-3.194-3.196c.629-1.03 1.105-2.858 1.397-4.064v0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M23.26 17a6.26 6.26 0 11-12.52 0 6.26 6.26 0 0112.52 0v0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Wheel;
