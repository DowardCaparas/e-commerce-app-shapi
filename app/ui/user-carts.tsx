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
    <div className="md:p-5 rounded-lg">
      <span className="text-xl font-semibold max-md:px-5">User Cart:</span>

      {/* products */}
      <div className="inline-grid space-y-2 w-full mt-5">
        {products.map((product) => {
          // Calculate original price before discount
          const safeDiscount = parseFloat(
            Math.abs(product.discountPercentage).toFixed(0)
          );
          const originalPrice = product.price / (1 - safeDiscount / 100);

          const discountAmount = originalPrice - product.price;
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="inline-grid space-y-4 bg-white border md:rounded-lg p-3"
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
                    <span className="text-2xl">${product.price}</span>

                    <span className="text-gray-600 line-through md:text-lg">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-500 px-1 rounded-md text-sm font-medium">
                      -{product.discountPercentage.toFixed(2)}%
                    </span>
                  </div>
                  {/* discount */}
                 <div className="flex justify-between items-center w-full">
                 <span className="bg-orange-400 font-semibold text-white py-1 px-2 text-sm w-30">
                    ${discountAmount.toFixed(2)} off
                  </span>
                  <span>Qty: {product.quantity}</span>
                 </div>
                </div>
              </div>
              <div></div>
            </Link>
          );
        })}
      </div>

      {/*  */}
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
            ${discountedTotal}
          </span>
        </span>
        <span className="flex items-center justify-between font-medium border-b border-gray-200 py-4">
          Total:
          <span className="text-orange-600 font-semibold text-lg">
            ${total}
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserCarts;
