import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import { Toaster } from "react-hot-toast";
import useOtherUsers from "../hooks/useOtherUsers";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    window.scrollTo(0, 0);

    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleScrollToTop);

    return () => {
      window.removeEventListener("beforeunload", handleScrollToTop);
    };
  }, [user, navigate]);

  const _id = user ? user._id : "";

  useOtherUsers(_id);

  return (
    <>
      <Toaster />
      <div className="flex justify-between w-[80%] mx-auto scroll-smooth">
        <LeftSidebar />
        <Outlet />
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
