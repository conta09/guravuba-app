"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";

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

  // ✅ fallback image (you can replace with your own)
  const fallbackImage = "/placeholder.png";

  return (
    <div
      onClick={() => router.push(`/product/${product._id}`)}
      className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        {product.image && product.image[0] ? (
          <Image
            src={product.image[0]}
            alt={product.name}
            className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
          />
        ) : (
          <Image
            src={fallbackImage}
            alt="No Image Available"
            className="object-cover w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
          />
        )}

        <button
          type="button"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          onClick={(e) => e.stopPropagation()} // prevent navigation on heart click
        >
          <CiHeart className="text-xl" />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-bold">
            {currency}
            {product.offerPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
