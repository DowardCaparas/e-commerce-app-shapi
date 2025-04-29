"use client";

import ProductCards from "./product-card";
import { fetchCategoryList } from "../lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

const ProductCategories = () => {
  const [category, setCategory] = useState("");
  const [lists, setLists] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchCategoryList();
      setLists(options);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="category" className="text-gray-700 font-medium text-lg">
            Categories
          </label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              id="category"
              className="w-[200px] bg-white text-sm hover:bg-orange-50 active:bg-gray-100
               rounded-md border border-gray-300 cursor-pointer"
            >
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {lists.map((list) => (
                <SelectItem
                  key={list}
                  value={list}
                  className="hover:bg-gray-100 cursor-pointer my-2"
                >
                  {list}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      <ProductCards category={category}/>
    </>
  );
};

export default ProductCategories;
