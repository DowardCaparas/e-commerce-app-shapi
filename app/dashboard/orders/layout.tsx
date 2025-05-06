import CartBadge from "@/app/ui/cart-badge";

export default async function Layout({children}: {children: React.ReactNode}) {

  return (
    <div className="flex flex-col gap-4">
      <div
        className="p-4 bg-gradient-to-b from-[#F6402D] to-[#FE6333] 
        fixed top-0 right-0 left-0 md:left-64 px-2 md:px-4 flex justify-between items-center"
      >
        <h3 className="text-white font-medium text-xl">Orders</h3>
        <CartBadge />
      </div>

      {/* Render child pages here */}
      {children}
    </div>
  );
}
