import { Link, useParams } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { IoIosArrowRoundBack } from "react-icons/io";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import useGetProfile from "../hooks/useGetProfile";

const Profile = () => {
  const { profile } = useSelector((store: { user: UserState }) => store.user);

  const { id } = useParams<{ id: string }>(); 
  
  useGetProfile(id || "");

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoIosArrowRoundBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-semibold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
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
          <button className="px-4 py-1 rounded-full hover:bg-gray-100 hover:border-gray-800">
            Edit Profile
          </button>
        </div>
        <div className="m-4 mt-20">
          <h1 className="font-semibold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>Full stack developer</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
