import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../assets/colors';
import fontStyles from '../assets/styles/font';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TextInput = React.forwardRef<
  RNTextInput,
  {
    rightIcon?: string;
    leftIcon?: ReactNode;
    value?: string;
    label?: string;
    placeholder?: string;
    onRightIconPress?: () => any;
    onChangeText?: (text: string) => any;
    inputProps?: Partial<TextInputProps>;
    style?: ViewStyle;
    onFocus?: () => any;
    type?: 'password';
    editable?: boolean;
    errorMessage?: string;
  }
>(
  (
    {
      value,
      onChangeText,
      inputProps,
      label,
      style = {},
      onFocus,
      placeholder,
      rightIcon,
      onRightIconPress,
      type,
      editable = true,
      leftIcon,
      errorMessage,
    },
    ref,
  ) => {
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputContainer,
            style,
            !editable && styles.disabled,
            !!leftIcon && styles.hasLeftIcon,
            !!errorMessage && styles.error,
          ]}>
          {!!leftIcon && (
            <View style={[styles.leftIconContainer]}>{leftIcon}</View>
          )}
          <RNTextInput
            onFocus={onFocus}
            style={styles.input}
            onChangeText={onChangeText}
            editable={editable}
            value={value}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            placeholderTextColor={Colors.BLACK_30}
            ref={ref}
            secureTextEntry={type === 'password'}
            // {...inputProps}
          />
          {rightIcon && (
            <Icon name={rightIcon} size={16} onPress={onRightIconPress} />
          )}
        </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER_COLOR,
    borderRadius: 16,
    backgroundColor: Colors.INPUT_BG_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: Colors.TEXT_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    borderColor: Colors.ERROR,
  },
  leftIconContainer: {
    paddingRight: 5,
  },
  hasLeftIcon: {
    paddingHorizontal: 0,
    paddingLeft: 8,
    paddingRight: 16,
  },
  disabled: {
    backgroundColor: Colors.LIGHT_GREY,
  },
  input: {
    ...fontStyles.normal,
    padding: 0,
    flex: 1,
  },
  label: {
    ...fontStyles.tiny,
    color: Colors.INPUT_LABEL,
    marginBottom: 4,
  },
  errorMessage: {
    ...fontStyles.tiny,
    color: Colors.ERROR,
    marginTop: 4,
  },
});
