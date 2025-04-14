"use client";

import { useEffect, useState } from "react";
import ProductCards from "./product-card";
import { fetchCategoryList } from "../lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="bg-white p-5">
      <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="category" className="text-gray-500 font-medium">
            Categories
          </label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              id="category"
              className="w-[200px] bg-gray-100 text-sm hover:bg-gray-200 active:bg-gray-100
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
      <ProductCards category={category} limit={15}/>
    </div>
  );
};

export default ProductCategories;
