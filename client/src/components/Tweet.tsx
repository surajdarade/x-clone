// import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { getRefresh, UserDetails } from "../store/tweetSlice";
import axios from "axios";
import { getBookmarks, UserState } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import timeSince from "../utils/timeFunction";
import { FcLike } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import default_profile from "../assets/default_profile.png";

interface TweetProps {
  tweet: {
    _id: string;
    userId: string;
    description: string;
    postImage: string;
    like: string[];
    userDetails: UserDetails[];
    createdAt: string;
  };
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const { user } = useSelector((store: { user: UserState }) => store.user);

  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (_id: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/tweet/like/${_id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      
      
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkHandler = async (_id: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/bookmark/${_id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      dispatch(getBookmarks(_id || ""));
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweetHandler = async (id: string) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `http://localhost:3000/api/v1/tweet/delete/${id}`
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Toaster />
      <div className="border-b border-gray-300">
        <div>
          <div className="flex p-4">
            {tweet?.userDetails[0]?.avatar ? (
              <img
                src={tweet?.userDetails[0]?.avatar}
                alt="profile"
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <img src={default_profile} alt="profile" className="h-10" />
            )}

            <div className="ml-2 w-full">
              <Link
                to={`/profile/${tweet?.userId}`}
                className="flex items-center"
              >
                <h1 className="font-semibold hover:underline">
                  {tweet?.userDetails[0].name}
                </h1>
                <p className="text-gray-500 text-sm ml-1">
                  {`@${tweet?.userDetails[0].username}`} .{" "}
                  {timeSince(tweet?.createdAt)}
                </p>
              </Link>
              <div>
                <p>{tweet?.description}</p>
              </div>
              {tweet?.postImage && (
                <div className="items-center mt-5 mb-5 border border-gray-300 rounded-2xl">
                  <div className="flex h-52 w-full">
                    <img
                      draggable="false"
                      className="object-contain h-full w-full"
                      src={tweet?.postImage}
                      alt="post"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <div className="p-2 hover:bg-blue-100 rounded-full cursor-pointer hover:animate-bounce">
                    <FaRegComment size="20px" />
                  </div>
                  {/* <p>0</p> */}
                </div>
                <div className="flex items-center">
                  <div
                    onClick={() => likeOrDislikeHandler(tweet?._id)}
                    className="p-2 hover:bg-red-100 rounded-full cursor-pointer hover:animate-bounce"
                  >
                    {tweet?.like?.includes(user?._id || "") ? (
                      <FcLike size="24px" />
                    ) : (
                      <CiHeart size="24px" />
                    )}
                  </div>
                  <p>{tweet?.like?.length}</p>
                </div>
                <div
                  onClick={() => bookmarkHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-blue-100 rounded-full cursor-pointer hover:animate-bounce">
                    {user?.bookmarks?.includes(tweet?._id) ? (
                      <GoBookmarkFill size="24px" />
                    ) : (
                      <GoBookmark size="24px" />
                    )}
                  </div>
                </div>
                {user?._id == tweet?.userId && (
                  <div
                    onClick={() => deleteTweetHandler(tweet?._id)}
                    className="flex items-center"
                  >
                    <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer hover:animate-bounce">
                      <MdDeleteOutline size="24px" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
