import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { UserState } from "../store/userSlice";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";
import { TweetState } from "../store/tweetSlice";

const Feed = () => {

  const { user } = useSelector((store: { user: UserState }) => store.user);
  useGetMyTweets(user?._id  || "");

  const { tweets } = useSelector((store: { tweet: TweetState }) => store.tweet);

  return (
    <div className="w-[50%] border border-gray-20">
      <div>
        <CreatePost />
        {
          tweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet}/>)
        }
      </div>
    </div>
  );
};

export default Feed;
