import font from 'assets/styles/font';
import spacing from 'assets/styles/spacing';
import {useLogin} from 'hooks/auth';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'shared/Button';
import Screen from 'shared/Screen';
import {TextInput} from 'shared/TextInput';

const Login = () => {
  const [email, setEmail] = useState('hubner.krisztian97@gmail.com');
  const [password, setPassword] = useState('liftyapp');
  const login = useLogin();

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
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button
        text="bejelentkezés"
        size="big"
        onPress={() => login(email, password)}
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
