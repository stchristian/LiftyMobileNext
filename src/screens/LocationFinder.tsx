import React, {useCallback, useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ListRenderItem,
  Pressable,
} from 'react-native';
import {LocationFinderProps} from '../navigation/Props';
import {Colors} from '../assets/colors';
import fontStyles from '../assets/styles/font';
import Header from 'shared/Header';
import {TextInput} from 'shared/TextInput';
import Screen from 'shared/Screen';
import {useDebounce} from 'hooks/index';
import {getPlaces} from 'src/api/google';
export type LocationFinderParams = {initialValue?: string; resultKey: string};
export type LocationOption = {
  label: string;
  value: any;
};

export default function LocationFinder({
  route: {
    params: {resultKey},
  },
  navigation,
}: LocationFinderProps) {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef(null);
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    //@ts-ignore
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (debouncedKeyword) {
      getPlaces(debouncedKeyword).then(candidates => {
        mounted &&
          setLocationOptions(
            candidates.map(candidate => ({
              label: candidate.formatted_address,
              value: candidate,
            })),
          );
      });
    } else {
      setLocationOptions([]);
    }
    return () => {
      mounted = false;
    };
  }, [debouncedKeyword]);

  const handleLocationSelected = (loc: LocationOption) => {
    navigation.navigate('AddRoute', {
      [resultKey]: loc.value,
    });
  };

  const renderItem: ListRenderItem<LocationOption> = ({item}) => (
    <Pressable
      onPress={() => handleLocationSelected(item)}
      style={styles.listItem}>
      <Text style={fontStyles.normal}>{item.label}</Text>
    </Pressable>
  );

  return (
    <Screen header={<Header title="Hely keresése" />}>
      <TextInput
        placeholder={'Keresés...'}
        rightIcon="my-location"
        ref={inputRef}
        onChangeText={text => setKeyword(text)}
        onRightIconPress={() => console.log('HEY')}
      />
      <FlatList<LocationOption>
        data={locationOptions}
        renderItem={renderItem}
        keyExtractor={item => item.value.place_id}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 16,
    paddingVertical: 15.5,
    borderBottomColor: Colors.INPUT_BORDER_COLOR,
    borderBottomWidth: 1,
  },
});
