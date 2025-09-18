import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  primaryImage: string;   // <-- first / main image
  secondaryImages: string[]; // <-- other images
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
    primaryImage: { type: String, required: true },
    secondaryImages: { type: [String], default: [] },
    price: { type: Number, required: true },
    offerPrice: { type: Number },
    discount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
