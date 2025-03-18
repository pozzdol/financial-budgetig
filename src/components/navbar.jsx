import React from "react";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed  bottom-4 right-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 sm:p-2 rounded-full shadow-lg z-10">
      <Link to="/" className="text-lg hover:text-gray-400">
        <BiHome size={30} />
      </Link>
    </div>
  );
}

export default Navbar;
