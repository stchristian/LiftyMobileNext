import React from 'react';
import {View, Text, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import spacingStyles from 'src/assets/styles/spacing';
import {Colors} from 'src/assets/colors';
import fontStyles from 'src/assets/styles/font';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export type Option = {
  label: string;
  value: any;
  selected: boolean;
};

const HorizontalSelect = ({
  options,
  onSelect,
  containerStyle,
}: {
  containerStyle?: ViewStyle;
  options: Option[];
  onSelect: (value: any) => any;
}) => {
  return (
    <View style={[containerStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option, index) => (
          <TouchableWithoutFeedback
            style={[
              styles.option,
              option.selected ? styles.selected : {},
              index === 0 ? styles.first : {},
              index === options.length - 1 ? styles.last : {},
            ]}
            onPress={() => onSelect(option.value)}
            key={option.value}>
            <Text style={fontStyles.small}>{option.label}</Text>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.BLACK_60,
    borderRadius: 16,
    marginRight: 8,
  },
  first: {
    marginLeft: 16,
  },
  last: {
    marginRight: 16,
  },
  selected: {
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
});

export default HorizontalSelect;
