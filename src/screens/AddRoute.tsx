import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from '../shared/TextInput';
import MapView from '../shared/MapView';
import {Button} from '../shared/Button';
import spacingStyles from '../assets/styles/spacing';
import {AddRouteProps} from '../navigation/Props';
import Header from 'shared/Header';
import Screen from 'shared/Screen';
import {Marker, Polyline} from 'react-native-maps';
import {Colors} from 'assets/colors';
import {useRoute} from 'hooks/';
import {useAddRouteRequest} from 'hooks/route';

export type AddRouteParams = {
  source?: any;
  destination?: any;
};

export const AddRouteScreen = React.memo(
  ({
    navigation,
    route: {
      params: {source, destination},
    },
  }: AddRouteProps) => {
    const [name, setName] = useState('');
    const route = useRoute(source?.place_id, destination?.place_id);
    const addRouteRequest = useAddRouteRequest();

    const handleSourceFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'source'});
    };

    const handleDestinationFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'destination'});
    };

    const handleAddRoute = useCallback(() => {
      addRouteRequest({
        id: Date.now(),
        name,
        origin: {
          placeId: source?.place_id,
          address: source?.formatted_address,
        },
        destination: {
          placeId: destination?.place_id,
          address: destination?.formatted_address,
        },
      });
      navigation.navigate('Tab', {screen: 'Profile', params: {}});
    }, [addRouteRequest, source, destination, name, navigation]);

    return (
      <Screen header={<Header title="Útvonal hozzáadása" />}>
        <MapView style={styles.map}>
          {source && (
            <Marker
              key={'orig'}
              coordinate={{
                latitude: source.geometry.location.lat,
                longitude: source.geometry.location.lng,
              }}
              pinColor={Colors.PRIMARY}
            />
          )}
          {destination && (
            <Marker
              key={'dest'}
              coordinate={{
                latitude: destination.geometry.location.lat,
                longitude: destination.geometry.location.lng,
              }}
              pinColor={Colors.PRIMARY}
            />
          )}
          {route && (
            <Polyline
              coordinates={route}
              strokeColor={Colors.PRIMARY}
              strokeWidth={6}
            />
          )}
        </MapView>
        <View style={{flex: 1}}>
          <TextInput
            label="Indulás"
            value={source?.formatted_address}
            style={spacingStyles.bottom}
            onFocus={handleSourceFocus}
          />
          <TextInput
            label="Érkezés"
            value={destination?.formatted_address}
            style={spacingStyles.bottom}
            onFocus={handleDestinationFocus}
          />
          <TextInput
            label="Név"
            value={name}
            style={spacingStyles.bottom}
            onChangeText={text => setName(text)}
          />
        </View>
        <Button text="Útvonal felvétele" size="big" onPress={handleAddRoute} />
      </Screen>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    ...spacingStyles.bottom,
    flex: 1,
    marginHorizontal: -16,
  },
});
