"use client"

import Link from "next/link";
import { ProductDataTypes } from "../lib/definitions";
import Image from "next/image";
import { fetchAllProducts, fetchProductByCategory, fetchProductsBySearch } from "../lib/data";
import { useEffect, useState } from "react";

const ProductCards = ({ category, search = "" }: { category: string, search?: string }) => {
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
        data = await fetchAllProducts(15);
      }

      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, [category, search]); // react to both

  if (loading) {
    return <p className="text-center col-span-full">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center col-span-full">No products found.</p>;
  }

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      {products.map((product: ProductDataTypes) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="bg-white shadow-sm hover:shadow-md transition-transform duration-200 hover:scale-[1.01]"
          aria-label={`View details for ${product.title}`}
        >
          <Image
            src={product.thumbnail ? product.thumbnail : ""}
            alt={product.title}
            width={300}
            height={300}
            className="w-full bg-linear-to-l from-white to-gray-200"
          />
          <div className="p-2 flex flex-col gap-3">
            <div className="inline-grid">
              <span className="font-medium text-md truncate">
                {product.title}
              </span>
              <span className="bg-orange-600 font-semibold text-white py-1 px-2 text-sm w-30">
                $
                {(product.price * (product.discountPercentage / 100)).toFixed(
                  2
                )}{" "}
                off
              </span>
            </div>

            <span className="text-orange-600 font-medium">
              $<span className="text-xl">{product.price}</span>
            </span>
            <div className="flex items-center gap-2">
              <Image src="/star-filled.svg" alt="star" width={18} height={18} />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-600">{product.brand}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCards;
