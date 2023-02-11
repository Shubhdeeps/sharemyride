import { auth, database } from "./firebaseConfig"

const chatRef = database.ref().child("messages");
const currUserId = auth.currentUser?.uid as string;

export const getChatMenuOfCurrentUser = () => {

}