import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, TweetState } from "../store/tweetSlice";

const useGetMyTweets = (_id: string) => {
  const dispatch = useDispatch();

  const { refresh, isActive } = useSelector(
    (store: { tweet: TweetState }) => store.tweet
  );

  const fetchFollowingTweets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_TWEET_API_ENDPOINT}/api/v1/tweet/followingTweets/${_id}`,
        { withCredentials: true }
      );
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_TWEET_API_ENDPOINT}/api/v1/tweet/allTweets/${_id}`,
        { withCredentials: true }
      );
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isActive ? fetchMyTweets() : fetchFollowingTweets();
  }, [_id, dispatch, refresh, isActive]);
};

export default useGetMyTweets;
