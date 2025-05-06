"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlaceOrderButton = ({userId}: {userId: string}) => {
  const [isPLacingOrder, setIsPLacingOrder] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setIsPLacingOrder(true);

    try {
      const res = await fetch("/api/cart/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        // refresh the page when success
        router.refresh();
        // redirect to check out page
        router.push(`/dashboard/orders/${userId}`);
      } else {
        setIsPLacingOrder(false);
        console.error("Placing order failed:", data.error);
      }
    } catch (err) {
      console.error("Placing order error:", err);
      setIsPLacingOrder(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePlaceOrder}
        aria-label="place order"
        className="bg-red-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer
      hover:bg-red-600 active:bg-red-700 flex items-center justify-center gap-1
        disabled:cursor-not-allowed disabled:bg-red-300"
        disabled={isPLacingOrder}
      >
        <span>Place Order</span>
      </button>

      {isPLacingOrder && (
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
              Placing order...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderButton;
