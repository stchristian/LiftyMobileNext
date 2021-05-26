import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from 'src/assets/colors';
import fontStyles from 'src/assets/styles/font';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Button = ({
  text,
  leftIcon,
  size = 'normal',
  fill = false,
  type = 'primary',
  onPress,
  disabled = false,
  style,
}: {
  text: string;
  leftIcon?: string;
  size?: 'normal' | 'big';
  fill?: boolean;
  type?: 'primary' | 'secondary';
  onPress?: () => any;
  disabled?: boolean;
}) => {
  return (
    <View style={[styles.borderRadius, style]}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          leftIcon ? styles.leftIconPad : {},
          styles[type],
          styles[size],
        ]}
        android_ripple={{
          color:
            type === 'primary' ? Colors.PRIMARY_LIGHT : Colors.SECONDARY_LIGHT,
        }}>
        {leftIcon && (
          <Icon size={16} name={leftIcon} style={textStyles[type]} />
        )}
        <Text
          style={[
            size === 'normal' ? fontStyles.small_bold : fontStyles.normal_bold,
            textStyles[type],
          ]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

const textStyles = StyleSheet.create({
  primary: {
    color: Colors.ON_PRIMARY,
  },
  secondary: {
    color: Colors.ON_SECONDARY,
  },
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  borderRadius: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  leftIconPad: {
    paddingLeft: 8,
  },
  normal: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  big: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: Colors.PRIMARY,
  },
  secondary: {
    backgroundColor: Colors.SECONDARY,
  },
});
