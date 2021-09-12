import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import {useGoogleSignin} from 'hooks/auth';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Screen from 'shared/Screen';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
const Login = () => {
  // const [email, setEmail] = useState('hubner.krisztian97@gmail.com');
  // const [password, setPassword] = useState('liftyapp');
  // const login = useLogin();
  const {inProgress, signIn} = useGoogleSignin();

  useEffect(() => {
    return () => {
      GoogleSignin.signOut();
    };
  }, []);
  return (
    <Screen>
      <View style={styles.container}>
        {/*
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
        /> */}
        <Text style={[font.title_xl, font.center, spacing.bottom]}>
          Bejelentkezés
        </Text>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={inProgress}
        />
      </View>
      {/* <Button
        text="bejelentkezés"
        size="big"
        onPress={() => login(email, password)}
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  googleButton: {width: '80%', height: 48, alignSelf: 'center'},
});

export default Login;
