import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

function Card(props) {
  const { url, text, icon: Icon } = props;
  const isExternal = url.startsWith("http://") || url.startsWith("https://");

  return isExternal ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-16 flex items-center gap-2 xs:justify-start bg-blue-100 hover:bg-gradient-to-tr from-blue-400 to-blue-500 text-blue-800 hover:text-white font-semibold rounded-xl shadow-md transition duration-300 p-0 ps-7 xs:ps-3"
    >
      {Icon ? <Icon size={35} /> : <BsPlusCircle size={35} />}
      <span className="ms-2">{text || "Add Transaction"}</span>
    </a>
  ) : (
    <Link
      to={url}
      className="w-full h-16 flex items-center gap-2 xs:justify-start bg-blue-100 hover:bg-gradient-to-tr from-blue-400 to-blue-500 text-blue-800 hover:text-white font-semibold rounded-xl shadow-md transition duration-300 p-0 ps-7 xs:ps-3"
    >
      {Icon ? <Icon size={35} /> : <BsPlusCircle size={35} />}
      <span className="ms-2">{text || "Add Transaction"}</span>
    </Link>
  );
}

export default Card;
