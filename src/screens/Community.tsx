import React, {useState, useMemo} from 'react';
import {Text} from 'react-native';
import fontStyles from '../assets/styles/font';
import spacingStyles from '../assets/styles/spacing';
import Screen from 'shared/Screen';
import Header from 'shared/Header';
import HorizontalSelect, {Option} from 'shared/HorizontalSelect';
import {useMyRoutes} from 'hooks/route';
const Community = () => {
  const [selectedRouteId, setSelectedRouteId] = useState(null);
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

  return (
    <Screen header={<Header title="Közösségek" withBackButton={false} />}>
      <Text style={[fontStyles.small, spacingStyles.bottom_l]}>
        Válassz útvonalat
      </Text>
      <HorizontalSelect
        containerStyle={{
          ...spacingStyles.bottom,
          marginHorizontal: -16,
        }}
        options={routeOptions}
        onSelect={val => setSelectedRouteId(val)}
      />
    </Screen>
  );
};

export default Community;
