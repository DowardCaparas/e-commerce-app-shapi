"use client";

import Image from "next/image";
import { ProductDataTypes } from "../lib/definitions";
import { useState } from "react";
import AddToCart from "./add-item";
import SetQuantity from "./set-quantity";
import ProductReviews from "./product-reviews";

const ProductDetails = ({
  title,
  price,
  discountPercentage,
  rating,
  brand,
  reviews,
  images,
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
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2 lg:px-16 md:px-8 md:mt-12">
        <div className="flex flex-col gap-4 items-center">
          {/* selected image */}
          <Image
            src={images?.[imageIndex] || ""}
            alt={title}
            width={500}
            height={500}
            className="w-full bg-zinc-100 rounded-md"
          />
          <div className="flex items-center gap-4 overflow-x-scroll p-4">
            {/* another images to toggle*/}
            {images?.map((image, index) => (
              <button
                key={image}
                onClick={() => setImageIndex(index)}
                className={`cursor-pointer rounded-lg
                ${index === imageIndex ? "ring-3 ring-orange-600" : ""}
          `}
              >
                <Image
                  src={image}
                  alt={title}
                  width={80}
                  height={80}
                  className="md:w-full bg-zinc-100 rounded-md"
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
                <span className="bg-red-100 text-red-500 px-1 rounded-md text-sm font-medium">
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
          <div className="flex flex-col gap-10 mt-8 max-md:hidden">
            <div>
              <span>Quantity:</span>
              <SetQuantity />
            </div>
            <AddToCart />
          </div>
        </div>
      </div>
      {/* reviews */}
      <ProductReviews reviews={reviews || []} />
      <div className="flex flex-col gap-10 mt-8 md:hidden px-4 mb-10 items-center">
        <div>
          <span>Quantity:</span>
          <SetQuantity />
        </div>
        <AddToCart />
      </div>
    </>
  );
};

export default ProductDetails;
