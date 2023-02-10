import { auth, FieldValue, firestore, timestamp, Timestamp } from "./firebaseConfig"
import { PassengerDB, PassengerModel } from "../../types/passenger.model";


// Ride
export const getSinglePassengerBasedOnRideId = async (passengerId: string, setError: Function, setLoading: Function, setData: Function) => {
    setLoading(true);
    try{    
        const passengerDoc = await firestore.collection("passengers").doc(passengerId).get();
        const passengerData = passengerDoc.data() as PassengerDB;
        setData(passengerData);
        setLoading(false);
    } catch (e: any){
        setLoading(false);
        setError(e.message);
    }
}
/**
 * 
 * @param routeId 
 * @param setError 
 * @param setLoading 
 * @param setData 
 * @param lastItemDate 
 * @param order 
 */
export const getPassengerCardsBasedOnRouteId = async (routeId: string, setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp, order: "asc" | "desc", filter: "ALL" | "MINE") => {
    setLoading(true);
    try{
        let data: any;
        if(filter === "ALL"){
            data =  await firestore.collection("passengers").where("routeId", "==", routeId).where("status", "==", "ongoing").orderBy("actualStartTime", order).startAfter(lastItemDate).limit(10).get();
        } else {
            data =  await firestore.collection("passengers").where("routeId", "==", routeId).where("status", "==", "ongoing").where("authorId", "==", auth.currentUser?.uid).orderBy("actualStartTime", order).startAfter(lastItemDate).limit(10).get();
        }
           
        setData(data.docs.map((doc: any) => 
        {
        const data = doc.data();
        const passengerTicektId = doc.id;
          return {
            ...data, 
            passengerTicektId
          } as PassengerDB
        }
        ));
        setLoading(false);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}


export const createNewPassengerTile = (data: PassengerModel, routeId: string) => {
    const authorId = auth.currentUser?.uid as string;
    const photoURL = auth.currentUser?.photoURL as string;
    const displayName = auth.currentUser?.displayName as string;

    firestore.collection("passengers").add({
        ...data,
        routeId,
        authorId,
        photoURL,
        displayName,
        created: timestamp.now(),
        status: "ongoing"
    })
    
}

//Requests


/**
 * Single Ride and its requests
 * @param passengerId 
 * @param setError 
 * @param setLoading 
 * @param setData 
 */
export const getPassengerRequestsBasedOnRideId = async (passengerCardId: string,  setError: Function, setLoading: Function, setData: Function) => {
    setLoading(true);
    try{
        const passengerRequestDocs = await firestore.collection("user_requestsJunction").where("rideId", "==", passengerCardId).get();
        const passengerRequests = passengerRequestDocs.docs.map((request) => request.data());
        setLoading(false);
        setData(passengerRequests);
    } catch (e: any){
        console.log(e)
        setLoading(false);
        setError(e.message)

    }
}

// Accept or reject a passenger
export const requestIdUpdatePassengerStatus = async (userId: string, passengerCardId: string, status: "rejected" | "accepted", setLoading: Function) => {
    setLoading(true);

    const requestId = `${userId}_${passengerCardId}`;
    await firestore.collection("user_requestsJunction").doc(requestId).update({
        status
    })
    if(status === "accepted"){
        firestore.collection("passengers").doc(passengerCardId).update({
            status: "occupied"
        })
    }
    setLoading(false);
}