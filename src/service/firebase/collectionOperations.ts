import { RideDB } from "../../types/ride.model";
import { auth, firestore, timestamp, Timestamp } from "./firebaseConfig"


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
export const getRouteTilesData =  async (setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp | undefined, countryName: string | undefined, setNoMoreRides: Function) => {
    setLoading(true);
    try{
        const data = await fetchRouteTiles(countryName, lastItemDate);
        const newData = data.docs.map((doc: any) => doc.data())
        if(!newData.length){
            setNoMoreRides("No more routes")
        }
        setData(newData);
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

// schedule

export const getMyScheduledRides = async (setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp, setNoMoreRides:Function, status: "ongoing" | "all") => {
   setLoading(true);
   const currUserId = auth.currentUser?.uid as string;
   try{
       let data;
       if(status === "ongoing"){
           data = await firestore.collection("rides").where("status", "==", "ongoing").where("passengerUids", "array-contains", currUserId).orderBy("actualStartTime", "asc").startAfter(lastItemDate).limit(10).get();   
        }else {
            data = await firestore.collection("rides").where("passengerUids", "array-contains", currUserId).orderBy("actualStartTime", "asc").startAfter(lastItemDate).limit(10).get();   
        }
       const newData = data.docs.map((doc: any) => 
       {
       const data = doc.data();
       const rideTicektId = doc.id;
         return {
           ...data, 
           rideTicektId
         } as RideDB
       }
       )
       if(!newData.length){
        setNoMoreRides("No more scheduled rides")
       }
       setData(newData);
       setLoading(false);
   } catch (e: any) {
       console.log(e)
       setError(e.message);
       setLoading(false);
   }
}

export const reportATicket = async (ticketId: string, comment: string, type: "ride" | "passenger" | "market") => {
    const currUserId = auth.currentUser?.uid as string;
    await firestore.collection("reports").add({
        created: timestamp.now(),
        type,
        comment,
        ticketId,
        reportedBy: currUserId,
        
    })
}


// feed back and report 

export const setFeedBack = async (feedback: string, report: string) => {
    const currUserId = auth.currentUser;
    await firestore.collection("feedback-report").add({
        created: timestamp.now(),
        authorUid: currUserId?.uid,
        authorName: currUserId?.displayName,
        feedback,
        report
    })
}