import React from "react";

function CardAccount(props) {
  const { tabungan, nominal, loading } = props;

  const getCardColor = (tabungan) => {
    const colors = {
      BRI: "from-blue-50 to-blue-200", // Warna biru
      BCA: "from-sky-100 to-sky-300", // Warna biru
      JAGO: "from-yellow-50 to-yellow-200", // Warna kuning
      Cash: "from-green-50 to-green-200", // Warna hijau
      Default: "from-gray-50 to-gray-200", // Default warna abu-abu
    };
    return colors[tabungan] || colors["Default"];
  };

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

  const getBank = (bank) => {
    switch (bank) {
      case "BCA":
        return "Bank";
      case "Cash":
        return "Money";
      case "BRI":
        return "Bank";
      case "JAGO":
        return "Bank";
      default:
        return "e-Money"; // Jika tidak ada match, kosongkan gambar
    }
  };

  return (
    <>
      {loading ? (
        // Placeholder loading saat data belum ada
        <div className="w-full xs:w-44 p-2 px-3 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex flex-col animate-pulse">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gradient-to-tl from-slate-100 to-slate-200 rounded-full p-[2px] animate-pulse"></div>
              <span className="w-12 h-6 bg-gradient-to-tl from-slate-100 to-slate-200 animate-pulse"></span>
            </div>
            <span className="text-xs w-14 h-4 bg-gradient-to-tl from-slate-100 to-slate-200 animate-pulse rounded-full"></span>
          </div>
          <span className="w-14 h-6 bg-gradient-to-tl from-slate-100 to-slate-200 animate-pulse"></span>
        </div>
      ) : (
        <div
          className={`w-full xs:w-44 p-2 px-3 bg-gradient-to-br ${getCardColor(
            tabungan
          )} rounded-lg flex flex-col`}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2 items-center">
              <img
                src={getBankLogo(tabungan)}
                alt=""
                className="w-6 h-6 bg-white rounded-full p-[2px]"
              />
              <span>{tabungan}</span>
            </div>
            <span className="text-xs px-2 bg-slate-100 rounded-full">
              {getBank(tabungan)}
            </span>
          </div>
          <span className="font-semibold">{nominal}</span>
        </div>
      )}
    </>
  );
}

export default CardAccount;
