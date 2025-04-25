"use client";

import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import Image from "next/image";
import { useState } from "react";

const ProductPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">Products</span>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="peer block w-full rounded-md ring-2 ring-orange-500 py-[9px] pl-10 text-sm
        placeholder:text-gray-500 my-8"
        />
        <Image
          src="/magnifying-glass.svg"
          alt="search icon"
          width={20}
          height={20}
          className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 
               text-gray-500 peer-focus:text-gray-900"
        />
      </div>
      {search ? <ProductCards search={search} /> : <ProductCategories />}
    </div>
  );
};

export default ProductPage;
