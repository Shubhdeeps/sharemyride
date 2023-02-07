 /* eslint-disable */ 
 import { signal } from "@preact/signals-react";
import firebase from "firebase";
 
 
 // Users
 export const currentUserProfile = signal<firebase.User | null>(null);