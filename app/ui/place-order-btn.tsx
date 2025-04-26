"use client";

import React, { useEffect, useState } from "react";

const PlaceOrderButton = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole) return;

    setRole(userRole);
  }, []);
  return (
    <>
      {role === "user" && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md
      font-medium cursor-pointer hover:bg-red-600 active:scale-95"
        >
          Place Order
        </button>
      )}
    </>
  );
};

export default PlaceOrderButton;
