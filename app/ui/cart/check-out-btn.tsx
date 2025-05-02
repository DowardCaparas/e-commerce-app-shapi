"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const CheckOutButton = ({
  selectedProductIds,
}: {
  selectedProductIds: number[];
}) => {
  const [checkOutSuccess, setcheckOutSuccess] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (selectedProductIds.length === 0) return;

    try {
      const res = await fetch("/api/cart/check-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: selectedProductIds }),
      });

      const data = await res.json();
      if (data.success) {
        setcheckOutSuccess(true);
        // refresh the page when success
        router.refresh();
      } else {
        console.error("Checkout failed:", data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  useEffect(() => {
    if (checkOutSuccess) {
      const timeout = setTimeout(() => setcheckOutSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [checkOutSuccess]);

  return (
    <>
      <button
        onClick={handleCheckout}
        aria-label="check out item from cart"
        className="bg-red-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer
      hover:bg-red-600 active:scale-95 flex items-center justify-center gap-1 disabled:opacity-50
      disabled:cursor-not-allowed transition"
        disabled={selectedProductIds.length === 0}
      >
        <span>Check Out</span> ({selectedProductIds.length})
      </button>

      {checkOutSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 flex flex-col items-center gap-4 rounded-xl shadow-2xl w-80">
            <Image
              src="/check.svg"
              alt="check icon"
              width={70}
              height={70}
              className="bg-green-300 rounded-full p-5"
            />
            <span className="mb-4 text-center text-black text-lg font-semibold">
              Check out success!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOutButton;
