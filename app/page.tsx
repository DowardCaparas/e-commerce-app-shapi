import Link from "next/link";
import Hero from "./ui/hero";
import ProductCards from "./ui/product-card";
import NavBar from "./ui/navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="lg:px-20 md:px-12 px-4 mt-10">
        <Hero />
        <section className="flex flex-col justify-center gap-8">
          <div className="mb-5 gap-2 bg-white py-4 border-b-4 border-orange-600">
            <h3 className="text-center text-orange-600">DAILY DISCOVER</h3>
          </div>

          <ProductCards />
          <Link
            href="/login"
            className="bg-white text-sm text-gray-700 px-5 py-2 border mx-auto font-medium
          hover:bg-gray-100 active:gray-200 active:shadow-inner"
          >
            Login To See More
          </Link>
        </section>
        <section className="py-20 bg-orange-100 rounded-md text-center my-20">
          <span className="text-orange-600 font-semibold">
            Style, Quality, Value, Everyday.
          </span>
          <h3 className="text-4xl font-semibold">
            Great Deals Every Day
            <br /> — Just for You.
          </h3>
        </section>
      </div>
      <footer className="py-8 border-t-4 border-orange-600 lg:px-20 md:px-12 px-4 bg-[#FBFBFB]">
        <div className="border-t border-gray-300 pt-8">
          <span className="text-sm text-gray-700 ">
            &copy; 2025 Dounhuward Caparas. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Home;
