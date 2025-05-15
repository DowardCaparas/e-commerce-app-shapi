"use client";

import { useRouter } from "next/navigation";
import React from "react";

const CancelItemToCheckOut = ({productId}: {productId: number}) => {

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await fetch("/api/cart/cancel-check-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId
        })
      });

       router.refresh();

    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="py-1 px-4 border rounded-lg hover:bg-gray-50 cursor-pointer
      active:bg-gray-100"
    >
      Cancel
    </button>
  );
};

export default CancelItemToCheckOut;
