import { UserState } from "../store/userSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Tweet from "./Tweet";
import { TweetState } from "../store/tweetSlice";
import useGetMyBookmarks from "../hooks/useGetMyBookmarks";

const Bookmark = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);
  useGetMyBookmarks(user?._id || "");

  const { tweets } = useSelector((store: { tweet: TweetState }) => store.tweet);

  return (
    <>
      <Toaster />
      <div className="w-[50%] border border-gray-20">
        <div>
          {tweets?.map((tweet) => (
            <Tweet key={tweet?._id} tweet={tweet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookmark;
