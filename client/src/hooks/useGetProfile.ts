import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../store/userSlice";

const useGetProfile = (_id: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/api/v1/user/profile/${_id}`,
          { withCredentials: true }
        );
        dispatch(getMyProfile(res.data.profile));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, [_id, dispatch]);
};

export default useGetProfile;
