"use client";

import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import Image from "next/image";
import React, { useState } from "react";

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
          className="peer block w-full rounded-sm py-2 pl-10 text-sm my-6
        placeholder:text-[#808084] bg-[#ECECEE] focus:bg-white"
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
