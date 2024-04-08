import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../store/userSlice";

const useOtherUsers = (_id: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/api/v1/user/otherUsers/${_id}`,
          { withCredentials: true }
        );

        dispatch(getOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [_id, dispatch]);
};

export default useOtherUsers;
