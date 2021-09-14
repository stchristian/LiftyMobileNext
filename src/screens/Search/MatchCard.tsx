import { Colors } from 'assets/colors';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import ProfilePicture from 'shared/ProfilePicture';
import fontStyles from 'assets/styles/font';
import padding from 'assets/styles/padding';
import spacing from 'assets/styles/spacing';

const MatchCard = ({
  photoURL,
  firstName,
  style,
}: {
  firstName: string;
  photoURL?: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.card, padding.normal, style]}>
      <ProfilePicture src={photoURL} style={spacing.bottom_s} />
      <Text style={[fontStyles.normal_bold]}>{firstName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.BACKGROUND,
    elevation: 5,
    overflow: 'visible',
  },
});

export default MatchCard;
