import { fetchAccountById, fetchCart } from "@/app/lib/data";
import BackButtonCancelCheckOut from "@/app/ui/cart/cancel-checkout-button";
import CheckedOutItems from "@/app/ui/cart/checked-out-items";
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
    <>
      <div
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 md:left-64 px-2 md:px-4"
      >
        <div className="flex items-center gap-2">
          <BackButtonCancelCheckOut path={`/dashboard/cart/${id}`} />
          <h3 className="text-white font-medium text-xl">Checkout</h3>
        </div>
      </div>
     <div>
     <div className="mt-20 md:px-4">
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
      </div>
      <CheckedOutItems cart={cart} />
     </div>
    </>
  );
};

export default CheckedOutItemsPage;
