import { fetchCart } from "@/app/lib/data";
import CartCardWithTotals from "@/app/ui/cart/cart-card-with-totals";
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

  return (
    <Fragment>
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
        <CartCardWithTotals cart={cart}/>
    </Fragment>
  );
};

export default UserCartPage;
