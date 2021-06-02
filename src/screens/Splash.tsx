import {useAuthRedirect} from 'hooks/auth';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import Screen from 'shared/Screen';
import {Colors} from '../assets/colors';
import fontStyles from '../assets/styles/font';

const Splash = ({navigation}: any) => {
  const [animFinished, setAnimFinished] = useState(false);
  const fadeA = useRef(new Animated.Value(0)).current;
  const fadeB = useRef(new Animated.Value(0)).current;
  const authRedirect = useAuthRedirect();

  useEffect(() => {
    Animated.timing(fadeA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeB, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setAnimFinished(true), 1000);
      });
    });
  }, [fadeA, fadeB, navigation]);

  useEffect(() => {
    if (animFinished) {
      console.log('authredirect running');
      authRedirect();
    }
  }, [authRedirect, animFinished]);

  return (
    <Screen
      statusBarHidden={true}
      customScreenStyle={styles.screen}
      noPadding={true}>
      <Animated.Text
        style={[fontStyles.title_xxl, styles.title, {opacity: fadeB}]}>
        lifty
      </Animated.Text>
      <Animated.View style={[styles.mottoContainer, {opacity: fadeA}]} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 100,
  },
  mottoContainer: {
    flex: 1,
    flexGrow: 1,
    marginTop: 200,
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'stretch',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    transform: [{scaleX: 1.3}],
  },
});

export default Splash;
