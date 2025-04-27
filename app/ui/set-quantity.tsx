"use client";

import React, { useState } from "react";
import AddToCart from "./add-to-cart";

const SetQuantity = ({
  productId,
  name,
  price,
  discount,
  thumbnail,
}: {
  productId: number;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev !== 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? 1 : parseInt(value, 10));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full px-2 py-4">
        <span className="text-sm md:text-xl font-medium">Quantity</span>
        <div className="flex items-center gap-2 border rounded-md right-0">
          <button
            onClick={handleDecrement}
            className="cursor-pointer py-1 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 
        rounded-l-md shadow-sm text-xl font-semibold"
            aria-label="increment the item quantity "
            disabled={quantity === 1}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="\d*"
            className="text-center text-orange-600 font-medium w-12"
          />
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="cursor-pointer py-1 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 
        rounded-r-md shadow-sm font-semibold text-xl"
            aria-label="increment the item quantity "
          >
            +
          </button>
        </div>
      </div>
      <AddToCart
        productId={productId}
        name={name}
        price={price}
        discount={discount}
        thumbnail={thumbnail}
        quantity={quantity}
      />
    </>
  );
};

export default SetQuantity;
