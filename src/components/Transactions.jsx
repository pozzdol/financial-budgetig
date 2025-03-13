import React from "react";
import { BsInfoCircle } from "react-icons/bs";

function Transactions(props) {
  const { src, nominal, keterangan, jenis } = props;
  return (
    <div
      className={`flex items-center p-4 max-w-md mx-auto space-x-4 border-b-2 border-gray-200 ${
        jenis === "Pemasukan" ? "bg-blue-50" : "bg-red-50"
      }`}
    >
      {/* Gambar Profil */}
      <img
        src={src || "https://placehold.co/150"}
        alt="User Avatar"
        className="w-16 h-16 rounded-full object-contain bg-white"
      />
      {/* Informasi Transaksi */}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-800">
          {jenis === "Pemasukan" ? "" : "-"} {nominal || "Rp. 0"}
        </p>
        <p className="text-sm text-gray-600">{keterangan || "Keterangan"}</p>
      </div>
      {/* Ikon Info */}
      <a
        href="#"
        className={`p-4 rounded-xl transition ${
          jenis === "Pemasukan"
            ? "text-blue-500 hover:text-blue-700 bg-blue-100"
            : "text-red-500 hover:text-red-700 bg-red-100"
        }`}
      >
        <BsInfoCircle size={24} />
      </a>
    </div>
  );
}

export default Transactions;
