"use client";

import React, { useEffect, useState } from "react";

const PlaceOrderButton = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.role) {
          setRole(data.role);
        }
      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkRole();
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
