import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import screenStyles from 'assets/styles/screen';
import Header from 'shared/Header';
import {Colors} from 'assets/colors';
import fontStyles from 'assets/styles/font';
import spacingStyles from 'assets/styles/spacing';
export type RideMatchesParams = {};

const RideMatches = () => {
  return (
    <>
      <Header title={'Utazás egyeztetés'} />
      <View style={screenStyles.default}>
        <View style={{...styles.container, ...spacingStyles.bottom_l}}>
          <View style={styles.left}>
            <Text style={fontStyles.normal_bold}>Meló - otthon</Text>
            <Text>Gábor áron út</Text>
            <Text>Károly körüt</Text>
          </View>
          <View style={styles.right}>
            <Text style={fontStyles.normal_bold}>Nov 11.</Text>
            <Text>7:30</Text>
          </View>
        </View>
        <Text style={{...fontStyles.title_s, ...styles.resultsTitle}}>
          Találatok
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 2,
    padding: 16,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginRight: 8,
    backgroundColor: Colors.LIGHT_GREY,
  },
  right: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.LIGHT_GREY,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  resultsTitle: {
    marginLeft: 16,
  },
});

export default RideMatches;
