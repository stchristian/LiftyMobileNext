import React, { useCallback } from 'react';
import { Button } from '../shared/Button';
import Screen from 'shared/Screen';
import ProfilePicture from 'shared/ProfilePicture';
import { View, StyleSheet, Text } from 'react-native';
import fontStyles from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import font from 'assets/styles/font';
import utilities from 'assets/styles/utilities';
import { Colors } from 'assets/colors';
import { useMyRoutes, useMyRoutesFetchingState } from 'hooks/route';
import { RouteCard, SkeletonRouteCard } from 'shared/RouteCard';
import { useLoggedInUser } from 'hooks/auth';
import Header from 'shared/Header';
import Wheel from 'shared/figures/Wheel';
import { User } from 'lifty-types';

const Profile = ({ navigation }: any) => {
  const user = useLoggedInUser() as User;
  const routes = useMyRoutes();
  const fetching = useMyRoutesFetchingState();
  console.log(fetching);
  const handleRequestNewRoute = useCallback(() => {
    navigation.push('AddRoute');
  }, [navigation]);

  const handleEditRouteRequest = useCallback(
    (routeId: string) => {
      navigation.push('AddRoute', {
        routeId,
      });
    },
    [navigation],
  );

  const goToProfileSettings = useCallback(() => {
    navigation.navigate(...['HomeStack', { screen: 'PersonalDetails' }]);
  }, [navigation]);

  return (
    <Screen
      header={
        <Header
          title="Profil"
          titlePosition={'left'}
          withBackButton={false}
          rightButton={<Wheel />}
          handleRightButtonPress={goToProfileSettings}
        />
      }
      scrollable>
      <View style={[styles.row, spacing.bottom]}>
        <ProfilePicture
          size="big"
          style={spacing.right}
          src={user.photoURL || undefined}
        />
        <Text
          style={
            fontStyles.title_s
          }>{`${user.lastName} ${user.firstName}`}</Text>
      </View>
      <View style={[styles.row, spacing.bottom]}>
        <Button
          leftIcon="add"
          text="Útvonal"
          onPress={handleRequestNewRoute}
          style={spacing.right_s}
        />
        <Button leftIcon="add" text="Autó" type="secondary" />
      </View>
      <Text style={[font.small, font.muted, spacing.bottom_s]}>Útvonalak</Text>
      {fetching ? (
        <>
          <SkeletonRouteCard style={spacing.bottom} />
          <SkeletonRouteCard />
        </>
      ) : routes.length > 0 ? (
        routes.map(route => (
          <RouteCard
            route={route}
            key={route.name}
            style={spacing.bottom}
            onPress={() => handleEditRouteRequest(route._id)}
          />
        ))
      ) : (
        <Text
          style={[
            fontStyles.tiny,
            fontStyles.muted,
            fontStyles.center,
            spacing.bottom_l,
          ]}>
          Nincs megjeleníthető útvonal
        </Text>
      )}
    </Screen>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  menu: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 24,
    overflow: 'hidden',
  },
  menuItem: {
    ...utilities.row_center,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  menuItemText: {
    ...font.small_bold,
    marginLeft: 24,
  },
});

export default Profile;
