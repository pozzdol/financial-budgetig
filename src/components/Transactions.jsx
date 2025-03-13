import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import Swal from "sweetalert2";

function Transactions(props) {
  const { src, nominal, keterangan, jenis, waktu, tabungan } = props;

  const showAlert = () => {
    Swal.fire({
      title: jenis === "Pemasukan" ? "Pemasukan" : "Pengeluaran",
      text: `Pada ${waktu}, transaksi sebesar ${nominal} dilakukan untuk ${keterangan} menggunakan tabungan ${tabungan}.`,
      icon: jenis === "Pemasukan" ? "success" : "warning",
      confirmButtonText: "Close",
    });
  };

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
      <button
        onClick={showAlert}
        href="#"
        className={`p-4 rounded-xl transition ${
          jenis === "Pemasukan"
            ? "text-blue-500 hover:text-blue-700 bg-blue-100"
            : "text-red-500 hover:text-red-700 bg-red-100"
        }`}
      >
        <BsInfoCircle size={24} />
      </button>
    </div>
  );
}

export default Transactions;
