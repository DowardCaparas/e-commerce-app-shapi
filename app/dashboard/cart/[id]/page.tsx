import { fetchCart } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import EditProductQuantity from "@/app/ui/edit-product-quantity";
import PlaceOrderButton from "@/app/ui/place-order-btn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserCartPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id); // Await the data

  let totalAmount = 0;
  let totalDiscount = 0;

  return (
    <div className="md:p-6 mb-28">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {cart.length > 0 ? (
        <div className="inline-grid space-y-2 w-full">
          {cart.map((product) => {
            totalAmount += product.price * product.quantity;

            const safeDiscount = parseFloat(
              Math.abs(product.discount).toFixed(0)
            );
            const originalPrice = product.price / (1 - safeDiscount / 100);
            const discountAmount = originalPrice - product.price;

            totalDiscount += discountAmount;

            return (
              <div key={product.id} className="flex flex-col">
                <Link
                  href={`/product/${product.productid}`}
                  className="inline-grid space-y-4 bg-white border md:rounded-lg p-3 hover:bg-gray-100
                      active:bg-gray-200 duration-75 transition-colors ease-out"
                >
                  <div className="flex items-center gap-4 w-full">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <div className="inline-grid space-y-2 w-full py-6">
                      <span className="text-lg font-semibold">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          $
                          {product.price
                            ? Number(product.price).toFixed(2)
                            : "0.00"}
                        </span>
                        <span className="text-gray-600 line-through md:text-xl">
                          {originalPrice.toFixed(0)}
                        </span>
                      </div>
                      <span className="text-red-500 px-1 rounded-md text-sm font-medium">
                        -{product.discount}%
                      </span>
                      <span className="bg-orange-400 font-semibold text-white py-1 px-2 text-sm w-30">
                        ${discountAmount.toFixed(2)} off
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between items-center px-2">
                  <span>Quantity</span>
                  {/* modify product quantity */}
                  <div className="mt-2">
                    <EditProductQuantity qty={product.quantity} productId={product.productid}/>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>Date</span>
                  <span className="mt-2 font-medium">
                    {formatDateToLocal(product.date)}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>Discount</span>
                  <span className="mt-2 font-medium">
                    {(discountAmount * product.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>Total of {product.quantity} Item(s)</span>
                  <span className="mt-2 font-medium">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>

                <hr className="my-4" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 bg-gray-100 border rounded-lg flex flex-col gap-8 items-center">
          <Image
            src="/images/emptyCart.webp"
            alt="empty cart icon"
            width={120}
            height={120}
          />
          <h3 className="font-medium text-2xl text-gray-500">Cart is empty</h3>
        </div>
      )}

      {/* Order summary */}
      {cart.length > 0 && (
        <div className="flex flex-col bg-white md:px-5 md:py-6 p-2 mt-5">
          <h1 className="md:text-2xl text-xl font-semibold mb-8">
            Order Summary
          </h1>
          <div className="flex justify-between gap-2 items-center">
            <div className="inline-grid space-y-2 md:text-xl text-md">
              <span>
                Total:
                <span className="font-medium text-orange-600 ml-2">
                ${totalAmount.toFixed(2)}
                </span>
              </span>
              <span>
                Save:
                <span className="font-medium text-orange-600 ml-2">
                  ${totalDiscount.toFixed(2)}
                </span>
              </span>
            </div>
            <PlaceOrderButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCartPage;
