"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditProductQuantity = ({
  qty,
  productId,
}: {
  qty: number;
  productId: number;
}) => {
  const [quantity, setQuantity] = useState(qty);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole) return;
    setRole(userRole);
  }, []);

  // Local update for quantity
  const updateQuantityOptimistically = (newQuantity: number) => {
    setQuantity(newQuantity); // Optimistic update
  };

  const updateQuantityOnServer = async (newQuantity: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await fetch("/api/cart/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
    }

    router.refresh();
    
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantityOptimistically(newQuantity);
      await updateQuantityOnServer(newQuantity);
    }
  };

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    updateQuantityOptimistically(newQuantity);
    await updateQuantityOnServer(newQuantity);
  };

  return (
    <>
      {role === "user" && (
        <div className="flex items-center gap-2">
          <span>Qty:</span>
          <button
            onClick={handleDecrement}
            className="cursor-pointer px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm shadow-sm font-medium text-lg disabled:opacity-50"
            aria-label="decrement the item quantity"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="cursor-pointer px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm shadow-sm font-medium text-lg disabled:opacity-50"
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
