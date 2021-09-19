import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Header from 'shared/Header';
import Screen from 'shared/Screen';
import ProfilePicture from 'shared/ProfilePicture';
import spacing from 'assets/styles/spacing';
import { useLoggedInUser, useLogout } from 'hooks/auth';
import { TextInput } from 'shared/TextInput';
import font from 'assets/styles/font';
import { Button } from 'shared/Button';
import Person from 'shared/figures/Person';
import PhoneNumber from 'shared/figures/Phone';
import Email from 'shared/figures/Email';
import { updateUser } from '../api/firestore';
import { User } from 'lifty-types';
import { useAppDispatch } from 'hooks/store';
import { setUser } from '../store/actionCreators';

const INVALID_PHONE_NUMBER =
  'Pontosan 11 karakter és csak számok! Például: 06301234567';
const INVALID_FIRST_NAME = 'Kötelező mező!';
const INVALID_LAST_NAME = 'Kötelező mező!';

const getNameError = (name: string, message: string) => {
  if (!name || !name.length) {
    return message;
  }
};

const getPhoneNumberError = (phoneNumber: string | null) => {
  if (phoneNumber && !phoneNumber.match(/^[0-9]{11}$/g)) {
    return INVALID_PHONE_NUMBER;
  }
};

type UserDetailErrors = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

const PersonalDetails = ({ navigation }: any) => {
  const user = useLoggedInUser() as User;
  const [localUser, setLocalUser] = useState({ ...user });
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const [saving, setSaving] = useState(false);

  const logout = useLogout();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({} as UserDetailErrors);

  const [hasError, setHasError] = useState(false);
  const goToProfile = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const saveData = useCallback(async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    const newUserData = await updateUser(user.uid, localUser);
    dispatch(
      setUser({
        ...user,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        phoneNumber: newUserData.phoneNumber,
      }),
    );

    goToProfile();
  }, [saving, dispatch, goToProfile, localUser, user]);

  useEffect(() => {
    setErrors({
      firstName: getNameError(localUser.firstName, INVALID_FIRST_NAME),
      lastName: getNameError(localUser.lastName, INVALID_LAST_NAME),
      phoneNumber: getPhoneNumberError(localUser.phoneNumber),
    });

    setDataHasChanged(
      localUser.firstName !== user?.firstName ||
        localUser.lastName !== user?.lastName ||
        localUser.phoneNumber !== user.phoneNumber,
    );
  }, [localUser, setErrors, user]);

  useEffect(() => {
    // @ts-ignore
    setHasError(Object.keys(errors).some(errorKey => errors[errorKey]));
  }, [errors]);

  if (!user) {
    //TODO Fix logout!
    return <Text>Get out!</Text>;
  }

  return (
    <Screen
      header={<Header title="Beállítások" titlePosition="center" />}
      scrollable>
      <View style={[styles.profileContainer]}>
        <ProfilePicture
          size="big"
          style={spacing.right}
          src={localUser!.photoURL || undefined}
        />
      </View>
      <View>
        <View style={[styles.input]}>
          <TextInput
            leftIcon={<Person />}
            label={'Vezetéknév *'}
            value={localUser?.lastName}
            errorMessage={errors.lastName}
            onChangeText={lastName =>
              setLocalUser(prev => ({ ...prev, lastName }))
            }
          />
        </View>
        <View style={[styles.input]}>
          <TextInput
            leftIcon={<Person />}
            label={'Keresztnév *'}
            value={localUser?.firstName}
            errorMessage={errors.firstName}
            onChangeText={firstName =>
              setLocalUser(prev => ({ ...prev, firstName }))
            }
          />
        </View>
        <View style={[styles.input]}>
          <TextInput
            leftIcon={<PhoneNumber />}
            label={'Telefonszám'}
            placeholder={'06301122345'}
            value={localUser.phoneNumber || ''}
            errorMessage={errors.phoneNumber}
            onChangeText={phoneNumber =>
              setLocalUser(prev => ({ ...prev, phoneNumber }))
            }
          />
        </View>
        <View style={[styles.input]}>
          <Text style={[font.tiny]}>
            Telefonszámod csak azok számára lesz látható akikkel te megosztod!
          </Text>
        </View>
        <View style={[styles.input]}>
          <TextInput
            leftIcon={<Email />}
            label={'Email'}
            editable={false}
            value={localUser.email}
          />
        </View>
        <View style={[styles.input]}>
          <Text style={[font.tiny]}>
            A fiókod az email címedhez van kötve, így nem tudod megváltoztatni.
          </Text>
        </View>
      </View>
      <View>
        <Text style={[font.normal]}>Egyéb beállítások</Text>
      </View>
      <View style={[styles.logoutContainer]}>
        <Pressable onPress={() => logout()}>
          <Text style={[font.normal_bold]}>Kijelentkezés</Text>
        </Pressable>
      </View>
      <View>
        <Button
          disabled={!dataHasChanged || hasError || saving}
          text={'Mentés'}
          onPress={saveData}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  input: {
    paddingBottom: 15,
  },
  logoutContainer: {
    paddingBottom: 30,
    paddingTop: 30,
  },
});

export default PersonalDetails;
