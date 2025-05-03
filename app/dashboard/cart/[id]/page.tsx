import { fetchCart } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import CartCardWithTotals from "@/app/ui/cart/cart-card-with-totals";
import React from "react";

const UserCartPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id);

  return (
    <>
      <div
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 md:left-64 flex items-center gap-2
        px-2 md:px-4"
      >
        <BackButton path="/dashboard" />
        <h3 className="text-white font-medium text-xl">Shopping Cart</h3>
      </div>
      <CartCardWithTotals cart={cart} userId={id}/>
    </>
  );
};

export default UserCartPage;
