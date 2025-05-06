import SideNav from "../ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
      <div className="w-full flex-none lg:w-64 bg-[#F9F9FB]">
          <SideNav />
      </div>
      <div className="flex-grow lg:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
