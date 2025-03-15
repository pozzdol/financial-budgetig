import React, { useEffect, useState } from "react";
import MainCard from "../components/mainCard";
import Card from "../components/Card";
import Transactions from "../components/Transactions";
import { BsCreditCard2Front, BsFileEarmarkPdf, BsWallet } from "react-icons/bs";
import { fetchSheetData } from "../services/api";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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

  if (error) return <p className="text-red-500">Error fetching data</p>;

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

  const filters = [
    { label: "All", value: "All" },
    { label: "Income", value: "Pemasukan" },
    { label: "Expense", value: "Pengeluaran" },
  ];

  return (
    <>
      <MainCard loading={loading} balance={formatRupiah(saldoAkhir)} />

      <div
        className="flex flex-wrap xs:grid xs:grid-cols-2 gap-2 items-center justify-between max-w-sm mx-auto mb-4"
        style={{ width: "87%" }}
      >
        <Card url="https://forms.gle/2T36XFXUxU2r6qF6A" />
        <Card url="/account" text="Account Details" icon={BsWallet} />
        <Card
          url="/transaction"
          text="Transaction Details"
          icon={BsCreditCard2Front}
        />
        <Card url="/print" text="Print Reports" icon={BsFileEarmarkPdf} />
      </div>

      {/* Routing di Level Tertinggi */}

      <div className="max-w-sm mx-auto" style={{ width: "87%" }}>
        <p className="text-lg font-semibold text-gray-800 mt-7">
          Latest Transactions
        </p>
      </div>

      <div className="max-w-sm mx-auto mt-4" style={{ width: "90%" }}>
        <div className="flex gap-2 mb-4">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              className={`px-4 py-2 rounded ${
                filter === value
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <Transactions
            loading={loading}
            src=""
            nominal="****"
            keterangan="*****"
            jenis="Pemasukan"
          />
        ) : filteredData.length ? (
          filteredData.map((item, index) => (
            <Transactions
              key={index}
              src={getBankLogo(item.Tabungan)}
              nominal={formatRupiah(item["Rp."])}
              keterangan={item.Keperluan}
              jenis={item.Jenis}
              waktu={formatTanggal(item.Timestamp)}
              tabungan={item.Tabungan}
            />
          ))
        ) : (
          <p className="text-gray-600">Tidak ada transaksi.</p>
        )}
      </div>
    </>
  );
}

export default Home;
