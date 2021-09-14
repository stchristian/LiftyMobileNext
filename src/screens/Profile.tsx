import React, { useCallback, useMemo } from 'react';
import { Button } from '../shared/Button';
import Screen from 'shared/Screen';
import { useCurrentUser } from 'hooks/index';
import ProfilePicture from 'shared/ProfilePicture';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import fontStyles from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import font from 'assets/styles/font';
import utilities from 'assets/styles/utilities';
import { Colors } from 'assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';
import { useMyRoutes } from 'hooks/route';
import RouteCard from 'shared/RouteCard';
import { useLoggedInUser, useLogout } from 'hooks/auth';
import Header from 'shared/Header';
import Wheel from 'shared/figures/Wheel';

const Profile = ({ navigation }: any) => {
  const user = useLoggedInUser();
  const routes = useMyRoutes();
  const logout = useLogout();

  const handleRequestNewRoute = () => {
    navigation.push('AddRoute');
  };

  const handleEditRouteRequest = (routeId: string) => {
    navigation.push('AddRoute', {
      routeId,
    });
  };

  const goToProfileSettings = () => {
    navigation.navigate(...['HomeStack', { screen: 'PersonalDetails' }]);
  };

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
          src={user!.photoURL || undefined}
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
      {routes.length > 0 ? (
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
