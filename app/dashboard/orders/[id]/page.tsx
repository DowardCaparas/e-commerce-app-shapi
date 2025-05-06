import { fetchCart } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import CheckedOutItems from "@/app/ui/cart/checked-out-items";
import React from "react";

const OrdersPage = async (props: { params: Promise<{ id: string }> }) => {

  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id);
  
  return (
    <div className="my-20 px-4">
       <div
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 lg:left-64 flex items-center gap-2
        px-2 lg:px-4"
      >
        <BackButton path={`/dashboard/account/${id}`} />
        <h3 className="text-white font-medium text-xl">Orders</h3>
      </div>
      <CheckedOutItems cart={cart}/>
    </div>
  );
};

export default OrdersPage;
