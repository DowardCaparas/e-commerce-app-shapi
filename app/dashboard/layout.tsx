import SideNav from "../ui/sidenav";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-[#F9F9FB]">
          <SideNav />
      </div>
      <div className="flex-grow px-2 py-8 md:overflow-y-auto md:px-6">
        {children}
        </div>
    </div>
  );
}
