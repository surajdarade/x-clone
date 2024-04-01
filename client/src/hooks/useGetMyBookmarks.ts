import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getRefresh, TweetState } from "../store/tweetSlice";

const useGetMyBookmarks = (_id: string) => {
  const dispatch = useDispatch();

  const { refresh, isActive } = useSelector(
    (store: { tweet: TweetState }) => store.tweet
  );

  const fetchMyBookmarks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/getMyBookmark/${_id}`,
        { withCredentials: true }
      );
      dispatch(getAllTweets(res.data.tweets));
      dispatch(getRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyBookmarks();
  }, [_id, dispatch, refresh, isActive]);
};

export default useGetMyBookmarks;
