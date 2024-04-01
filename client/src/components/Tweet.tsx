import Avatar from "react-avatar";
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

interface TweetProps {
  tweet: {
    _id: string;
    userId: string;
    description: string;
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
      dispatch(getBookmarks(_id || ''));
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
      <div className="border-b border-gray-200">
        <div>
          <div className="flex p-4">
            <Avatar
              src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
              size="40"
              round={true}
            />
            <div className="ml-2 w-full">
              <div className="flex items-center">
                <h1 className="font-semibold">{tweet?.userDetails[0].name}</h1>

                <p className="text-gray-500 text-sm ml-1">
                  {`@${tweet?.userDetails[0].username}`} .{" "}
                  {timeSince(tweet?.createdAt)}
                </p>
              </div>
              <div>
                <p>{tweet?.description}</p>
              </div>
              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <div className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                    <FaRegComment size="20px" />
                  </div>
                  <p>0</p>
                </div>
                <div className="flex items-center">
                  <div
                    onClick={() => likeOrDislikeHandler(tweet?._id)}
                    className="p-2 hover:bg-red-100 rounded-full cursor-pointer"
                  >
                    {tweet?.like?.includes(user?._id || '') ? 
                      <FcLike size="24px" />
                     : 
                     <CiHeart size="24px" />
                    }
                    
                  </div>
                  <p>{tweet?.like?.length}</p>
                </div>
                <div
                  onClick={() => bookmarkHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                    {user?.bookmarks?.includes(tweet?._id) ? 
                      <GoBookmarkFill size="24px" />
                     : 
                      <GoBookmark size="24px" />
                    }
                  </div>
                </div>
                {user?._id == tweet?.userId && (
                  <div
                    onClick={() => deleteTweetHandler(tweet?._id)}
                    className="flex items-center"
                  >
                    <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
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
