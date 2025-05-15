import { fetchAccountById, fetchCart } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import PendingCheckOutItems from "@/app/ui/cart/check-out-pending-items";
import ShopperInfo from "@/app/ui/checkout/shopper-info";
import React from "react";

const CheckedOutItemsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id);
  const userInfo = await fetchAccountById(id);

  return (
    <div className="relative">
      <div
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 lg:left-64 px-2 lg:px-4 z-10"
      >
        <div className="flex items-center gap-2">
          <BackButton path={`/dashboard/cart/${id}`} />
          <h3 className="text-white font-medium text-xl">Checkout</h3>
        </div>
      </div>
        <div className="md:mt-20 mt-20 absolute w-full">
          {userInfo.map((info) => (
            <ShopperInfo
              key={info.id}
              id={info.id}
              name={info.name}
              username={info.username}
              email={info.email}
              address={info.address}
            />
          ))}
           <PendingCheckOutItems cart={cart} userId={id}/>
        </div>
       
    </div>
  );
};

export default CheckedOutItemsPage;
