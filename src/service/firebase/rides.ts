import { auth, FieldValue, firestore, timestamp, Timestamp } from "./firebaseConfig"
import { NewRideModal, RideDB } from "../../types/ride.model";
import { Contact } from "../../types/Requst.modal";
import { NotificationType } from "../../types/notification.model";
import { sendNotification } from "./notification";

// Ride
export const getSingleRideBasedOnRideId = async (rideId: string, setError: Function, setLoading: Function, setData: Function,) => {
    setLoading(true);
    try{    
        const rideDoc = await firestore.collection("rides").doc(rideId).get();
        const rideData = rideDoc.data() as RideDB;
        setData(rideData);
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
export const getRideCardsBasedOnRouteId = async (routeId: string, setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp, order: "asc" | "desc", filter: "ALL" | "MINE") => {
    setLoading(true);
    try{
        let data: any;
        if(filter === "ALL"){
            data =  await firestore.collection("rides").where("routeId", "==", routeId).where("status", "==", "ongoing").orderBy("actualStartTime", order).startAfter(lastItemDate).limit(10).get();
        } else {
            data =  await firestore.collection("rides").where("routeId", "==", routeId).where("status", "==", "ongoing").where("authorId", "==", auth.currentUser?.uid).orderBy("actualStartTime", order).startAfter(lastItemDate).limit(10).get();
        }
           
        setData(data.docs.map((doc: any) => 
        {
        const data = doc.data();
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
        status: "ongoing",
        actualStartTime: data.departTime[data.departTime.length - 1],
        actualEndTime: data.arriveTime[data.arriveTime.length - 1],
    })
    
}

//Requests

export const requestToJoinTheRide = async (rideId: string, description: string, setStatus: Function, contact: Contact, rideAuthorId: string, role: "passenger" | "ride" | "ticket") => {
    setStatus("loading");
    const uid = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL as string;
    const displayName = auth.currentUser?.displayName as string;

    try{
        await firestore.collection("user_requestsJunction").doc(`${uid}_${rideId}`).set({
            uid,
            photoURL,
            displayName,
            created: timestamp.now(),
            rideId,
            description,
            contact,
            status: "pending"
        })

        const newNotification: NotificationType ={
            content: `${displayName.split(" ")[0]} requested to join the ride.`,
            displayName,
            parent: role,
            photoURL,
            postId: rideId,
            recipientId: rideAuthorId
        }
        sendNotification(rideAuthorId, newNotification);
        setStatus("success")
    } catch(e){
        setStatus("error")
    }
}

/**
 * Single Ride and its requests
 * @param rideId 
 * @param setError 
 * @param setLoading 
 * @param setData 
 */
export const getRideRequestsBasedOnRideId = async (rideId: string,  setError: Function, setLoading: Function, setData: Function) => {
    setLoading(true);
    try{
        const rideRequestDocs = await firestore.collection("user_requestsJunction").where("rideId", "==", rideId).get();
        const rideRequests = rideRequestDocs.docs.map((request) => request.data());
        setLoading(false);
        setData(rideRequests);
    } catch (e: any){
        console.log(e)
        setLoading(false);
        setError(e.message)

    }
}

// Accept or reject a ride
export const requestIdUpdateStatus = async (userId: string, rideId: string, status: "rejected" | "accepted", setLoading: Function, parent: "passenger" | "ride" | "ticket") => {
    try{

        setLoading(true);
        const requestId = `${userId}_${rideId}`;
        await firestore.collection("user_requestsJunction").doc(requestId).update({
        status
    })
    if(status === "accepted" && parent === "ride"){
        await firestore.collection("rides").doc(rideId).update({
            passengerUids: FieldValue.arrayUnion(userId)
        })
    }
    const displayName = auth.currentUser?.displayName as string;
    const notificationData: NotificationType = {
        displayName,
        content: `${displayName} ${status} your request to join the ride.`,
        parent,
        photoURL: auth.currentUser?.photoURL as string,
        postId: rideId,
        recipientId: userId
    }
    sendNotification(userId, notificationData);
    setLoading(false);
    } catch(e: any){
    console.log(e);
    }
}