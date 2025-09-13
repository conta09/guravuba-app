"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  // URL validation helper
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const addImageField = () => setImageUrls([...imageUrls, ""]);
  const removeImageField = (index: number) =>
    setImageUrls(imageUrls.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : undefined,
      discount: discount ? Number(discount) : undefined,
      images: imageUrls.filter((url) => url.trim() !== ""), // only keep non-empty URLs
    };

    try {
      const res = await fetch("/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("✅ Product added successfully!");

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setOfferPrice("");
      setDiscount("");
      setImageUrls([""]);
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Kids & Toys">Kids & Toys</option>
          <option value="Fashion & Accessories">Fashion & Accessories</option>
          <option value="Lifestyle & Essentials">Lifestyle & Essentials</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Original Price"
            className="w-full p-3 border rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Offer Price"
            className="w-full p-3 border rounded-lg"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />
        </div>

        <input
          type="number"
          placeholder="Discount (%)"
          className="w-full p-3 border rounded-lg"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        {/* Dynamic Image URL Inputs */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Product Images</h3>
          {imageUrls.map((url, index) => (
            <div key={index} className="mb-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  className="w-full p-2 border rounded-lg"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
              {isValidUrl(url) && (
                <div className="mt-2">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                    unoptimized // avoids Next.js domain issues
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-4 py-2 bg-gray-200 rounded-lg"
          >
            + Add Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
