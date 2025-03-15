import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Perbaikan Import
import User from "./components/User";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Transaction from "./pages/Transaction";
import Print from "./pages/Print";

function App() {
  return (
    <>
      <div className="max-w-3xl mx-auto shadow-none md:shadow-xl">
        <User />

        {/* Routing di Level Tertinggi */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
