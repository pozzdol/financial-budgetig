import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function MainCard(props) {
  const { balance, loading } = props;
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div
      className="max-w-sm mx-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 my-4"
      style={{ width: "87%" }}
    >
      {/* Balance Section */}
      <h5 className="text-lg font-medium mb-2">Balance</h5>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">
          {loading ? (
            <div className="w-44 h-8 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 rounded-sm animate-pulse"></div>
          ) : showBalance ? (
            "Rp *******"
          ) : (
            balance
          )}
        </p>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="focus:outline-none me-3"
        >
          {showBalance ? <FiEye size={22} /> : <FiEyeOff size={22} />}
        </button>
      </div>

      {/* Card Number */}
      <div className="flex justify-between mt-12">
        <p className="mt-2 tracking-widest text-lg">**** **** **** 4312</p>
        <div className="w-12 h-8 flex justify-center items-center bg-white rounded-sm">
          <img src="/Visa_2021.svg" alt="Visa Card" className="w-9" />
        </div>
      </div>
    </div>
  );
}

export default MainCard;
