import React from 'react';
import {View, Text} from 'react-native';
import screenStyles from '../assets/styles/screen';
import fontStyles from '../assets/styles/font';
import spacingStyles from '../assets/styles/spacing';
const Community = () => {
  return (
    <View style={screenStyles.default}>
      <Text style={(fontStyles.title_xl, spacingStyles.bottom_l)}>
        {' '}
        Közösségek
      </Text>
      <Text style={{...fontStyles.default}}>Válassz útvonalatv</Text>
    </View>
  );
};

export default Community;
