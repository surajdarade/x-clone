// import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { getFollowUnfollowUpdate, UserState } from "../../store/userSlice";
import useOtherUsers from "../../hooks/useOtherUsers";
import { Link } from "react-router-dom";
import { getRefresh } from "../../store/tweetSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import SearchBox from "./SearchBox";
import default_profile from "../../assets/default_profile.png";
import { MdVerified } from "react-icons/md";

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
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/unfollow/${otherUserId}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(otherUserId || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/follow/${otherUserId}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(otherUserId || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    // follow
  };

  return (
    <div className="w-[25%] mt-2">
      <SearchBox />
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {otherUsers?.map((otherUser) => {
          return (
            <div
              key={otherUser?._id}
              className="md:flex items-center justify-between my-3"
            >
              <div className="flex">
                {otherUser?.avatar ? (
                  <img
                    src={otherUser?.avatar}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <img src={default_profile} alt="profile" className="h-9" />
                )}
                <Link to={`/profile/${otherUser?._id}`} className="ml-2">
                  <div className="flex">
                    <h1 className="font-semibold hover:underline md:-mt-1">
                      {otherUser?.name}
                    </h1>
                    {otherUser?.name == "X" && (
                      <MdVerified
                        className="ml-1"
                        style={{ color: "#D18800" }}
                      />
                    )}
                  </div>
                  <p className="text-sm md:-mt-1">{`@${otherUser?.username}`}</p>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => followUnfollowHandler(otherUser?._id)}
                  className="hover:animate-pulse px-4 py-1 rounded-full bg-black text-white"
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
