"use client";

import Link from "next/link";
import { ProductDataTypes } from "../lib/definitions";
import Image from "next/image";
import {
  fetchAllProducts,
  fetchProductByCategory,
  fetchProductsBySearch,
} from "../lib/data";
import React, { useEffect, useState } from "react";

const ProductCards = ({
  category = "",
  search = "",
}: {
  category?: string;
  search?: string;
}) => {
  const [products, setProducts] = useState<ProductDataTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let data: ProductDataTypes[] = [];

      if (search.trim() !== "") {
        data = await fetchProductsBySearch(search);
      } else if (category !== "") {
        data = await fetchProductByCategory(category);
      } else {
        data = await fetchAllProducts();
      }

      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, [category, search]); // react to both


  // render product card skeleton when loading or fetching is not done
  if (loading) {
    return (
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="bg-white animate-pulse rounded-md p-3 flex flex-col gap-3 shadow-sm"
          >
            <div className="bg-gray-200 h-40 w-full rounded" />
            <div className="bg-gray-200 h-4 w-3/4 rounded" />
            <div className="bg-gray-200 h-4 w-1/2 rounded" />
            <div className="flex gap-2">
              <div className="bg-gray-200 h-4 w-4 rounded-full" />
              <div className="bg-gray-200 h-4 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center col-span-full">No products found.</p>;
  }

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
      {products.map((product: ProductDataTypes) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="bg-white shadow-sm hover:shadow-md transition duration-100 ease-in
          max-md:rounded-sm hover:ring ring-orange-500 overflow-hidden relative"
          aria-label={`View details for ${product.title}`}
        >
          <div className="absolute -mt-1 right-0 z-10">
            <span className="bg-red-50 text-red-500 px-1 text-sm font-medium">
              -{product.discountPercentage.toFixed(2)}%
            </span>
          </div>
          <Image
            src={product.thumbnail ? product.thumbnail : ""}
            alt={product.title}
            width={300}
            height={300}
            className="w-full bg-white max-md:rounded-t-sm hover:scale-105 transition duration-100 ease-in"
          />
          <div className="p-2 flex flex-col gap-2">
            <span className="truncate">{product.title}</span>

            <span className="text-orange-600 font-medium">
              $<span className="text-xl">{product.price}</span>
            </span>
            <div className="flex items-center gap-2">
              <Image src="/star-filled.svg" alt="star" width={18} height={18} />
              <span>{product.rating}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCards;
