import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CreatePin from "../components/CreatePin";
import Feed from "../components/Feed";
import PinDetail from "../components/PinDetail";
import Search from "../components/Search";
import NavBar from "../layout/Navbar";
function Pins({ user }) {
  const [searchTerm, setSearchTerm] = useState();
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route exact path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Pins;
