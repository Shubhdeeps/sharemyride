import { MarketPlace, MarketPlaceDB } from "../../types/marketPlace";
import { NotificationType } from "../../types/notification.model";
import { auth, firestore, Timestamp, timestamp } from "./firebaseConfig";
import { sendNotification } from "./notification";
import firebase from "firebase";
const marketPlaceRef = firestore.collection("marketplace");

export const setNewMarketSale = async (data: MarketPlace) => {
    const author = auth.currentUser;
    const created = timestamp.now();
    const authorId = author?.uid as string;
    const docId = `${author?.uid}_${created.seconds}`;
    await marketPlaceRef.doc(docId).set({
        ...data,
        created,
        authorId,
        authorName: author?.displayName as string,
        commuteId: docId
    })
    const notificationData: NotificationType = {
        content: `Your ${data.commute} ticket sale is live now for cost ${data.price}.`,
        displayName: author?.displayName as string,
        photoURL: author?.photoURL as string,
        parent: "ticket",
        postId: docId,
        recipientId: authorId,
    }
    sendNotification(authorId, notificationData);
}

export const getMarketPlacePosts = async (setError: Function, setLoading: Function, setData: Function, lastItemDate: typeof Timestamp, filter: "ALL" | "MINE", setNoMoreRides: Function) => {
    setLoading(true);
    const authorId = auth.currentUser?.uid as string;
    try{
        let data: any;
        if(filter === "ALL"){
            data =  await marketPlaceRef.where("status", "==", "Onsale").orderBy("startTime", "asc").startAfter(lastItemDate).limit(20).get();
        } else {
            data =  await marketPlaceRef.where("status", "==", "Onsale").where("authorId", "==", authorId).orderBy("startTime", "asc").startAfter(lastItemDate).limit(20).get();
        }
        const newData = data.docs.map((doc: any) => doc.data() as MarketPlaceDB)
        setData(newData);
        if(!newData.length){
            setNoMoreRides("No more sales")
        }
        setLoading(false);

    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}

export const getSingleCommute = async (setError: Function, setLoading: Function, setData: Function, commuteId: string) => {
    setLoading(true);
    try{
        const commuteDoc = marketPlaceRef.doc(commuteId).get();
        const commuteData = (await commuteDoc).data() as MarketPlaceDB;
        setData(commuteData);
        setLoading(false);

    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}



export const createCommuteOffer = async (commuteId: string, price: number, additionalInfo: string, setStatus: Function) => {
    // this is author of offeree
    setStatus("loading");
    try{
        const author = auth.currentUser as firebase.User;
        const authorId = author.uid;
        const docId = `${authorId}_${commuteId}`
        await firestore.collection("commute_offers").doc(docId).set({
            displayName: auth.currentUser?.displayName as string,
            created: timestamp.now(),
            offeredPrice: price,
            additionalInfo,
        parentCommute: commuteId,
        status: "pending",
        offerId: docId
    })
    // send notification
    
    setStatus("success");
    const notificationDaa: NotificationType = {
        content: "New Offer for the ticket.",
        displayName: author.displayName as string,
        parent: "ticket",
        photoURL: author.photoURL as string,
        postId: commuteId,
        recipientId: commuteId.split("_")[0],
    }
    sendNotification(commuteId.split("_")[0], notificationDaa);
    }catch(e: any){
        setStatus("error");
        console.log(e.message)
    }
}

export const getCommuteOfferRequests = async (setError: Function, setLoading: Function, setData: Function, commuteId: string) => {
    setLoading(true);
    try{
        const commuteOfferDoc = await firestore.collection("commute_offers").where("parentCommute", "==", commuteId).get();
        const commuteOffer = commuteOfferDoc.docs.map((commuteOffer) => commuteOffer.data());
        setData(commuteOffer);
        setLoading(false);

    } catch (e: any) {
        console.log(e)
        setError(e.message);
        setLoading(false);
    }
}
