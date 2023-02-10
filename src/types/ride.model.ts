import { Timestamp } from "../service/firebase/firebaseConfig";

export type NewRideModal = {
    stoppages: string[];
    departTime: typeof Timestamp[];
    arriveTime: typeof Timestamp[];
    departFrom: string;
    arriveAt: string;
    cost: number;
    passengerSeats: number;
    additionalInfo: {
      carType: string;
      carModel: string;
      carColor: string;
      luggageCapacity: string;
      eventName: string;
      eventURL: string;
      routeDescription: string;
    };
    contact: {
      messanger: string,
      whatsapp: string,
      text: string,
    };
    privacy: {
      petsAllowed: boolean | null;
      acceptParcel: boolean | null;
      rideHistory: boolean | null;
      customStoppageAllowed: boolean | null;
      showCarDetails: boolean | null;
      EVCar: boolean | null;
      cashOnly: boolean | null;
      showContact: boolean | null;
      allowDoorToDoorPickup: boolean | null;
    };
};

export type RideDB = NewRideModal & 
{
  authorId: string; 
  created: typeof Timestamp;
  routeId: string; 
  passengerUids: string[]; 
  rideTicektId: string;
  photoURL: string;
  displayName: string;
  actualStartTime: typeof Timestamp;
  actualEndTime: typeof Timestamp;
}