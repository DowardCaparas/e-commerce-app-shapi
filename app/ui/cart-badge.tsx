"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartQuantity from "./cart-quantity";

const CartBadge = () => {
  const [storedUserId, setstoredUserId] = useState("")

  useEffect(() => {
    const checkAccount = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.userId) {
          setstoredUserId(data.userId);
        }

      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkAccount();
  }, []);

  return (
    <div className="relative">
      <Link href={`/dashboard/cart/${storedUserId}`} aria-label="Cart">
        <Image
          src="/cart.svg"
          alt="cart icon"
          width={25}
          height={25}
          className="cursor-pointer hover:scale-95"
        />
      </Link>
      {/* cart quantity */}
      <CartQuantity />
    </div>
  );
};

export default CartBadge;
