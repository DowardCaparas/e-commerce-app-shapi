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
  const [role, setRole] = useState("");
  const router = useRouter();
  
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

  // Local update for quantity
  const updateQuantityOptimistically = (newQuantity: number) => {
    setQuantity(newQuantity); // Optimistic update
  };

  const updateQuantityOnServer = async (newQuantity: number) => {
    try {
      await fetch("/api/cart/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
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
