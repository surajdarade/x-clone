import { Link, useParams } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { IoIosArrowRoundBack } from "react-icons/io";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getFollowUnfollowUpdate, UserState } from "../store/userSlice";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { getRefresh } from "../store/tweetSlice";
const Profile = () => {
  const { user, profile } = useSelector(
    (store: { user: UserState }) => store.user
  );

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const followUnfollowHandler = async () => {
    // unfollow
    if (user?.following.includes(id || "")) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/user/unfollow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(id || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/user/follow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(id || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    // follow
  };

  useGetProfile(id || "");

  return (
    <>
      <div className="w-[50%] border-l border-r border-gray-200">
        <div>
          <div className="flex items-center py-2">
            <Link
              to="/"
              className="p-2 mx-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
            >
              <IoIosArrowRoundBack size="24px" />
            </Link>
            <div className="ml-2">
              <h1 className="font-semibold text-lg">{profile?.name}</h1>
              <p className="text-gray-500 text-sm">{profile?.tweetCount} posts</p>
            </div>
          </div>
          <img src={banner} alt="banner" />
          <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
            <Avatar
              src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
              size="120"
              round={true}
            />
          </div>
          <div className="text-right m-4">
            {profile?._id == user?._id ? (
              <button className="px-4 py-1 rounded-full hover:bg-gray-100 border border-gray-600">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followUnfollowHandler}
                className="px-4 py-1 rounded-full bg-black text-white"
              >
                {user?.following.includes(id || "") ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="m-4 mt-20">
            <h1 className="font-semibold text-xl">{profile?.name}</h1>
            <p>{`@${profile?.username}`}</p>
          </div>
          <div className="m-4 text-sm">
            <p>Full stack developer</p>
          </div>
          <div className="m-4 flex text-sm">
            <p className="font-bold mr-2">{profile?.following.length}</p>
            <p>Following</p>
            <p className="font-bold ml-2 mr-2">{profile?.followers.length}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
