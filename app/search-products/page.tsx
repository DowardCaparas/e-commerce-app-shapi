"use client";

import { useState } from "react";
import ProductCards from "../ui/product-card";
import { Input } from "@/components/ui/input";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="lg:px-16 md:px-8 px-4 mb-28">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-white text-start p-4 w-full cursor-text text-gray-500 
              border-2 border-orange-500 md:mt-10 mt-5 mb-15"
      />

      {search && <ProductCards category={""} search={search} />}
    </div>
  );
};

export default SearchProducts;
