import React from 'react';
import {Text} from 'react-native';
import fontStyles from '../assets/styles/font';
import spacingStyles from '../assets/styles/spacing';
import Screen from 'shared/Screen';
const Community = () => {
  return (
    <Screen>
      <Text style={(fontStyles.title_xl, spacingStyles.bottom_l)}>
        {' '}
        Közösségek
      </Text>
      <Text style={{...fontStyles.normal}}>Válassz útvonalatv</Text>
    </Screen>
  );
};

export default Community;
