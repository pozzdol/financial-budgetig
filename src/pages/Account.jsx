import React, { useEffect, useState } from "react";
import CardAccount from "../components/CardAccount";
import Transactions from "../components/Transactions";
import { fetchSheetData } from "../services/api";
import Navbar from "../components/navbar";

function Account() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All"); // Tambahkan state untuk filter

  const getBankLogo = (bank) => {
    switch (bank) {
      case "BCA":
        return "https://www.bca.co.id/-/media/Feature/Card/List-Card/Tentang-BCA/Brand-Assets/Logo-BCA/Logo-BCA_Biru.png";
      case "Cash":
        return "https://static.vecteezy.com/system/resources/previews/012/184/580/large_2x/cash-payment-outline-color-icon-vector.jpg";
      case "BRI":
        return "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg";
      case "JAGO":
        return "https://upload.wikimedia.org/wikipedia/commons/c/c0/Logo-jago.svg";
      default:
        return ""; // Jika tidak ada match, kosongkan gambar
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTanggal = (value) => {
    const date = new Date(value);

    // Format tanggal: 08 Maret 2025
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Format waktu: jam 12:19
    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Menggunakan format 24 jam
    });

    return `${formattedDate} jam ${formattedTime}`;
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Kelompokkan transaksi berdasarkan jenis Tabungan
  const groupedAccounts = data.reduce((acc, item) => {
    const { Tabungan, Jenis, ["Rp."]: amount } = item;

    if (!acc[Tabungan]) {
      acc[Tabungan] = { pemasukan: 0, pengeluaran: 0 };
    }

    if (Jenis === "Pemasukan") {
      acc[Tabungan].pemasukan += amount;
    } else if (Jenis === "Pengeluaran") {
      acc[Tabungan].pengeluaran += amount;
    }

    return acc;
  }, {});

  // Filter transaksi berdasarkan tabungan yang dipilih
  const filteredData = data
    .filter((item) => (filter === "All" ? true : item.Tabungan === filter))
    .slice()
    .reverse(); // Tampilkan dari yang terbaru ke terlama

  return (
    <>
      <Navbar />
      <h1 className="w-full text-center text-2xl font-bold text-slate-800 mt-4 mb-7">
        My Account Details
      </h1>
      <div
        className="flex flex-wrap xs:grid xs:grid-cols-2 gap-2 items-center justify-between max-w-sm mx-auto mb-11"
        style={{ width: "90%" }}
      >
        {/* Tampilkan loading placeholder jika loading true */}
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardAccount
                key={index}
                loading={true} // Menampilkan status loading di CardAccount
                tabungan="Loading..."
                nominal="****"
              />
            ))
          : Object.entries(groupedAccounts).map(
              ([tabungan, { pemasukan, pengeluaran }], index) => (
                <CardAccount
                  key={index}
                  loading={false} // Loading selesai, tampilkan data asli
                  tabungan={tabungan}
                  nominal={formatRupiah(pemasukan - pengeluaran)}
                />
              )
            )}
      </div>

      <div className="max-w-sm mx-auto mt-4" style={{ width: "90%" }}>
        <div className="flex gap-2 flex-wrap mb-4">
          {["All", "BRI", "BCA", "JAGO", "Cash", "Lainnya"].map((tabungan) => (
            <button
              key={tabungan}
              className={`px-4 py-2 rounded ${
                filter === tabungan
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilter(tabungan)}
            >
              {tabungan}
            </button>
          ))}
        </div>

        {/* Tampilkan transaksi berdasarkan filter yang dipilih */}
        <div>
          {loading ? (
            <p>Loading transactions...</p>
          ) : filteredData.length ? (
            filteredData.map((item, index) => (
              <Transactions
                key={index}
                src={getBankLogo(item.Tabungan)} // Gantikan dengan URL logo sesuai tabungan jika perlu
                nominal={formatRupiah(item["Rp."])}
                keterangan={item.Keperluan}
                jenis={item.Jenis}
                waktu={formatTanggal(item.Timestamp)}
                tabungan={item.Tabungan}
              />
            ))
          ) : (
            <p className="text-gray-600">
              Tidak ada transaksi untuk tabungan ini.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Account;
