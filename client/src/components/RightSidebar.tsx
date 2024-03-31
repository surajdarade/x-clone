import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { UserState } from "../store/userSlice";
import useOtherUsers from "../hooks/useOtherUsers";
import { Link } from "react-router-dom";
const RightSidebar = () => {
  const { user, otherUsers } = useSelector(
    (store: { user: UserState }) => store.user
  );

  const _id = user?._id || "";

  useOtherUsers(_id);

  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none">
        <CiSearch size="20px" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none px-2"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <Avatar
                  src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
                  size="40"
                  round={true}
                />
                <div className="ml-2">
                  <h1 className="font-semibold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link
                  to={`/profile/${user?._id}`}
                  className="px-4 py-1 bg-black text-white rounded-full"
                >
                  Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
