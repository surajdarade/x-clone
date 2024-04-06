import { Link } from "react-router-dom";
import default_profile from "../assets/default_profile.png";

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
      {" "}
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
          <span className="text-black text-sm font-semibold">
            {user.username}
          </span>
          <span className="text-gray-400 text-sm">{user.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchUserItem;
