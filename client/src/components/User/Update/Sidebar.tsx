import { Link } from "react-router-dom";
import x from "../../../assets/x.png";

const tabs = [
  {
    title: "Edit Profile",
    nav: "/account/edit",
  },
  {
    title: "Change Password",
    nav: "/account/password/change",
  },
  {
    title: "Apps and Websites",
    nav: "/account/edit",
  },
  {
    title: "Email and SMS",
    nav: "/account/edit",
  },
  {
    title: "Push Notifications",
    nav: "/account/edit",
  },
  {
    title: "Manage Contacts",
    nav: "/account/edit",
  },
  {
    title: "Privacy and Security",
    nav: "/account/edit",
  },
  {
    title: "Login Activity",
    nav: "/account/edit",
  },
  {
    title: "Help",
    nav: "/account/edit",
  },
];

interface SidebarProps {
  activeTab: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  return (
    <div className="hidden sm:flex flex-col border-r w-1/4">
      {tabs.map((el, i) => (
        <Link
          to={el.nav}
          className={`${
            activeTab === i
              ? "border-black text-black border-l-2 font-medium"
              : "hover:border-[#1D98F0] text-gray-600"
          } py-3 px-6 hover:border-l-2 hover:bg-gray-50 cursor-pointer`}
        >
          {el.title}
        </Link>
      ))}

      <div className="flex border-t mt-12 flex-col gap-2 p-4">
        <Link to="/">
          <img
            className="ml-4 rounded-full py-3 px-2 hover:bg-gray-200"
            src={x}
            width={"50px"}
            alt="x-logo"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
