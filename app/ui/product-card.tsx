import Link from "next/link";
import { ProductDataTypes } from "../lib/definitions";
import Image from "next/image";

const ProductCard = ({
  id,
  title,
  thumbnail,
  price,
  discountPercentage,
  rating,
  brand,
}: ProductDataTypes) => {
  return (
    <Link
      href={`/product/${id}`}
      className=" bg-white shadow-sm hover:shadow-md"
    >
      <Image
        src={thumbnail ? thumbnail : ""}
        alt={title}
        width={300}
        height={300}
        className="w-full bg-linear-to-l from-white to-gray-200"
      />
      <div className="p-2 flex flex-col gap-3">
        <div className="inline-grid">
          <span className="font-medium text-md truncate">{title}</span>
          <span className="bg-orange-600 font-semibold text-white py-1 px-2 text-sm w-30">
            ${(price * (discountPercentage / 100)).toFixed(2)} off
          </span>
        </div>

        <span className="text-orange-600 font-medium">
          $<span className="text-xl">{price}</span>
        </span>
        <div className="flex items-center gap-2">
          <Image src="/star-filled.svg" alt="star" width={18} height={18} />
          <span>{rating}</span>
        </div>
        <span className="text-gray-600">{brand}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
