"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { CartItem } from "../../lib/definitions";
import SelectCartItem from "./select-cart-item";
import EditProductQuantity from "./edit-product-quantity";
import DeleteItemFromCart from "./delete-item-from-cart";
import CheckOutButton from "./check-out-btn";
import { useRouter } from "next/navigation";

const CartCardWithTotals = ({ cart, userId }: { cart: CartItem[], userId: string }) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});
  // Get cart quantity if the item is not checked out
    const [cartQuantity, setCartQuantity] = useState(0);
    const router = useRouter();
  
    useEffect(() => {
      router.refresh();
      const fetchCartQuantity = async () => {
        try {
          const res = await fetch(`/api/cart/quantity`);
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const data = await res.json();
          setCartQuantity(data.quantity);
        } catch (error) {
          console.error("Failed to fetch cart quantity:", error);
        }
      };
  
      fetchCartQuantity();
      const interval = setInterval(fetchCartQuantity, 10000); // every 10 seconds
  
      return () => clearInterval(interval);
    }, []);

  const handleSelectChange = (productId: number, checked: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [productId]: checked }));
  };

  // filter after storing the selected items
  const selectedProducts = cart.filter((p) => selectedItems[p.productid]);
  const selectedProductIds = selectedProducts.map((p) => p.productid);

  // calculate the total amount of all selected items
  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // calculate the total discount of all selected items
  const saved = selectedProducts.reduce((sum, product) => {
    const safeDiscount = Math.abs(product.discount);
    const originalPrice = product.price / (1 - safeDiscount / 100);
    const discountAmount = originalPrice - product.price;
    return sum + discountAmount * product.quantity;
  }, 0);

  return (
    <div className="md:p-4 grid max-md:mt-4 max-md:mb-16 lg:grid-cols-2 grid-cols-1 gap-2">

      {cartQuantity > 0 ? (
        <div className="inline-grid space-y-2 w-full my-16">
          {cart.map((product) => {
            const safeDiscount = parseFloat(
              Math.abs(product.discount).toFixed(0)
            );
            const originalPrice = product.price / (1 - safeDiscount / 100);
            const discountAmount = originalPrice - product.price;

            return (
              <div key={product.id}>
                {product.checkedout === false && (
                  <div className="flex flex-col">
                  <div className="inline-grid space-y-1 bg-white border md:rounded-lg p-3">
                    {/* Selec item what you want to checkout */}
                    <SelectCartItem
                      productId={product.productid}
                      onSelectChange={handleSelectChange}
                    />
                    <hr />
                    <Link
                      href={`/product/${product.productid}`}
                      className="inline-grid hover:bg-gray-50 active:bg-gray-100
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
                    <div className="flex items-center justify-end gap-6 h-8">
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
                      ${saved.toFixed(2)}
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

      {/* Order Summary for large screens*/}
      <div>
        {cart.length > 0 && (
          <div
            className="bg-white md:p-4 p-2 border md:rounded-lg sticky lg:top-20
            flex lg:flex-col gap-4 max-lg:fixed max-lg:right-0 max-lg:left-0
            md:left-64 bottom-0 max-lg:justify-between max-md:items-center"
          >
            <div className="inline-grid lg:text-xl text-lg">
              <span>
                Total
                <span className="font-bold text-orange-600 ml-2">
                  ${total.toFixed(2)}
                </span>
              </span>
              <span>
                Saved
                <span className="font-bold text-orange-600 ml-2">
                  ${saved.toFixed(2)}
                </span>
              </span>
            </div>
            <CheckOutButton
              selectedProductIds={selectedProductIds}
              userId={userId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCardWithTotals;
