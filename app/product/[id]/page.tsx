import { fetchProductById } from "@/app/lib/data";
import ProductDetails from "@/app/ui/product-details";
import React from "react";

const ProductPage = async (props: {
  params: Promise<{
    id: number;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const product = await fetchProductById(id);

  return (
      <ProductDetails 
        id={product.id}
        title={product.title} 
        price={product.price}
        discountPercentage={product.discountPercentage}
        rating={product.rating}
        brand={product.brand}
        reviews={product.reviews}
        images={product.images}
        category={product.category}
        description={product.description}
        warrantyInformation={product.warrantyInformation}
        shippingInformation={product.shippingInformation}
        returnPolicy={product.returnPolicy}
      />
  );
};

export default ProductPage;
