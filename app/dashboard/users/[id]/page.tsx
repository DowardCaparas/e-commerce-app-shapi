import { fetchUserById, fetchUserCart } from "@/app/lib/data";
import { ProductsOnCartTypes } from "@/app/lib/definitions";
import UserCarts from "@/app/ui/user-carts";
import UserDetails from "@/app/ui/user-details";

const UserPage = async (props: {
  params: Promise<{
    id: number;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;
  const user = await fetchUserById(id);
  const carts = await fetchUserCart(id);
  return (
    <div className="">
      <UserDetails
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        maidenName={user.maidenName}
        username={user.username}
        email={user.email}
        image={user.image}
        address={user.address}
        age={user.age}
        gender={user.gender}
      />
      <div className="mt-10 mb-2">
        <span className="text-xl font-semibold">User Cart:</span>
      </div>
      {carts.map((cart: ProductsOnCartTypes) => (
        <UserCarts
          key={cart.id}
          products={cart.products}
          total={cart.total}
          discountedTotal={cart.discountedTotal}
          totalProducts={cart.totalProducts}
          totalQuantity={cart.totalQuantity}
        />
      ))}
    </div>
  );
};

export default UserPage;
