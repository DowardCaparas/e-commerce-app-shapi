"use client";

import { useState } from "react";

const SetQuantity = () => {
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
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleDecrement}
        className="cursor-pointer py-1 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 
        rounded-lg shadow-sm font-medium text-lg"
        aria-label="increment the item quantity "
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        inputMode="numeric"
        pattern="\d*"
        className="text-center w-20"
      />
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="cursor-pointer py-1 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 
        rounded-lg shadow-sm font-medium text-lg"
        aria-label="increment the item quantity "
      >
        +
      </button>
    </div>
  );
};

export default SetQuantity;
