import { Colors } from 'assets/colors';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

const Skeleton = ({
  style,
  width,
  height,
  borderRadius,
}: {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderRadius?: number;
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        style,
        {
          width,
          height,
          ...(borderRadius && { borderRadius }),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 8,
  },
});

export default Skeleton;
