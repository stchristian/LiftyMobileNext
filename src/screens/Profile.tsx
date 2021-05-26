import React, {useCallback, useMemo} from 'react';
import {Button} from '../shared/Button';
import Screen from 'shared/Screen';
import {useCurrentUser} from 'hooks/index';
import ProfilePicture from 'shared/ProfilePicture';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import fontStyles from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import font from 'assets/styles/font';
import utilities from 'assets/styles/utilities';
import {Colors} from 'assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {useMyRoutes} from 'hooks/route';
import RouteCard from 'shared/RouteCard';

const MenuItem = ({label, icon, routeParams}: any) => {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    routeParams && navigation.navigate(...routeParams);
  }, [navigation, routeParams]);

  return (
    <Pressable
      style={styles.menuItem}
      android_ripple={{
        color: Colors.SECONDARY_LIGHT,
      }}
      onPress={handlePress}>
      <Icon name={icon} size={32} color={Colors.ON_SECONDARY} />
      <Text style={[styles.menuItemText, font.secondary]}>{label}</Text>
    </Pressable>
  );
};

const Profile = ({navigation}: any) => {
  const user = useCurrentUser();
  const routes = useMyRoutes();
  console.log('routes', routes);

  const menuItems = useMemo(
    () => [
      {
        label: 'Adatok',
        icon: 'account-circle',
        routeParams: ['HomeStack', {screen: 'PersonalDetails'}],
      },
      {
        label: 'Utazások',
        icon: 'event',
      },
      // {
      //   label: 'Útvonalak',
      //   icon: 'map',
      // },
      {
        label: 'Kijelentkezés',
        icon: 'logout',
      },
    ],
    [],
  );

  const handleRequestNewRoute = () => {
    navigation.navigate('HomeStack', {screen: 'AddRoute'});
  };

  return (
    <Screen scrollable>
      <View style={[styles.row, spacing.bottom]}>
        <ProfilePicture size="big" style={spacing.right} />
        <Text style={fontStyles.title_xl}>{user.name}</Text>
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
      {routes.map(route => (
        <RouteCard route={route} key={route.name} style={spacing.bottom} />
      ))}
      <Text style={[font.small, font.muted, spacing.bottom_s]}>Profil</Text>
      <View style={[styles.menu, spacing.bottom]}>
        {menuItems.map(item => (
          <MenuItem {...item} key={item.label} />
        ))}
      </View>
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
