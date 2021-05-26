import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import fontStyles from 'assets/styles/font';
import spacingStyles from 'assets/styles/spacing';
import CircleFill from 'assets/icons/circle_fill.svg';
import CircleOutline from 'assets/icons/circle_outline.svg';

const RoutePresenter = ({
  from,
  to,
  style,
  type = 'primary',
}: {
  from: string;
  to: string;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
}) => {
  return (
    <View style={style}>
      <View style={styles.row}>
        <CircleFill />
        <Text
          style={[
            fontStyles.small,
            spacingStyles.margin_left_s,
            fontStyles[type],
          ]}>
          {from}
        </Text>
      </View>
      <View style={styles.row}>
        <CircleOutline />
        <Text
          style={[
            fontStyles.small,
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
