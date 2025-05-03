"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CheckOutButton = ({
  selectedProductIds,
  userId,
}: {
  selectedProductIds: number[];
  userId: string;
}) => {
  const [ischeckingOut, setIscheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIscheckingOut(true);

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
        // refresh the page when success
        router.refresh();
        // redirect to check out page
        router.push(`/dashboard/checkout/${userId}`);
      } else {
        setIscheckingOut(false);
        console.error("Checkout failed:", data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setIscheckingOut(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        aria-label="check out item from cart"
        className="bg-red-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer
      hover:bg-red-600 active:bg-red-700 flex items-center justify-center gap-1
        disabled:cursor-not-allowed disabled:bg-red-300"
        disabled={selectedProductIds.length === 0 || ischeckingOut}
      >
        <span>Check Out</span> ( {selectedProductIds.length} )
      </button>

      {ischeckingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 flex flex-col items-center gap-4 rounded-xl shadow-2xl w-80">
            <Image
              src="/loader.svg"
              alt="check icon"
              width={50}
              height={50}
              className="animate-spin"
            />
            <span className="mb-4 text-center text-black text-lg font-semibold">
              Checking out...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOutButton;
