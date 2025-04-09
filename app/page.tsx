import Link from "next/link";
import ProductCategories from "./ui/product-categories";

const Home = async () => {
  
  return (
    <div className="lg:px-16 md:px-8 px-4 mt-20 mb-28 flex flex-col justify-center gap-10">
       <Link
              href="/search-products"
              className="bg-white text-start py-2 px-4 w-full cursor-text text-gray-500 
              border-2 border-orange-500"
            >
              Search products
            </Link>
        <ProductCategories />
    </div>
  );
};

export default Home;
