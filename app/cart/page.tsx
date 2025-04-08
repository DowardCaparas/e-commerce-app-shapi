import { fetchCart } from "../lib/data";
import { ProductsOnCartTypes } from "../lib/definitions";
import CartItem from "../ui/cart-items";

const Cart = async () => {
  const orders = await fetchCart();
  const order = orders.carts;

  return (
    <div className="flex flex-col gap-2 my-28">
        {order.map((item: ProductsOnCartTypes) => (
            <CartItem 
              key={item.id}
              id={item.id}
              products={item.products}
              total={item.total}
              discountedTotal={item.discountedTotal}
              totalProducts={item.totalProducts}
              totalQuantity={item.totalQuantity}
            />
        ))}
    </div>
  );
};

export default Cart;
