import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, DateObject, LocaleConfig} from 'react-native-calendars';
import screenStyles from '../assets/styles/screen';
import fontStyles from '../assets/styles/font';
import {Colors} from '../assets/colors';
import mapValues from 'lodash/mapValues';
import {Button} from '../shared/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {hu} from 'src/utils/locales';

LocaleConfig.locales.hu = hu.date;
LocaleConfig.defaultLocale = 'hu';

const RideItem = ({name, from, to}: any) => {
  return (
    <View style={styles.rideItem}>
      <Text style={fontStyles.normal_bold}>{name}</Text>
      <Text style={fontStyles.tiny}>{from}</Text>
      <Text style={fontStyles.tiny}>{to}</Text>
    </View>
  );
};

const MyRides = ({navigation}: any) => {
  const [dateToRides, setDateToRides] = useState({
    '2021-05-16': [
      {
        id: '123',
        name: 'Otthonról melóba',
        from: '2890 Tata, Gábor Áron u. 32',
        to: '1075 Budapest, Károly krt. 9.',
      },
      {
        id: '1235',
        name: 'Melóból haza',
        from: '2890 Tata, Gábor Áron u. 32',
        to: '1075 Budapest, Károly krt. 9.',
      },
      {
        id: '12333',
        name: 'Ide meg oda',
        from: '2890 Tata, Gábor Áron u. 32',
        to: '1075 Budapest, Károly krt. 9.',
      },
    ],
  });

  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

  const handleDayPressed = (date: DateObject) => {
    setSelectedDate(date);
  };

  const markedDates = useMemo(
    () => ({
      ...mapValues(dateToRides, () => ({
        customStyles: {
          container: {
            backgroundColor: Colors.PRIMARY,
          },
          text: {
            color: Colors.ON_PRIMARY,
          },
        },
      })),
      ...(selectedDate
        ? {
            [selectedDate.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                },
                text: {
                  color: '#ffffff',
                },
              },
            },
          }
        : {}),
    }),
    [dateToRides, selectedDate],
  );

  const handleAddRideRequest = () => {
    navigation.navigate('HomeStack', {
      screen: 'AddRide',
      params: {
        timestamp: selectedDate?.timestamp,
      },
    });
  };

  const ridesExistForSelectedDate =
    selectedDate && selectedDate.dateString in dateToRides;

  return (
    <ScrollView contentContainerStyle={screenStyles.default}>
      <Calendar
        theme={{
          textDayFontFamily: 'Exo2',
          textDayHeaderFontFamily: 'Exo2',
          todayTextColor: Colors.PRIMARY,
        }}
        markingType="custom"
        markedDates={markedDates}
        style={styles.calendarStyle}
        hideArrows={true}
        enableSwipeMonths={true}
        onDayPress={handleDayPressed}
        renderHeader={date => (
          <View style={styles.header}>
            <Text style={styles.headerMonth}>
              {
                /*@ts-ignore */
                LocaleConfig.locales[LocaleConfig.defaultLocale]
                  .monthNamesShort[date.getMonth()]
              }
            </Text>
            <Text style={styles.headerYear}>{` ${date.getFullYear()}`}</Text>
          </View>
        )}
      />

      <View style={styles.myRides}>
        <Text style={styles.myRidesHeader}>Utazásaim</Text>

        {ridesExistForSelectedDate ? (
          dateToRides[selectedDate.dateString].map(ride => (
            <RideItem {...ride} key={ride.id} />
          ))
        ) : (
          <Text style={styles.noRides}>
            Erre a napra még nem vettél fel utazást
          </Text>
        )}
        {selectedDate && (
          <Button
            text="Utazás hozzáadása"
            size="big"
            onPress={handleAddRideRequest}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    marginHorizontal: -16,
  },
  header: {flexDirection: 'row'},
  headerMonth: {
    ...fontStyles.title_xl,
  },
  headerYear: {
    ...fontStyles.title_xl,
  },
  noRides: {
    textAlign: 'center',
    marginVertical: 16,
  },
  myRides: {
    marginHorizontal: -screenStyles.default.padding,
    marginBottom: -screenStyles.default.padding,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    backgroundColor: Colors.GREY_BG,
    padding: screenStyles.default.padding,
  },
  myRidesHeader: {
    ...fontStyles.title_xl,
    marginVertical: 16,
  },
  rideItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.SCREEN_BG,
    borderRadius: 24,
    marginBottom: 8,
  },
});

export default MyRides;
