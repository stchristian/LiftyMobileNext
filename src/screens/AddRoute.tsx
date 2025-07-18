import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {TextInput} from '../shared/TextInput';
import MapView from '../shared/MapView';
import {Button} from '../shared/Button';
import spacingStyles from '../assets/styles/spacing';
import {AddRouteProps} from '../navigation/Props';
import Header from 'shared/Header';
import Screen from 'shared/Screen';
import {Marker, Polyline} from 'react-native-maps';
import {Colors} from 'assets/colors';
import {
  useAddRouteRequest,
  useDecodedPolyline,
  useDeleteRouteRequest,
  useRouteById,
  useRoutePolyline,
} from 'hooks/route';
import {StackActions} from '@react-navigation/routers';
import spacing from '../assets/styles/spacing';
import font from 'assets/styles/font';
import utilities from 'assets/styles/utilities';

export type AddRouteParams = {
  source?: any;
  destination?: any;
  routeId?: string;
};

export const AddRouteScreen = React.memo(
  ({
    navigation,
    route: {
      params: {routeId, source, destination},
    },
  }: AddRouteProps) => {
    const routeToEdit = useRouteById(routeId);
    const inEditMode = !!routeToEdit;

    console.debug('Add Route Render', navigation.isFocused());

    useEffect(() => {
      console.debug('Add Route mounted');
      return () => {
        console.debug('Add route unmounted');
      };
    }, []);

    const [name, setName] = useState(inEditMode ? routeToEdit!.name : '');

    const polyline = useRoutePolyline(source?.place_id, destination?.place_id);
    const decodedPolyline = useDecodedPolyline(
      polyline ?? (inEditMode ? routeToEdit!.polyline : null),
    );

    const addRouteRequest = useAddRouteRequest();
    const deleteRouteRequest = useDeleteRouteRequest();

    const originAddress = useMemo(
      () =>
        source
          ? source.formatted_address
          : routeToEdit
          ? routeToEdit.originAddress
          : '',
      [source, routeToEdit],
    );

    const destinationAddress = useMemo(
      () =>
        destination
          ? destination.formatted_address
          : routeToEdit
          ? routeToEdit.destinationAddress
          : '',
      [destination, routeToEdit],
    );

    const originCoordinate = useMemo(() => {
      if (source) {
        return {
          latitude: source.geometry.location.lat,
          longitude: source.geometry.location.lng,
        };
      }
      if (routeToEdit) {
        const {
          geoData: {
            origin: {coordinates},
          },
        } = routeToEdit;
        return {
          latitude: coordinates[1],
          longitude: coordinates[0],
        };
      }
      return null;
    }, [routeToEdit, source]);

    const destinationCoordinate = useMemo(() => {
      if (destination) {
        return {
          latitude: destination.geometry.location.lat,
          longitude: destination.geometry.location.lng,
        };
      }
      if (routeToEdit) {
        const {
          geoData: {
            destination: {coordinates},
          },
        } = routeToEdit;
        return {
          latitude: coordinates[1],
          longitude: coordinates[0],
        };
      }
      return null;
    }, [routeToEdit, destination]);

    const handleSourceFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'source'});
    };

    const handleDestinationFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'destination'});
    };

    const handleAddRoute = useCallback(async () => {
      addRouteRequest({
        name,
        originAddress: source?.formatted_address,
        destinationAddress: destination?.formatted_address,
        originGooglePlaceId: source?.place_id,
        destinationGooglePlaceId: destination?.place_id,
        polyline,
      });
      navigation.navigate('Tab', {screen: 'Profile', params: {}});
    }, [source, destination, name, navigation, polyline, addRouteRequest]);

    return (
      <Screen
        header={
          <Header
            title={inEditMode ? 'Útvonal szerkesztése' : 'Útvonal hozzáadása'}
          />
        }
        scrollable>
        <Text style={[font.small, spacing.bottom]}>
          Add meg azt az útvonalat amelyik között a leggyakrabban ingázol!
        </Text>
        <MapView style={styles.map}>
          {originCoordinate && (
            <Marker
              key={'orig'}
              coordinate={originCoordinate}
              pinColor={Colors.PRIMARY}
            />
          )}
          {destinationCoordinate && (
            <Marker
              key={'dest'}
              coordinate={destinationCoordinate}
              pinColor={Colors.PRIMARY}
            />
          )}
          {decodedPolyline && (
            <Polyline
              coordinates={decodedPolyline}
              strokeColor={Colors.PRIMARY}
              strokeWidth={6}
            />
          )}
        </MapView>
        <View style={styles.form}>
          <TextInput
            label="Indulás"
            value={originAddress}
            style={spacingStyles.bottom}
            onFocus={handleSourceFocus}
          />
          <TextInput
            label="Érkezés"
            value={destinationAddress}
            style={spacingStyles.bottom}
            onFocus={handleDestinationFocus}
          />
          <TextInput
            label="Név"
            value={name}
            style={spacingStyles.bottom}
            onChangeText={text => setName(text)}
          />
          {inEditMode ? (
            <>
              <Button
                text="Demó matchek"
                onPress={() => {
                  //@ts-ignore
                  navigation.dispatch(
                    StackActions.replace('DemoMatches', {routeId}),
                  );
                }}
                style={spacing.bottom}
              />
              <Button
                text="Útvonal törlése"
                onPress={() => {
                  navigation.popToTop();
                  deleteRouteRequest(routeId!);
                  //@ts-ignore
                }}
                style={spacing.bottom}
              />
            </>
          ) : null}
        </View>
        <Button
          text={inEditMode ? 'Mentés' : 'Hozzáadás'}
          size="big"
          onPress={handleAddRoute}
        />
      </Screen>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    ...spacingStyles.bottom,
    height: 300,
    ...utilities.fluid,
  },
  form: {
    flex: 1,
  },
});
