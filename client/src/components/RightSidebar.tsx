import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { getFollowUnfollowUpdate, getMyProfile, UserState } from "../store/userSlice";
import useOtherUsers from "../hooks/useOtherUsers";
import { Link } from "react-router-dom";
import { getRefresh } from "../store/tweetSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";

const RightSidebar = () => {
  const { user, otherUsers } = useSelector(
    (store: { user: UserState }) => store.user
  );

  const _id = user?._id || "";

  useOtherUsers(_id);

  const dispatch = useDispatch();

  const followUnfollowHandler = async (otherUserId: string) => {
    // unfollow
    if (user?.following.includes(otherUserId || "")) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/user/unfollow/${otherUserId}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(otherUserId || ""));
        dispatch(getRefresh());
        dispatch(getMyProfile(user));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/user/follow/${otherUserId}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(otherUserId || ""));
        dispatch(getRefresh());
        dispatch(getMyProfile(user));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    // follow
  };

  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none">
        <CiSearch size="20px" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none px-2"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {otherUsers?.map((otherUser) => {
          return (
            <div
              key={otherUser?._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <Avatar
                  src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
                  size="40"
                  round={true}
                />
                <Link to={`/profile/${otherUser?._id}`} className="ml-2">
                  <h1 className="font-semibold">{otherUser?.name}</h1>
                  <p className="text-sm">{`@${otherUser?.username}`}</p>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => followUnfollowHandler(otherUser?._id)}
                  className="px-4 py-1 rounded-full bg-black text-white"
                >
                  {user?.following.includes(otherUser?._id || "")
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
