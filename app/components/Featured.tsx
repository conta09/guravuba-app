"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

const Featured = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products/featured");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        } else {
          console.error("Failed to load featured products:", data.error);
        }
      } catch (err) {
        console.error("❌ Error fetching featured products:", err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Featured Products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button
        onClick={() => router.push("/all-products")}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  );
};

export default Featured;
