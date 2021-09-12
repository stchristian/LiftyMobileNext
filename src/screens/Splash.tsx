import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Screen from 'shared/Screen';
import { Colors } from 'assets/colors';
import fontStyles from 'assets/styles/font';
import { useAppSelector } from 'hooks/store';

const Splash = ({ navigation }: any) => {
  const userSetAt = useAppSelector(state => state.userSetAt);
  const userRequestFinished = useRef(false);

  const fadeA = useRef(new Animated.Value(0)).current;
  const fadeB = useRef(new Animated.Value(0)).current;

  const mottoFadeIn = useCallback(
    (callback: Animated.EndCallback) =>
      Animated.timing(fadeA, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }).start(callback),
    [],
  );

  const mottoFadeOut = useCallback(
    (callback: Animated.EndCallback) =>
      Animated.timing(fadeA, {
        toValue: 0.2,
        duration: 750,
        useNativeDriver: true,
      }).start(callback),
    [],
  );

  const titleFadeIn = useCallback(
    (callback: Animated.EndCallback) =>
      Animated.timing(fadeB, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(callback),
    [],
  );

  const startLoadingAnimation = useCallback(
    async () => new Promise(resolve => mottoFadeIn(() => titleFadeIn(resolve))),
    [mottoFadeIn, titleFadeIn],
  );

  const startLoading = useCallback(() => {
    if (userRequestFinished.current) {
      navigation.replace('HomeStack');
      return;
    }

    mottoFadeOut(() => mottoFadeIn(startLoading));
  }, [userRequestFinished]);

  useEffect(() => {
    startLoadingAnimation().then(startLoading);
  }, [startLoadingAnimation]);

  useEffect(() => {
    userRequestFinished.current = userSetAt instanceof Date;
  }, [userSetAt]);

  return (
    <Screen
      statusBarHidden={true}
      customScreenStyle={styles.screen}
      noPadding={true}>
      <Animated.Text
        style={[fontStyles.title_xxl, styles.title, { opacity: fadeB }]}>
        lifty
      </Animated.Text>
      <Animated.View style={[styles.mottoContainer, { opacity: fadeA }]} />
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
    transform: [{ scaleX: 1.3 }],
  },
});

export default Splash;
