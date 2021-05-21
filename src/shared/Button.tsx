import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {Colors} from 'src/assets/colors';
import fontStyles from 'src/assets/styles/font';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSize {
  SMALL = 'small',
  NORMAL = 'normal',
  BIG = 'big',
}

export const Button = ({
  text,
  size = ButtonSize.NORMAL,
  fill = false,
  type = ButtonType.PRIMARY,
  onPress,
  disabled = false,
}: {
  text: string;
  size?: ButtonSize;
  fill?: boolean;
  type?: ButtonType;
  onPress?: () => any;
  disabled?: boolean;
}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor="white"
      onPress={onPress}
      style={{borderRadius: 100}}>
      <View style={{...styles.button, ...styles[type], ...styles[size]}}>
        <Text
          style={{
            ...styles.text,
            ...(size === ButtonSize.SMALL ? fontStyles.small : {}),
          }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 'auto',
    paddingVertical: 15,
    overflow: 'hidden',
    borderRadius: 100,
  },
  small: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontFamily: 'Exo2_bold',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
  },
  normal: {},
  big: {},
  primary: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.BLACK,
  },
  secondary: {
    backgroundColor: Colors.GREY,
    color: Colors.PRIMARY,
  },
});
