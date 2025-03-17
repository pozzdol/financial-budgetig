import React, { useEffect, useState } from "react";
import CardAccount from "../components/CardAccount";
import { fetchSheetData } from "../services/api";

function Account() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

  return (
    <>
      <h1 className="w-full text-center text-2xl font-bold text-slate-800 mt-4 mb-7">
        My Account Details
      </h1>
      <div
        className="flex flex-wrap xs:grid xs:grid-cols-2 gap-2 items-center justify-between max-w-sm mx-auto mb-4"
        style={{ width: "90%" }}
      >
        {Object.entries(groupedAccounts).map(
          ([tabungan, { pemasukan, pengeluaran }], index) => (
            <CardAccount
              key={index}
              tabungan={tabungan}
              nominal={formatRupiah(pemasukan - pengeluaran)}
            />
          )
        )}
      </div>
    </>
  );
}

export default Account;
