import { useEffect, useState } from "react";
import { UserState } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import default_profile from "../../../assets/default_profile.png";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { user } = useSelector((store: { user: UserState }) => store.user);

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password length must be atleast 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password Doesn't Match");
      return;
    }
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/update/password",
        { _id: user?._id, oldPassword, newPassword },
        config
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Change your password / X</title>
      </Helmet>
      <Toaster />
      <form
        onSubmit={handlePasswordUpdate}
        className="flex flex-col gap-4 py-8 px-16 sm:w-3/4"
      >
        <div className="flex items-center gap-8 ml-24">
          <img
            draggable="false"
            className="w-11 h-11 rounded-full border object-cover"
            src={user?.avatar ? user?.avatar : default_profile}
            alt=""
          />
          <span className="text-2xl">{user?.username}</span>
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">Current Password</span>
          <input
            className="border rounded p-1 w-3/4"
            type="password"
            placeholder="Current Password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">New Password</span>
          <input
            className="border rounded p-1 w-3/4"
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">Confirm New Password</span>
          <input
            className="border rounded p-1 w-3/4"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-blue font-medium rounded-full bg-[#1D98F0] text-white py-2 w-40 mx-auto text-sm"
        >
          {loading ? (
            <ClipLoader color={"#ffffff"} loading={true} size={20} /> // Display spinner when loading
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
