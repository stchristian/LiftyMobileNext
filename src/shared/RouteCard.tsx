import { Colors } from 'assets/colors';
import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  Image,
  StyleProp,
} from 'react-native';
import RoutePresenter from './RoutePresenter';
import { Route } from 'lifty-types';
import Skeleton from './Skeleton';

export const RouteCard = ({
  route,
  style,
  onPress,
}: {
  route: Route;
  style?: ViewStyle;
  onPress: () => any;
}) => {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <View style={[styles.title, spacing.bottom_s]}>
        {/* <Icon name="map-marker-path" size={16} color={Colors.ON_SECONDARY} /> */}
        <Text style={[font.normal_bold, font.primary, spacing.margin_left_s]}>
          {route.name}
        </Text>
      </View>
      <RoutePresenter
        type="primary"
        from={route.originAddress}
        to={route.destinationAddress}
        style={[spacing.margin_left_s, spacing.bottom_s]}
      />
      <Image
        style={styles.routeImage}
        source={{
          uri: route.imageURL,
        }}
      />
    </Pressable>
  );
};

export const SkeletonRouteCard = ({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.card, style]}>
      <Skeleton
        style={[spacing.margin_left_s, spacing.bottom_s]}
        width={50}
        height={16}
      />
      <Skeleton
        style={[spacing.margin_left_s, spacing.bottom_s]}
        width={150}
        height={10}
      />
      <Skeleton
        style={[spacing.margin_left_s, spacing.bottom_s]}
        width={190}
        height={10}
      />
      <Skeleton height={128} borderRadius={styles.routeImage.borderRadius} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  card: {
    borderRadius: 24,
    elevation: 10,
    backgroundColor: Colors.BACKGROUND,
    // elevation: 5,
    paddingTop: 16,
    paddingHorizontal: 8,
    paddingBottom: 8,
    // elevation: 10,
  },
  routeImage: {
    // resizeMode: 'contain',
    width: '100%',
    height: 156,
    borderRadius: 24,
  },
});
