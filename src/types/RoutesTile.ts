import { Timestamp } from "../service/firebase/firebaseConfig";

export type RouteTileDB = {
    depart: string;
    arrive: string;
    country: string;
    routeId: string;
    created: typeof Timestamp;
}