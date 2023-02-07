import { Timestamp } from "../service/firebaseConfig";

export type PassengerModel = {
    stoppages: string[],
    departTime: typeof Timestamp[],
    arriveTime: typeof Timestamp[],
    departFrom: string,
    arriveAt: string,
    cost: number,
    dayOfTravel: Date | null,
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