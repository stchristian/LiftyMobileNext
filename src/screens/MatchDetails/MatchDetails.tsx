import React, { useCallback } from 'react';
import { Button } from 'shared/Button';
import Screen from 'shared/Screen';
import ProfilePicture from 'shared/ProfilePicture';
import { View, StyleSheet, Text, Linking } from 'react-native';
import fontStyles from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import font from 'assets/styles/font';
import utilities from 'assets/styles/utilities';
import { Colors } from 'assets/colors';
import { useMyRoutes } from 'hooks/route';
import RouteCard from 'shared/RouteCard';
import Header from 'shared/Header';
import { Route } from 'lifty-types';
import Call from 'shared/figures/Call';

export interface MatchDetailsParams {
  userFullName: string;
  userPhotoURL: string;
  phoneNumber: string;
  route: Route;
}

const MatchDetails = ({
  navigation,
  route: {
    params: { userFullName, userPhotoURL, phoneNumber, route },
  },
}: {
  navigation: any;
  route: {
    params: MatchDetailsParams;
  };
}) => {
  const handleCall = useCallback(() => {
    console.log(`CALL: ${phoneNumber}`);
    Linking.openURL(`tel:${phoneNumber}`);
  }, [phoneNumber]);

  const handleEditRouteRequest = useCallback(
    (routeId: string) => {
      navigation.push('AddRoute', {
        routeId,
      });
    },
    [navigation],
  );

  return (
    <Screen
      header={<Header title="Útvonaladon utazik" withBackButton />}
      scrollable>
      <View style={[styles.row, spacing.bottom]}>
        <ProfilePicture size="big" style={spacing.right} src={userPhotoURL} />
        <Text style={fontStyles.title_s}>{`${userFullName}`}</Text>
      </View>
      <View style={[styles.row, spacing.bottom]}>
        <Button
          leftElement={<Call />}
          text="Hívás"
          onPress={handleCall}
          style={spacing.right_s}
        />
      </View>
      <Text style={[font.small, font.muted, spacing.bottom_s]}>
        Egyező útvonalak
      </Text>
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

export default MatchDetails;
