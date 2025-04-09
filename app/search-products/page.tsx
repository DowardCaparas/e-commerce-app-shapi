"use client";

import { useState } from "react";
import ProductCards from "../ui/product-card";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-white text-start py-2 px-4 w-full cursor-text text-gray-500 
              border-2 border-orange-500"
      />
      {search && <ProductCards category={""} search={search}/>}
    </div>
  );
};

export default SearchProducts;
