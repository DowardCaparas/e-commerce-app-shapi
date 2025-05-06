"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { CartItem } from "../../lib/definitions";
import { useEffect, useState } from "react";
import PlaceOrderButton from "../place-order-btn";

const PendingCheckOutItems = ({ cart, userId }: { cart: CartItem[], userId: string }) => {
  const [totals, setTotals] = useState({ total: 0, saved: 0 });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch("/api/cart/total-sum-checkedout-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutStatus: "pending" }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setTotals({ total: data.totalValue, saved: data.totalSaved });
        }
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []);

  // pending items
  const pendingItems = cart.filter((stat) => stat.checkedout === "pending");

  return (
    <div className="md:p-4 grid max-md:mt-4 max-md:mb-16 lg:grid-cols-2 grid-cols-1 gap-4">
      {pendingItems.length > 0 ? (
        <div className="inline-grid space-y-2 w-full">
          {pendingItems.map((product) => {
            const safeDiscount = Math.abs(product.discount);
            const originalPrice = product.price / (1 - safeDiscount / 100);
            const discountAmount = originalPrice - product.price;

            return (
              <div key={product.id} className="flex flex-col mt-40">
                <div className="inline-grid space-y-1 bg-white md:rounded-lg p-3">
                  <hr />
                  <Link
                    href={`/product/${product.productid}`}
                    className="inline-grid hover:bg-gray-50 active:bg-gray-100 duration-75 
                    transition-colors ease-out"
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
                        <span className="font-semibold">{product.name}</span>
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
                  <span>
                    Qty: <span className="font-medium">{product.quantity}</span>
                  </span>
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
          <h3 className="font-medium text-2xl text-gray-500">No items</h3>
        </div>
      )}

      {pendingItems.length > 0 && (
        <div>
          <div
            className="bg-white lg:p-4 p-2 border lg:rounded-lg sticky lg:top-20
          flex lg:flex-col gap-4 max-lg:fixed max-lg:right-0 max-lg:left-0 md:rounded-lg
          lg:left-64 bottom-0 max-lg:justify-between max-lg:items-center md:mx-4"
          >
            <div className="inline-grid lg:text-xl text-lg">
              <span>
                Total
                <span className="font-bold text-orange-600 ml-2">
                  ${totals.total.toFixed(2)}
                </span>
              </span>
              <span>
                Saved
                <span className="font-bold text-orange-600 ml-2">
                  ${totals.saved.toFixed(2)}
                </span>
              </span>
            </div>
            <PlaceOrderButton userId={userId}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingCheckOutItems;
