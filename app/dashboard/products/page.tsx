"use client";

import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ProductPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <h3 className="text-2xl text-gray-500 font-medium">Products</h3>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-white text-start p-4 w-full cursor-text text-gray-500 
              border-2 border-orange-500 my-5"
      />
      {search ? (
        <ProductCards search={search}/>
      ) : (
        <ProductCategories />
      )}
    </div>
  );
};

export default ProductPage;
