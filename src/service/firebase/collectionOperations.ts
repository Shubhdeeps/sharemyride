import { NewRideModal, RideDB } from "../../types/ride.model";
import { auth, database, FieldValue, firestore, timestamp, Timestamp } from "./firebaseConfig"
import firebase from "firebase";
import { Contact } from "../../types/Requst.modal";
import { capitalizeFirstLetter } from "../helperFunctions/captalizeFirstLetter";


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
            depart: depart.toLowerCase(),
            arrive: arrive.toLowerCase(),
            country: country.toLowerCase(),
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
export const getRouteTilesData =  async (setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp | undefined, countryName: string | undefined) => {
    setLoading(true);
    try{
        const data = await fetchRouteTiles(countryName, lastItemDate);
        setData(data.docs.map((doc: any) => doc.data()));
        setLoading(false);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}

const fetchRouteTiles = async (countryName: string | undefined, lastItemDate: typeof Timestamp | undefined) => {
    if(!!countryName && lastItemDate){
        return await firestore.collection("routes").where("country", "==", countryName.toLowerCase()).orderBy("created", "desc").startAfter(lastItemDate).limit(5).get();
    }
    if(!!countryName){
        return await firestore.collection("routes").where("country", "==", countryName.toLowerCase()).orderBy("created", "desc").limit(5).get();
    }
    if(lastItemDate){
        return await firestore.collection("routes").orderBy("created", "desc").startAfter(lastItemDate).limit(5).get();
    }
    return await firestore.collection("routes").orderBy("created", "desc").limit(5).get();
}

//FAVOURITE

//remove from favourite 
export const removeFromFavourite = (depart: string, arrive: string, country: string) => {
    const routeId = `${depart.toLowerCase()}_${arrive.toLowerCase()}_${country.toLowerCase()}`
    const userId = auth.currentUser?.uid;
    const userFavRouteId = `${userId}_${routeId}`;
    firestore.collection("userFavouriteRoutes").doc(userFavRouteId).delete();
}
// add to favourites
export const addRouteToFavourite = (depart: string, arrive: string, country: string) => {
    const routeId = `${depart.toLowerCase()}_${arrive.toLowerCase()}_${country.toLowerCase()}`
    const userId = auth.currentUser?.uid;
    firestore.collection("userFavouriteRoutes").doc(`${userId}_${routeId}`).set({
        uid: userId,
        depart: depart.toLowerCase(),
        arrive: arrive.toLowerCase(),
        country: country.toLowerCase(),
        routeId,
        created: timestamp.now()
    })
}
// fetch favourites
export const getFavouriteRouteTiles =  async (setError: Function, setLoading: Function, setData: Function) => {
    setLoading(true);
    try{
        const data = await firestore.collection("userFavouriteRoutes").where("uid", "==", auth.currentUser?.uid).get();
        setData(data.docs.map((doc: any) => doc.data()));
        setLoading(false);
    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}

//Rides
export * from "./rides";


//Passsenger
export * from "./passenger";
