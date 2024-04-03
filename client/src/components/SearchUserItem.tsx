import Avatar from "react-avatar";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  name: string;
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
        <Avatar
          src="https://thumbs.dreamstime.com/z/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?w=768"
          size="40"
          round={true}
        />
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
