"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartQuantity from "./cart-quantity";

const CartBadge = ({userId}: {userId: string}) => {
  return (
    <div className="relative">
      <Link
        href={`/dashboard/cart/${userId}`}
        aria-label="Cart"
      >
        <Image
          src="/cart.svg"
          alt="cart icon"
          width={25}
          height={25}
          className="cursor-pointer hover:scale-95"
        />
      </Link>
        <span
          className="absolute -top-2 -right-0 bg-red-600 border-2 border-white 
         rounded-full text-white font-semibold text-xs p-0.5"
        >
          <CartQuantity />
        </span>
    </div>
  );
};

export default CartBadge;
