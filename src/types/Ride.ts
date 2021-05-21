export class Ride {
  id: string;
  time: Date;
  from: string;
  to: string;
  routeName: string;

  constructor(data: any) {
    this.id = data.id;
    this.time = data.time;
    this.from = data.from;
    this.to = data.to;
    this.routeName = data.routeName;
  }
}

export type RideMatch = {
  driverName: string;
  from: string;
  to: string;
  time: Date;
  freePlaces: number;
  rideId: string;
};
