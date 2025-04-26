import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="flex max-md:flex-col-reverse justify-between max-md:items-center gap-10 mt-20 mb-14">
      <div className="md:w-[50%]">
        <h1 className="mb-2 xl:text-6xl lg:text-5xl sm:text-4xl text-2xl font-bold xl:leading-18 max-md:text-center">
          From Daily Essentials to Hidden Gems — We&apos;ve Got It All.
        </h1>
        <p className="max-md:text-center">
            Explore a curated selection of top-quality products across every
            category. Whether you&apos;re upgrading your home, refreshing your
            wardrobe, or looking for the perfect gift — we&apos;ve made it easy to
            shop everything in one place.
          </p>
      </div>
      <Image
        src="/images/heroBG.webp"
        alt="Big Cart image illustration"
        width={500}
        height={610}
        className="md:w-[50%] -mt-10"
      />
    </section>
  );
};

export default Hero;
