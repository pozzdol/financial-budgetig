// import Navbar from "./components/navbar";
import MainCard from "./components/mainCard";
import User from "./components/User";
import Card from "./components/Card";
import { BsCreditCard2Front, BsFileEarmarkPdf, BsWallet } from "react-icons/bs";
import Transactions from "./components/Transactions";
import { fetchSheetData } from "./services/api";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

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

  const filteredData = data
    .filter((item) => (filter === "All" ? true : item.Jenis === filter))
    .slice()
    .reverse() // Tampilkan dari yang terbaru ke terlama
    .slice(0, 5); // Ambil hanya 5 transaksi terbaru

  const totalPemasukan = data
    .filter((item) => item.Jenis === "Pemasukan")
    .reduce((sum, item) => sum + item["Rp."], 0);

  // Hitung Total Pengeluaran
  const totalPengeluaran = data
    .filter((item) => item.Jenis === "Pengeluaran")
    .reduce((sum, item) => sum + item["Rp."], 0);

  // Hitung Saldo Akhir (Pemasukan - Pengeluaran)
  const saldoAkhir = totalPemasukan - totalPengeluaran;

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

  if (error) return <p className="text-red-500">Error fetching data</p>;

  return (
    <>
      <div className="max-w-3xl mx-auto shadow-none md:shadow-xl">
        <User />
        <MainCard balance={formatRupiah(saldoAkhir)} />

        <div className="flex flex-wrap items-center justify-between max-w-sm mx-auto mb-4">
          <Card url="https://forms.gle/2T36XFXUxU2r6qF6A" />
          <Card url="" text="Account Details" icon={BsWallet} />
          <Card url="" text="Transaction Details" icon={BsCreditCard2Front} />
          <Card url="" text="Print Reports" icon={BsFileEarmarkPdf} />
        </div>

        <div className="max-w-sm mx-auto">
          <p className="text-lg font-semibold text-gray-800 mt-7">
            Latest Transactions
          </p>
        </div>

        <div className="max-w-sm mx-auto mt-4">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Pemasukan"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilter("Pemasukan")}
            >
              Income
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "Pengeluaran"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilter("Pengeluaran")}
            >
              Expense
            </button>
          </div>

          {loading ? (
            <Transactions
              src=""
              nominal="****"
              keterangan="*****"
              jenis="Pemasukan"
            />
          ) : filteredData.length ? (
            filteredData
              .slice()
              .reverse()
              .map((item, index) => (
                <Transactions
                  key={index}
                  src={getBankLogo(item.Tabungan)}
                  nominal={formatRupiah(item["Rp."])}
                  keterangan={item.Keperluan}
                  jenis={item.Jenis}
                />
              ))
          ) : (
            <p className="text-gray-600">Tidak ada transaksi.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
