"use client";

import React, { useEffect, useState } from "react";

type Props = {
    productId: number;
    onSelectChange: (productId: number, checked: boolean) => void;
}

const SelectCartItem = ({productId, onSelectChange}: Props) => {
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    onSelectChange(productId, checked);
  }, [checked])
  

  return (
    <div>
      <input
        type="checkbox"
        name="select_product"
        id="select_product"
        className="cursor-pointer accent-orange-500 h-4 w-4"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
};

export default SelectCartItem;
