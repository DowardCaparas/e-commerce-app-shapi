"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { CartItem } from "../../lib/definitions";
import CancelCheckedOutItem from "./cancel-order-button";

const CheckedOutItems = ({ cart }: { cart: CartItem[] }) => {
  return (
    <div className="md:p-4 grid max-md:mt-4 max-md:mb-16 lg:grid-cols-2 grid-cols-1 gap-2">
      {cart.length > 0 ? (
        <div className="inline-grid space-y-2 w-full my-16">
          {cart.map((product) => {
            const safeDiscount = parseFloat(
              Math.abs(product.discount).toFixed(0)
            );
            const originalPrice = product.price / (1 - safeDiscount / 100);
            const discountAmount = originalPrice - product.price;

            return (
              <div key={product.id}>
                {product.checkedout === true && (
                  <div className="flex flex-col">
                    <div className="inline-grid space-y-1 bg-white border md:rounded-lg p-3">
                      <hr />
                      <Link
                        href={`/product/${product.productid}`}
                        className="inline-grid hover:bg-gray-100 active:bg-gray-200
                         duration-75 transition-colors ease-out"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <div className="inline-grid space-y-1 w-full py-2">
                            <span className="font-semibold">
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
                      <hr />

                        <div className="flex items-center justify-between gap-6 mt-1">
                          {/* product quantity */}
                        <span>
                          Qty:{" "}
                          <span className="font-medium">
                            {product.quantity}
                          </span>
                        </span>
                        <CancelCheckedOutItem productId={product.productid} />
                        </div>

                    </div>

                    <div className="flex justify-between items-center px-2 mt-2">
                      <span>Date</span>
                      <span className="font-medium">
                        {formatDateToLocal(product.date)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-2 mt-2">
                      <span>Discount</span>
                      <span className="font-medium">
                        ${(discountAmount * product.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-2 mt-2">
                      <span>Total of {product.quantity} Item(s)</span>
                      <span className="font-medium">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>

                    <hr className="my-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // display ui of cart is empty
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
    </div>
  );
};

export default CheckedOutItems;
