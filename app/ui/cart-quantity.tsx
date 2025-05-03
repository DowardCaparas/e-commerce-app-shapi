"use client";

import { useEffect, useState } from "react";

const CartQuantity = () => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const res = await fetch(`/api/cart/quantity`);
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
  }, []);

  //   only return a number if the quantity is greater than zero
  return (
    <>
      {cartQuantity > 0 && (
        <span
          className="absolute -top-3 -right-0 bg-red-600 border-2 border-white 
        rounded-full text-white font-semibold text-xs p-0.5"
        >
          {cartQuantity}
        </span>
      )}
    </>
  );
};

export default CartQuantity;
