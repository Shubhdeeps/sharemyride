import { Timestamp } from "../service/firebaseConfig";

export type RouteTileDB = {
    depart: string;
    arrive: string;
    country: string;
    routeId: string;
    created: typeof Timestamp;
}