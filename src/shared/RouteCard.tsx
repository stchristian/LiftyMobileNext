import {Colors} from 'assets/colors';
import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import React from 'react';
import {View, Text, StyleSheet, Pressable, ViewStyle} from 'react-native';
import RoutePresenter from './RoutePresenter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Route} from 'lifty-types';

const RouteCard = ({
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
        <Icon name="map-marker-path" size={16} color={Colors.ON_SECONDARY} />
        <Text style={[font.small_bold, font.secondary, spacing.margin_left_s]}>
          {route.name}
        </Text>
      </View>
      <RoutePresenter
        type="secondary"
        from={route.originAddress}
        to={route.destinationAddress}
        style={spacing.bottom_s}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  card: {
    borderRadius: 24,
    backgroundColor: Colors.SECONDARY,
    // elevation: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
    // elevation: 10,
  },
});

export default RouteCard;
