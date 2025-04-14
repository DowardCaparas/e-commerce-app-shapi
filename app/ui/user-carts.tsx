import Image from "next/image";
import { ProductsOnCartTypes } from "../lib/definitions";
import Link from "next/link";

const UserCarts = ({
  products,
  total,
  discountedTotal,
  totalProducts,
  totalQuantity,
}: ProductsOnCartTypes) => {
  return (
    <div className="rounded-lg">
      {/* products */}
      <div className="inline-grid space-y-2 w-full">
        {products.map((product) => {
          const discount = product.discountPercentage;
          const discountedPrice = product.price;

          // ✅ Correctly calculate original price using the formula
          const originalPrice = discountedPrice / (1 - discount / 100);

          const discountAmount =
            discountedPrice * (1 - discount / 100) * product.quantity;

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="inline-grid space-y-4 bg-white border md:rounded-lg p-3 hover:bg-gray-100
              active:bg-gray-200 duration-75 transition-colors ease-out"
            >
              <div className="flex items-center gap-4 w-full">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div className="inline-grid space-y-2 w-full">
                  <span className="text-lg font-semibold">{product.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600 line-through md:text-lg">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-500 px-1 rounded-md text-sm font-medium">
                      -{discount.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="bg-orange-400 font-semibold text-white py-1 px-2 text-sm rounded w-fit">
                      ${discountAmount.toFixed(2)} off
                    </span>
                    <span>Qty: {product.quantity}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Summary */}
      <div className="inline-grid p-5 w-full border md:rounded-lg mt-5 bg-white">
        <span className="flex items-center justify-between font-medium border-b border-gray-200 py-4">
          Total quantity:
          <span className="text-orange-600 font-semibold text-lg">
            {totalQuantity}
          </span>
        </span>
        <span className="flex items-center justify-between font-medium border-b border-gray-200 py-4">
          Total products:
          <span className="text-orange-600 font-semibold text-lg">
            {totalProducts}
          </span>
        </span>
        <span className="flex items-center justify-between font-medium border-b border-gray-200 py-4">
          Discount total:
          <span className="text-orange-600 font-semibold text-lg">
            ${discountedTotal.toFixed(2)}
          </span>
        </span>
        <span className="flex items-center justify-between font-medium py-4">
          Total:
          <span className="text-orange-600 font-semibold text-lg">
            ${total.toFixed(2)}
          </span>
        </span>
      </div>
      <hr className="my-5"/>
    </div>
  );
};

export default UserCarts;
