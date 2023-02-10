import { Timestamp } from "../service/firebase/firebaseConfig"

export type RequestsDB = {
    created: typeof Timestamp;
    description: string;
    displayName: string;
    photoURL: string;
    rideId: string;
    uid: string;
    contact: Contact;
    status: "pending" | "accepted" | "rejected"
}

export type Contact = {
    messanger: string,
    whatsapp: string,
    text: string,
}