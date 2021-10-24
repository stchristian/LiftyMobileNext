import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import fontStyles from 'assets/styles/font';
import spacingStyles from 'assets/styles/spacing';
import { Colors } from 'assets/colors';
import CircleFill from './figures/CircleFill';

const RoutePresenter = ({
  from,
  to,
  style,
  type = 'primary',
}: {
  from: string;
  to: string;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'secondary';
}) => {
  return (
    <View style={style}>
      <View style={styles.row}>
        <CircleFill fill={Colors.BLACK} />
        <Text
          style={[
            fontStyles.tiny,
            spacingStyles.margin_left_s,
            fontStyles[type],
          ]}>
          {from}
        </Text>
      </View>
      <View style={styles.row}>
        <CircleFill fill={Colors.ON_SECONDARY} />
        <Text
          style={[
            fontStyles.tiny,
            spacingStyles.margin_left_s,
            fontStyles[type],
          ]}>
          {to}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RoutePresenter;
