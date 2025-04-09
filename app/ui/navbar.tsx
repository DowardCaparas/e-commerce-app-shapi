import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav
      className="bg-gradient-to-b from-[#F6402D] to-[#FE6333] text-white flex justify-between items-center 
    lg:px-16 md:px-8 px-4 py-2"
    >
      <Link href="/" className="font-medium text-3xl my-2 flex items-center">
        <Image
          src="/shopping-bag.svg"
          alt="shopping bag"
          width={50}
          height={50}
        />
        Shapi
      </Link>
      <Link href="/login">
        <span className="text-white font-medium hover:text-gray-200 active:text-white">
          Log In
        </span>
      </Link>
    </nav>
  );
};

export default NavBar;
