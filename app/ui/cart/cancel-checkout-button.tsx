"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BackButtonCancelCheckOut = ({ path }: { path: string }) => {
  const handleSubmit = async () => {
    try {
      await fetch("/api/cart/cancel-check-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Link href={path} onClick={handleSubmit} aria-label="cancel item to check out">
      <Image
        src="/chevron-left.svg"
        alt="back button"
        width={35}
        height={35}
        className="bg-white p-1 rounded-full hover:border border-white active:scale-95
        transition"
      />
    </Link>
  );
};

export default BackButtonCancelCheckOut;
