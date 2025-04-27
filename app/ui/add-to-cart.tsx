"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [showAddingSuccess, setshowAddingSuccess] = useState(false);
  const route = useRouter();

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const date = new Date().toISOString().split("T")[0];

    if (!userId) return;

    setIsAdding(true);

    try {
      await fetch("/api/cart/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
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
      setshowAddingSuccess(true);
      route.refresh();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setshowAddingSuccess(false);
    }
  };

  return (
    <>
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
            <button
              onClick={() => setshowAddingSuccess(false)}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2
                            rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
