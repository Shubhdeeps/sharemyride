import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-bootstrap";
import FeedCard from "../../components/cards/FeedCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Loader from "../../components/loader";
import { DateHeader } from "../../components/timeline/DateTimestampHeader";
import { TimelineTag } from "../../components/timeline/TimelineTag";
import {
  createNewFeedPost,
  deleteMyPost,
  getFeedPosts,
} from "../../service/firebase/feed";
import {
  auth,
  Timestamp,
  timestamp,
} from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToDayNumber } from "../../service/helperFunctions/firebaseTimestampToString";
import { FeedModalDB } from "../../types/Feed";

export default function Feed() {
  const [newPostLoading, setPostLoading] = useState(false);
  const currUser = auth.currentUser;
  const [postText, setPostText] = useState("");
  const previousDateRef = useRef(timestamp.now());

  //data recieving
  const [data, setData] = useState<FeedModalDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feed, setFeed] = useState<FeedModalDB[]>([]);
  const [moretoLoad, setMoreToLoad] = useState("");

  useEffect(() => {
    const lastPost = timestamp.now();
    fetchPost(lastPost);
  }, []);

  useEffect(() => {
    if (!!data.length) {
      setFeed((prevState) => [...prevState, ...data]);
    }
  }, [data]);

  const fetchMorePosts = () => {
    const lastPost = feed[feed.length - 1].created;
    fetchPost(lastPost);
  };

  const fetchPost = (lastPost: typeof Timestamp) => {
    getFeedPosts(setData, setError, setLoading, lastPost, setMoreToLoad);
  };

  const handlePost = () => {
    if (!postText) {
      return;
    }
    const newPost = {
      text: postText,
      author: currUser?.uid!,
      displayName: currUser?.displayName!,
      photoURL: currUser?.photoURL!,
      likes: 0,
      created: timestamp.now(),
      id: "temporary",
    };
    createNewFeedPost(newPost, setPostLoading);
    setPostText("");
    setFeed((prevState) => [newPost, ...prevState]);
  };

  const handleDeletePost = (postId: string) => {
    const newPosts = feed.filter((post) => post.id !== postId);
    setFeed(newPosts);
    deleteMyPost(postId);
  };

  if (error) {
    return <Error errMessage={error} />;
  }
  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area">
        <div className="top-negative container">
          <TitleHeader heading="Traffic Alerts and General News" />
          <div className="d-flex align-items-center justify-content-between mt-2 gap-2 button-color-border p-2 ps-4 pe-4 border-r1">
            <Image src={currUser?.photoURL!} className="card-pfp" />
            <div className="border-r1 w-100 p-2 ps-3 textField2">
              <input
                type="text"
                placeholder="Share"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>
            {newPostLoading ? (
              <Loader />
            ) : (
              <i
                onClick={handlePost}
                className="mt-2 bi bi-plus-circle-fill text-1-5 highlight-color"
              ></i>
            )}
          </div>
          <div className="d-flex align-items-stretch w-100 h-100">
            <div className="left-lining"></div>
            <div className="right-lining">
              <div className="d-flex flex-wrap gap-2 mt-3">
                {feed.map((post, index) => {
                  const isCurrentTimeChanged =
                    firebaseTimestampToDayNumber(previousDateRef.current) !==
                    firebaseTimestampToDayNumber(post.created);
                  previousDateRef.current = post.created;
                  return (
                    <React.Fragment key={post.id}>
                      {(isCurrentTimeChanged || index === 0) && (
                        <DateHeader date={previousDateRef.current} />
                      )}
                      <FeedCard
                        data={post}
                        handleDeletePost={handleDeletePost}
                      />
                    </React.Fragment>
                  );
                })}
                {!!feed.length && moretoLoad && <TimelineTag data="End" />}
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 text-center w-100 text-3">
              {moretoLoad ? (
                <>{moretoLoad}</>
              ) : (
                <i
                  onClick={() => fetchMorePosts()}
                  className="bi bi-arrow-clockwise text-1-5"
                ></i>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
