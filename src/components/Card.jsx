import React from "react";
import { BsPlusCircle } from "react-icons/bs";

function Card(props) {
  const { url, text, icon: Icon } = props;

  return (
    <a
      href={url}
      target={url ? `_blank` : `_self`}
      rel="noopener noreferrer"
      className="w-44 h-16 flex items-center gap-2 justify-start bg-blue-100 hover:bg-blue-500 text-blue-800 hover:text-white font-semibold rounded-xl shadow-md transition duration-300 mt-4 ps-3"
    >
      {Icon ? <Icon size={35} /> : <BsPlusCircle size={35} />}
      <span className="ms-2">{text || "Add Transaction"}</span>
    </a>
  );
}

export default Card;
