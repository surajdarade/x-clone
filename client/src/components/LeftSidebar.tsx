import x from "../assets/x.png";
import {
  CiHashtag,
  CiSearch,
  CiMail,
  CiUser,
  CiCircleMore,
  CiLogout,
} from "react-icons/ci";
import { PiBellLight } from "react-icons/pi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { tweetSliceReset } from "../store/tweetSlice";

import { userSliceReset } from "../store/userSlice";
const LeftSidebar = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);

      dispatch(userSliceReset());
      dispatch(tweetSliceReset());

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-[20%]">
        <div>
          <Link to="/">
            <img className="ml-4" src={x} width={"50px"} alt="x-logo"></img>
          </Link>
          <div className="my-4">
            <Link
              to="/"
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <div>
                <GoHome size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Home</h1>
            </Link>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <CiSearch size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Explore</h1>
            </div>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <PiBellLight size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Notifications</h1>
            </div>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <CiMail size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Messages</h1>
            </div>
            <Link to={`/bookmark/${user?._id}`} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <CiHashtag size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Bookmarks</h1>
            </Link>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <LiaClipboardListSolid size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Lists</h1>
            </div>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <BsPeople size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Communities</h1>
            </div>
            <Link
              to={`/profile/${user?._id}`}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <div>
                <CiUser size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Profile</h1>
            </Link>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer">
              <div>
                <CiCircleMore size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">More</h1>
            </div>
            <div
              onClick={logoutHandler}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <div>
                <CiLogout size="24px" />
              </div>

              <h1 className="font-semibold text-lg ml-2">Logout</h1>
            </div>
            <Link
              to="/"
              className="px-20 py-3 border-none text-lg font-semibold bg-[#1D98F0] text-white w-full rounded-full"
            >
              Post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
