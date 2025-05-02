import { fetchCart } from "@/app/lib/data";
import CheckedOutItems from "@/app/ui/cart/checked-out-items";
import React from "react";

const CheckedOutItemsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const cart = await fetchCart(id);
  
  return (
    <div>
      <CheckedOutItems cart={cart} />
    </div>
  );
};

export default CheckedOutItemsPage;
