import { Colors } from 'assets/colors';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackArrow from 'shared/figures/BackArrow';
import { useNavigation } from '@react-navigation/native';
import fontStyles from 'assets/styles/font';

const Header = ({
  children,
  title,
  titlePosition = 'left',
  rightButton,
  withBackButton = true,
  handleRightButtonPress = () => {},
}: any) => {
  const navigation = useNavigation();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
        <TouchableOpacity
          style={[
            isCentered ? styles.backButtonWithCenteredTitle : styles.backButton,
          ]}
          onPress={handleBackPress}>
          <BackArrow />
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
    marginRight: 8,
  },
  backButtonWithCenteredTitle: {
    position: 'absolute',
    left: 16,
  },
  rightButton: {
    position: 'absolute',
    right: 16,
  },
});

export default Header;
