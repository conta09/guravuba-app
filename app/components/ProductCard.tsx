import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa"; // ⭐ icons

type Product = {
  _id: string;
  name: string;
  description: string;
  image: string[];
  offerPrice: number;
};

interface ProductCardProps {
  product: Product;
  currency?: string; // Optional prop for currency symbol
}

const ProductCard: React.FC<ProductCardProps> = ({ product, currency = "$" }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      {/* Image */}
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button
          type="button"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          onClick={(e) => e.stopPropagation()} // Prevents navigating when clicking heart
        >
          <CiHeart className="text-xl" />
        </button>
      </div>

      {/* Name */}
      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>

      {/* Description */}
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) =>
            index < Math.floor(4) ? (
              <FaStar key={index} className="text-yellow-400 h-3 w-3" />
            ) : (
              <FaRegStar key={index} className="text-gray-300 h-3 w-3" />
            )
          )}
        </div>
      </div>

      {/* Price + Buy Now */}
      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {product.offerPrice}
        </p>
        <button
          type="button"
          className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
