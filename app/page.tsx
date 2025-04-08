import React from "react";
import { fetchAllProducts } from "./lib/data";

const Home = async () => {
  const products = await fetchAllProducts();

  return (
    <div className="lg:px-16 md:px-8 px-4 py-28">
      {/* <div className="grid grid-cols-5 gap-4">
        {products.map((item: ProductDataTypes) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            price={item.price}
            discountPercentage={item.discountPercentage}
            rating={item.rating}
            brand={item.brand}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Home;
