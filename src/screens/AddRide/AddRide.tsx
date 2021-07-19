import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import fontStyles from 'assets/styles/font';
import screenStyles from 'assets/styles/screen';
import spacingStyles from 'assets/styles/spacing';
import {Colors} from 'assets/colors';
import HorizontalSelect, {Option} from 'shared/HorizontalSelect';
import {EndWayPoint, StartWayPoint} from 'shared/figures/WayPoint';
import {Button} from 'shared/Button';
import Header from 'shared/Header';
import {useTimePicker} from 'hooks/timepicker';
import {getTime, shortDateFormat} from 'src/utils/date';
import {useMyRoutes} from 'hooks/route';
import MapView from 'shared/MapView';

export type AddRideParams = {
  timestamp: number;
};

enum Role {
  DRIVER,
  PASSANGER,
}

const AddRide = ({
  route: {
    params: {timestamp},
  },
  navigation,
}: any) => {
  const [date, setDate] = useState(new Date(timestamp));
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [timeSelected, setTimeSelected] = useState(false);
  const [role, setRole] = useState(Role.DRIVER);

  const myRoutes = useMyRoutes();
  const routeOptions = useMemo<Option[]>(
    () =>
      myRoutes.map(route => ({
        label: route.name,
        value: route._id,
        selected: route._id === selectedRouteId ? true : false,
      })),
    [myRoutes, selectedRouteId],
  );

  const handleRouteSelected = (routeId: any) => {
    setSelectedRouteId(routeId);
  };

  const handleTimePicked = useCallback(
    (hour: number, minute: number) => {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minute,
        ),
      );
      setTimeSelected(true);
    },
    [date],
  );

  const {showTimePicker} = useTimePicker(handleTimePicked);

  const selectedRoute = useMemo(
    () => myRoutes.find(route => route._id === selectedRouteId),
    [myRoutes, selectedRouteId],
  );

  const handleAddRide = () => {
    navigation.replace('RideMatches', {rideId: 'myRideId#123'});
  };

  return (
    <>
      <Header title="Utazás hozzáadása" />
      <ScrollView contentContainerStyle={screenStyles.default}>
        <Text style={{...fontStyles.small, ...spacingStyles.bottom}}>
          Kiválasztott dátum:
          <Text style={fontStyles.normal_bold}> {shortDateFormat(date)}</Text>
        </Text>
        <View style={{...styles.switch, ...spacingStyles.bottom}}>
          <TouchableWithoutFeedback onPress={() => setRole(Role.PASSANGER)}>
            <View
              style={{
                ...styles.switchButton,
                ...(role === Role.PASSANGER ? styles.active : {}),
              }}>
              <Text style={styles.switchButtonLabel}>utas</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setRole(Role.DRIVER)}>
            <View
              style={{
                ...styles.switchButton,
                ...(role === Role.DRIVER ? styles.active : {}),
              }}>
              <Text style={styles.switchButtonLabel}>sofőr</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={{...fontStyles.small, ...spacingStyles.bottom}}>
          Melyik útvonalonadon utazol?
        </Text>
        <HorizontalSelect
          containerStyle={{
            ...spacingStyles.bottom,
            marginHorizontal: -16,
          }}
          options={routeOptions}
          onSelect={handleRouteSelected}
        />
        <MapView
          style={styles.map}
          routes={
            selectedRoute
              ? [
                  {
                    route: selectedRoute,
                    color: Colors.PRIMARY,
                  },
                ]
              : []
          }
        />
        {/* {selectedRoute && (
          <View style={spacingStyles.bottom}>
            <StartWayPoint label={selectedRoute.originAddress} />
            <EndWayPoint label={selectedRoute.destinationAddress} />
          </View>
        )} */}
        <Text style={{...fontStyles.small, ...spacingStyles.bottom}}>
          Mikor indulsz?
          <Text style={fontStyles.normal_bold}>
            {' '}
            {timeSelected && getTime(date)}
          </Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => showTimePicker(date.getHours(), date.getMinutes())}
            text="Idő kiválasztása"
          />
        </View>
        <View style={styles.bottom}>
          <Button text="Hozzáadás" size="big" onPress={handleAddRide} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
  },
  switchButton: {
    flex: 1,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  active: {
    borderTopWidth: 10,
    marginTop: -5,
    borderTopColor: Colors.PRIMARY,
  },
  switchButtonLabel: {
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  routeItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.BLACK_60,
    borderRadius: 16,
    marginRight: 8,
  },
  map: {
    marginHorizontal: -16,
    ...spacingStyles.bottom,
  },
});
export default AddRide;
