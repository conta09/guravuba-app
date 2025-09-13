import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  images: string[]; // <-- simple array of image URLs
  price: number;
  offerPrice?: number;
  discount?: number;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Home & Kitchen",
        "Kids & Toys",
        "Fashion & Accessories",
        "Lifestyle & Essentials",
      ],
      required: true,
    },
    images: {
      type: [String], // <-- array of strings
      required: true,
      validate: [(arr: string[]) => arr.length > 0, "At least one image required"],
    },
    price: { type: Number, required: true },
    offerPrice: { type: Number },
    discount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
