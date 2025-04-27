import { fetchCart } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import DeleteItemFromCart from "@/app/ui/delete-item-from-cart";
import EditProductQuantity from "@/app/ui/edit-product-quantity";
import PlaceOrderButton from "@/app/ui/place-order-btn";
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
      <div className="md:p-6 mb-36">
        <h1 className="text-2xl font-semibold mb-4">Cart</h1>
        {cart.length > 0 ? (
          <div className="inline-grid space-y-2 w-full">
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
                    <div className="flex items-center justify-end gap-10">
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

        {/* Order Summary */}
        {cart.length > 0 && (
          <div
            className="bg-orange-100 lg:px-5 lg:py-6 p-4 fixed md:bottom-2 
            left-0 right-0 md:left-75 md:right-11 bottom-10 md:rounded-t-2xl border-t md:shadow-lg"
          >
            <div className="flex justify-between gap-2 items-center">
              <div className="inline-grid space-y-2 lg:text-xl text-lg">
                <span>
                  Total:
                  <span className="font-bold text-orange-600 ml-2">
                    ${totalAmount.toFixed(2)}
                  </span>
                </span>
                <span>
                  Save:
                  <span className="font-bold text-orange-600 ml-2">
                    ${totalDiscount.toFixed(2)}
                  </span>
                </span>
              </div>
              <PlaceOrderButton />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserCartPage;
