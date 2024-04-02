import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  return (
    <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none">
      <CiSearch size="20px" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none px-2"
      />
    </div>
  );
};

export default SearchBox;
