"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartBadge = ({ userId }: { userId: string }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchCartQuantity = async () => {
      try {
        const res = await fetch(`/api/cart/quantity?userId=${userId}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setCartQuantity(data.quantity);
      } catch (error) {
        console.error("Failed to fetch cart quantity:", error);
      }
    };

    fetchCartQuantity();
    const interval = setInterval(fetchCartQuantity, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="relative bg-white p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200">
      <Link
        href={`/dashboard/cart/${userId}`}
        className="font-medium"
        aria-label="Cart"
      >
        <Image
          src="/cart.svg"
          alt="cart icon"
          width={25}
          height={25}
          className="cursor-pointer"
        />
      </Link>
      {cartQuantity > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-600 border-2 border-orange-700 
          p-0.5 rounded-full text-white font-semibold text-xs"
        >
          {cartQuantity}
        </span>
      )}
    </div>
  );
};

export default CartBadge;
