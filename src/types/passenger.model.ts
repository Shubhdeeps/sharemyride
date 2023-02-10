import { Timestamp } from "../service/firebase/firebaseConfig";

export type PassengerModel = {
    actualStartTime: typeof Timestamp,
    actualEndTime: typeof Timestamp,
    departFrom: string,
    arriveAt: string,
    cost: number,
    additionalInfo: {
        eventName: string,
        eventURL: string,
        passengerCount: number,
        carryingLuggage: string;
        details: string;
    },
    contact: {
        messanger: string,
        whatsapp: string,
        text: string,
    },
    privacy: {
        petsAllowed: boolean | null,
        EVCar: boolean | null,
        showContact: boolean | null,
        requestDoorToDoor: boolean | null;
    },
};

export type PassengerDB = PassengerModel & {
    authorId: string; 
    created: typeof Timestamp;
    routeId: string;  
    passengerTicektId: string;
    photoURL: string;
    displayName: string;
    actualStartTime: typeof Timestamp;
    actualEndTime: typeof Timestamp;
    status: "occupied" | "ongoing" | "cancelled"
}