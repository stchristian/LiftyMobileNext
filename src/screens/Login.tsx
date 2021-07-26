import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import {useGoogleSignin, useLogin} from 'hooks/auth';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'shared/Button';
import Screen from 'shared/Screen';
import {TextInput} from 'shared/TextInput';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
const Login = () => {
  const [email, setEmail] = useState('hubner.krisztian97@gmail.com');
  const [password, setPassword] = useState('liftyapp');

  const [userInfo, inProgress, signIn] = useGoogleSignin();
  const login = useLogin();

  useEffect(() => {
    return () => {
      GoogleSignin.signOut();
    };
  }, []);
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[font.title_xl, font.center, spacing.bottom]}>
          Bejelentkezés
        </Text>
        <TextInput
          label="Email *"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Jelszó *"
          value={password}
          type="password"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button
        text="bejelentkezés"
        size="big"
        onPress={() => login(email, password)}
      />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={inProgress}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
