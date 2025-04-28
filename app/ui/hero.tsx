"use client";

import Image from "next/image";
import React, { useState } from "react";

const Hero = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <section
      className="flex max-md:flex-col-reverse justify-between max-md:items-center 
    gap-10 mt-40 mb-14"
    >
      <div className="md:w-[50%]">
        <h1
          className="mb-2 xl:text-6xl lg:text-5xl sm:text-4xl text-2xl font-bold xl:leading-18 
        max-md:text-center"
        >
          From Daily Essentials to Hidden Gems — We&apos;ve Got It All.
        </h1>
        <p className="max-md:text-center">
          Explore a curated selection of top-quality products across every
          category. Whether you&apos;re upgrading your home, refreshing your
          wardrobe, or looking for the perfect gift — we&apos;ve made it easy to
          shop everything in one place.
        </p>
      </div>

      <div className="md:w-[50%] w-full -mt-10 relative" style={{ height: "610px" }}>
        {/* Skeleton loader (shows only while image is loading) */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}
        
        <Image
          src="/images/heroBG.webp"
          alt="Big Cart image illustration"
          width={500}
          height={610}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsImageLoading(false)}
        />
      </div>
    </section>
  );
};

export default Hero;
