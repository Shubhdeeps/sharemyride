import { FeedModal, FeedModalDB } from "../../types/Feed";
import { firestore, Timestamp } from "./firebaseConfig";

const feedRef = firestore.collection("feed");
export async function getFeedPosts(setData: Function, setError: Function, setLoading: Function, lastItemDate: typeof Timestamp, setMoreToLoad: Function){
    try{
        setLoading(true);
        const feedDocs = await feedRef.orderBy("created", "desc").startAt(lastItemDate).limit(10).get();
        const newData = feedDocs.docs.map((feed) => {
            return {
                ...feed.data(),
                id: feed.id
            }
        });
        setData(newData);
        if(newData.length < 10){
            setMoreToLoad("No more posts");
        }
        setLoading(false);
    } catch(e){
        setError("Someting went wrong");
        setLoading(false);
    }
}

export function createNewFeedPost(data: FeedModalDB, setPostLoading: Function){
    setPostLoading(true);
    feedRef.add(data)
    setPostLoading(false);
}

export function deleteMyPost(postId: string){
    feedRef.doc(postId).delete();
}