import { Timestamp } from "../service/firebase/firebaseConfig";

export type MarketPlaceDB = MarketPlace & {
    authorId: string;
    authorName: string;
    created: typeof Timestamp;
    commuteId: string;

  };

  export type MarketPlace = {
    status: "Onsale" | "Sold" | "cancelled";
    price: number;
    commute: "bus" | "train";
    startPoint: string;
    endPoint: string;
    country: string;
    startTime: typeof Timestamp;
    endTime: typeof Timestamp;
    messenger: string;
    whatsapp: string;
    text: string;
    authorId: string;
  };

  export type CommuteOffer = {
    displayName: string;
    created: typeof Timestamp;
    offeredPrice: number;
    additionalInfo: string;
    parentCommute: string;
    status: "pending" | "rejected" | "accepted",
    offerId: string;
    contact: {
      messenger: string;
      whatsapp: string;
      text: string;
    }
}