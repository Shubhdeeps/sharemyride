import { Timestamp } from "../service/firebase/firebaseConfig";

export type User = {
    uid: string;
    username: string;
    imageURL: string;
    joined: typeof Timestamp;
    transfers: number;
    displayName: string;
};