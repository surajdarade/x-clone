import useOtherUsers from "../hooks/useOtherUsers";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../store/userSlice";


const Home = () => {

  const { user } = useSelector(
    (store: { user: UserState }) => store.user
  );
  
  const _id = user?._id || '';

  useOtherUsers(_id);

  return (
    <div className="flex justify-between w-[80%] mx-auto mt-4">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Home;
