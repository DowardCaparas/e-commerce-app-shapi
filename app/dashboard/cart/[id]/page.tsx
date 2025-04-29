import { fetchCart } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import CheckOutButton from "@/app/ui/check-out-btn";
import DeleteItemFromCart from "@/app/ui/delete-item-from-cart";
import EditProductQuantity from "@/app/ui/edit-product-quantity";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const UserCartPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id);

  // ✅ Calculate totals OUTSIDE of the rendering
  const totalAmount = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const totalDiscount = cart.reduce((sum, product) => {
    const safeDiscount = parseFloat(Math.abs(product.discount).toFixed(0));
    const originalPrice = product.price / (1 - safeDiscount / 100);
    const discountAmount = originalPrice - product.price;
    return sum + discountAmount * product.quantity;
  }, 0);

  return (
    <Fragment>
      <div className="md:p-4 grid max-md:mb-12 lg:grid-cols-2 grid-cols-1 gap-2">
        <div
          className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 md:left-64 flex items-center gap-4"
        >
          <Link href="/dashboard">
            <Image
              src="/left-arrow.svg"
              alt="empty cart icon"
              width={35}
              height={35}
              className="bg-orange-700 hover:bg-orange-800 active:bg-orange-900
              rounded-full p-1"
            />
          </Link>
          <h3 className="text-white font-medium text-xl">Shopping Cart</h3>
        </div>
        {cart.length > 0 ? (
          <div className="inline-grid space-y-2 w-full my-16">
            {cart.map((product) => {
              const safeDiscount = parseFloat(
                Math.abs(product.discount).toFixed(0)
              );
              const originalPrice = product.price / (1 - safeDiscount / 100);
              const discountAmount = originalPrice - product.price;

              return (
                <div key={product.id} className="flex flex-col">
                  <div className="inline-grid space-y-4 bg-white border md:rounded-lg p-3">
                    <Link
                      href={`/product/${product.productid}`}
                      className="inline-grid space-y-4 hover:bg-gray-100 active:bg-gray-200
                       duration-75 transition-colors ease-out"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                        <div className="inline-grid space-y-2 w-full py-2">
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
                    <hr className="mb-2" />
                    <div className="flex items-center justify-end gap-6 h-10">
                      <EditProductQuantity
                        qty={product.quantity}
                        productId={product.productid}
                      />
                      <DeleteItemFromCart productId={product.productid} />
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
            <h3 className="font-medium text-2xl text-gray-500">
              Cart is empty
            </h3>
          </div>
        )}

        {/* Order Summary for large screens*/}
        <div>
          {cart.length > 0 && (
            <div className="bg-white md:p-4 p-2 border md:rounded-lg sticky lg:top-20
            flex lg:flex-col gap-4 max-lg:fixed max-md:bottom-12 max-lg:right-0 max-lg:left-0
            md:left-64 md:bottom-0 max-lg:justify-between max-md:items-center">
              <div className="inline-grid lg:text-xl text-lg">
                <span>
                  Total
                  <span className="font-bold text-orange-600 ml-2">
                    ${totalAmount.toFixed(2)}
                  </span>
                </span>
                <span>
                  Saved
                  <span className="font-bold text-orange-600 ml-2">
                    ${totalDiscount.toFixed(2)}
                  </span>
                </span>
              </div>
              <CheckOutButton />
            </div>
          )}
        </div>

      </div>
    </Fragment>
  );
};

export default UserCartPage;
