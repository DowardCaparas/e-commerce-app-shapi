import React from "react";
import { ProductDataTypes } from "../lib/definitions";
import Image from "next/image";

const ProductReviews = ({reviews}: {reviews?: ProductDataTypes['reviews']}) => {
  const ratingCount: { [key: number]: number } = {};

  reviews?.forEach((review) => {
    ratingCount[review.rating] = (ratingCount[review.rating] || 0) + 1;
  });

  const totalReviews = reviews?.length || 0;
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-40 gap-12 lg:px-16 md:px-8 px-4 md:mt-12 py-16">
      {/* reviews */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-gray-800">Reviews</span>
          <span className="text-lg">({reviews?.length})</span>
        </div>
        <div className="mt-6 space-y-4">
          {reviews?.map((review, index) => (
            <div key={index}>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg">
                  {review.reviewerName}
                </span>
                <span className="text-gray-500 font-medium">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Image
                    key={i}
                    src={
                      i < review.rating ? "/star-filled.svg" : "/star-empty.svg"
                    }
                    alt="star"
                    width={18}
                    height={18}
                  />
                ))}
              </div>
              <span>{review.comment}</span>
              <div className="my-10">
                <hr className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* reviews rating bar */}
      <div className="flex flex-col gap-5">
        {[5, 4, 3, 2, 1].map((rate) => {
          const count = ratingCount[rate] || 0;
          const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

          return (
            <div key={rate} className="flex items-center relative">
              <span className="text-gray-500 font-semibold absolute z-10">
                {rate}
              </span>
              <div className="h-4 w-full rounded-sm bg-gray-200 mx-5">
                <div
                  className="h-4 rounded-sm bg-yellow-500 absolute"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-gray-500 font-semibold absolute right-0">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
