import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaPhone } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <FaHome />
          <span>MyWebsite</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaHome /> Home
          </li>
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaUser /> About
          </li>
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaPhone /> Contact
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-blue-700 p-4 mt-2 space-y-4">
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaHome /> Home
          </li>
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaUser /> About
          </li>
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaPhone /> Contact
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
