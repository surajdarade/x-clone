import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, TweetState } from "../store/tweetSlice";

const useGetProfileTweets = (_id: string) => {
  const dispatch = useDispatch();

  const { refresh } = useSelector(
    (store: { tweet: TweetState }) => store.tweet
  );

  const fetchProfileTweets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/tweet/profileTweets/${_id}`,
        { withCredentials: true }
      );
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileTweets();
  }, [_id, dispatch, refresh]);
};

export default useGetProfileTweets;
