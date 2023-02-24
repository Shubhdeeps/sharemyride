//Notification

import { NotificationDB, NotificationType } from "../../types/notification.model";
import { auth, database, firestore, timestamp, Timestamp } from "./firebaseConfig";

export const notificationRef = firestore.collection("notifications");

export const sendNotification = (recipientUid: string, data: NotificationType) => {
    try{
        notificationRef.add({
            ...data,
            created: timestamp.now()
        });
        database.ref("notification/" + recipientUid).set({
            new: true,
        });
    } catch(e: any){
        console.log(e.message)
    }
}

export const getAllNotificationsByUid = async (setError: Function, setLoading: Function, setData: Function, lastVisibleItemDate: typeof Timestamp | undefined) => {
    const uid = auth.currentUser?.uid as string;
    setLoading(true);
    try{    
        let notificationDoc;
        if(lastVisibleItemDate){
            notificationDoc = await notificationRef.where("recipientId", "==", uid).orderBy("created", "desc").startAfter(lastVisibleItemDate).limit(20).get();
        } else {
            const timeNow = timestamp.now();
            notificationDoc = await notificationRef.where("recipientId", "==", uid).orderBy("created", "desc").startAfter(timeNow).limit(20).get();
            
        }
        const notificationData = notificationDoc.docs.map((notification) => { 
            return {
                ...notification.data() as NotificationDB,
                notificationId: notification.id
            }
        });
        setData(notificationData);
        setLoading(false);
    } catch (e: any){
        setLoading(false);
        console.log(e)
        setError(e.message);
    }
}