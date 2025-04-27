"use client"

import ProductCards from "@/app/ui/product-card";
import Image from "next/image";
import React, { useState } from "react";

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative">
      <header className="bg-gradient-to-t from-[#F6402D] to-[#FE6333] px-2 py-6 w-full">
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
      </header>
      <div className="bg-gray-200 p-2 mt-5 mb-28">
        <ProductCards search={search} />
      </div>
    </div>
  );
};

export default DashboardPage;
