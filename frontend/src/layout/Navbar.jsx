import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <Link
        to="create-pin"
        className="bg-black text-white rounded-full w-12 md:w-14 flex justify-center items-center"
      >
        <IoMdAdd />
      </Link>
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
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

      <Link to={`user-profile/${user?._id}`} className="hidden md:block">
        <img src={user.image} alt="user" className="w-14  rounded-full" />
      </Link>
    </div>
  );
}

export default Navbar;
