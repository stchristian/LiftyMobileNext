import {Colors} from 'assets/colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackIcon from 'assets/icons/back.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import fontStyles from 'assets/styles/font';

const Header = ({children, title, withBackButton = true}: any) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      {withBackButton && (
        <TouchableOpacity onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.title,
          withBackButton ? styles.titleWithBackButton : undefined,
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: Colors.HEADER_BG,
    paddingHorizontal: 16,
    // borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    ...fontStyles.title_m,
  },
  titleWithBackButton: {
    marginLeft: 16,
  },
});

export default Header;
