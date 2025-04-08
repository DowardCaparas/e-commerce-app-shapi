"use client";

import Image from "next/image";

const DeleteItem = () => {

  return (
    <button
      className="bottom-0 cursor-pointer"
      aria-label="delete an item from cart"

    >
      <Image src="/trash.svg" alt="trash icon" width={25} height={25} />
    </button>
  );
};

export default DeleteItem;
