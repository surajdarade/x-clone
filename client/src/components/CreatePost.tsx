import { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import { getRefresh } from "../store/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");

  const { user } = useSelector((store: { user: UserState }) => store.user);

  const dispatch = useDispatch();

  const createPostHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/tweet/create`,
        { description, id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDescription("");
  };
  return (
    <>
      <Toaster />
      <div className="w-[100%]">
        <div>
          <div className="flex items-center justify-evenly border-b border-gray-200">
            <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
              <h1 className="font-semibold text-gray-800 text-lg">For You</h1>
            </div>
            <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
              <h1 className="font-semibold text-gray-800 text-lg">Following</h1>
            </div>
          </div>
          <div>
            <div className="flex items-center p-4">
              <div>
                <Avatar
                  src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
                  size="40"
                  round={true}
                />
              </div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full outline-none border-none text-lg ml-2"
                type="text"
                placeholder="What is happening?!"
              />
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <div>
                <CiImageOn size="24px" style={{ color: "#1D98F0" }} />
              </div>
              <button
                onClick={createPostHandler}
                className="bg-[#1D98F0] px-4 py-1 border-none text-white rounded-full text-lg"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
