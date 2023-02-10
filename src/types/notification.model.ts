import { Timestamp } from "../service/firebase/firebaseConfig";

export type NotificationType = {
    displayName: string;
    photoURL: string;
    content: string;
    postId: string;
    parent: "ride" | "passenger" | "ticket";
    recipientId: string;
}

export type NotificationDB = NotificationType & { created: typeof Timestamp; }