import {Colors} from 'assets/colors';
import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import RoutePresenter from './RoutePresenter';

const RouteCard = ({route, style, onPress}: any) => {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <Text style={[font.title_s, spacing.bottom_s]}>{route.name}</Text>
      {/* <RoutePresenter
        from={route.origin.address}
        to={route.destination.address}
        style={spacing.bottom_s}
      />
      <View
        style={{
          height: 100,
          backgroundColor: Colors.SURFACE,
          marginHorizontal: -16,
          marginBottom: -16,
        }}></View> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: Colors.PRIMARY,
    // elevation: 5,
    padding: 16,
    overflow: 'hidden',
    elevation: 10,
  },
});

export default RouteCard;
