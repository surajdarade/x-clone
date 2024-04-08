import { Link, useParams } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getFollowUnfollowUpdate, UserState } from "../../store/userSlice";
import useGetProfile from "../../hooks/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { getRefresh, TweetState } from "../../store/tweetSlice";
import default_profile from "../../assets/default_profile.png";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import joinedOn from "../../utils/joinedOnFunction";
import { Helmet } from "react-helmet";
import Tweet from "./Tweet";
import useGetProfileTweets from "../../hooks/useGetProfileTweets";
import { MdVerified } from "react-icons/md";

const Profile = () => {
  const { user, profile } = useSelector(
    (store: { user: UserState }) => store.user
  );

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  useGetProfileTweets(id || "");

  const { tweets } = useSelector((store: { tweet: TweetState }) => store.tweet);

  const followUnfollowHandler = async () => {
    // unfollow
    if (user?.following.includes(id || "")) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/api/v1/user/unfollow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(id || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/v1/user/follow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getFollowUnfollowUpdate(id || ""));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    // follow
  };

  useGetProfile(id || "");

  return (
    <>
      {profile ? (
        <Helmet>
          <title>
            {profile?.name} (@{profile?.username}) / X
          </title>
        </Helmet>
      ) : (
        <Helmet>
          <title>
            {user?.name} (@{user?.username}) / X
          </title>
        </Helmet>
      )}

      <div className="w-[50%] border-l border-r border-gray-300">
        <div className="border-b border-gray-300">
          <div className="flex items-center py-2">
            <Link
              to="/"
              className="p-2 mx-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
            >
              <IoIosArrowRoundBack size="24px" />
            </Link>
            <div className="ml-2">
              <h1 className="font-semibold text-lg">{profile?.name}</h1>
              <p className="text-gray-500 text-sm">
                {profile?.tweetCount} posts
              </p>
            </div>
          </div>
          <img src={banner} alt="banner" className="h-44" />
          <div className="absolute top-44 ml-2 border-4 border-white rounded-full">
            {profile?.avatar ? (
              <img
                src={profile?.avatar}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <img src={default_profile} alt="profile" className="h-28" />
            )}
          </div>
          <div className="text-right m-4">
            {profile?._id == user?._id ? (
              <Link
                to="/account/edit"
                className="px-4 py-1 rounded-full hover:bg-gray-100 border border-gray-600"
              >
                Edit profile
              </Link>
            ) : (
              <button
                onClick={followUnfollowHandler}
                className="px-4 py-1 rounded-full bg-black text-white"
              >
                {user?.following.includes(id || "") ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="m-4 mt-6">
            <div className="flex">
              <h1 className="font-semibold text-xl">{profile?.name}</h1>
              {profile?.name == "X" && (
                <MdVerified
                  className="ml-1 mt-2"
                  style={{ color: "#D18800" }}
                />
              )}
            </div>

            <p className="text-gray-500 text-sm">{`@${profile?.username}`}</p>
          </div>
          <div className="m-4 text-sm">
            <p>{profile?.bio}</p>
          </div>
          <div className="flex">
            <div className="ml-5 flex">
              <IoLocationOutline />
              <p className="text-sm ml-2">India</p>
            </div>
            <div className="ml-5 flex">
              <SlCalender />
              <p className="text-sm ml-2">
                Joined {joinedOn(profile?.createdAt || "")}
              </p>
            </div>
          </div>
          <div className="m-4 flex text-sm">
            <p className="font-bold mr-2">{profile?.following.length}</p>
            <p>Following</p>
            <p className="font-bold ml-2 mr-2">{profile?.followers.length}</p>
            <p>Followers</p>
          </div>
        </div>
        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default Profile;
