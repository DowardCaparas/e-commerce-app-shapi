"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const AddToCart = ({
  productId,
  name,
  price,
  discount,
  thumbnail,
  quantity,
}: {
  productId: number;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
  quantity: number;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showAddingSuccess, setShowAddingSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showAddingSuccess) {
      const timeout = setTimeout(() => setShowAddingSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showAddingSuccess]);

  const handleSubmit = async () => {
    const date = new Date().toISOString().split("T")[0];
    setIsAdding(true);

    try {
      await fetch("/api/cart/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          name,
          price,
          discount,
          thumbnail,
          quantity,
          date,
        }),
      });
      setIsAdding(false);
      setError("");
      setShowAddingSuccess(true);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      if (quantity <= 0) {
        setError("Quantity must be greater than 0");
        return;
      }
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="p-2 w-full bg-white">
        <button
          onClick={handleSubmit}
          disabled={isAdding}
          className="bg-yellow-500 text-white py-2 px-6 font-semibold rounded-md cursor-pointer w-full
    hover:bg-yellow-400 active:bg-yellow-500 transition-colors duration-100 ease-in shadow-md text-xl
    disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adding..." : " Add to Cart"}
        </button>
      </div>
      {showAddingSuccess && (
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
              Item added to cart
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
