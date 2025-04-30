"use client";

import React from "react";

const CheckOutButton = ({ selectedProducts }: { selectedProducts: number }) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer 
      hover:bg-red-600 active:scale-95 flex items-center justify-center gap-1"
    >
      <span>Check Out</span> ( {selectedProducts} )
    </button>
  );
};

export default CheckOutButton;
