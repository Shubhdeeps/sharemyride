import { Timestamp } from "../service/firebase/firebaseConfig"

export type FeedModal = {
    text: string,
    author: string,
    displayName: string,
    photoURL: string,
    likes: number,
}

export type FeedModalDB = FeedModal & {created: typeof Timestamp, id: string} 