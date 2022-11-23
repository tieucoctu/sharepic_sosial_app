import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../components/fetchUser";
import Logout from "../components/Logout";

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  const User = fetchUser();
  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-2 pb-7 items-center ">
      <Link
        to="create-pin"
        className="bg-black text-white rounded-xl w-16 h-12 md:h-14 flex justify-center items-center"
      >
        <IoMdAdd />
      </Link>
      <div className="flex justify-start items-center w-full px-2 p-1 md:p-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          className="p-2 w-full bg-white outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex items-center ">
        <Link
          to={`user-profile/${user?._id}`}
          className="hidden md:block   overflow-hidden rounded-3xl"
        >
          <img src={user.image} alt="user" className="w-16 h-12 rounded-full" />
        </Link>
        <Logout className="" userId={user._id} User={User} />
      </div>
    </div>
  );
}

export default Navbar;
