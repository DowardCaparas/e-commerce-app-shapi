"use client";

import Image from "next/image";
import { ProductDataTypes } from "../../lib/definitions";
import React, { useState } from "react";
import SetQuantity from "./set-quantity";
import ProductReviews from "./product-reviews";
import ProductCards from "../product-card";
import BackButton from "../back-button";
import CartBadge from "../cart-badge";

const ProductDetails = ({
  id,
  title,
  thumbnail,
  price,
  discountPercentage,
  rating,
  brand,
  reviews,
  images,
  category,
  description,
  warrantyInformation,
  shippingInformation,
  returnPolicy,
}: ProductDataTypes) => {
  // state management for toggling the big image
  const [imageIndex, setImageIndex] = useState(0);
  // Calculate original price before discount
  const safeDiscount = parseFloat(Math.abs(discountPercentage).toFixed(0));
  const originalPrice = price / (1 - safeDiscount / 100);

  const discountAmount = originalPrice - price;

  return (
    <>
      <div className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] z-20 
        fixed top-0 right-0 left-0 flex justify-between items-center px-2 md:px-8"> 
        <BackButton path="/dashboard" />
        <div className="w-10">
        <CartBadge />
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2 lg:px-16 md:px-8 mt-28">
        <div className="flex flex-col gap-4 items-center">
          {/* selected image */}
          <Image
            src={images?.[imageIndex] || ""}
            alt={title}
            width={500}
            height={500}
            className="w-full rounded-md object-contain"
          />
          <div className="flex w-full gap-2 overflow-x-scroll px-2 py-4 bg-white">
            {/* another images to toggle*/}
            {images?.map((image, index) => (
              <button
                key={image}
                onClick={() => setImageIndex(index)}
                className={`cursor-pointer rounded-lg
                ${index === imageIndex 
                  ? "ring-2 ring-orange-600" 
                  : "hover:ring-2 ring-orange-300"}
          `}
              >
                <Image
                  src={image}
                  alt={title}
                  width={60}
                  height={60}
                  className="w-full bg-gray-100 rounded-md"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="w-full bg-white p-4">
          <span className="font-medium">{brand}</span> {/* brand name */}
          <div className="flex flex-col max-md:flex-col-reverse md:gap-6 gap-4 mt-1 mb-4">
            <span className="md:text-2xl text-xl md:font-semibold font-medium">
              {title}
            </span>{" "}
            {/* name */}
            <div className="flex items-center gap-2">
              {/* rating */}
              <div className="flex items-center gap-2">
                <Image
                  src="/star-filled.svg"
                  alt="star"
                  width={18}
                  height={18}
                />
                <span>{rating?.toFixed(1)}</span>
              </div>
              {/* review count */}
              <span className="text-gray-700">({reviews?.length} reviews)</span>
            </div>
            {/* price */}
            <div className="inline-grid">
              <div className="flex items-center gap-4 mb-2">
                <span className="md:text-4xl text-2xl font-medium">
                  $ {price}
                </span>
                <span className="text-gray-600 line-through md:text-xl">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-50 text-red-500 px-1 text-sm font-medium">
                  -{discountPercentage.toFixed(2)}%
                </span>
              </div>
              {/* discount */}
              <span className="bg-orange-400 font-semibold text-white py-1 px-2 text-sm w-30">
                ${discountAmount.toFixed(2)} off
              </span>
            </div>
          </div>
          <span>{description}</span>
          <hr className="text-zinc-300 mt-4" />
          <div className="flex items-center gap-2 border-b border-zinc-300 py-4">
            <Image src="/truck.svg" alt="mini truck" width={20} height={20} />
            <span>{shippingInformation}</span>
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-300 py-4">
            <Image
              src="/shield-check.svg"
              alt="mini shield"
              width={20}
              height={20}
            />
            <span>{warrantyInformation}</span>
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-300 py-4">
            <Image
              src="/rotate-arrow.svg"
              alt="rotate arrow"
              width={20}
              height={20}
            />
            <span>{returnPolicy}</span>
          </div>
          <div className="mt-10 max-md:hidden">
            <SetQuantity
              productId={id}
              name={title}
              price={price}
              discount={discountPercentage}
              thumbnail={thumbnail}
            />
          </div>
        </div>
      </div>
      {/* reviews */}
      <ProductReviews reviews={reviews || []} />

      {/* related products */}
      <div className="lg:px-16 md:px-8 px-4 md:mb-28 mb-48">
        <h3 className="mb-10 font-semibold text-gray-700 text-2xl max-md:text-xl">
          Related products
        </h3>
        <ProductCards category={category} />
      </div>

      {/* for mobile devices add to cart */}
      <div
        className="fixed bottom-0 bg-gray-200 w-full flex flex-col gap-2 md:hidden
       items-center border z-20"
      >
        <SetQuantity
          productId={id}
          name={title}
          price={price}
          discount={discountPercentage}
          thumbnail={thumbnail}
        />
      </div>
    </>
  );
};

export default ProductDetails;
