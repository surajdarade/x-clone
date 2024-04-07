import { UserState } from "../store/userSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Tweet from "./Tweet";
import { TweetState } from "../store/tweetSlice";
import useGetMyBookmarks from "../hooks/useGetMyBookmarks";
import { Helmet } from "react-helmet";

const Bookmark = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);
  useGetMyBookmarks(user?._id || "");

  const { tweets } = useSelector((store: { tweet: TweetState }) => store.tweet);

  return (
    <>
      <Helmet>
        <title>Bookmarks / X</title>
      </Helmet>
      <Toaster />
      {tweets?.length != 0 ? (
        <div className="w-[50%] border border-gray-20">
          <div>
            {tweets?.map((tweet) => (
              <Tweet key={tweet?._id} tweet={tweet} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[50%] border border-gray-20 flex justify-center items-center h-screen">
          <h1 className="text-center text-2xl">No bookmarks😒 </h1>
        </div>
      )}
    </>
  );
};

export default Bookmark;
