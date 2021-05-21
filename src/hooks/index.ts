import {Ride, RideMatch} from 'src/types/Ride';

export const useMyRoutes = () => {
  return [
    {
      id: 123,
      name: 'Otthonról melóba',
      from: 'X. Bp Szent László tér',
      to: 'V. Karinthy Frigyes utca 2.',
    },
    {
      id: 124,
      name: 'Melóból haza',
      to: 'X. Bp Szent László tér',
      from: 'V. Karinthy Frigyes utca 2.',
    },
  ];
};

export const useRide = (rideId: string) => {
  return {
    id: rideId,
    time: new Date('2021-05-12'),
    routeName: 'Melóból haza',
    to: 'X. Bp Szent László tér',
    from: 'V. Karinthy Frigyes utca 2.',
  } as Ride;
};

export const useRideMatches = (ride: Ride) => {
  return {
    loading: false,
    rideMatches: [
      {
        driverName: 'Ernő',
        from: 'Bp, Esernyő utca 2.',
        to: 'XV. kerület, Hadak útja 22.',
        freePlaces: 2,
        time: ride.time,
        rideId: '1',
      },
      {
        driverName: 'Sanyi',
        from: 'Bp, Esernyő utca 2.',
        to: 'XV. kerület, Hadak útja 22.',
        freePlaces: 1,
        time: ride.time,
        rideId: '2',
      },
    ] as RideMatch[],
  };
};
