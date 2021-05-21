import React from 'react';
import {Colors} from 'src/assets/colors';
import {StyleSheet} from 'react-native';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BottomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.bar}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={{...styles.tabItem}}>
            <Icon
              name={options.icon}
              size={32}
              style={{...styles.icon, ...(isFocused ? styles.activeTab : {})}}
            />
            <Text style={{color: isFocused ? Colors.BLACK : Colors.BLACK_30}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: Colors.LIGHT_GREY,
  },
});

export default BottomTabBar;
