import { NewRideModal, RideDB } from "../types/ride.model";
import { auth, firestore, timestamp, Timestamp } from "./firebaseConfig"
import firebase from "firebase";


export const logout = () => {
    auth.signOut();
}

//ROute

/**
 * 
 * @param depart 
 * @param arrive 
 * @param country 
 * @param setError 
 * @param setLoading 
 * @param setSuccess 
 */
export const createRouteTile = async (depart: string, arrive: string, country: string, setError: Function, setLoading: Function, setSuccess: Function) => {
    const routeId = `${depart.toLowerCase()}_${arrive.toLowerCase()}_${country.toLowerCase()}`
    setLoading(true);
    try{
        await firestore.collection("routes").doc(routeId).set({
            depart,
            arrive,
            country,
            routeId,
            created: timestamp.now()
        })
        setLoading(false);
        setError("");
        setSuccess(true);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}

/**
 * 
 * @param setError 
 * @param setLoading 
 * @param setData 
 */
export const getRouteTilesData =  async (setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp | undefined) => {
    setLoading(true);
    try{
        let data: any;
        if(!lastItemDate){
           data =  await firestore.collection("routes").orderBy("created", "desc").limit(5).get();
           
        } else {
            data = await firestore.collection("routes").orderBy("created", "desc").startAfter(lastItemDate).limit(5).get();
            
        }
        setData(data.docs.map((doc: any) => doc.data()));
        setLoading(false);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}



// Ride
/**
 * 
 * @param routeId 
 * @param setError 
 * @param setLoading 
 * @param setData 
 * @param lastItemDate 
 * @param order 
 */
export const getRideCardsBasedOnRouteId = async (routeId: string, setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp | undefined, order: "asc" | "desc") => {
    setLoading(true);
    try{
        let data: any;
        if(!lastItemDate){
           data =  await firestore.collection("rides").where("routeId", "==", routeId).orderBy("actualStartTime", order).limit(10).get();
           
        } else {
            data = await firestore.collection("rides").where("routeId", "==", routeId).orderBy("actualStartTime", order).startAfter(lastItemDate).limit(10).get();
            
        }
        setData(data.docs.map((doc: any) => 
        {
        const data = doc.data;
        const rideTicektId = doc.id;
          return {
            ...data, 
            rideTicektId
          } as RideDB
        }
        ));
        setLoading(false);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}

export const delayMySide = () => {
    //ride delay, update actualStartTime actualEndTime
}

export const createNewRideTile = (data: NewRideModal, routeId: string) => {
    const authorId = auth.currentUser?.uid as string;
    const photoURL = auth.currentUser?.photoURL as string;
    const displayName = auth.currentUser?.displayName as string;

    firestore.collection("rides").add({
        ...data,
        routeId,
        passengerUids: [],
        authorId,
        photoURL,
        displayName,
        created: timestamp.now(),
        actualStartTime: data.departTime[data.departTime.length - 1],
        actualEndTime: data.arriveTime[data.arriveTime.length - 1],
    })
    
}

export const requestToJoinTheRide = (rideId: string, description: string) => {
    const authorId = auth.currentUser?.uid;
    const now = Timestamp;

}

//Passsenger