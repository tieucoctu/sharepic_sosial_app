import Cookies from "js-cookie";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";

function Sidebar({ closeToggle }) {
  const isNotActiveStyle =
    "flex items-center p-1 px-6 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize font-medium  ";
  const isActiveStyle =
    "flex items-center p-1 px-6 gap-3 font-extrabold border-r-2 border-back hover: text-black transition-all duration-200 ease-in-out transition-all duration-200 ease-in-out capitalize font-medium ";

  const handleCloseSiderbar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex  flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSiderbar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-1">
          <h3 className="my-2 px-16 text-xl 2xl:text-xl font-semibold">
            Thể loại
          </h3>
          <div className="mx-4 ml-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 overflow-y-scroll scrollbar-rounded-full scrollbar-rounded-full md:max-h-[700px] max-h-[450px]">
            {categories.map((category) => (
              <NavLink
                to={`/category/${category.value}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSiderbar}
                key={category.value}
              >
                {category.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
