import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title_xxl: {
    fontFamily: 'Exo2_bold',
    fontSize: 50,
    lineHeight: 50,
  },
  title_xl: {
    fontFamily: 'Exo2_bold',
    fontSize: 32,
    lineHeight: 32,
  },
  title_m: {
    fontFamily: 'Exo2_bold',
    fontSize: 24,
    lineHeight: 26,
  },
  title_s: {
    fontFamily: 'Exo2_bold',
    fontSize: 22,
    lineHeight: 28,
  },
  normal: {
    fontFamily: 'Exo2',
    fontSize: 18,
    lineHeight: 18,
  },
  normal_bold: {
    fontFamily: 'Exo2_bold',
    fontSize: 18,
    lineHeight: 20,
  },
  small: {
    fontFamily: 'Exo2',
    fontSize: 14,
    lineHeight: 16,
  },
  small_bold: {
    fontFamily: 'Exo2_bold',
    fontSize: 14,
    lineHeight: 16,
  },
  tiny: {
    fontFamily: 'Exo2',
    fontSize: 12,
    lineHeight: 15,
  },
  tiny_bold: {
    fontFamily: 'Exo2_bold',
    fontSize: 12,
    lineHeight: 15,
  },
  center: {
    textAlign: 'center',
  },
  primary: {
    color: Colors.ON_PRIMARY,
  },
  secondary: {
    color: Colors.ON_SECONDARY,
  },
  muted: {
    color: Colors.ON_SURFACE_MUTED,
  },
});
