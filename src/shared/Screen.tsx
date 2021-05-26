import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from 'assets/colors';
import {ScrollView} from 'react-native-gesture-handler';

const Screen = ({
  children,
  scrollable = false,
  statusBarHidden = false,
  customScreenStyle,
  noPadding = false,
  header,
}: any) => {
  return (
    <>
      {/* <StatusBar
        animated={true}
        barStyle={statusBarHidden ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.BACKGROUND}
      /> */}
      {header}
      {scrollable ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[
            styles.scrollViewContainer,
            noPadding ? {} : styles.padding,
            customScreenStyle,
          ]}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.view,
            noPadding ? {} : styles.padding,
            customScreenStyle,
          ]}>
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: Colors.SCREEN_BG,
    flex: 1,
  },
  scrollViewContainer: {
    backgroundColor: Colors.SCREEN_BG,
  },
  view: {
    backgroundColor: Colors.SCREEN_BG,
    flex: 1,
    flexGrow: 1,
  },
  padding: {
    padding: 16,
  },
});

export default Screen;
