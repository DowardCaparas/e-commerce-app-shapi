"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteItemFromCart = ({ productId }: { productId: number }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch("/api/cart/delete-item-from-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }), // removed userId
      });
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false); // close modal
      router.refresh(); // refresh cart page
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="border rounded-sm bg-white p-1 hover:bg-red-50 active:bg-red-100 transition
         cursor-pointer"
        aria-label="Delete item from cart"
      >
        <Image src="/trash.svg" alt="small trash icon" width={20} height={20} />
      </button>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
            <p className="mb-4 text-center text-black text-lg font-semibold">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="font-medium">
                  {isDeleting ? "Deleting..." : "Yes"}
                </span>
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
                 active:scale-95 cursor-pointer "
              >
                <span className="font-medium">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteItemFromCart;
