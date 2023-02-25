import  firebase  from "firebase/app"
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyBiu-eO8P8iD0hPLhMwFSAyk35ZDx9aYQ0",
    authDomain: "travelshare-8af39.firebaseapp.com",
    projectId: "travelshare-8af39",
    storageBucket: "travelshare-8af39.appspot.com",
    messagingSenderId: "513851008643",
    appId: "1:513851008643:web:92ff3feb2814396fd2ddb6",
    databaseURL: "https://travelshare-8af39-default-rtdb.firebaseio.com/"
  };


  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const database = firebaseApp.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const FieldValue = firebase.firestore.FieldValue; 
export const Timestamp = firebase.firestore.Timestamp.now();
export const timestamp = firebase.firestore.Timestamp;
