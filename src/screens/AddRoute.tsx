import React from 'react';
import {View} from 'react-native';
import {TextInput} from '../shared/TextInput';
import MapView from '../shared/MapView';
import {Button} from '../shared/Button';
import screenStyles from '../assets/styles/screen';
import spacingStyles from '../assets/styles/spacing';
import {AddRouteProps} from '../navigation/Props';
import Header from 'shared/Header';

export type AddRouteParams = {
  source?: any;
  destination?: any;
};

export const AddRouteScreen = React.memo(
  ({
    navigation,
    route: {
      params: {source, destination},
    },
  }: AddRouteProps) => {
    const handleSourceFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'source'});
    };

    const handleDestinationFocus = () => {
      navigation.navigate('LocationFinder', {resultKey: 'destination'});
    };

    return (
      <>
        <Header title="Útvonal hozzáadása" />
        <View style={screenStyles.default}>
          <View style={{flex: 1}}>
            <MapView
              style={{...spacingStyles.bottom, flex: 1, marginHorizontal: -16}}
            />
            <View style={{flex: 1}}>
              <TextInput
                label="Indulás"
                value={source?.label}
                style={spacingStyles.bottom}
                onFocus={handleSourceFocus}
              />
              <TextInput
                label="Érkezés"
                value={destination?.label}
                style={spacingStyles.bottom}
                onFocus={handleDestinationFocus}
              />
            </View>
          </View>
          <Button text="Útvonal felvétele" onPress={() => {}} />
        </View>
      </>
    );

    return (
      <Container>
        <Navbar title={'Szokásos útvonal'} />
        <Content contentContainerStyle={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.srcollView}>
            <Text style={styles.subTitle}>
              Add meg azt a két pontot, amik között a leggyakrabban ingázol!
            </Text>
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                region={{
                  latitude: 47.497913,
                  longitude: 19.040236,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}>
                {origin.latitude && <Marker key={'orig'} coordinate={origin} />}
                {destination.latitude && (
                  <Marker key={'dest'} coordinate={destination} />
                )}
              </MapView>
            </View>
            <PlacesAutoComplete
              label="Indulási hely"
              onPlaceSelect={handleOptionClicked}
            />
            <PlacesAutoComplete
              label="Cél"
              onPlaceSelect={handleOptionClicked}
            />
            <Item
              underline={false}
              rounded
              style={styles.formItem}
              error={!!errors.name}>
              <FormItemLabel>Elnevezés</FormItemLabel>
              <Icon type={'FontAwesome5'} name="route" style={styles.icon} />
              <Input
                onChangeText={text => {
                  setValue('name', text);
                }}
              />
            </Item>
            {!!errors.name && <FormError>{errors.name.message}</FormError>}
            <Button
              full
              rounded
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              <Text>tovább</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  },
);
