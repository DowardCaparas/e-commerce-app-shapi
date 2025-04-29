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
  return <div>{cartQuantity > 0 && cartQuantity}</div>;
};

export default CartQuantity;
