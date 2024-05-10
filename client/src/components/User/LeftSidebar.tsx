import x from "../../assets/x.png";
import {
  CiHashtag,
  CiSearch,
  CiMail,
  CiUser,
  CiCircleMore,
  CiLogout,
} from "react-icons/ci";
import { PiBellLight, PiDotsThreeBold } from "react-icons/pi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { getIsActive, tweetSliceReset } from "../../store/tweetSlice";
import default_profile from "../../assets/default_profile.png";
import { MdVerified } from "react-icons/md";
import { userSliceReset } from "../../store/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_USER_API_ENDPOINT}/logout`);

      dispatch(userSliceReset());
      dispatch(tweetSliceReset());

      navigate("/signin");

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="md:w-[20%]">
        <div>
          <Link
            to="/"
            onClick={() => {
              dispatch(getIsActive(true));
            }}
          >
            <img
              className="md:ml-1 rounded-full py-3 px-2 hover:bg-gray-200 mt-4"
              src={x}
              width={"50px"}
              alt="x-logo"
            ></img>
          </Link>
          <div className="my-4">
            <Link
              to="/"
              onClick={() => {
                dispatch(getIsActive(true));
              }}
              className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-32"
            >
              <div>
                <GoHome size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Home
              </h1>
            </Link>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-36">
              <div>
                <CiSearch size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Explore
              </h1>
            </div>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-44">
              <div>
                <PiBellLight size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Notifications
              </h1>
            </div>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-36">
              <div>
                <CiMail size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Messages
              </h1>
            </div>
            <Link
              to={`/bookmark/${user?._id}`}
              className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-40"
            >
              <div>
                <CiHashtag size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Bookmarks
              </h1>
            </Link>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-28">
              <div>
                <LiaClipboardListSolid size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Lists
              </h1>
            </div>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-44">
              <div>
                <BsPeople size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Communities
              </h1>
            </div>
            <Link
              to={`/profile/${user?._id}`}
              className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-32"
            >
              <div>
                <CiUser size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Profile
              </h1>
            </Link>
            <div className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-28">
              <div>
                <CiCircleMore size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                More
              </h1>
            </div>
            <div
              onClick={logoutHandler}
              className="flex hover:animate-pulse items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer md:w-32"
            >
              <div>
                <CiLogout size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2 hidden sm:block">
                Logout
              </h1>
            </div>
          </div>
          <Link
            to="/"
            className="hover:animate-pulse md:px-20 sm:px-8 py-3 border-none text-lg font-semibold bg-[#1D98F0] text-white md:w-full rounded-full sm:w-5"
          >
            Post
          </Link>
        </div>
        <Link
          to={`/profile/${user?._id}`}
          className="rounded-full items-center px-4 py-4 cursor-pointer"
        >
          <div className="flex">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="profile"
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <img src={default_profile} alt="profile" className="h-10" />
            )}

            <h1 className="font-semibold text-lg ml-2 hidden sm:block -mt-1">
              {user?.name}
            </h1>
            {user?.name == "X" && (
              <MdVerified className="ml-2 mt-1" style={{ color: "#D18800" }} />
            )}
            <PiDotsThreeBold className="ml-12 mt-1" size="30" />
          </div>

          <h2 className="-mt-5 font-sm text-gray-500 ml-12 hidden sm:block">
            {`@${user?.username}`}
          </h2>
        </Link>
      </div>
    </>
  );
};

export default LeftSidebar;
