import { useState } from "react";
// import Avatar from "react-avatar";
import { CiImageOn, CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import { getIsActive, getRefresh, TweetState } from "../store/tweetSlice";
import { ClipLoader } from "react-spinners";
import default_profile from "../assets/default_profile.png";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postPreview, setPostPreview] = useState("");

  const { user } = useSelector((store: { user: UserState }) => store.user);

  const { isActive } = useSelector(
    (store: { tweet: TweetState }) => store.tweet
  );

  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPostPreview(result);
      }
    };
    reader.readAsDataURL(file);
    setPostImage(file);
  };

  const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!description) {
      toast.error("Please provide description");
      return ;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("id", user?._id || "");
      if (postImage) {
        formData.append("postImage", postImage);
      }

      const res = await axios.post(
        `http://localhost:3000/api/v1/tweet/create`,
        formData,
        { withCredentials: true }
      );
      dispatch(getRefresh());
      dispatch(getIsActive(true));
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setPostImage(null);
      setPostPreview("");
      setDescription("");
    }
  };

  const forYouToggle = () => {
    dispatch(getIsActive(true));
  };
  const followingToggle = () => {
    dispatch(getIsActive(false));
  };

  return (
    <>
      <Toaster />
      <form onSubmit={createPostHandler} encType="multipart/form-data">
        <div className="w-[100%]">
          <div>
            <div className="flex items-center justify-evenly border-b border-gray-200">
              <div
                onClick={forYouToggle}
                className={`${
                  isActive
                    ? "border-b-4 border-[#1D98F0]"
                    : "border-b-4 border-transparent"
                } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
              >
                <h1 className="font-semibold text-gray-800 text-lg">For You</h1>
              </div>
              <div
                onClick={followingToggle}
                className={`${
                  !isActive
                    ? "border-b-4 border-[#1D98F0]"
                    : "border-b-4 border-transparent"
                } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
              >
                <h1 className="font-semibold text-gray-800 text-lg">
                  Following
                </h1>
              </div>
            </div>
            <div>
              <div className="flex items-center p-4">
                <div>
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <img src={default_profile} alt="profile" className="h-10" />
                  )}
                </div>

                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full outline-none border-none text-lg ml-2"
                  type="text"
                  placeholder="What is happening?!"
                />
              </div>
              <div className="ml-14 mr-6">
                {postImage ? (
                  <div className="flex h-52 w-full">
                    <img
                      draggable="false"
                      className="object-contain h-full w-full"
                      src={postPreview}
                      alt="post"
                    />
                    <CiCircleRemove
                      onClick={() => setPostImage(null)}
                      size="24px"
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <span className="hidden"></span>
                )}
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <div className="flex">
                  <label className="relative cursor-pointer">
                    <CiImageOn
                      size="24px"
                      style={{ color: "#1D98F0" }}
                      className="cursor-pointer"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute h-full w-full opacity-0"
                    />
                  </label>
                </div>
                <button
                  className="bg-[#1D98F0] px-4 py-1 border-none text-white rounded-full text-lg flex items-center justify-center"
                  
                >
                  {loading ? (
                    <ClipLoader color={"#ffffff"} loading={true} size={20} />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
