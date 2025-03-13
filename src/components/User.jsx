import React from "react";

function User() {
  return (
    <div className="flex gap-3 items-center p-4">
      {/* Foto Profil */}
      <img
        src="/user.png"
        alt="User Avatar"
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Nama & Pesan Selamat Datang */}
      <div>
        <p className=" text-lg font-semibold">Fikri Achmad Anshori</p>
        <p className="text-gray-500">Welcome back!</p>
      </div>
    </div>
  );
}

export default User;
