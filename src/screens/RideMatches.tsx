import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import screenStyles from 'assets/styles/screen';
import Header from 'shared/Header';
import {Colors} from 'assets/colors';
import fontStyles from 'assets/styles/font';
import spacingStyles from 'assets/styles/spacing';
import profile_picture from 'assets/images/profile_picture.jpg';
import {RideMatch} from 'src/types/Ride';
import {useRide, useRideMatches} from 'src/hooks';
import {getTime} from '../utils/date';
import CircleFill from 'assets/icons/circle_fill.svg';
import CircleOutline from 'assets/icons/circle_outline.svg';

export type RideMatchesParams = {
  rideId: string;
};

const RideMatchItem = ({match}: {match: RideMatch}) => {
  return (
    <View style={styles.match}>
      <View style={styles.matchLeft}>
        <Image source={profile_picture} style={styles.imageThumbnail} />
        <Text style={fontStyles.small_bold}>{match.driverName}</Text>
      </View>
      <View style={styles.matchRight}>
        <Text style={{...fontStyles.normal_bold, ...spacingStyles.bottom_s}}>
          {getTime(match.time)}
        </Text>
        <View style={styles.row}>
          <CircleFill />
          <Text style={spacingStyles.margin_left_s}>{match.from}</Text>
        </View>
        <View style={styles.row}>
          <CircleOutline />
          <Text style={spacingStyles.margin_left_s}>{match.to}</Text>
        </View>
        <Text style={styles.freePlacesLabel}>
          {match.freePlaces} szabad hely
        </Text>
      </View>
    </View>
  );
};

const RideMatches = ({
  route: {
    params: {rideId},
  },
}: any) => {
  const ride = useRide(rideId);
  const {loading, rideMatches} = useRideMatches(ride);

  return (
    <>
      <Header title={'Utazás egyeztetés'} />
      <View style={screenStyles.default}>
        <View style={{...styles.container, ...spacingStyles.bottom_l}}>
          <View style={styles.left}>
            <Text
              style={{...fontStyles.normal_bold, ...spacingStyles.bottom_s}}>
              {ride.routeName}
            </Text>
            <View style={styles.row}>
              <CircleFill />
              <Text style={spacingStyles.margin_left_s}>{ride.from}</Text>
            </View>
            <View style={styles.row}>
              <CircleOutline />
              <Text style={spacingStyles.margin_left_s}>{ride.to}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={fontStyles.normal_bold}>Nov 11.</Text>
            <Text>{getTime(ride.time)}</Text>
          </View>
        </View>
        <Text
          style={{
            ...fontStyles.title_s,
            ...styles.resultsTitle,
            ...spacingStyles.bottom,
          }}>
          Találatok
        </Text>
        {rideMatches &&
          rideMatches.map(match => (
            <RideMatchItem match={match} key={match.rideId} />
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 2,
    padding: 16,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginRight: 8,
    backgroundColor: Colors.LIGHT_GREY,
  },
  right: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.LIGHT_GREY,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  resultsTitle: {
    marginLeft: 16,
  },
  match: {
    padding: 16,
    elevation: 100,
    backgroundColor: Colors.LIGHT,
    shadowColor: Colors.BLACK_60,
    shadowOpacity: 0.2,
    borderRadius: 24,
    flexDirection: 'row',
    ...spacingStyles.bottom,
  },
  matchLeft: {
    flex: 1,
    alignItems: 'center',
  },
  matchRight: {
    flex: 2,
    justifyContent: 'center',
  },
  imageThumbnail: {
    width: 68,
    height: 68,
    resizeMode: 'cover',
    borderRadius: 300,
    borderWidth: 5,
    borderColor: Colors.PRIMARY,
    ...spacingStyles.bottom_s,
  },
  freePlacesLabel: {
    ...fontStyles.normal,
    color: Colors.SUCCESS,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RideMatches;
