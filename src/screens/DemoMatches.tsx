import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Screen from 'shared/Screen';
import {useRouteById, useRouteMatches} from 'hooks/route';
import MapView from 'shared/MapView';
import spacing from 'assets/styles/spacing';
import {Colors} from 'assets/colors';
import {Route} from 'lifty-types';
import Header from 'shared/Header';

const DemoMatches = ({
  route: {
    params: {routeId},
  },
}: any) => {
  const route = useRouteById(routeId);

  const matches = useRouteMatches(routeId);
  const routeProps = useMemo(
    () => [
      {
        route: route as Route,
        color: Colors.SECONDARY,
        strokeWidth: 10,
      },
      ...matches.map(match => ({
        route: match,
        color: Colors.PRIMARY,
        strokeWidth: 5,
      })),
    ],
    [route, matches],
  );

  return (
    <Screen header={<Header title="Match demó" />}>
      <MapView style={styles.map} routes={routeProps} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  map: {
    ...spacing.bottom,
    flex: 1,
    marginHorizontal: -16,
  },
  form: {
    flex: 1,
  },
});

export default DemoMatches;
