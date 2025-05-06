"use client";

import CartBadge from "@/app/ui/cart-badge";
import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import Image from "next/image";
import React, { useState } from "react";

const DashboardPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <header
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 lg:left-64 flex items-center gap-4 z-20"
      >
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>

          <input
            placeholder="Search products"
            className="peer block w-full rounded-sm py-2 pl-10 text-sm
                placeholder:text-orange-600 bg-white"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image
            src="/magnifying-glass.svg"
            alt="search icon"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          />
        </div>
        <CartBadge />
      </header>
      {/* <ProductCategories /> */}
      <div className="mt-16 mb-28">
        {search ? <ProductCards search={search}/> : <ProductCategories />}
        
      </div>
    </div>
  );
};

export default DashboardPage;
