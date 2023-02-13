import { Timestamp } from "../service/firebase/firebaseConfig";

export type NewRideModal = {
    stoppages: string[];
    departTime: typeof Timestamp[];
    arriveTime: typeof Timestamp[];
    departFrom: string;
    arriveAt: string;
    cost: number;
    passengerSeats: number;
    contact: {
      messanger: string,
      whatsapp: string,
      text: string,
    };
    privacy: {
      petsAllowed: boolean | null;
      acceptParcel: boolean | null;
      EVCar: boolean | null;
      showContact: boolean | null;
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