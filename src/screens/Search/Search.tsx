import React, { useState, useMemo, useCallback } from 'react';
import { ListRenderItem, StyleSheet, Text } from 'react-native';
import fontStyles from 'assets/styles/font';
import spacingStyles from 'assets/styles/spacing';
import Screen from 'shared/Screen';
import Header from 'shared/Header';
import HorizontalSelect, { Option } from 'shared/HorizontalSelect';
import { useMyRoutes } from 'hooks/route';
import { getMatches } from 'src/api/callables';
import { Match } from 'lifty-types';
import MatchCard from './MatchCard';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from 'assets/colors';
import padding from 'assets/styles/padding';

const Community = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<null | string>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const myRoutes = useMyRoutes();

  const routeOptions = useMemo<Option[]>(
    () =>
      myRoutes.map(route => ({
        label: route.name,
        value: route._id,
      })),
    [myRoutes],
  );

  const handleSelect = useCallback(async (val: string) => {
    setSelectedRouteId(val);
    const results = await getMatches({ routeId: val });
    setMatches(results);
  }, []);

  const renderItem = useCallback<ListRenderItem<Match>>(({ item }) => {
    return (
      <MatchCard
        style={styles.cardStyle}
        // photoURL={item.user.photoURL}
        firstName={item.user.displayName.split(' ')[0]}
      />
    );
  }, []);

  return (
    <Screen header={<Header title="Keresés" withBackButton={false} />}>
      <Text style={[fontStyles.small, spacingStyles.bottom_l]}>
        Válassz egy útvonalat a szűréshez!
      </Text>
      <HorizontalSelect
        value={selectedRouteId}
        containerStyle={styles.select}
        options={routeOptions}
        onSelect={handleSelect}
      />
      <FlatList
        style={[styles.list]}
        data={matches}
        ListEmptyComponent={() => (
          <Text
            style={[fontStyles.center, fontStyles.normal, fontStyles.small]}>
            Sajnos az útvonaladhoz nincs megfelelő találat.
          </Text>
        )}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item._id}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  select: {
    ...spacingStyles.bottom,
    marginHorizontal: -16,
  },
  cardStyle: {
    flex: 1 / 2,
    margin: 8,
  },
  list: {
    ...padding.s,
    ...padding.top_xl,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: -16,
    backgroundColor: Colors.BLACK_10,
    marginBottom: -16,
  },
});

export default Community;
