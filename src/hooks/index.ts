import {useEffect, useState} from 'react';
import {Ride, RideMatch} from 'src/types/Ride';

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

export function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
