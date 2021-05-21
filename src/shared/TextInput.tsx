import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import {Colors} from '../assets/colors';
import fontStyles from '../assets/styles/font';
export const TextInput = React.memo(
  ({
    value,
    onChangeText,
    inputProps,
    label,
    style = {},
    onFocus,
    placeholder,
  }: {
    value?: string;
    label?: string;
    placeholder?: string;
    onChangeText?: (text: string) => any;
    inputProps?: Partial<TextInputProps>;
    style?: ViewStyle;
    onFocus?: () => any;
  }) => {
    return (
      <View style={{...styles.container, ...style}}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RNTextInput
          onFocus={onFocus}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={Colors.BLACK_30}
          {...inputProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER_COLOR,
    borderRadius: 16,
    backgroundColor: Colors.INPUT_BG_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 15.5,
    ...fontStyles.textInput,
  },
  label: {
    marginBottom: 4,
    ...fontStyles.inputLabel,
  },
});
