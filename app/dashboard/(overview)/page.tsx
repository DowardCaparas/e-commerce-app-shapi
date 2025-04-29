"use client";

import CartBadge from "@/app/ui/cart-badge";
import ProductCards from "@/app/ui/product-card";
import ProductCategories from "@/app/ui/product-categories";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("/api/check-account");
        const data = await res.json();

        if (data.role) {
          setRole(data.role);
        }

        setUserId(data.userId);
      } catch (error) {
        console.error("Failed to check the role:", error);
      }
    };
    checkRole();
  }, []);

  return (
    <div className="relative">
      <header
        className="bg-gradient-to-t from-[#F6402D] to-[#FE6333] px-4 py-6 w-full
      flex justify-evenly items-center gap-4"
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
        {role === "user" && <CartBadge userId={userId ? userId : ""} />}
      </header>
      {/* <ProductCategories /> */}
      <div className="p-4 mt-2 mb-28">
        {search ? <ProductCards search={search}/> : <ProductCategories />}
        
      </div>
    </div>
  );
};

export default DashboardPage;
