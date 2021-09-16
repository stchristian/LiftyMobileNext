import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { Colors } from 'assets/colors';

const ProfilePicture = ({
  src,
  size = 'normal',
  style,
}: {
  src: string | undefined;
  size?: string;
  style?: ImageStyle;
}) => {
  return (
    <Image
      source={{
        uri: src,
      }}
      style={[styles.image, styles[size], style]}
    />
  );
};

const styles = StyleSheet.create({
  big: {
    width: 90,
    height: 90,
  },
  normal: {
    width: 68,
    height: 68,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 300,
    borderWidth: 5,
    borderColor: Colors.PRIMARY,
  },
});

export default ProfilePicture;
