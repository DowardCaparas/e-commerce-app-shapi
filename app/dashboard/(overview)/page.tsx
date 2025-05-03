"use client";

import CartBadge from "@/app/ui/cart-badge";
import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.role) {
          setRole(data.role);
        }

      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkRole();
  }, []);

  return (
    <div className="relative">
      <header
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 md:left-64 flex items-center gap-4 z-20"
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
       <div className="w-10">
       {role === "user" && <CartBadge />}
       </div>
      </header>
      {/* <ProductCategories /> */}
      <div className="p-4 mt-20 mb-28">
        {search ? <ProductCards search={search}/> : <ProductCategories />}
        
      </div>
    </div>
  );
};

export default DashboardPage;
