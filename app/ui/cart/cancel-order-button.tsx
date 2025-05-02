"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CancelCheckedOutItem = ({ productId }: { productId: number }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState("");

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

  const handleDelete = async () => {
    setIsCanceling(true);
    try {
      await fetch("/api/cart/delete-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }), // removed userId
      });
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setIsCanceling(false);
      setShowConfirm(false); // close modal
      router.refresh(); // refresh cart page
    }
  };

  return (
    <>
      {role === "user" && (
        <>
          <button
            onClick={() => setShowConfirm(true)}
            className="border rounded-sm bg-white py-1 px-2 hover:bg-red-50 
            active:bg-red-100 transition cursor-pointer"
            aria-label="Delete item from cart"
          >
            Cancel Order
          </button>
          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
              <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
                <p className="mb-4 text-center text-black text-lg font-semibold">
                  Are you sure you want to cancel your order?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    disabled={isCanceling}
                    onClick={handleDelete}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="font-medium">
                      {isCanceling ? "Canceling..." : "Yes"}
                    </span>
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
                 active:scale-95 cursor-pointer "
                  >
                    <span className="font-medium">No</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CancelCheckedOutItem;
