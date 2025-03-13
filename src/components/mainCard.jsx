import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function MainCard(props) {
  const { balance } = props;
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 my-4">
      {/* Balance Section */}
      <h5 className="text-lg font-medium mb-2">Balance</h5>
      <div className="flex gap-3 items-center">
        <p className="text-2xl font-bold">
          {showBalance ? "Rp *******" : balance}
        </p>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="focus:outline-none"
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
