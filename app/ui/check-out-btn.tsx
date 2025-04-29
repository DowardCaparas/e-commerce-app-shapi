"use client";

import React from "react";
import CartQuantity from "./cart-quantity";

const CheckOutButton = () => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer 
      hover:bg-red-600 active:scale-95 flex items-center justify-center gap-1"
    >
      <span>Check Out</span> (<CartQuantity />)
    </button>
  );
};

export default CheckOutButton;
