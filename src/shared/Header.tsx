import { Colors } from 'assets/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from 'assets/icons/back.svg';
import { useNavigation } from '@react-navigation/native';
import fontStyles from 'assets/styles/font';

const Header = ({
  children,
  title,
  titlePosition = 'center',
  rightButton,
  withBackButton = true,
  handleRightButtonPress = () => {},
}: any) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const isCentered = titlePosition === 'center';
  const isLeft = titlePosition === 'left';

  return (
    <View
      style={[
        styles.header,
        isCentered && styles.alignedCenter,
        isLeft && styles.alignedLeft,
      ]}>
      {withBackButton && (
        <TouchableOpacity style={[styles.backButton]} onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text style={[styles.title]}>{title}</Text>
      {children}
      <TouchableOpacity
        style={[styles.rightButton]}
        onPress={handleRightButtonPress}>
        {rightButton}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    textAlign: 'center',
    backgroundColor: Colors.HEADER_BG,
    paddingHorizontal: 16,
    // borderWidth: 1,
    borderColor: 'red',
  },
  alignedLeft: {
    justifyContent: 'flex-start',
  },
  alignedCenter: {
    justifyContent: 'center',
  },
  title: {
    ...fontStyles.title_m,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  rightButton: {
    position: 'absolute',
    right: 16,
  },
});

export default Header;
