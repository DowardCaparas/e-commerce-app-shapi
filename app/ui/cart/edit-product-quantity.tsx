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
        
        <div className="flex items-center gap-2 border rounded-md">
          
          <button
            onClick={handleDecrement}
            className="cursor-pointer px-3 hover:bg-gray-100 active:bg-gray-200 
        rounded-l-md text-xl font-semibold border-r"
            aria-label="decrement the item quantity"
          >
            -
          </button>
          <span className="font-medium mx-2">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="cursor-pointer px-3 hover:bg-gray-100 active:bg-gray-200 
        rounded-r-md font-semibold text-xl border-l"
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
