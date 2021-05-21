import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../shared/Button';
import screenStyles from '../assets/styles/screen';
const Profile = ({navigation}: any) => {
  const handleRequestNewRoute = () => {
    navigation.navigate('HomeStack', {screen: 'AddRoute'});
  };

  return (
    <View style={screenStyles.default}>
      <Text />
      <Button text="Új útvonal hozzáadása" onPress={handleRequestNewRoute} />
    </View>
  );
};

export default Profile;
