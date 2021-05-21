import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, View, FlatList, Text, ListRenderItem} from 'react-native';
import {LocationFinderProps} from '../navigation/Props';
import screenStyles from '../assets/styles/screen';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Colors} from '../assets/colors';
import fontStyles from '../assets/styles/font';
import Header from 'shared/Header';
import {TextInput} from 'shared/TextInput';
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
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([
    {label: '3600 Ózd, Egyház völgy 2', value: 123},
    {label: '1115 Budapest, Etele út 40/b', value: 22},
  ]);

  const handleLocationSelected = (loc: LocationOption) => {
    navigation.navigate('AddRoute', {
      [resultKey]: loc,
    });
  };

  const renderItem: ListRenderItem<LocationOption> = ({item}) => (
    <TouchableHighlight
      onPress={() => handleLocationSelected(item)}
      style={styles.listItem}>
      <Text style={fontStyles.textInput}>{item.label}</Text>
    </TouchableHighlight>
  );

  return (
    <>
      <Header title="Hely keresése">{/* <TextInput */}</Header>
      <View style={screenStyles.default}>
        <TextInput placeholder={'Keresés...'} />
        <FlatList<LocationOption>
          data={locationOptions}
          renderItem={renderItem}
          keyExtractor={item => item.value}
        />
      </View>
    </>
  );
  const [input, setInput] = useState('');

  const fetchPlaceSuggestions = useFetchPlaceSuggestions();
  const [debouncedInput] = useDebounce(input, 600);
  const currentLocation = useCurrentLocation();

  useEffect(() => {
    let effect = true;
    if (debouncedInput.length !== 0) {
      fetchPlaceSuggestions(debouncedInput, currentLocation).then(options => {
        effect && setPlaceOptions(options);
      });
    }
    return () => {
      effect = false;
    };
  }, [debouncedInput, fetchPlaceSuggestions, currentLocation]);

  const handleOptionSelected = useCallback(
    (option: PlaceSuggestion) => {
      navigation.navigate('SignupRoute', {[key]: option});
    },
    [navigation, key],
  );

  return (
    <Container>
      <Navbar
        customContent={
          <Input
            style={styles.input}
            placeholder="Find place..."
            onChangeText={text => setInput(text)}
          />
        }
      />

      <Content>
        {placeOptions.map(option => (
          <ListItem
            key={option.value}
            onPress={() => {
              handleOptionSelected(option);
            }}>
            <Body>
              <Text>{option.label}</Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  listItem: {
    // height: 48,
    marginHorizontal: 16,
    paddingVertical: 15.5,
    borderBottomColor: Colors.INPUT_BORDER_COLOR,
    borderBottomWidth: 1,
  },
});
