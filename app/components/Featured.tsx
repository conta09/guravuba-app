"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // import your card
import { motion } from "framer-motion"; // optional animation

type Product = {
  _id: string;
  name: string;
  description: string;
  primaryImage: string;
  offerPrice?: number;
};

const Featured: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/all");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading featured products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No featured products available.</p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard
              product={{
                _id: product._id,
                name: product.name,
                description: product.description,
                image: [product.primaryImage], // ProductCard expects array
                offerPrice: product.offerPrice || 0,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
