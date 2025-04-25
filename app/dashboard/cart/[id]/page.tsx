import { fetchCart } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
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

  let total = 0;

  return (
    <div className="md:p-6">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {cart.length > 0 ? (
        <div className="inline-grid space-y-2 w-full">
          {cart.map((product) => {
            total += product.price * product.quantity;

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
                    <div className="inline-grid space-y-2 w-full">
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
                        <span>Qty: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between items-center px-2">
                  <span>Date</span>
                  <span className="mt-2 font-medium">
                    {formatDateToLocal(product.date)}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>Total {product.quantity} Item(s)</span>
                  <span className="mt-2 font-medium">
                    ${product.price * product.quantity}
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

      {cart.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold mt-8 mb-4">Summary</h1>
          <span>
            Total: $<span>{total}</span>
          </span>
        </>
      )}
    </div>
  );
};

export default UserCartPage;
