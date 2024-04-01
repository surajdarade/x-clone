import useOtherUsers from "../hooks/useOtherUsers";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
const Home = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/signin");
    }
  }, [user]);

  const _id = user?._id || "";

  useOtherUsers(_id);

  return (
    <>
      <Helmet>
        <title>Home / X</title>
      </Helmet>
      <Toaster />
      <div className="flex justify-between w-[80%] mx-auto mt-4">
        <LeftSidebar />
        <Outlet />
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
