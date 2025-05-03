import Image from "next/image";
import Link from "next/link";
import React from "react";

const BackButton = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <Image
        src="/chevron-left.svg"
        alt="back button"
        width={30}
        height={30}
        className="bg-white p-1 rounded-full hover:border border-white active:scale-95
        transition"
      />
    </Link>
  );
};

export default BackButton;
