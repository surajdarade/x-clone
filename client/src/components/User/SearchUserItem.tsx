import { Link } from "react-router-dom";
import default_profile from "../../assets/default_profile.png";
import { MdVerified } from "react-icons/md";

interface User {
  _id: string;
  username: string;
  name: string;
  avatar: string;
}

interface SearchUserItemProps {
  user: User;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ user }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex items-center bg-gray-100 py-2 px-4 cursor-pointer"
    >
      <div className="flex space-x-3 items-center">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <img src={default_profile} alt="profile" className="h-10" />
        )}
        <div className="flex flex-col items-start">
          <div className="flex">
            <span className=" text-sm font-semibold">{user.name}</span>
            {user?.name == "X" && (
              <MdVerified className="ml-1 mt-1" style={{ color: "#D18800" }} />
            )}
          </div>

          <span className="text-sm text-gray-400">{`@${user.username}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchUserItem;
