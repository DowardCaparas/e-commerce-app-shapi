import { ProductsOnCartTypes } from "../lib/definitions";
import Image from "next/image";

const Cart = ({
  products,
  total,
  discountedTotal,
  totalProducts,
  totalQuantity,
}: ProductsOnCartTypes) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:px-16 md:px-8">
      <div className="border border-zinc-300 rounded-lg bg-white">
        {products.map((product) => {

          const safeDiscount = parseFloat(Math.abs(product.discountPercentage).toFixed(0));
          const originalPrice = (product.price / (1 - safeDiscount / 100)).toFixed(2);

          return (
            <div
              key={product.id}
              className="flex items-center gap-4 px-4 py-4 border-b border-zinc-300"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={100}
                height={100}
              />
              <div className="flex justify-between items-end w-full">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-gray-700">
                    {product.title}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Discount percentage */}
                    <span className="text-orange-600 font-medium bg-orange-100 px-2 py-0.5 rounded text-sm">
                      -
                      {parseFloat((product.discountPercentage ?? 0).toFixed(0))}
                      %
                    </span>
                    {/* Original price */}
                    <span className="text-gray-600 line-through text-sm">
                      {originalPrice}
                    </span>
                  </div>
                  {/* Latest price */}
                  <span className="font-semibold text-lg text-black">
                    ${parseFloat((product.price ?? 0).toFixed(2))}
                  </span>
                </div>
                <span>{product.quantity}</span>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col gap-4 p-5">
          <span className="font-medium">
            Total: <span className="text-orange-600">{total}</span>
          </span>
          <span className="font-medium">
            Discount total:{" "}
            <span className="text-orange-600">{discountedTotal}</span>
          </span>
          <span className="font-medium">
            Items: <span className="text-orange-600">{totalProducts}</span>
          </span>
          <span className="font-medium">
            Quantity total:{" "}
            <span className="text-orange-600">{totalQuantity}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
