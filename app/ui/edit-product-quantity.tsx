"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const EditProductQuantity = ({
  qty,
  productId,
}: {
  qty: number;
  productId: number;
}) => {
  const [quantity, setQuantity] = useState(qty);
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole) return;

    setRole(userRole);
  }, []);

  const handleDecrement = () => {
    setQuantity((prev) => (prev !== 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const updateProductQuantity = async () => {
      try {
        await fetch("/api/cart/update-quantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId, quantity }),
        });
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }

      router.refresh();
    };

    if (userId) {
      updateProductQuantity();
    }
  }, [router, quantity, productId]);

  return (
    <>
      {role === "user" && (
        <div className="flex items-center gap-2">
          <span>Qty:</span>
          <button
            onClick={handleDecrement}
            className="cursor-pointer px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm shadow-sm font-medium text-lg"
            aria-label="decrement the item quantity"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="cursor-pointer px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm shadow-sm font-medium text-lg"
            aria-label="increment the item quantity"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default EditProductQuantity;
